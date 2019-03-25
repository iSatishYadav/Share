const CACHE_NAME = "cache-v2";
const ASSET_TO_CACHE = [
    "/index.html",
    "/scripts/qrcode.min.js",
    "/images/icons/icon-72x72.png",
    "/images/icons/icon-96x96.png",
    "/images/icons/icon-128x128.png",
    "/images/icons/icon-144x144.png",
    "/images/icons/icon-152x152.png",
    "/images/icons/icon-192x192.png",
    "/images/icons/icon-384x384.png",
    "/images/icons/icon-512x512.png"
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function (cache) {
                console.log('SW - Initializing cache.');
                return cache.addAll(ASSET_TO_CACHE);
            })
            .catch(console.error));
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function (response) {
                if (response){
                    console.log('SW - Serving from cache.');
                    return response;
                }
                console.log('SW - Cache miss.');
                return fetch(event.request)
            })
    );
});