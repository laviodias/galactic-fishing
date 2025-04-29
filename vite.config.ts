import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      includeAssets: ['rocket.svg'],
      manifest: {
        name: 'Galactic Fishing Stats',
        short_name: 'GFS',
        description: 'A website that shows statistics for the game Galactic Fishing',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api-game\.bloque\.app\/game\/(market|leaderboard)/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'game-api-cache',
              expiration: {
                maxAgeSeconds: 60 * 5,
                maxEntries: 50,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    })
  ],
});
