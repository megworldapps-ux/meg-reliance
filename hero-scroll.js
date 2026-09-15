/* ==========================================================
   Hero Scroll Timeline — isolated Hero-only JavaScript
   The video never plays. Scroll position controls currentTime.
   ========================================================== */
(function () {
  'use strict';

  function initHeroScroll() {
    const wrapper = document.getElementById('heroScrollWrapper');
    const video = document.getElementById('hero-scroll-video');

    if (!wrapper || !video) return;

    let duration = 0;
    let framePending = false;
    let lastTargetTime = -1;
    let metadataReady = false;

    // Never allow normal playback. This Hero is scroll-only.
    video.autoplay = false;
    video.controls = false;
    video.muted = true;
    video.pause();

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    function getProgress() {
      const rect = wrapper.getBoundingClientRect();
      const scrollDistance = wrapper.offsetHeight - window.innerHeight;

      if (scrollDistance <= 0) return 0;

      return clamp(-rect.top / scrollDistance, 0, 1);
    }

    function updateVideoFrame() {
      framePending = false;

      if (!metadataReady || !duration || !Number.isFinite(duration)) return;

      const progress = getProgress();
      const targetTime = clamp(progress * duration, 0, Math.max(0, duration - 0.001));

      // Avoid redundant seeks while the user is not moving the page.
      if (Math.abs(targetTime - lastTargetTime) < 0.004) return;

      lastTargetTime = targetTime;

      // Scroll is the only playback control. No video.play() is ever called.
      if (Math.abs(video.currentTime - targetTime) > 0.001) {
        try {
          video.currentTime = targetTime;
        } catch (error) {
          // Some browsers can briefly reject a seek while media is preparing.
        }
      }
    }

    function requestFrameUpdate() {
      if (framePending) return;
      framePending = true;
      window.requestAnimationFrame(updateVideoFrame);
    }

    function onMetadataLoaded() {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;

      duration = video.duration;
      metadataReady = true;
      video.pause();
      video.currentTime = 0;
      lastTargetTime = 0;
      requestFrameUpdate();
    }

    if (video.readyState >= 1) {
      onMetadataLoaded();
    } else {
      video.addEventListener('loadedmetadata', onMetadataLoaded, { once: true });
    }

    window.addEventListener('scroll', requestFrameUpdate, { passive: true });
    window.addEventListener('resize', requestFrameUpdate, { passive: true });

    // If a browser attempts to resume media for any reason, immediately pause it.
    video.addEventListener('play', function () {
      video.pause();
    });

    // Keep the initial frame ready if metadata arrives after the first paint.
    video.addEventListener('loadeddata', requestFrameUpdate, { once: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroScroll, { once: true });
  } else {
    initHeroScroll();
  }
})();
