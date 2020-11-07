class Recherche {

  /**
   * @constructor
   * @param {HTMLInputElement} input - l'élément de saisie de texte
   */
  constructor(input) {
    if (window.Worker) {
      this.worker = new Worker(`${window.location.origin}/js/worker.js`)
      this.conteneurResultat = this.creerConteneurResultats()

      input.insertAdjacentElement('afterend', this.conteneurResultat)

      this.preparerInputPourEnvoiDeMessages(input)
      this.preparerRecepetionMessagesWorker(this.worker)
    } else {
      console.error('Worker non supporté')
    }
  }

  /**
   * Ajoute la fonction d'envoi de message sur l'élément input
   * @param {HTMLInputElement} input - l'élément de saisie de texte
   */
  preparerInputPourEnvoiDeMessages(input) {
    input.onkeydown = (evenement) => {
      if (!evenement.key.match(new RegExp('[\\w\\d\\u00C0-\\u00FF\\.-]'))) {
        evenement.preventDefault()
      }
    }

    input.oninput = () => {
      if (input.value.length > 2) {
        this.worker.postMessage(input.value)
      } else {
        this.conteneurResultat.innerHTML = ''
      }
    }
  }

  /**
   * Permet d'éxecuter la fonction de retour de message du worker
   * @param {Worker} worker - le worker
   */
  preparerRecepetionMessagesWorker(worker) {
    worker.onmessage = (message) => {
      const html = message.data.length > 0 ? `${message.data.map(({slug, nom}) => `<a href="/stades/${slug}">${nom}</a>`).join('')}` : '<span>Aucun résultat</span>'

      this.conteneurResultat.innerHTML = ''

      this.conteneurResultat.insertAdjacentHTML('afterbegin', html)
    }
  }

  /**
   * Crée le conteneur destiné a accueillir les résultats de recherche
   * @returns {HTMLElement}
   */
  creerConteneurResultats() {
    const div = document.createElement('div')

    div.id = 'resulats-recherche'

    return div
  }
}