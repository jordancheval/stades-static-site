class CookiesConsentement {

  /**
   * @constructor
   * @param {Object} options - les options
   * @param {HTMLElement} options.element - l'élément HTML à modifier après le consentement
   * @param {string} options.dataAttribute - le data attribut qui contient les données pour l'attribut
   * @param {string} options.attribut - l'attribut
   * @param {string} options.texteDemande - le texte à afficher pour la demande
   * @param {string} options.texteRefus - le texte à afficher en cas de refus
   */
  constructor(options) {
    const {element, dataAttribute, attribut, texteDemande, texteRefus} = options

    this.element = element
    this.dataAttribute = dataAttribute
    this.attribut = attribut
    this.texteDemande = texteDemande
    this.texteRefus = texteRefus
  }

  /**
   * Permet d'afficher l'élément si l'utilisateur a accepté la fonctionnalité.
   * @param {string} nomCookie - le nom du cookie
   */
  afficherElementSiConsenti(nomCookie) {
    if (this.estConsenti(nomCookie)) {
      this.element.setAttribute(this.attribut, this.element.getAttribute(this.dataAttribute))
    } else {
      this.element.replaceWith(this.creerInvitationDeConsentement(nomCookie))
    }
  }

  /**
   * Permet de créer l'invitation de consentement.
   * @param {string} nomCookie - le nom du cookie
   * @returns {HTMLElement}
   */
  creerInvitationDeConsentement(nomCookie) {
    const conteneur = document.createElement('div'),
      texte = document.createElement('p'),
      boutonAccepter = document.createElement('button'),
      boutonRefuser = document.createElement('button')

    conteneur.classList.add('bloc-info')
    texte.textContent = this.texteDemande
    boutonAccepter.textContent = 'Accepter'
    boutonRefuser.textContent = 'Refuser'

    boutonAccepter.addEventListener('click', () => {
      CookiesConsentement.ecrireCookie(nomCookie, 'true')
      conteneur.replaceWith(this.element)
      this.afficherElementSiConsenti(nomCookie)
    })

    boutonRefuser.addEventListener('click', () => {
      CookiesConsentement.ecrireCookie(nomCookie, 'false')
      texte.textContent = this.texteRefus
      boutonRefuser.remove()
    })

    conteneur.append(texte, boutonAccepter, boutonRefuser)

    return conteneur
  }

  /**
   * Permet de savoir si un cookie vaut 'true'
   * @param {string} nomCookie - le nom du cookie
   * @returns {boolean}
   */
  estConsenti(nomCookie) {
    return this.recupererValeurCookie(nomCookie) === 'true'
  }

  /**
   * Permet de récupérer la valeur d'un cookie.
   * @param {string} nomCookie - le nom du cookie
   * @returns {string}
   */
  recupererValeurCookie(nomCookie) {
    const cookie = document.cookie
      .split(';')
      .find((cookie) => cookie.startsWith(`${nomCookie}=`))

    if (cookie) {
      const valeurcookie = cookie.split('=')[1]

      return valeurcookie
    }

    return undefined
  }

  /**
   * Permet d'écrire un cookie avec un expiration d'un mois
   * @param {string} nomCookie - le nom du cookie
   * @param {string} valeur - la valeur du cookie
   */
  static ecrireCookie(nomCookie, valeur) {
    const expiration = new Date()

    expiration.setMonth(expiration.getMonth() + 1)
    document.cookie = `${nomCookie}=${valeur};path=/;expires=${expiration.toGMTString()}`
  }
}