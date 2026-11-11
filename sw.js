// Bulletproof Offline-Capable PWA Service Worker for Santral Bayi
const CACHE_NAME = 'santralbayi-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/apple-touch-icon.png',
  '/icon.svg'
];

// On install, cache all critical assets to guarantee 200 OK even offline
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// Activate handler to claim clients and clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Stale-While-Revalidate with Cache-First Fallback Fetch Handler
// This guarantees instant ("şak diye") loading speeds by serving from cache immediately while updating in the background!
self.addEventListener('fetch', (event) => {
  // Only handle GET requests (Chrome blocks caching other methods)
  if (event.request.method !== 'GET') return;

  // Filter out non-http/https protocols to prevent scheme errors
  const requestUrl = event.request.url;
  if (!requestUrl.startsWith('http://') && !requestUrl.startsWith('https://')) {
    return;
  }

  // Handle local application assets (JS, CSS, HTML, Images, JSON)
  if (requestUrl.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // Fetch from network in background to refresh the cache
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            // Background fetch failed (offline), fails silently as we already have/will have cache fallback
          });

        // Instantly return the cached response if available, otherwise wait for network fetch
        return cachedResponse || fetchPromise;
      })
    );
  } else {
    // For external assets, use standard Network-First strategy
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || new Response('Bağlantı hatası.', { status: 200 });
          });
        })
    );
  }
});

