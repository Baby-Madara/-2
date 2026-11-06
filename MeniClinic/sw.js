const CACHE_NAME = 'meniclinic-pwa-v2';
const PRECACHE_URLS = [
  '/MeniClinic/',
  '/MeniClinic/login/',
  '/MeniClinic/index.html',
  '/MeniClinic/manifest.json',
  '/MeniClinic/icons/icon-192.png',
  '/MeniClinic/icons/icon-512.png',
  '/MeniClinic/icons/icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('PWA Precache failed for some URLs:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name.startsWith('meniclinic-'))
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Bypass service worker for non-GET requests or APIs/Firebase
  if (
    event.request.method !== 'GET' ||
    url.pathname.startsWith('/api') ||
    url.hostname.includes('firebaseio.com') ||
    url.hostname.includes('googleapis.com')
  ) {
    return;
  }

  // Stale-While-Revalidate or Network-first strategy for navigation and assets
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
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.mode === 'navigate') {
            return caches.match('/MeniClinic/index.html') || caches.match('/MeniClinic/');
          }
          return new Response('Network error and not found in offline cache', { status: 503 });
        });
      })
  );
});
