import './css.ts';
import { SectionLoader } from './core/sections/SectionLoader.ts';
import { NotificationManager } from './core/components/NotificationManager.ts';

// Expose to window for legacy support and easy access
(window as any).NotificationManager = NotificationManager;

document.addEventListener('DOMContentLoaded', () => {
  SectionLoader.loadSections();
  checkCookieConsent();
});

function checkCookieConsent(): void {
  try {
    const consent = localStorage.getItem('nativa-cookie-consent');
    if (!consent) {
      NotificationManager.show({
        title: 'Cookie Consent',
        message: 'We use cookies to improve your experience on our site.',
        type: 'info',
        duration: 0,
        actions: [
          {
            label: 'Accept',
            primary: true,
            callback: () => {
              try {
                localStorage.setItem('nativa-cookie-consent', 'true');
              } catch (e) {
                console.error('Failed to set cookie consent in localStorage', e);
              }
            }
          }
        ]
      });
    }
  } catch (e) {
    console.error('Failed to check cookie consent in localStorage', e);
  }
}
