/*! © 2026 حسين فرزدق النجار — معهد الفرزدق. All rights reserved. [FZ-HAN-2026] */
const VER = 'fz-v1.0.0';
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VER).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;
  const staticCdn = /(^|\.)gstatic\.com$|(^|\.)googleapis\.com$/.test(url.hostname) && !/firestore|identitytoolkit|securetoken/.test(url.hostname);
  if (!sameOrigin && !staticCdn) return;
  if (staticCdn) {            // fonts + firebase SDK: cache first
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((r) => { const c = r.clone(); caches.open(VER).then((ch) => ch.put(req, c)); return r; })));
    return;
  }
  e.respondWith(            // our own files: network first so updates arrive, cache as offline fallback
    fetch(req).then((r) => { const c = r.clone(); caches.open(VER).then((ch) => ch.put(req, c)); return r; }).catch(() => caches.match(req))
  );
});
