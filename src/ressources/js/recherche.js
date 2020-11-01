class Recherche {

  /**
   * @constructor
   * @param {HTMLInputElement} input - l'élément de saisie de texte
   */
  constructor(input) {
    if (window.Worker) {
      this.worker = new Worker('js/worker.js')
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
      this.conteneurResultat.innerHTML = ''

      this.conteneurResultat.insertAdjacentHTML('afterbegin', `${message.data.map(({slug, nom}) => `<a href="stades/${slug}">${nom}</a>`).join('')}`)
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