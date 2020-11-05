class Fiche {
  data() {
    return {
      layout: 'base'
    }
  }

  render(data) {
    const {nom, adresse, typesDeSurfaces, localisation} = data.stade,
      lienMaps = `https://maps.google.com/maps?q=loc:${localisation.lat},${localisation.lon}&z=17&t=h&hl=fr-FR&gl=US&mapclient=embed`

    return `
    <h1><a class="retour" href="/"></a>${nom}</h1>
    <div class="bloc-info">
      <div class="adresse">
        <span class="titre">Adresse</span>
        <span>${adresse}</span>
      </div>
      <div class="terrains">
        <span class="titre">${typesDeSurfaces.length > 1 ? 'Types de surfaces' : 'Type de surface'}</span>
        <span>${typesDeSurfaces.join(' - ')}</span>
      </div>
      <a href="https://maps.google.com/maps?q=loc:${localisation.lat},${localisation.lon}&z=17&t=h&hl=fr-FR&gl=US&mapclient=embed" target="_blank">Ouvrir sur Maps</a>
    </div>
    <div class="carte">
      <iframe src="https://maps.google.com/maps?q=loc:${localisation.lat},${localisation.lon}&z=17&t=h&output=embed" frameborder="0" loading="lazy"></iframe>
    </div>
    <link rel="stylesheet" href="${this.url('/css/fiche.css')}">
    <script>
      document.querySelector('div.adresse span.titre').addEventListener('dblclick', () => {
        navigator.clipboard.writeText('${lienMaps}')
      })
    </script>
    `
  }
}

module.exports = Fiche

// <iframe src="https://maps.google.com/maps?q=loc:${champs.localisation.lat},${champs.localisation.lon}&z=17&t=h&output=embed" frameborder="0"></iframe>