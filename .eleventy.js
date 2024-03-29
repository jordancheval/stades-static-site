module.exports = function(eleventyConfig) {
  eleventyConfig.setDataDeepMerge(false)

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