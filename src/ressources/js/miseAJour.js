if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
    .then((enregistrementServiceWorker) => {
      enregistrementServiceWorker.onupdatefound = () => {
        const etatInstallation = enregistrementServiceWorker.installing

        etatInstallation.onstatechange = () => {
          if (etatInstallation.state === 'installed') {
            const popup = document.createElement('div'),
              titre = document.createElement('span'),
              boutonFermeture = document.createElement('button'),
              texte = document.createElement('p'),
              boutonRechargement = document.createElement('button')

            popup.classList.add('popup-mise-a-jour')
            boutonFermeture.classList.add('fermeture')
            boutonRechargement.classList.add('rechargement')

            titre.textContent = 'Mise à jour'
            texte.textContent = "Une mise à jour de l'application est disponible. Recharger tout de suite pour bénéficier de la dernière version ?"
            boutonRechargement.textContent = 'Oui, je recharge !'
            boutonFermeture.setAttribute('aria-label', 'Fermer la popup de mise à jour')

            boutonFermeture.addEventListener('click', () => {
              popup.remove()
            })

            boutonRechargement.addEventListener('click', () => {
              window.location.reload()
            })

            popup.append(boutonFermeture, texte, boutonRechargement)
            document.body.append(popup)
          }
        }
      }
    })
}