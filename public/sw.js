const CACHE_NAME = 'yunhai-tools-v1';
const TOOL_ROUTES = [
  '/tools/',
  '/tools/json-formatter/',
  '/tools/url-encoder/',
  '/tools/text-diff/',
  '/tools/markdown-editor/',
  '/tools/jwt-decoder/',
  '/tools/code-to-card/',
  '/tools/color-picker/',
  '/tools/regex-tester/',
  '/tools/mermaid/',
  '/tools/tree-converter/',
  '/tools/lrc-edit/',
  '/tools/flv-online/',
  '/tools/comment-system/',
  '/tools/p2p-transfer/',
];
const PRECACHE_URLS = [
  ...TOOL_ROUTES,
  '/tools/manifest.json',
  '/no-bg.png',
  '/JetBrainsMono-Regular.woff2',
  '/JetBrainsMono-SemiBold.woff2',
  '/MapleMono-NF-CN-Light.woff2',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith('yunhai-tools-') && cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === 'navigate' && url.pathname.startsWith('/tools/')) {
    event.respondWith(networkFirst(request, '/tools/'));
    return;
  }

  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (isSameOriginStaticAsset(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request));
  }
});

async function networkFirst(request, fallbackUrl) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await cache.match(request);
    return cached || cache.match(fallbackUrl);
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  const response = await fetch(request);
  if (response.ok) {
    cache.put(request, response.clone());
  }
  return response;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const fresh = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  });

  return cached || fresh;
}

function isSameOriginStaticAsset(pathname) {
  return /\.(?:css|js|png|jpg|jpeg|webp|avif|svg|woff2?|json)$/.test(pathname);
}
