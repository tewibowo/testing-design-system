import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Relative base so the same build works at any hosting path
  // (GitHub Pages subpath, Vercel root, PR previews…).
  base: "./",
  // Stamped into the debug HUD so a device screenshot proves which build
  // the service worker is actually serving.
  define: {
    __BUILD_ID__: JSON.stringify(new Date().toISOString().slice(0, 16).replace("T", " ") + "Z")
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(here, "index.html"),
        v2: path.resolve(here, "v2/index.html")
      }
    }
  },
  plugins: [
    react(),
    {
      // The PWA plugin injects root-relative links (./registerSW.js,
      // ./manifest.webmanifest) into every emitted page; from the nested
      // /v2/ page those resolve to /v2/* paths that don't exist. It writes
      // them during bundle emission, so patch the file after the build.
      name: "v2-nested-page-fixups",
      apply: "build",
      enforce: "post",
      closeBundle() {
        const file = path.resolve(here, "dist/v2/index.html");
        if (!fs.existsSync(file)) return;
        // Inline the SW registration: register() resolves relative to the
        // PAGE url, so the shared root sw.js must be addressed as ../sw.js
        // from /v2/ (scope ../ is legal — the worker file lives there).
        const inlineReg =
          "<script>if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('../sw.js',{scope:'../'})})}</script>";
        const html = fs
          .readFileSync(file, "utf8")
          .replace(/<script id="vite-plugin-pwa:register-sw"[^>]*><\/script>/, inlineReg)
          .replace(/<link rel="manifest" href="\.\/manifest\.webmanifest"\s*\/?>/, "");
        fs.writeFileSync(file, html);
      }
    },
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icons/apple-touch-icon.png"],
      manifest: {
        name: "StraitsX",
        short_name: "StraitsX",
        description: "StraitsX mobile prototype — payments infrastructure for digital assets.",
        theme_color: "#002B2A",
        background_color: "#002B2A",
        display: "standalone",
        orientation: "portrait",
        start_url: "./",
        scope: "./",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ttf,woff2}"],
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        // Icon + mono fonts come from Google Fonts; cache them on first
        // online load so the installed PWA keeps working offline.
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: { cacheName: "google-fonts-css", expiration: { maxEntries: 8 } }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-files",
              expiration: { maxEntries: 16, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@ds": path.resolve(here, "../src"),
      "@app": path.resolve(here, "src"),
      // DS sources live outside app/, so point their react imports at
      // the app's copy (repo root has no node_modules).
      react: path.resolve(here, "node_modules/react"),
      "react-dom": path.resolve(here, "node_modules/react-dom")
    },
    dedupe: ["react", "react-dom"]
  }
});
