const CACHE_NAME = 'smart-cilik-v1';
const assetsToCache = [
  './',
  './index.html',
  './manifest.json',
  './html5-qrcode.min.js',
  './JsBarcode.all.min.js',
  './peerjs.min.js',
  './qrcode.min.js',
  './gula.png',
  './susu-pekat.png',
  './susu-segar.png',
  './kicap.png',
  './sos-cili.png',
  './teh.png',
  './jus-epal.png',
  './sardin.png',
  './kupon1.png',
  './kupon2.png',
  './wang-rm1.png',
  './wang-rm5.png',
  './wang-rm10.png',
  './pop-up-sound.mp3'
];

// Semasa pemasangan, simpan semua fail penting dalam cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Semua fail telah disimpan dalam cache offline!');
      return cache.addAll(assetsToCache);
    })
  );
  self.skipWaiting();
});

// Aktifkan Service Worker
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
    })
  );
  self.clients.claim();
});

// Ambil fail dari cache jika offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});