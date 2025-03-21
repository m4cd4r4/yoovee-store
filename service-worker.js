/**
 * YooVee® Premium Fingerless Gloves - Service Worker
 * Version: 1.0
 */

const CACHE_NAME = 'yoovee-cache-v1';
const OFFLINE_URL = 'offline.html';

// Resources to cache
const RESOURCES_TO_CACHE = [
  './',
  './index.html',
  './cart.html',
  './offline.html',
  './manifest.json',
  './css/style.css',
  './css/cart.css',
  './css/accessibility.css',
  './js/main.js',
  './js/product.js',
  './js/cart.js',
  './js/checkout.js',
  './js/carousel.js',
  './js/image-modal.js',
  './js/accessibility.js',
  './js/register-sw.js',
  './images/logo-header-transparent.svg',
  './images/glove-1.jpg',
  './images/glove-2.jpg',
  './images/glove-3.webp',
  './images/glove-4.webp',
  './images/webp/customer-photo1.webp',
  './images/webp/customer-photo3.webp',
  './images/webp/customer-photo4.webp',
  './images/webp/customer-photo5.webp',
  './images/icons/icon-72x72.png',
  './images/icons/icon-96x96.png',
  './images/icons/icon-128x128.png',
  './images/icons/icon-144x144.png',
  './images/icons/icon-152x152.png',
  './images/icons/icon-192x192.png',
  './images/icons/icon-384x384.png',
  './images/icons/icon-512x512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-solid-900.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-brands-400.woff2'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // Cache offline page first
        return cache.add(OFFLINE_URL)
          .then(() => {
            // Then cache other resources
            return cache.addAll(RESOURCES_TO_CACHE.filter(url => url !== OFFLINE_URL));
          })
          .catch(error => {
            console.error('Failed to cache resources:', error);
          });
      })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Claim clients so the service worker is in control immediately
  self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin) && 
      !event.request.url.startsWith('https://cdnjs.cloudflare.com')) {
    return;
  }

  // Handle HTML navigation requests differently
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // If offline, serve the offline page
          return caches.match(OFFLINE_URL);
        })
    );
    return;
  }

  // For other requests, try the cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request because it's a one-time use stream
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response because it's a one-time use stream
            const responseToCache = response.clone();

            // Cache the new resource
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // If both cache and network fail, try to serve appropriate fallback
            if (event.request.url.includes('.jpg') || 
                event.request.url.includes('.png') || 
                event.request.url.includes('.webp')) {
              return new Response('', { 
                status: 200, 
                statusText: 'OK',
                headers: new Headers({
                  'Content-Type': 'image/svg+xml',
                  'Cache-Control': 'no-store'
                })
              });
            }
          });
      })
  );
});

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
