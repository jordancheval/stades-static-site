class Fiche {
  data() {
    return {
      layout: 'base'
    }
  }

  render(data) {
    const champs = data.stade.fields

    return `
    <h1>${champs.nom}</h1>
    <div class="bloc-info">
      <span>Adresse</span>
      <span>${champs.adresse}</span>
    </div>
    <div class="bloc-info">
      <span>${champs.typesDeSurfaces.length > 1 ? 'Types de surfaces' : 'Type de surface'}</span>
      <span>${champs.typesDeSurfaces.join(' - ')}</span>
    </div>
    <a href="https://maps.google.com/maps?q=loc:${champs.localisation.lat},${champs.localisation.lon}&z=17&t=h&hl=fr-FR&gl=US&mapclient=embed">Ouvrir sur Maps</a>
    <div class="carte">
      CARTE
    </div>
    <link rel="stylesheet" href="${this.url('/css/fiche.css')}">
    `
  }
}

module.exports = Fiche

// <iframe src="https://maps.google.com/maps?q=loc:${champs.localisation.lat},${champs.localisation.lon}&z=17&t=h&output=embed" frameborder="0"></iframe>