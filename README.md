# Vanilla Cards Architecture

Welcome to the **Vanilla Cards** package for Nativa CMS. This architecture is built on pure Vanilla JS, strictly structured CSS using the **BEM methodology**, and optimized bundling via **Vite**.

Our primary goal is maximum performance (0kb framework overhead) and maintainable UI components.

---

## The Architecture & Flow

The asset pipeline is split into two main layers: **Core** and **Page-Specific Modules**. We do not bundle everything into one massive `app.js` or `style.css`. 

### 1. The Core Bundle (`core-app` & `core-css`)
The Core is the foundational layer of the design system. It is loaded globally on **every page**.

- **What it contains:**
  - **Tokens:** CSS Variables for colors, spacing, typography (`unified.css`).
  - **Components:** BEM styles that are reused everywhere (`button.css`, `vanilla-card.css`, `navbar.css`, `footer.css`).
  - **Infrastructure:** The `SectionLoader` JS class that automatically instantiates sections based on `data-section` attributes.
- **Why?** By keeping global utilities and foundational UI components in one bundle, the browser caches it once, and every subsequent page load feels instantaneous.

### 2. Page-Specific Bundles (e.g., `home.ts`)
Each individual page or logical use-case gets its own entry point folder (e.g., `src/frontend/home/`).

- **What it contains:**
  - **Styles (`home.css`):** Layout overrides or extremely specific styles that only belong to this page (e.g., a specific background image for the home hero).
  - **Logic (`home.ts`):** Page-specific JavaScript, such as an initialization script or unique third-party library that only this page needs.
- **Why?** 
  - **Performance:** We prevent "Dead CSS/JS". If a user visits the `/contact` page, they shouldn't be forced to download the CSS or JS for the `/home` page animations.
  - **Isolation:** It prevents CSS conflicts. Page specific styling cannot accidentally break global UI components.
  - **Perfectly aligns with Nativa's `AssetHelper`:** Our PHP backend dynamically injects ONLY the CSS/JS required for the current controller view using `AssetHelper::entryCssTags('home')`.

---

## The Asset Pipeline (Vite + PHP)

We use Vite strictly as an asset bundler for the PHP backend, mapping sources to hashed production files.

1. **Source Code:** You write modular TS/CSS in `packages/vanilla-cards/src/`.
2. **Vite Build (`pnpm run build`):** Vite processes, minifies, and adds cache-busting hashes to the filenames, outputting them into `dist/`.
3. **Manifest Generation:** Vite generates a `vanilla-cards-manifest.json` file. It maps source files to their new hashed names (e.g., `src/app.ts` -> `core-app.DYSIM4Cj.js`).
4. **PHP Integration (`AssetHelper`):** The Nativa CMS backend reads this manifest. When the backend asks for the `home` entry point, PHP dynamically prints the `<link>` and `<script>` tags for exactly those hashed files.

---

## BEM Methodology (Block, Element, Modifier)

We strictly use BEM to keep our CSS flat and highly performant.

- **Block:** Standalone entity (`.card`)
- **Element:** Part of a block (`.card__title`)
- **Modifier:** Flag that changes appearance (`.card--featured`)

**Best Practice Rule:** Never nest selectors deeply. Instead of `.card .title`, always use `.card__title`. Combine BEM with design tokens (`var(--brand-gold)`).

---

## SEO & Accessibility (Lighthouse Best Practices)

When writing HTML views that consume this architecture, always ensure you follow these standards to keep Lighthouse scores at 100/100:

1. **Meta Description:** Every page must include a `<meta name="description" content="...">` tag in the `<head>`.
2. **Main Landmark:** All primary page content (between the `<nav>` and `<footer>`) must be wrapped in a `<main>` tag. This is crucial for screen readers and accessibility.
3. **Valid `robots.txt`:** Ensure the `public/robots.txt` is present and valid so crawlers don't hit a 404.
4. **Preconnects:** Include `<link rel="preconnect" href="/" />` (or to your CDN) to speed up initial network requests.
5. **Preloads:** Our Vite build naturally supports `modulepreload` for JS and `preload` for critical CSS when injected via PHP's `AssetHelper::entryCssTags()`.

---

## How to Add a New Page Flow

Let's say you are building an `/about` page.

### 1. Create the Source Files
```bash
mkdir src/frontend/about
touch src/frontend/about/about.ts src/frontend/about/about.css
```

**`about.ts`**
```typescript
import './about.css';
console.log('About page initialized!');
```

### 2. Register it in `vite.config.ts`
Under `rollupOptions.input`:
```typescript
input: {
  'core-app': resolve(__dirname, 'src/app.ts'),
  'core-css': resolve(__dirname, 'src/css.ts'),
  'home': resolve(__dirname, 'src/frontend/home/home.ts'),
  'about': resolve(__dirname, 'src/frontend/about/about.ts') // <-- NEW
}
```

### 3. Build & Consume
Run `pnpm run build`. The new entry will be generated and logged in the manifest.

In your PHP View (`about.php`):
```php
<?php
// Loads global styles and functionality
echo AssetHelper::entryCssTags('core-css', 'vanilla-cards');
$coreJs = AssetHelper::js('core-app', 'vanilla-cards');

// Loads ONLY the about page specific styles and functionality
echo AssetHelper::entryCssTags('about', 'vanilla-cards');
$aboutJs = AssetHelper::js('about', 'vanilla-cards');
?>
<script type="module" src="<?= $coreJs ?>" defer></script>
<script type="module" src="<?= $aboutJs ?>" defer></script>
```

Enjoy building fast, reliable interfaces!

---

## Development Rules & CI/CD

- **Rules:** For detailed project rules, see [RULES.md](./RULES.md) or [.cursorrules](./.cursorrules).
- **Package Manager:** This project uses `pnpm`.
- **CI/CD:** GitHub Actions automatically builds the project and deploys it to GitHub Pages upon pushing to the `main` branch.

