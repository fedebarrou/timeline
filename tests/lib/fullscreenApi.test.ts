import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('fullscreenApi', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    (document as any).fullscreenElement = null;
    (document as any).webkitFullscreenElement = null;
  });

  it('enterFullscreen calls requestFullscreen on documentElement', async () => {
    const spy = vi.fn().mockResolvedValue(undefined);
    (document.documentElement as any).requestFullscreen = spy;
    const { enterFullscreen } = await import('../../src/lib/fullscreenApi');
    const ok = await enterFullscreen();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(ok).toBe(true);
  });

  it('enterFullscreen falls back to webkitRequestFullscreen', async () => {
    delete (document.documentElement as any).requestFullscreen;
    const spy = vi.fn().mockResolvedValue(undefined);
    (document.documentElement as any).webkitRequestFullscreen = spy;
    const { enterFullscreen } = await import('../../src/lib/fullscreenApi');
    const ok = await enterFullscreen();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(ok).toBe(true);
  });

  it('enterFullscreen returns false when no API available', async () => {
    delete (document.documentElement as any).requestFullscreen;
    delete (document.documentElement as any).webkitRequestFullscreen;
    const { enterFullscreen } = await import('../../src/lib/fullscreenApi');
    const ok = await enterFullscreen();
    expect(ok).toBe(false);
  });

  it('onFullscreenChange fires with active=true when fullscreenElement is set', async () => {
    const cb = vi.fn();
    const { onFullscreenChange } = await import('../../src/lib/fullscreenApi');
    const off = onFullscreenChange(cb);
    (document as any).fullscreenElement = document.documentElement;
    document.dispatchEvent(new Event('fullscreenchange'));
    expect(cb).toHaveBeenCalledWith(true);
    off();
  });

  it('onFullscreenChange returns disposer that detaches listener', async () => {
    const cb = vi.fn();
    const { onFullscreenChange } = await import('../../src/lib/fullscreenApi');
    const off = onFullscreenChange(cb);
    off();
    document.dispatchEvent(new Event('fullscreenchange'));
    expect(cb).not.toHaveBeenCalled();
  });
});
