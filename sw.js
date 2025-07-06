const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  '.',
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png',
];

// نصب Service Worker و کش فایل‌ها
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// فعال شدن Service Worker و حذف کش‌های قدیمی
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
});

// پاسخ به درخواست‌ها از کش یا شبکه
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
