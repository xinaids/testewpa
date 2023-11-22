var cacheName = 'oficina-pwa';
var filesToCache = [
  '/',
  'index.html',
  'css/style.css',
  'js/main.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(cacheName).then(function (cache) {
    return cache.addAll(filesToCache);
  }));
  self.skipWaiting();
});

/* Serve cached content when offline */
self.addEventListener('fetch', function (e) {
  e.respondWith(caches.match(e.request).then(function (response) {
    return response || fetch(e.request);
  }));
});

self.addEventListener('sync', function (event) {
  if (event.tag === 'syncAttendees') {
    event.waitUntil(syncAttendees()); // sending sync request
  }
});

function syncAttendees() {
  return update({url: `https://reqres.in/api/users`})
          .then(refresh)
          .then((attendees) => self.registration.showNotification(
                    `${attendees.length} notificacao funciona`
                    ))
}

function update(request) {
  return fetch(request.url)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network error');
            }

            // we can put response in cache
            return caches.open('CACHE_NAME')
                    .then(cache => cache.put(request, response.clone()))
                    .then(() => response) // resolve promise with the Response object
          })
}

function refresh(response) {
  return response.json() // read and parse JSON response
          .then(jsonResponse => {
            self.clients.matchAll().then(clients => {
              clients.forEach(client => {
                // report and send new data to client
                client.postMessage(JSON.stringify({
                  type: response.url,
                  data: jsonResponse.data
                }))
              })
            })
            return jsonResponse.data; // resolve promise with new data
          })
}
