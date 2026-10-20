/*! © 2026 HUSSEIN MHMOOD — معهد الفرزدق. All rights reserved. [FZ-HM-2026] */
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

/* ───────── push notifications (optional Cloud Functions) ───────── */
self.addEventListener('push', (e) => {
  let p = {};
  try { p = e.data.json(); } catch { try { p = { body: e.data.text() }; } catch { /* empty */ } }
  const d = p.data || p.notification || p;
  e.waitUntil((async () => {
    const wins = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    if (wins.some((c) => c.visibilityState === 'visible')) return;      // the app is open: it alerts by itself
    await self.registration.showNotification(d.title || 'مساعد الفرزدق', {
      body: d.body || '', icon: 'icon-192.png', badge: 'icon-192.png', dir: 'rtl', lang: 'ar',
      tag: d.tag || undefined, renotify: !!d.tag, data: { url: d.url || './' },
    });
  })());
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || './', self.registration.scope).href;
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then((cs) => {
    for (const c of cs) if (c.url.startsWith(self.registration.scope) && 'focus' in c) return c.focus();
    return clients.openWindow(url);
  }));
});
