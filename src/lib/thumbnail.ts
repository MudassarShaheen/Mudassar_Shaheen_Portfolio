/**
 * Resolves a real thumbnail image for a video — an actual frame from that
 * exact video rather than a generic placeholder.
 *
 * Thumbnails are pre-fetched from the video's own host (YouTube / Google
 * Drive) and committed under `public/thumbs/<videoId>.jpg`, so the page
 * serves them from its own origin. That matters: Google Drive rate-limits
 * (HTTP 429) hotlinked thumbnail requests once a page asks for a dozen of
 * them at once, which left some tiles blank. Serving locally also means no
 * third-party round-trip on every page view.
 *
 * To refresh them after adding/changing a video, re-run:
 *   npm run thumbs
 */
export const getVideoThumbnail = (videoUrl: string): string | null => {
  const yt = videoUrl.match(/youtube\.com\/embed\/([^?&/]+)/);
  if (yt) return `/thumbs/${yt[1]}.jpg`;

  const drive = videoUrl.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (drive) return `/thumbs/${drive[1]}.jpg`;

  return null;
};
