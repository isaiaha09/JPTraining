const CACHE_NAME = 'jpt-cache-v1';

const APP_SHELL = [
  '/JPTraining/index.html',
  '/JPTraining/about_me.html',
  '/JPTraining/contact_me.html',
  '/JPTraining/gallery.html',
  '/JPTraining/about_jpt.html',
  '/JPTraining/recovery_and_rehability.html',

  '/JPTraining/static/css/base.css',
  '/JPTraining/static/js/base.js',
  '/JPTraining/static/site.webmanifest.json',

  '/JPTraining/static/images/jptraining_logo.png',
  '/JPTraining/static/images/favicon-192x192.png',
  '/JPTraining/static/images/favicon-512x512.png'
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

  // Cache all assets under /JPTraining/static/
  if (reqUrl.pathname.startsWith('/JPTraining/static/')) {
    event.respondWith(
      caches.match(event.request).then(cacheRes => {
        return cacheRes || fetch(event.request).then(fetchRes => {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, fetchRes.clone()));
          return fetchRes;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(cacheRes => cacheRes || fetch(event.request))
    );
  }
});
