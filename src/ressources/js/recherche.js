class Recherche {

  /**
   * @constructor
   * @param {HTMLInputElement} input - l'élément de saisie de texte
   */
  constructor(input) {
    if (window.Worker) {
      this.input = input
      this.worker = new Worker(`${window.location.origin}/js/worker.js`)
      this.conteneurResultat = this.creerConteneurResultats()

      this.input.insertAdjacentElement('afterend', this.conteneurResultat)

      this.preparerInputPourEnvoiDeMessages()
      this.preparerRecepetionMessagesWorker(this.worker)
      this.gererFlechesClavier()
    } else {
      console.error('Worker non supporté')
    }
  }

  /**
   * Ajoute la fonction d'envoi de message sur l'élément input
   */
  preparerInputPourEnvoiDeMessages() {
    this.input.onkeydown = (evenement) => {
      if (!evenement.key.match(new RegExp('[\\w\\d\\u00C0-\\u00FF\\.-\\s]'))) {
        evenement.preventDefault()
      }
    }

    this.input.oninput = () => {
      if (this.input.value.length > 2) {
        this.worker.postMessage(this.input.value)
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
      const html = message.data.length > 0 ? `${message.data.map(({slug, nom}) => `<a href="/stades/${slug}/" tabindex="-1">${nom}</a>`).join('')}` : '<span>Aucun résultat</span>'

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

  /**
   * Permet de gérer la sélection du stade avec les flèches "haut" et "bas" du clavier.
   */
  gererFlechesClavier() {
    const fonctionNavigationClavier = (evenement) => {
      const elementsFocusable = this.conteneurResultat.querySelectorAll('a')

      if (['ArrowDown', 'ArrowUp'].includes(evenement.key) && elementsFocusable.length > 0) {
        const elementAyantLeFocus = [...elementsFocusable].find((element) => element.matches(':focus'))

        evenement.preventDefault()

        if (!elementAyantLeFocus) {
          elementsFocusable[evenement.key === 'ArrowDown' ? 0 : elementsFocusable.length - 1].focus()
        } else {
          const elementOuVaLeFocus = [
            {
              test: evenement.key === 'ArrowDown' && elementAyantLeFocus !== [...elementsFocusable].slice(-1)[0],
              element: () => elementAyantLeFocus.nextElementSibling
            },
            {
              test: evenement.key === 'ArrowDown' && elementAyantLeFocus === [...elementsFocusable].slice(-1)[0],
              element: () => elementsFocusable[0]
            },
            {
              test: evenement.key === 'ArrowUp' && elementAyantLeFocus !== elementsFocusable[0],
              element: () => elementAyantLeFocus.previousElementSibling
            },
            {
              test: evenement.key === 'ArrowUp' && elementAyantLeFocus === elementsFocusable[0],
              element: () => [...elementsFocusable].slice(-1)[0]
            }
          ]

          elementOuVaLeFocus.find(({test}) => test)?.element().focus()
        }
      }
    }

    this.input.addEventListener('keydown', fonctionNavigationClavier)
    this.conteneurResultat.addEventListener('keydown', fonctionNavigationClavier)
  }
}