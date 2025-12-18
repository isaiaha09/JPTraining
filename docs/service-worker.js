const CACHE_NAME = 'jpt-cache-v1';

const APP_SHELL = [
  '/',
  '/about_me/',
  '/contact_me/',
  '/gallery/',
  '/about_jpt/',
  '/recovery_and_rehability/',

  '/static/css/base.css',
  '/static/js/base.js',
  '/static/site.webmanifest.json',

  '/static/images/jptraining_logo.png',
  '/static/images/favicon-192x192.png',
  '/static/images/favicon-512x512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        APP_SHELL.map(url =>
          cache.add(url).catch(err => console.warn('Failed to cache', url, err))
        )
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const reqUrl = new URL(event.request.url);

  // Skip caching for .mp4 files
  if (reqUrl.pathname.endsWith('.mp4')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // For other static assets
  if (reqUrl.pathname.startsWith('/JPTraining/static/')) {
    event.respondWith(
      caches.match(event.request).then(cacheRes => {
        if (cacheRes) return cacheRes;

        return fetch(event.request).then(fetchRes => {
          // Clone once, right away
          const resClone = fetchRes.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, resClone).catch(err => {
              console.warn('Failed to cache', event.request.url, err);
            });
          });
          return fetchRes; // return the original
        });
      })
    );
  } else {
    // For HTML pages or other requests
    event.respondWith(
      caches.match(event.request).then(cacheRes => cacheRes || fetch(event.request))
    );
  }
});
