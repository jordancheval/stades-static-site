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
    `
  }
}


module.exports = Accueil