export abstract class BaseSection {
  constructor(protected element: HTMLElement) {}

  abstract init(): void;

  protected isInViewport(el: Element, threshold = 0): boolean {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return (
      rect.top >= -threshold * windowHeight &&
      rect.bottom <= windowHeight * (1 + threshold)
    );
  }

  protected observe(
    selector: string,
    options: IntersectionObserverInit,
    callback: (element: Element, entry: IntersectionObserverEntry) => void,
    immediate = true
  ): void {
    const elements = this.element.querySelectorAll(selector);
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target, entry);
          obs.unobserve(entry.target);
        }
      });
    }, options);

    elements.forEach(el => {
      if (immediate && this.isInViewport(el, (options.threshold as number) || 0)) {
        callback(el, null as any);
      } else {
        observer.observe(el);
      }
    });
  }

  protected observeSelf(
    options: IntersectionObserverInit,
    callback: (element: HTMLElement, entry: IntersectionObserverEntry) => void
  ): void {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(this.element, entry);
          obs.unobserve(this.element);
        }
      });
    }, options);

    observer.observe(this.element);
  }
}
