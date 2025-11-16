const CACHE_NAME = 'jpt-cache-v1';
const APP_SHELL = [
  '/JPtraining/index.html',  // home page
  '/JPtraining/about_me.html',
  '/JPtraining/contact_me.html',
  '/JPTraining/gallery.html',
  '/JPTraining/about_me.html',
  '/JPTraining/about_jpt.html',
  '/JPtraining/recovery_and_rehability.html',
  '/JPTraining/static/css/base.css',
  '/JPTraining/static/js/base.js',
  '/JPTraining/static/site.webmanifest',
  '/JPTraining/images/jptraining_logo.png',
  '/JPTraining/images/favicon-192x192.png',
  '/JPTraining/images/favicon-512x512.png',
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
