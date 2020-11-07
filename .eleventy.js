const pluginPWA = require("eleventy-plugin-pwa")

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginPWA, {
    navigateFallback: '404.html',
    runtimeCaching: [
      {
        urlPattern: /^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)?$/,
        handler: `staleWhileRevalidate`
      },
      {
        urlPattern: /^.*\/$/,
        handler: `staleWhileRevalidate`
      }
    ]
  })

  eleventyConfig.addPassthroughCopy({'./src/ressources/': '.'})
  eleventyConfig.addPassthroughCopy({'./data/donnees.js': './donnees/donnees.js'})

  return {
    dir: {
      input: "src",
      includes: "../layouts",
      data: "../data",
      dataTemplateEngine: "11ty.js",
      output: "public"
    }
  }
}