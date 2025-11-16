const CACHE_NAME = 'jpt-cache-v1';
const APP_SHELL = [
  '/',  // home page
  '/about_me',
  '/contact_me',
  '/gallery',
  '/about_me',
  '/about_jpt',
  '/recovery_and_rehability',
  '/static/css/base.css',
  '/static/js/base.js',
  '/static/site.webmanifest',
  '/static/images/jptraining_logo.png',
  '/static/images/favicon-192.png',
  '/static/images/favicon-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      const promises = APP_SHELL.map(url => 
        cache.add(url).catch(err => console.warn('Failed to cache', url, err))
      );
      return Promise.all(promises);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const reqUrl = new URL(event.request.url);

  // Dynamically cache everything under /static/ (CSS, JS, images, videos)
  if (reqUrl.pathname.startsWith('/static/')) {
    event.respondWith(
      caches.match(event.request).then(cacheRes => {
        return cacheRes || fetch(event.request).then(fetchRes => {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, fetchRes.clone()));
          return fetchRes;
        });
      })
    );
  } else {
    // fallback for other requests
    event.respondWith(
      caches.match(event.request).then(cacheRes => cacheRes || fetch(event.request))
    );
  }
});
