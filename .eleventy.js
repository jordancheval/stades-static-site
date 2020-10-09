module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({'./src/ressources/': '.'})

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