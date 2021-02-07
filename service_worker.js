var CACHE_NAME = 'cache-2021-02-07';

self.addEventListener('install', function (ev) {
	// Add vital files to cache.
	ev.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll([
				'/',
				'/index.html',
				'/css/reveal.css',
				'/css/theme/black.css',
				'/images/favicon/favicon.ico',
				'/images/favicon/favicon256.png',
				'/images/favicon/favicon256_maskable.png',
				'/js/reveal.js',
				'/lib/font/source-sans-pro/source-sans-pro.css',
				'/lib/font/source-sans-pro/source-sans-pro-regular.eot',
				'/lib/font/source-sans-pro/source-sans-pro-regular.ttf',
				'/lib/font/source-sans-pro/source-sans-pro-regular.woff',
				'/lib/font/source-sans-pro/source-sans-pro-semibold.eot',
				'/lib/font/source-sans-pro/source-sans-pro-semibold.ttf',
				'/lib/font/source-sans-pro/source-sans-pro-semibold.woff',
				'/lib/js/head.min.js',
				'/plugin/highlight/highlight.js',
				'/plugin/markdown/markdown.js',
				'/plugin/markdown/marked.js',
				'/plugin/notes/notes.js'
			]);
		}).then(function () {
			console.log('Cached \u201c' + CACHE_NAME + '\u201d');
		}).catch(function () {
			console.warn('Failed to cache \u201c' + CACHE_NAME + '\u201d');
		}));
});

self.addEventListener('activate', function (ev) {
	// Delete any old caches.
	ev.waitUntil(
		caches.keys().then(function (cacheNames) {
			var cacheDeletionPromises = cacheNames.map(function (cacheName) {
				if (cacheName !== CACHE_NAME) {
					return caches.delete(cacheName);
				}
			});
			return Promise.all(cacheDeletionPromises);
		}));
});

self.addEventListener('fetch', function (ev) {
	// Serve from cache where possible; fall back to trying over the network.
	ev.respondWith(
		caches.match(ev.request).then(function (response) {
				if (response) {
					return response;
				}
				return fetch(ev.request);
		}));
});
