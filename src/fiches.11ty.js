class Fiches {
  data() {
    return {
      pagination: {
        data: "donnees",
        size: 1,
        alias: "stade"
      },
      layout: "fiche",
      permalink: function(data) {
        return `/stades/${data.stade.slug}/`
      },
      eleventyComputed: {
        titre: (data) => data.stade.nom
      }
    }
  }
}

module.exports = Fiches