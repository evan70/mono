import './css';
import './frontend/home/home';
import { SectionLoader } from './core/sections/SectionLoader';

document.addEventListener('DOMContentLoaded', () => {
  SectionLoader.loadSections();
});
