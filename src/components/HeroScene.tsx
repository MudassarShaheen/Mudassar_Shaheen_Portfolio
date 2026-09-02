import { useEffect, useRef } from "react";
import type * as THREENS from "three";

/**
 * Decorative WebGL background for the hero: a single glowing orb resting
 * at the edge of the frame that drifts toward the cursor, plus a sparse
 * field of ambient dust. Plain three.js (no @react-three/fiber) — a
 * handful of refs and one render loop, easy to reason about and cheap.
 *
 * three.js is dynamically imported so it ships as its own chunk instead
 * of bloating the main bundle, and the particle count scales down on
 * narrow/mobile viewports to keep things lightweight there.
 *
 * Skips entirely for prefers-reduced-motion or when WebGL is unavailable,
 * and stops rendering while scrolled out of view.
 */
const HeroScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const probe = document.createElement("canvas");
    const hasWebgl = probe.getContext("webgl2") || probe.getContext("webgl");
    if (!hasWebgl) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    import("three").then((THREE) => {
      if (!cancelled) cleanup = setupScene(THREE, container);
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />;
};

function setupScene(THREE: typeof THREENS, container: HTMLDivElement) {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return;

    const style = getComputedStyle(document.documentElement);
    const toHex = (hslVar: string, fallback: string) => {
      const raw = style.getPropertyValue(hslVar).trim();
      if (!raw) return fallback;
      const [h, s, l] = raw.split(" ").map((v) => parseFloat(v));
      if ([h, s, l].some(Number.isNaN)) return fallback;
      const color = new THREE.Color();
      color.setHSL(h / 360, s / 100, l / 100);
      return `#${color.getHexString()}`;
    };
    const primary = toHex("--primary", "#3b82f6");
    const secondary = toHex("--secondary", "#38bdf8");

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 6);

    const size = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
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

    // glow sprite texture — cheap stand-in for real bloom
    const makeGlowTexture = (hex: string) => {
      const s = 256;
      const c = document.createElement("canvas");
      c.width = c.height = s;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      g.addColorStop(0, hex);
      g.addColorStop(0.4, hex);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, s, s);
      return new THREE.CanvasTexture(c);
    };

    const orbGroup = new THREE.Group();
    scene.add(orbGroup);

    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeGlowTexture(primary),
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    sprite.scale.set(2.6, 2.6, 1);
    orbGroup.add(sprite);

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 48, 48),
      new THREE.MeshBasicMaterial({ color: primary, transparent: true, opacity: 0.85 })
    );
    orbGroup.add(core);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.68, 0.005, 16, 120),
      new THREE.MeshBasicMaterial({ color: secondary, transparent: true, opacity: 0.4, depthWrite: false })
    );
    ring.rotation.x = 1.4;
    orbGroup.add(ring);

    // sparse ambient dust — fewer particles on narrow/mobile viewports
    const DUST_COUNT = window.innerWidth < 768 ? 70 : 180;
    const dustPositions = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      const radius = 4 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      dustPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      dustPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      dustPositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        color: primary,
        size: 0.026,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.3,
        depthWrite: false,
      })
    );
    scene.add(dust);

    const mouse = { x: 0, y: 0 };
    const current = new THREE.Vector2(0, 0);
    let scrollFrac = 0;
    let visible = true;
    let raf = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onScroll = () => {
      scrollFrac = Math.min(1, window.scrollY / (window.innerHeight || 1));
    };
    const onResize = () => size();

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(container);

    const clock = new THREE.Clock();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime();
      const vpWidth = viewportWidthAtZ0();

      current.lerp(new THREE.Vector2(mouse.x, mouse.y), 0.045);

      const restX = vpWidth * 0.62;
      orbGroup.position.x = restX + current.x * (vpWidth * 0.035);
      orbGroup.position.y = current.y * 0.3;

      const breathe = 1 + Math.sin(t * 0.6) * 0.035;
      orbGroup.scale.setScalar(breathe * (1 - scrollFrac * 0.4));

      ring.rotation.z = t * 0.12;
      ring.rotation.x = 1.4 + Math.sin(t * 0.3) * 0.1;
      dust.rotation.y += 0.0009;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      dustGeo.dispose();
      (dust.material as THREE.Material).dispose();
      core.geometry.dispose();
      (core.material as THREE.Material).dispose();
      ring.geometry.dispose();
      (ring.material as THREE.Material).dispose();
      (sprite.material.map as THREE.Texture)?.dispose();
      sprite.material.dispose();
      renderer.dispose();
      container.removeChild(canvas);
    };
}

export default HeroScene;
