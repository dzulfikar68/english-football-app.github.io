importScripts('/fb-app/js/workbox-sw.js');

if (workbox) {
    console.log(`WORKBOX yes`);

} else {
    console.log(`WORKBOX no`);
}

workbox.precaching.precacheAndRoute([
    { url: '/fb-app/', revision: '1' },
    { url: '/fb-app/index.html', revision: '1'},
    { url: '/fb-app/team.html', revision: '1'},
    { url: '/fb-app/favorites.html', revision: '1'},
    { url: '/fb-app/css/app.css', revision: '1'},
    { url: '/fb-app/css/icon.css', revision: '1'},
    { url: '/fb-app/css/font-awesome.min.css', revision: '1'},
    { url: '/fb-app/css/materialize.min.css', revision: '1'},
    { url: '/fb-app/js/materialize.min.js', revision: '1'},
    { url: '/fb-app/js/snarkdown.umd.js', revision: '1'},
    { url: '/fb-app/workbox-sw.js', revision: '1'},
    { url: '/fb-app/js/idb.js', revision: '1'},
    { url: '/fb-app/js/trx.js', revision: '1'},
    { url: '/fb-app/js/uix.js', revision: '1'},
    { url: '/fb-app/js/api.js', revision: '1'},
    { url: '/js/app.js', revision: '1'},
    { url: '/fb-app/icon.png', revision: '1'},
    { url: '/fb-app/noimage.png', revision: '1'},
    { url: '/fb-app/manifest.json', revision: '1'},
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
    new RegExp('/fb-app/css/materialize.min.css'),
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
        icon: '/fb-app/icon.png',
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
