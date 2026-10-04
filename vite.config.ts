import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type HtmlTagDescriptor, type Plugin } from 'vite';

/**
 * Static hosts (GitHub Pages, Netlify, Vercel) serve /404.html for unknown paths.
 * Copying index.html there lets deep links such as /projects/sems load the app
 * instead of showing a host-level "Not found" page.
 */
function spaFallback(): Plugin {
  let outDir = 'dist';
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const index = resolve(outDir, 'index.html');
      if (existsSync(index)) copyFileSync(index, resolve(outDir, '404.html'));
    },
  };
}

/**
 * Adds the canonical link and Open Graph / Twitter image URLs. Link previews need absolute URLs,
 * so set VITE_SITE_URL (e.g. https://your-name.github.io) in .env before you deploy.
 */
function siteMeta(siteUrl: string, base: string): Plugin {
  return {
    name: 'site-meta',
    transformIndexHtml() {
      const origin = siteUrl.replace(/\/+$/, '');
      const pageUrl = `${origin}${base}`;
      const image = `${pageUrl}og-image.png`;
      const tags: HtmlTagDescriptor[] = [
        { tag: 'meta', attrs: { property: 'og:image', content: image }, injectTo: 'head' },
        { tag: 'meta', attrs: { name: 'twitter:image', content: image }, injectTo: 'head' },
      ];
      if (origin) {
        tags.push(
          { tag: 'link', attrs: { rel: 'canonical', href: pageUrl }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: pageUrl }, injectTo: 'head' },
        );
      }
      return tags;
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  // Replace the dynamic base calculation with your exact repo name
  const base = '/Portfolio/';

  return {
    base,
    plugins: [react(), tailwindcss(), siteMeta(env.VITE_SITE_URL ?? '', base), spaFallback()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
  };
});
