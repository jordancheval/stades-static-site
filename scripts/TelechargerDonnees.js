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
  url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}/entries?content_type=${CONTENT_TYPE}&access_token=${DELIVERY_TOKEN}`

https.get(url, (reponse) => {
  const donnees = []

  reponse.on('data', (donneesBrutes) => {
    donnees.push(donneesBrutes)
  })

  reponse.on('end', () => {
    const donneesFinales = JSON.parse(Buffer.concat(donnees).toString()),
      donneesFinalesRetravaillees = donneesFinales.items.map((item) => {
        return {
          id: item.sys.id,
          nom: item.fields.nom,
          slug: slugify(item.fields.nom, {lower: true}),
          localisation: item.fields.localisation,
          adresse: item.fields.adresse,
          typesDeSurfaces: item.fields.typesDeSurfaces
        }
      })

    if (!fs.existsSync('data')) {
      fs.mkdirSync('data')
    }

    fs.writeFileSync('data/donnees.json', JSON.stringify(donneesFinalesRetravaillees))
    fs.writeFileSync('data/donnees.js', `const donnees = ${JSON.stringify(donneesFinalesRetravaillees.map(({slug, nom}) => ({slug, nom})))}`)
  })
}).on("error", (err) => {
  console.log("Error: " + err.message);
})