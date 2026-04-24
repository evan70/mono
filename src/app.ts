import './css.ts';
import { SectionLoader } from './core/sections/SectionLoader.ts';

document.addEventListener('DOMContentLoaded', () => {
  SectionLoader.loadSections();
});
