import './css.ts';
import { SectionLoader } from './core/sections/SectionLoader.ts';
import { NotificationManager } from './core/components/NotificationManager.ts';

// Expose to window for legacy support and easy access
(window as any).NotificationManager = NotificationManager;

document.addEventListener('DOMContentLoaded', () => {
  SectionLoader.loadSections();
});
