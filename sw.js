const CACHE_NAME = 'cuneiform-archive-v1';
// هنا نضع أسماء الملفات التي نريد خزنها أوفلاين
const urlsToCache = [
    './',
    './index.html',
    './OldBabylonian.ttf',
    './Assyria.ttf',
    './manifest.json',
    './icon.png'
];

// 1. عند تثبيت التطبيق، قم بتحميل الملفات وتخزينها
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// 2. عند فتح التطبيق (حتى لو لم يوجد إنترنت)، اعرض الملفات المخزنة
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // إذا وجد الملف في الكاش يعرضه، وإلا يحاول جلبه من النت
                return response || fetch(event.request);
            })
    );
});