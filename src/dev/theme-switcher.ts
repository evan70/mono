import neonCssUrl from '../../packages/theme-neon/src/assets/neon.css?url';

document.addEventListener('DOMContentLoaded', () => {
  const switcher = document.getElementById('dev-theme-switcher');
  if (!switcher) return;

  let isNeon = false;
  switcher.addEventListener('click', () => {
    isNeon = !isNeon;
    if (isNeon) {
      const neonLink = document.createElement('link');
      neonLink.rel = 'stylesheet';
      neonLink.href = neonCssUrl;
      neonLink.id = 'neon-theme-stylesheet';
      document.head.appendChild(neonLink);
      switcher.classList.add('navbar__dev-toggle--active');
    } else {
      const existing = document.getElementById('neon-theme-stylesheet');
      if (existing) {
        existing.remove();
      }
      switcher.classList.remove('navbar__dev-toggle--active');
    }
  });
});
