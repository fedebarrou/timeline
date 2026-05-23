/**
 * Cross-browser wrapper for the Fullscreen API.
 * iOS Safari does not implement requestFullscreen on <html>; in that case
 * we fall back to false and the caller can rely on the body.map-fullscreen
 * CSS overlay alone (and optionally show an "rotate phone" hint).
 */
export async function enterFullscreen(): Promise<boolean> {
  const root = document.documentElement as any;
  try {
    if (typeof root.requestFullscreen === 'function') {
      await root.requestFullscreen();
      return true;
    }
    if (typeof root.webkitRequestFullscreen === 'function') {
      await root.webkitRequestFullscreen();
      return true;
    }
  } catch {
    /* permission denied / not allowed in current context */
  }
  return false;
}

export async function exitFullscreen(): Promise<void> {
  const d = document as any;
  try {
    if (typeof d.exitFullscreen === 'function') await d.exitFullscreen();
    else if (typeof d.webkitExitFullscreen === 'function') d.webkitExitFullscreen();
  } catch {
    /* not in fullscreen — ignore */
  }
}

export function isFullscreenActive(): boolean {
  const d = document as any;
  return !!(d.fullscreenElement || d.webkitFullscreenElement);
}

export function onFullscreenChange(cb: (active: boolean) => void): () => void {
  const handler = () => cb(isFullscreenActive());
  document.addEventListener('fullscreenchange', handler);
  document.addEventListener('webkitfullscreenchange', handler);
  return () => {
    document.removeEventListener('fullscreenchange', handler);
    document.removeEventListener('webkitfullscreenchange', handler);
  };
}
