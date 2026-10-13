const CACHE_NAME = 'quiz-app-v48';
const APP_SHELL = [
  './',
  './index.html',
  './css/style.css',
  './js/bundle.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // ponytail: cache-first app shell; bump CACHE_NAME when deployed assets change.
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      // ?exam=...&subject=... のようなクエリ付きURL(クイズへの直リンク)でも、キャッシュ済みのindex.htmlを使えるようにする。
      return cache.match(event.request, { ignoreSearch: true }).then((cached) => {
        if (cached) return cached;

        return fetch(event.request).then((response) => {
          if (!response.ok || response.type !== 'basic') return response;
          const copy = response.clone();
          cache.put(event.request, copy);
          return response;
        });
      });
    }),
  );
});
