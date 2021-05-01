class Accueil {
  data() {
    return {
      layout: 'base'
    }
  }

  render({content}) {
    return `
      ${content}
      <link rel="preload" href="${this.url('/css/accueil.css')}" as="style" onload="this.onload=null;this.rel='stylesheet'">
      <noscript><link rel="stylesheet" href="${this.url('/css/accueil.css')}"></noscript>
      <link rel="preload" href="${this.url('/css/recherche.css')}" as="style" onload="this.onload=null;this.rel='stylesheet'">
      <noscript><link rel="stylesheet" href="${this.url('/css/recherche.css')}"></noscript>
      <script src="${this.url('/js/recherche.js')}"></script>
      <script>
        const recherche = new Recherche(document.querySelector('#recherche'))
      </script>
    `
  }
}


module.exports = Accueil