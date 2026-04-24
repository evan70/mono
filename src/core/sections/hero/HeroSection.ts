import './hero.css';
import { BaseSection } from '../BaseSection';

export class HeroSection extends BaseSection {
  init(): void {
    this.initTitleReveal();
    this.initDescriptionFade();
  }

  private initTitleReveal(): void {
    const title = this.element.querySelector('.hero-section__title') as HTMLElement;
    if (!title) return;

    if (this.isInViewport(title, 0.1)) {
      title.style.opacity = '1';
      title.style.transform = 'translateY(0)';
      return;
    }

    title.style.opacity = '0';
    title.style.transform = 'translateY(30px)';
    title.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s';

    this.observe('.hero-section__title', { threshold: 0.3 }, (el) => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'translateY(0)';
    });
  }

  private initDescriptionFade(): void {
    const desc = this.element.querySelector('.hero-section__description') as HTMLElement;
    if (!desc) return;

    if (this.isInViewport(desc, 0.1)) {
      desc.style.opacity = '0.9';
      desc.style.transform = 'translateY(0)';
      return;
    }

    desc.style.opacity = '0';
    desc.style.transform = 'translateY(20px)';
    desc.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.8s 0.2s';

    this.observe('.hero-section__description', { threshold: 0.3 }, (el) => {
      (el as HTMLElement).style.opacity = '0.9';
      (el as HTMLElement).style.transform = 'translateY(0)';
    });
  }
}
