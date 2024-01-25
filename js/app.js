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
  console.log("Service Worker wird installiert...");
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      console.log("Assets werden gecacht");
      return cache.addAll(assets);
    })
  );
});

// Aktivierungs-Event
self.addEventListener("activate", event => {
  console.log("Service Worker wird aktiviert...");
  // Löschen alter Caches
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticDevCoffee)
        .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch-Event
self.addEventListener("fetch", fetchEvent => {
  console.log("Fetch-Event für: ", fetchEvent.request.url);
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
