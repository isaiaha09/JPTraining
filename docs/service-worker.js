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
  '/JPTraining/static/images/favicon-512x512.png',

  '/JPTraining/static/videos/jptraining_video1.mp4',
  '/JPTraining/static/videos/jptraining_video2.mp4',
  '/JPTraining/static/videos/jptraining_video3.mp4',
  '/JPTraining/static/videos/jptraining_video4.mp4',
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

  // Cache everything under /JPTraining/static/
  if (reqUrl.pathname.startsWith('/JPTraining/static/')) {
    event.respondWith(
      caches.match(event.request).then(cacheRes => {
        if (cacheRes) return cacheRes;

        return fetch(event.request).then(fetchRes => {
          // Clone the response BEFORE it's used anywhere
          const resClone = fetchRes.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, resClone);
          });

          return fetchRes;
        });
      })
    );
  } else {
    // Default network-last strategy
    event.respondWith(
      caches.match(event.request).then(cacheRes => cacheRes || fetch(event.request))
    );
  }
});