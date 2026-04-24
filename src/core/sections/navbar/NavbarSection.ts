import { BaseSection } from '../BaseSection';

export class NavbarSection extends BaseSection {
  init(): void {
    this.initMobileMenu();
    this.initThemeToggle();
  }

  private initMobileMenu(): void {
    const toggleBtn = this.element.querySelector('.navbar__toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.element.classList.toggle('navbar--menu-open');
      });
    }
  }

  private initThemeToggle(): void {
    const themeBtn = this.element.querySelector('.theme-toggle');
    if (!themeBtn) return;

    const sunIcon = themeBtn.querySelector('.theme-toggle__sun') as HTMLElement;
    const moonIcon = themeBtn.querySelector('.theme-toggle__moon') as HTMLElement;
    const htmlEl = document.documentElement;

    // Check current theme
    const updateIcons = () => {
      const isLight = htmlEl.dataset.theme === 'light';
      if (isLight) {
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
      } else {
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIcon) moonIcon.style.display = 'none';
      }
    };

    updateIcons();

    themeBtn.addEventListener('click', () => {
      const isLight = htmlEl.dataset.theme === 'light';
      const newTheme = isLight ? 'dark' : 'light';
      
      htmlEl.dataset.theme = newTheme;
      localStorage.setItem('nativa-theme', newTheme);
      updateIcons();
    });
  }
}
