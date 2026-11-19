/* Mesori effects. No dependencies.
   Everything here is progressive: without JS the glass and neon styles still
   render. The tilt light exists only on iPhone, and only after the visitor
   taps the button, because iOS requires that tap for motion permission. */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Looping animations run only while their element is on screen (saves battery).
  const live = document.querySelectorAll('.neon-zone, .neon-cta');
  if (live.length) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => entry.target.classList.toggle('is-live', entry.isIntersecting));
      });
      live.forEach((el) => io.observe(el));
    } else {
      live.forEach((el) => el.classList.add('is-live'));
    }
  }

  // iPhone only. iPadOS reports itself as a Mac, so the check stays strict.
  if (!/iPhone/.test(navigator.userAgent)) return;

  const btn = document.querySelector('[data-tilt-toggle]');
  const stage = document.querySelector('[data-tilt-stage]');
  if (!btn || !stage || reduceMotion || !('DeviceOrientationEvent' in window)) return;
  btn.hidden = false;

  const startLabel = btn.textContent.trim();
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  let active = false;
  let targetX = 50;
  let targetY = 45;
  let x = 50;
  let y = 45;
  let frame = 0;

  // Ease toward the target each frame, and stop once the light has settled.
  const tick = () => {
    x += (targetX - x) * 0.12;
    y += (targetY - y) * 0.12;
    stage.style.setProperty('--tilt-x', x.toFixed(2) + '%');
    stage.style.setProperty('--tilt-y', y.toFixed(2) + '%');
    const moving = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.1;
    frame = moving ? requestAnimationFrame(tick) : 0;
  };

  const onOrientation = (event) => {
    if (event.gamma == null || event.beta == null) return;
    // gamma = left/right tilt, beta = front/back tilt.
    // About 45 degrees is a comfortable reading angle, so it is the neutral point.
    targetX = clamp(50 + event.gamma * 1.2, 0, 100);
    targetY = clamp(45 + (event.beta - 45) * 1.2, 0, 100);
    if (!frame) frame = requestAnimationFrame(tick);
  };

  const listen = () => window.addEventListener('deviceorientation', onOrientation, { passive: true });
  const unlisten = () => window.removeEventListener('deviceorientation', onOrientation);

  const start = () => {
    listen();
    active = true;
    btn.textContent = btn.dataset.stop;
  };
  const stop = () => {
    unlisten();
    cancelAnimationFrame(frame);
    frame = 0;
    stage.style.removeProperty('--tilt-x');
    stage.style.removeProperty('--tilt-y');
    targetX = x = 50;
    targetY = y = 45;
    active = false;
    btn.textContent = startLabel;
  };

  // One tap turns it on, the next tap turns it off.
  btn.addEventListener('click', async () => {
    if (active) {
      stop();
      return;
    }
    try {
      // iOS 13+ asks for permission. The call must run directly inside the tap.
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const result = await DeviceOrientationEvent.requestPermission();
        if (result !== 'granted') throw new Error('motion permission denied');
      }
      start();
    } catch (err) {
      btn.textContent = btn.dataset.denied;
      btn.disabled = true;
    }
  });

  // Stop listening while the tab is hidden (battery), and resume when it is back.
  document.addEventListener('visibilitychange', () => {
    if (!active) return;
    if (document.hidden) unlisten();
    else listen();
  });
})();
