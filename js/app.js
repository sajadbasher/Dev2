const staticDevCoffee = "dev-coffee-site-v1";
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/images/coffee1.jpg",
  "/images/coffee2.jpg",
  "/images/coffee3.jpg",
  "/images/coffee4.jpg",
  "/images/coffee5.jpg",
  "/images/coffee6.jpg",
  "/images/coffee7.jpg",
  "/images/coffee8.jpg",
  "/images/coffee9.jpg"
];

// Installations-Event
self.addEventListener("install", installEvent => {
  console.log("Service Worker: Installations-Event wird verarbeitet.");
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      console.log("Service Worker: Caching von Assets wird gestartet.");
      return cache.addAll(assets);
    }).then(() => {
      console.log("Service Worker: Alle Assets wurden erfolgreich gecacht.");
    })
  );
});

// Aktivierungs-Event
self.addEventListener("activate", event => {
  console.log("Service Worker: Aktivierungs-Event wird verarbeitet.");
  // Löschen alter Caches
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticDevCoffee)
        .map(key => {
          console.log(`Service Worker: Löschen des alten Cache: ${key}`);
          return caches.delete(key);
        })
      );
    }).then(() => {
      console.log("Service Worker: Alte Caches wurden erfolgreich gelöscht.");
    })
  );
});

// Fetch-Event
self.addEventListener("fetch", fetchEvent => {
  console.log(`Service Worker: Fetch-Event für: ${fetchEvent.request.url}`);
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request).then(response => {
        console.log(`Service Worker: Ressource gefetched: ${fetchEvent.request.url}`);
        return response;
      });
    })
  );
});
