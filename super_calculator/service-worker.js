const CACHE_NAME = 'super-calc-v2';
const GA_MEASUREMENT_ID = 'G-DQ4HS2936B'; // তোমার ID
const urlsToCache = [
  './super_calculator.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// ----- IndexedDB (অফলাইন ইভেন্ট জমা রাখার জন্য) -----
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('offline-analytics', 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('events')) {
        db.createObjectStore('events', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

function storeEvent(eventData) {
  return openDB().then(db => {
    const tx = db.transaction('events', 'readwrite');
    tx.objectStore('events').add(eventData);
    return tx.complete;
  });
}

function sendStoredEvents() {
  return openDB().then(db => {
    const tx = db.transaction('events', 'readwrite');
    const store = tx.objectStore('events');
    const getAll = store.getAll();
    getAll.onsuccess = () => {
      const events = getAll.result;
      events.forEach(ev => {
        fetch('https://www.google-analytics.com/mp/collect?measurement_id=' + GA_MEASUREMENT_ID, {
          method: 'POST',
          body: JSON.stringify(ev)
        })
        .then(res => { if (res.ok) store.delete(ev.id); })
        .catch(() => {});
      });
    };
  });
}

// ----- Install Event -----
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// ----- Activate Event (পুরনো ক্যাশ সরানো ও জমা ইভেন্ট পাঠানো) -----
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => { if (key !== CACHE_NAME) return caches.delete(key); }))
    )
  );
  event.waitUntil(sendStoredEvents());
  self.clients.claim();
});

// ----- Fetch Event (Google Analytics রিকোয়েস্ট ইন্টারসেপ্ট করা) -----
self.addEventListener('fetch', event => {
  if (event.request.url.includes('google-analytics.com')) {
    event.respondWith(
      fetch(event.request.clone()).catch(() => {
        const eventData = {
          timestamp: Date.now(),
          url: event.request.url
        };
        storeEvent(eventData);
        return new Response(null, { status: 202 });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// ----- অনলাইনে ফিরলে স্বয়ংক্রিয়ভাবে ইভেন্ট পাঠানো -----
self.addEventListener('sync', event => {
  if (event.tag === 'send-analytics') {
    event.waitUntil(sendStoredEvents());
  }
});
