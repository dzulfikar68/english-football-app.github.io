importScripts('/js/workbox-sw.js');

if (workbox) {
    console.log(`WORKBOX yes`);

} else {
    console.log(`WORKBOX no`);
}

workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/index.html', revision: '1'},
    { url: '/team.html', revision: '1'},
    { url: '/favorites.html', revision: '1'},
    { url: '/css/app.css', revision: '1'},
    { url: '/css/icon.css', revision: '1'},
    { url: '/css/font-awesome.min.css', revision: '1'},
    { url: '/css/materialize.min.css', revision: '1'},
    { url: '/js/materialize.min.js', revision: '1'},
    { url: '/js/snarkdown.umd.js', revision: '1'},
    { url: '/workbox-sw.js', revision: '1'},
    { url: '/js/idb.js', revision: '1'},
    { url: '/js/trx.js', revision: '1'},
    { url: '/js/uix.js', revision: '1'},
    { url: '/js/api.js', revision: '1'},
    { url: '/js/app.js', revision: '1'},
    { url: '/icon.png', revision: '1'},
    { url: '/noimage.png', revision: '1'},
    { url: '/manifest.json', revision: '1'},
]);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    new RegExp(self.location.origin + "/fb-app/"),
    workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('/css/materialize.min.css'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('.*\.png'),
    workbox.strategies.cacheFirst()
);

self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'img/icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});
