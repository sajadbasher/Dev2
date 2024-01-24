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

self.addEventListener("install", installEvent => {
  let version = 4;
      console.log("Service worker installed !");
  console.log("version:" + version);
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets);
      
      
    })
  );
});

self.addEventListener("activate", function(e) {
    let version = 4;
    console.log("Service worker activated !");
    console.log("version:" + version);
  }
);

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      //console.log("Fetching service worker")
      return res || fetch(fetchEvent.request);
    })
  );
});
