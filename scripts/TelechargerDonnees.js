if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const https = require('https'),
  fs = require('fs'),
  slugify = require('slugify'),
  SPACE_ID = process.env.CONTENTFUL_SPACE_ID,
  ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT_ID,
  DELIVERY_TOKEN = process.env.CONTENTFUL_DELIVERY_TOKEN,
  CONTENT_TYPE = process.env.CONTENTFUL_CONTENT_TYPE,
  URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}/entries?content_type=${CONTENT_TYPE}&access_token=${DELIVERY_TOKEN}`

class TelechargerDonnees {

  /**
   * @constructor
   */
  constructor() {
    this.donnees = []
  }

  async generer() {
    await this.construireDonnees()

    this.trierDonnees(this.donnees)
    this.ecrireDonneesJSON(this.donnees)
    this.ecrireDonneesJS(this.donnees)
  }

  /**
   * Télécharge les données
   * @param {string} url - l'URL qui permet de télécharger les données
   * @returns {Array<Uint8Array[]>}
   */
  telecharger(url) {
    return new Promise((resolve, reject) => {
      https.get(url, (reponse) => {
        const donnees = []

        reponse.on('data', (donneesBrutes) => {
          donnees.push(donneesBrutes)
        })

        reponse.on('end', () => {
          resolve(donnees)
        })
      }).on("error", (err) => {
        reject(err.message)
      })
    })
  }

  /**
   * Permet de construire les données
   */
  async construireDonnees() {
    const donneesBrutes = await this.telecharger(`${URL}&skip=${this.donnees.length}`),
      donneesRecuperees = JSON.parse(Buffer.concat(donneesBrutes).toString()),
      donneesRecupereesRetravaillees = donneesRecuperees.items.map((item) => {
        return {
          id: item.sys.id,
          nom: item.fields.nom,
          slug: slugify(item.fields.nom, {lower: true}),
          localisation: item.fields.localisation,
          adresse: item.fields.adresse,
          typesDeSurfaces: item.fields.typesDeSurfaces ? item.fields.typesDeSurfaces : ['Non renseigné'],
          tags: item.fields.tags ? item.fields.tags : []
        }
      })

    this.donnees.push(...donneesRecupereesRetravaillees)

    if (this.donnees.length < donneesRecuperees.total) {
      await this.construireDonnees()
    }
  }

  /**
   * Ecrit les données dans le fichier JSON
   * @param {{id: string, nom: string, slug: string, localisation: {lat: number, lon: number}, adresse: string, typesDeSurfaces: Array<string>, tags: Array<string>}} donnees - les données à écrire dans le fichier JSON
   */
  ecrireDonneesJSON(donnees) {
    this.creerDossierDataSiInexistant()
    fs.writeFileSync('data/donnees.json', JSON.stringify(donnees))
  }

  /**
   * Ecrit les données dans le fichier JS
   * @param {{slug: string, nom: string, tags: Array<string>}} donnees - les données à écrire dans le fichier JS
   */
  ecrireDonneesJS(donnees) {
    this.creerDossierDataSiInexistant()
    fs.writeFileSync('data/donnees.js', `const donnees = ${JSON.stringify(donnees.map(({slug, nom, tags}) => ({slug, nom, tags})))}`)
  }

  /**
   * Trie les données
   * @param {{slug: string, nom: string, tags: Array<string>}} donnees - les données à trier
   */
  trierDonnees(donnees) {
    donnees.sort((a, b) => a.nom.localeCompare(b.nom))
  }

  creerDossierDataSiInexistant() {
    if (!fs.existsSync('data')) {
      fs.mkdirSync('data')
    }
  }
}

const telechargerDonnees = new TelechargerDonnees()

telechargerDonnees.generer()