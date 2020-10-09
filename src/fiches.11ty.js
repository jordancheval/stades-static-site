class Fiches {
  data() {
    return {
      pagination: {
        data: "donnees.items",
        size: 1,
        alias: "stade"
      },
      layout: "fiche",
      permalink: function(data) {
        return `/stades/${this.slug(data.stade.fields.nom)}/`
      },
      eleventyComputed: {
        titre: (data) => data.stade.fields.nom
      }
    }
  }
}

module.exports = Fiches