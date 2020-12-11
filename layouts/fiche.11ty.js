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
    <div class="entete">
      <a class="retour" href="/" aria-label="Retour à la page d'accueil"></a>
      <h1>${nom}</h1>
      <button class="ouvrir-recherche" aria-label="Ouvrir la recherche"></button>
      <div class="calque-recherche">
        <button class="fermer-recherche" aria-label="Fermer la recherche"></button>
        <input type="text" id="recherche" placeholder="Tapez le nom d'un stade, d'un club, d'une ville..." aria-label="Champ de recherche">
      </div>
    </div>
    <div class="bloc-info">
      <div class="adresse">
        <span class="titre">Adresse</span>
        <span>${adresse}</span>
      </div>
      <div class="terrains">
        <span class="titre">${typesDeSurfaces.length > 1 ? 'Types de surfaces' : 'Type de surface'}</span>
        <span>${typesDeSurfaces.join(' - ')}</span>
      </div>
      <div class="liens-cartes">
        <a href="https://maps.google.com/maps?q=loc:${localisation.lat},${localisation.lon}&z=17&t=h&hl=fr-FR&gl=US&mapclient=embed" target="_blank" rel="noreferrer" aria-label="Ouvrir sur Google Maps">
          <span class="icone-lien google-maps"></span>
          <span class="texte">Ouvrir sur Google Maps</span>
        </a>
        <a href="https://maps.apple.com/?ll=${localisation.lat},${localisation.lon}" target="_blank" rel="noreferrer" aria-label="Ouvrir sur Apple Plan">
          <span class="icone-lien apple-plans"></span>
          <span class="texte">Ouvrir sur Apple Plans</span>
        </a>
        <a href="https://waze.com/ul?ll=${localisation.lat},${localisation.lon}" target="_blank" rel="noreferrer" aria-label="Ouvrir sur Waze">
          <span class="icone-lien waze"></span>
          <span class="texte">Ouvrir sur Waze</span>
        </a>
      </div>
    </div>
    <div class="carte">
      <iframe title="Carte Google Maps" src="https://maps.google.com/maps?q=loc:${localisation.lat},${localisation.lon}&z=17&t=h&output=embed" frameborder="0" loading="lazy"></iframe>
    </div>
    <link rel="stylesheet" href="${this.url('/css/fiche.css')}">
    <script>
      const titreAdresse = document.querySelector('div.adresse span.titre'),
        boutonOuvrirRecherche = document.querySelector('.ouvrir-recherche'),
        boutonFermerRecherche = document.querySelector('.fermer-recherche'),
        calqueRecherche = document.querySelector('.calque-recherche')

      titreAdresse.addEventListener('dblclick', () => {
        navigator.clipboard.writeText('${lienMaps}')
      })

      boutonOuvrirRecherche.addEventListener('click', () => {
        document.querySelector('html').classList.add('fixe')
        calqueRecherche.classList.add('visible')
        calqueRecherche.querySelector('input').focus()
      })

      boutonFermerRecherche.addEventListener('click', () => {
        calqueRecherche.classList.remove('visible')
        document.querySelector('html').classList.remove('fixe')
      })
    </script>
    `
  }
}

module.exports = Fiche
