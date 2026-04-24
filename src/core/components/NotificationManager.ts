export type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationOptions {
  title?: string;
  message: string;
  type?: NotificationType;
  duration?: number;
}

export class NotificationManager {
  private static container: HTMLElement | null = null;

  private static getContainer(): HTMLElement {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'notification-container';
      document.body.appendChild(this.container);
    }
    return this.container;
  }

  static show(options: NotificationOptions): void {
    const { title, message, type = 'info', duration = 5000 } = options;
    const container = this.getContainer();

    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    // Add accessibility attributes
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');

    const icon = this.getIcon(type);
    
    notification.innerHTML = `
      <div class="notification__icon">${icon}</div>
      <div class="notification__content">
        ${title ? `<h4 class="notification__title">${title}</h4>` : ''}
        <p class="notification__message">${message}</p>
      </div>
      <button class="notification__close" aria-label="Close notification">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;

    container.appendChild(notification);

    // Trigger reflow for animation
    notification.offsetHeight;
    notification.classList.add('notification--visible');

    const closeBtn = notification.querySelector('.notification__close');
    closeBtn?.addEventListener('click', () => this.hide(notification));

    if (duration > 0) {
      setTimeout(() => {
        this.hide(notification);
      }, duration);
    }
  }

  private static hide(notification: HTMLElement): void {
    notification.classList.remove('notification--visible');
    notification.addEventListener('transitionend', () => {
      notification.remove();
      if (this.container && this.container.childElementCount === 0) {
        this.container.remove();
        this.container = null;
      }
    }, { once: true });
  }

  private static getIcon(type: NotificationType): string {
    switch (type) {
      case 'success':
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-emerald)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
      case 'error':
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-ruby)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
      case 'warning':
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
      case 'info':
      default:
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-sapphire)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }
  }
}
