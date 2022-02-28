/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-0aaf20e';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./odysseia_001.html","./odysseia_002.html","./odysseia_003.html","./odysseia_004.html","./odysseia_005.html","./odysseia_006.html","./odysseia_007.html","./odysseia_008.html","./odysseia_009.html","./odysseia_010.html","./odysseia_011.html","./odysseia_012.html","./odysseia_013.html","./odysseia_014.html","./odysseia_016.html","./odysseia_015.html","./odysseia_017.html","./odysseia_018.html","./odysseia_019.html","./odysseia_020.html","./odysseia_021.html","./odysseia_022.html","./odysseia_023.html","./odysseia_024.html","./odysseia_025.html","./odysseia_026.html","./odysseia_027.html","./odysseia_028.html","./odysseia_029.html","./odysseia_030.html","./odysseia_031.html","./odysseia_032.html","./odysseia_033.html","./odysseia_034.html","./odysseia_035.html","./odysseia_036.html","./odysseia_037.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.jpg","./resources/image003.png","./resources/obalka.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
