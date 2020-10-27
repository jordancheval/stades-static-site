class Fiche {
  data() {
    return {
      layout: 'base'
    }
  }

  render(data) {
    const champs = data.stade

    return `
    <h1>${champs.nom}</h1>
    <div class="bloc-info">
      <span class="titre">Adresse</span>
      <span>${champs.adresse}</span>
    </div>
    <div class="bloc-info">
      <span class="titre">${champs.typesDeSurfaces.length > 1 ? 'Types de surfaces' : 'Type de surface'}</span>
      <span>${champs.typesDeSurfaces.join(' - ')}</span>
    </div>
    <div>
      <a href="https://maps.google.com/maps?q=loc:${champs.localisation.lat},${champs.localisation.lon}&z=17&t=h&hl=fr-FR&gl=US&mapclient=embed" target="_blank">Ouvrir sur Maps</a>
    </div>
    <div class="carte">
      <iframe src="https://maps.google.com/maps?q=loc:${champs.localisation.lat},${champs.localisation.lon}&z=17&t=h&output=embed" frameborder="0" loading="lazy"></iframe>
    </div>
    <link rel="stylesheet" href="${this.url('/css/fiche.css')}">
    `
  }
}

module.exports = Fiche

// <iframe src="https://maps.google.com/maps?q=loc:${champs.localisation.lat},${champs.localisation.lon}&z=17&t=h&output=embed" frameborder="0"></iframe>