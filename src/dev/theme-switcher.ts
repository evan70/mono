import neonCssUrl from '@nativa/theme-neon/src/assets/neon.css?url';

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
      switcher.textContent = 'Default Mode';
      switcher.classList.remove('btn--outline');
    } else {
      const existing = document.getElementById('neon-theme-stylesheet');
      if (existing) {
        existing.remove();
      }
      switcher.textContent = 'Neon Mode';
      switcher.classList.add('btn--outline');
    }
  });
});
