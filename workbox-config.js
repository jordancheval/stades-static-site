module.exports = {
  cacheId: 'stades',
  globDirectory: 'public/',
  globPatterns: [
    '**/*.{html,css,js,mjs,map,jpg,png,gif,webp,ico,svg,woff2,woff,eot,ttf,otf,ttc,json}'
  ],
  skipWaiting: true,
  clientsClaim: true,
  swDest: 'public/service-worker.js',
  ignoreURLParametersMatching: [
    /^utm_/,
    /^fbclid$/
  ],
  navigateFallback: '404.html',
  runtimeCaching: [
    {
      urlPattern: /^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)?$/,
      handler: `StaleWhileRevalidate`
    },
    {
      urlPattern: /^.*\/$/,
      handler: `StaleWhileRevalidate`
    }
  ]
}