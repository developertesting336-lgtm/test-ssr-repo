import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { fallbackHomepageData } from './src/data/fallbackData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.on('uncaughtException', (err) => {
  console.error('[Server Uncaught Exception]:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('[Server Unhandled Rejection]:', reason);
});
process.on('exit', (code) => {
  console.log(`[Server Process Exit] code: ${code}`);
});

async function createServer() {
  const app = express();

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { 
      middlewareMode: true,
      watch: {
        usePolling: false
      }
    },
    appType: 'custom'
  });

  // Use vite's connect instance as middleware (handles static assets, HMR, etc.)
  app.use(vite.middlewares);

  // In-memory cache for API data during SSR
  let cachedApiData = null;
  let lastFetchTime = 0;

  async function getHomepageData() {
    const now = Date.now();
    if (cachedApiData && (now - lastFetchTime < 60000)) {
      return cachedApiData;
    }

    try {
      const res = await fetch('https://backend-one-rho-24.vercel.app/api/homepage', {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(4000)
      });
      if (res.ok) {
        const json = await res.json();
        if (json?.success && json?.data) {
          cachedApiData = json.data;
          lastFetchTime = now;
          return cachedApiData;
        }
      }
    } catch (err) {
      console.warn('[SSR] Live API fetch failed/timed out, using local fallback:', err.message);
    }

    return fallbackHomepageData.data;
  }

  // Catch-all route handler for SSR
  app.use(async (req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return next();
    }

    const url = req.originalUrl;

    // Ignore assets with file extensions (e.g. .ico, .svg, .js, .css)
    if (url.includes('.') && !url.endsWith('.html')) {
      return next();
    }

    try {
      // 1. Read index.html template
      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8'
      );

      // 2. Apply Vite HTML transforms
      template = await vite.transformIndexHtml(url, template);

      // 3. Load the server entry
      const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');

      // 4. Fetch initial data for SSR
      const initialData = await getHomepageData();

      // 5. Render the app HTML
      const { html: appHtml } = render(url, initialData);

      // 6. Inject the app-rendered HTML and serialized data script into template
      const dataScript = `<script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData)};</script>`;
      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(`<!--ssr-data-->`, dataScript);

      if (req.method === 'HEAD') {
        return res.status(200).set({ 'Content-Type': 'text/html' }).end();
      }

      // 7. Send the rendered HTML back
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.error('[SSR Render Error]:', e);
      next(e);
    }
  });

  const PORT = process.env.PORT || 5173;
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ SSR Server running at http://localhost:${PORT}`);
  });

  // Keep process alive
  setInterval(() => {}, 1 << 30);

  return { app, server, vite };
}

createServer().catch((err) => {
  console.error('[Server Init Error]:', err);
});
