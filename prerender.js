import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function prerender() {
  console.log('🚀 Pre-rendering static HTML for Vercel deployment...');

  // 1. Fetch homepage API data
  let homepageData = null;
  try {
    const res = await fetch('https://backend-one-rho-24.vercel.app/api/homepage', {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(6000)
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.success && json?.data) {
        homepageData = json.data;
        console.log('✅ Fetched live data from API for pre-rendering.');
      }
    }
  } catch (err) {
    console.warn('⚠️ API fetch failed or timed out during build, using fallback:', err.message);
  }

  if (!homepageData) {
    const fallbackModule = await import(pathToFileURL(path.resolve(__dirname, 'src/data/fallbackData.js')).href);
    homepageData = fallbackModule.fallbackHomepageData.data;
  }

  // 2. Read client index.html template
  const templatePath = path.resolve(__dirname, 'dist/index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html not found. Run "vite build" first.');
  }
  const template = fs.readFileSync(templatePath, 'utf-8');

  // 3. Import the SSR server bundle
  const serverEntryPath = pathToFileURL(path.resolve(__dirname, 'dist/server/entry-server.js')).href;
  const { render } = await import(serverEntryPath);

  // 4. Routes to pre-render
  const routes = [
    { url: '/', file: 'dist/index.html' },
    { url: '/login', file: 'dist/login/index.html', altFile: 'dist/login.html' },
    { url: '/signup', file: 'dist/signup/index.html', altFile: 'dist/signup.html' },
  ];

  for (const route of routes) {
    const { html: appHtml } = render(route.url, homepageData);
    const dataScript = `<script>window.__INITIAL_DATA__ = ${JSON.stringify(homepageData)};</script>`;
    const renderedHtml = template
      .replace('<!--ssr-outlet-->', appHtml)
      .replace('<!--ssr-data-->', dataScript);

    const targetFile = path.resolve(__dirname, route.file);
    const targetDir = path.dirname(targetFile);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.writeFileSync(targetFile, renderedHtml, 'utf-8');
    console.log(`  ✓ Pre-rendered ${route.url} -> ${route.file} (${renderedHtml.length} bytes)`);

    if (route.altFile) {
      fs.writeFileSync(path.resolve(__dirname, route.altFile), renderedHtml, 'utf-8');
    }
  }

  console.log('✨ All pages successfully pre-rendered with full HTML source code!');
}

prerender().catch((err) => {
  console.error('❌ Pre-rendering failed:', err);
  process.exit(1);
});
