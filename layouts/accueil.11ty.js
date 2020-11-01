class Accueil {
  data() {
    return {
      layout: 'base'
    }
  }

  render({content}) {
    return `
      ${content}
      <link rel="stylesheet" href="${this.url('/css/accueil.css')}">
      <script src="${this.url('/js/recherche.js')}"></script>
      <script>
        const recherche = new Recherche(document.querySelector('#recherche'))
      </script>
    `
  }
}


module.exports = Accueil