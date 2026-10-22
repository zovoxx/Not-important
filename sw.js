// Neon Surge service worker: lets the game open without a connection once it has been loaded.
// The page itself is network-first (you always get the newest version when online);
// icons and the manifest are cache-first. Offline, everything comes from the cache.
const CACHE = 'neon-surge-v4';
const ASSETS = ['./', 'index.html', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const isPage = req.mode === 'navigate' || /\/(index\.html)?$/.test(new URL(req.url).pathname);
  e.respondWith(
    caches.open(CACHE).then((cache) => {
      if (isPage) {
        return fetch(req, { cache: 'no-store' })
          .then((res) => { if (res.ok) cache.put('index.html', res.clone()); return res; })
          .catch(() => cache.match('index.html').then((hit) => hit || cache.match('./')));
      }
      return cache.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).then((res) => {
        if (res.ok) cache.put(req, res.clone());
        return res;
      }));
    })
  );
});
