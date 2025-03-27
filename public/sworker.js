/*
self.addEventListener("fetch", function(event){
    if (event.request.url.includes("bootstrap.min.css")){
        event.respondWith(
            new Response(
                ".hotel-slogan {background: green!important;} nav {display: none}",
                {headers: {"Content-Type": "text/css"}}
            )
        );
    }
});

self.addEventListener("fetch", function(event){
    if (event.request.url.includes("/img/logo.png")){
        event.respondWith(
            fetch("/img/logo-flipped.png")
        );
    }
});

self.addEventListener("fetch", function(event){
    event.respondWith(
        fetch(event.request).catch(function(){
            return new Response(
                "Welcome to the Gotham Imperial Hotel.\n"+
                "There seems to be a problem with your connection.\n"+
                "We look forward to telling you about our hotel as soon as you go online."
            );
        })
    );
});


var responseContent = 
"<html>"+
"<body>"+
"<style>"+
"body {text-align: center; background-color: #333; color: #eee;}"+
"</style>"+
"<h1>Gotham Imperial Hotel</h1>"+
"<p>There seems to be a problem with your connection.</p>"+
"<p>Come visit us at 1 Imperial Plaza, Gotham City for free Wifi.</p>"+
"</body>"+
"</html>";

self.addEventListener("fetch", function(event){
    event.respondWith(
        fetch(event.request).catch(function(){
            return new Response(
                responseContent, {headers: {"Content-Type": "text/html"}}
            );
        })
    );
});

self.addEventListener("install", function(event) {
    console.log("install");
});
self.addEventListener("activate", function(event) {
    console.log("activate");
});
self.addEventListener("fetch", function(event) {
    if(event.request.url.includes("bootstrap.min.css")){
        console.log("Fetch request for:", event.request.url);
        event.respondWith(
            new Response(
                ".hotel-slogan {background: yellow!important;} nav {display:none}", {headers: {"Content-type": "text/css"}}
            )
        );
    }
});
----
var CACHE_NAME = "gih-cache-v4";
var CACHED_URLS = [
    "/index-offline.html",
    "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css",
    "/css/gih-offline.css",
    "/img/jumbo-background-sm.jpg",
    "/img/logo-header.png"
];
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(CACHED_URLS);
        })
    );
});
self.addEventListener("fetch", function(event) {
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(event.request).then(function(response) {
          if (response) {
            return response;
          } else if (event.request.headers.get("accept").includes("text/html")) {
            return caches.match("/index-offline.html");
          }
        });
      })
    );
});
self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName){
                    if(CACHE_NAME !== cacheName && cacheName.startsWith("gih-cache")){
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
return self.clients.claim(); NOTE
*/

var immutableRequests = [
    "/fancy_header_background.mp4",
    "/vendor/bootstrap/3.3.7/bootstrap.min.css",
    "/css/style-v355.css"
];
var mutableRequests = [
    "app-settings.json",
    "index.html"
];
self.addEventListener("install", function(event) {
    event.waitUntil(
      caches.open("cache-v2").then(function(cache) {
        var newImmutableRequests = [];
        return Promise.all(
          immutableRequests.map(function(url) {
            return caches.match(url).then(function(response) {
              if (response) {
                return cache.put(url, response);
              } else {
                newImmutableRequests.push(url);
                return Promise.resolve();
              }
            });
          })
        ).then(function() {
          return cache.addAll(newImmutableRequests.concat(mutableRequests));
        });
      })
  );
});