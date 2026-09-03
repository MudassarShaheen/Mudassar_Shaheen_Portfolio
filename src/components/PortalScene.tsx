import { useEffect, useRef } from "react";
import type * as THREENS from "three";

/**
 * A persistent, full-page ambient world: a single glowing portal ring that
 * dominates the hero, then recedes into a soft, ever-present backdrop as
 * the visitor scrolls — tying every section together as one continuous
 * space instead of separate flat panels. Original concept (not a clone of
 * any specific portfolio) built from plain procedural three.js geometry.
 *
 * - Fixed behind all content (very low opacity outside the hero) so text
 *   contrast is never affected.
 * - Portal hue drifts from the primary to the secondary accent across the
 *   full scroll range, hinting at moving between "realms".
 * - three.js is dynamically imported (own chunk) and particle count scales
 *   down on narrow/mobile viewports.
 * - Skips entirely for prefers-reduced-motion or missing WebGL, and pauses
 *   its render loop while the tab is hidden.
 */
const PortalScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const probe = document.createElement("canvas");
    if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    import("three").then((THREE) => {
      if (!cancelled) cleanup = setupPortal(THREE, container);
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true" />;
};

function setupPortal(THREE: typeof THREENS, container: HTMLDivElement) {
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
  if (!gl) return;

  const style = getComputedStyle(document.documentElement);
  const toColor = (hslVar: string, fallback: string) => {
    const raw = style.getPropertyValue(hslVar).trim();
    if (!raw) return new THREE.Color(fallback);
    const [h, s, l] = raw.split(" ").map((v) => parseFloat(v));
    if ([h, s, l].some(Number.isNaN)) return new THREE.Color(fallback);
    const c = new THREE.Color();
    c.setHSL(h / 360, s / 100, l / 100);
    return c;
  };
  const primary = toColor("--primary", "#3b82f6");
  const secondary = toColor("--secondary", "#3b82f6");

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0, 6);

  const size = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  size();

  const viewportWidthAtZ0 = () => {
    const vFov = (camera.fov * Math.PI) / 180;
    const heightAtZ0 = 2 * Math.tan(vFov / 2) * camera.position.z;
    return heightAtZ0 * camera.aspect;
  };

  const glowTexture = (() => {
    const s = 256;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, "#ffffff");
    g.addColorStop(0.4, "#ffffff");
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    return new THREE.CanvasTexture(c);
  })();

  // The portal: a dominant bright ring, layered bloom-style glow discs
  // (stacked additive sprites fake a bloom post-process without the
  // extra render-pass cost), and a faint core.
  const portalGroup = new THREE.Group();
  scene.add(portalGroup);
  const PORTAL_R = 2.05;

  const bloomLayers = [
    { scale: 12, opacity: 0.16 },
    { scale: 8, opacity: 0.22 },
    { scale: 5.5, opacity: 0.3 },
  ].map(({ scale, opacity }) => {
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        color: primary,
        transparent: true,
        opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    sprite.scale.set(scale, scale, 1);
    portalGroup.add(sprite);
    return sprite;
  });

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(PORTAL_R, 0.09, 32, 160),
    new THREE.MeshBasicMaterial({ color: primary, transparent: true, opacity: 1 })
  );
  portalGroup.add(ring);

  const ringInner = new THREE.Mesh(
    new THREE.TorusGeometry(PORTAL_R, 0.022, 16, 160),
    new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.7, depthWrite: false })
  );
  ringInner.scale.setScalar(1.1);
  portalGroup.add(ringInner);

  const ringOuterAccent = new THREE.Mesh(
    new THREE.TorusGeometry(PORTAL_R, 0.012, 16, 160),
    new THREE.MeshBasicMaterial({ color: primary, transparent: true, opacity: 0.5, depthWrite: false })
  );
  ringOuterAccent.scale.setScalar(1.35);
  portalGroup.add(ringOuterAccent);

  const core = new THREE.Mesh(
    new THREE.CircleGeometry(PORTAL_R * 0.96, 64),
    new THREE.MeshBasicMaterial({ color: primary, transparent: true, opacity: 0.16, depthWrite: false })
  );
  portalGroup.add(core);

  // Particles streaming toward the portal
  const STREAM_COUNT = window.innerWidth < 768 ? 90 : 220;
  const streamGeo = new THREE.BufferGeometry();
  const streamPos = new Float32Array(STREAM_COUNT * 3);
  const streamSeed = new Float32Array(STREAM_COUNT);
  for (let i = 0; i < STREAM_COUNT; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = PORTAL_R * 0.55 + Math.random() * PORTAL_R * 2.1;
    streamPos[i * 3] = Math.cos(angle) * radius;
    streamPos[i * 3 + 1] = Math.sin(angle) * radius;
    streamPos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    streamSeed[i] = Math.random();
  }
  streamGeo.setAttribute("position", new THREE.BufferAttribute(streamPos, 3));
  const streamMat = new THREE.PointsMaterial({
    color: primary,
    size: 0.045,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.65,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const stream = new THREE.Points(streamGeo, streamMat);
  portalGroup.add(stream);

  // Sparse ambient dust across the whole scene, present for the entire scroll
  const DUST_COUNT = window.innerWidth < 768 ? 70 : 180;
  const dustPos = new Float32Array(DUST_COUNT * 3);
  for (let i = 0; i < DUST_COUNT; i++) {
    const radius = 4 + Math.random() * 8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    dustPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    dustPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    dustPos[i * 3 + 2] = radius * Math.cos(phi);
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  const dustMat = new THREE.PointsMaterial({
    color: secondary,
    size: 0.02,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  const mouse = { x: 0, y: 0 };
  const current = new THREE.Vector2(0, 0);
  let heroFrac = 0; // 0 at top of hero, 1 once scrolled a viewport height
  let pageFrac = 0; // 0..1 across the whole document
  let visible = !document.hidden;
  let raf = 0;

  const onMouseMove = (e: MouseEvent) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };
  const onScroll = () => {
    heroFrac = Math.min(1, window.scrollY / (window.innerHeight || 1));
    const max = document.documentElement.scrollHeight - window.innerHeight;
    pageFrac = max > 0 ? Math.min(1, window.scrollY / max) : 0;
  };
  const onResize = () => size();
  const onVisibility = () => {
    visible = !document.hidden;
  };

  onScroll();
  window.addEventListener("mousemove", onMouseMove, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", onVisibility);

  const clock = new THREE.Clock();
  const tmpColor = new THREE.Color();

  const tick = () => {
    raf = requestAnimationFrame(tick);
    if (!visible) return;
    const t = clock.getElapsedTime();
    const vpWidth = viewportWidthAtZ0();

    current.lerp(new THREE.Vector2(mouse.x, mouse.y), 0.04);

    // Portal sits large, dominating the hero (kept inside the visible
    // frustum given its bigger radius). Past the hero it doesn't just sit
    // still in a corner — it drifts in a slow arc tied to overall scroll
    // progress, so it feels like a single world traveling with the visitor
    // behind every section rather than a static hero-only decoration.
    const restX = vpWidth * 0.2;
    const wanderX = Math.sin(pageFrac * Math.PI * 2.4) * vpWidth * 0.3;
    const wanderY = Math.cos(pageFrac * Math.PI * 1.6) * 1.4 - 0.4;
    const wanderZ = Math.sin(pageFrac * Math.PI * 1.8) * 1.8;
    portalGroup.position.x =
      restX * (1 - heroFrac) + wanderX * heroFrac + current.x * (vpWidth * 0.025);
    portalGroup.position.y = current.y * 0.2 * (1 - heroFrac) + wanderY * heroFrac;
    // Recedes physically into the screen past the hero (real depth, not
    // just a flat scale-down), then keeps drifting nearer/farther as the
    // rest of the page scrolls — a camera moving through a 3D space.
    portalGroup.position.z = -heroFrac * 2.6 + wanderZ * heroFrac;

    const heroScale = 1 - heroFrac * 0.4;
    const breathe = 1 + Math.sin(t * 0.5) * 0.02;
    portalGroup.scale.setScalar(heroScale * breathe);

    // A subtle camera dolly: drifting forward/back through the ambient
    // dust field over the full scroll makes near particles slide past
    // faster than far ones — genuine parallax depth, not a flat backdrop.
    camera.position.z = 6 - Math.sin(pageFrac * Math.PI * 1.2) * 1.4;
    camera.position.x = current.x * 0.15;
    camera.lookAt(0, 0, 0);

    // Bold and bright through the hero, but drops off hard once scrolled
    // past it — outside the hero this is pure background ambience and
    // must never compete with body text contrast (e.g. project copy).
    const ambientOpacity = 1 - heroFrac * 0.92; // floor ~0.08, barely-there
    ring.material.opacity = 1 * ambientOpacity;
    ringInner.material.opacity = 0.7 * ambientOpacity;
    ringOuterAccent.material.opacity = 0.5 * ambientOpacity;
    core.material.opacity = 0.16 * ambientOpacity;
    streamMat.opacity = 0.65 * ambientOpacity;
    bloomLayers.forEach((layer, i) => {
      const base = [0.16, 0.22, 0.3][i];
      layer.material.opacity = base * ambientOpacity;
    });

    // Hue drifts from primary to secondary across the full page
    tmpColor.copy(primary).lerp(secondary, pageFrac);
    ring.material.color.copy(tmpColor);
    ringInner.material.color.set("#ffffff");
    ringOuterAccent.material.color.copy(tmpColor);
    core.material.color.copy(tmpColor);
    streamMat.color.copy(tmpColor);
    bloomLayers.forEach((layer) => layer.material.color.copy(tmpColor));

    ring.rotation.z = t * 0.08;
    ringInner.rotation.z = -t * 0.12;
    ringOuterAccent.rotation.z = t * 0.05;
    stream.rotation.z = t * 0.15;
    dust.rotation.y += 0.0006;

    renderer.render(scene, camera);
  };
  tick();

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibility);
    dustGeo.dispose();
    dustMat.dispose();
    streamGeo.dispose();
    streamMat.dispose();
    ring.geometry.dispose();
    (ring.material as THREENS.Material).dispose();
    ringInner.geometry.dispose();
    (ringInner.material as THREENS.Material).dispose();
    ringOuterAccent.geometry.dispose();
    (ringOuterAccent.material as THREENS.Material).dispose();
    core.geometry.dispose();
    (core.material as THREENS.Material).dispose();
    glowTexture.dispose();
    bloomLayers.forEach((layer) => layer.material.dispose());
    renderer.dispose();
    container.removeChild(canvas);
  };
}

export default PortalScene;
