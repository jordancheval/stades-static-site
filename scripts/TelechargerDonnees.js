if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const https = require('https'),
  fs = require('fs')
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
    const donneesFinales = Buffer.concat(donnees)

    if (!fs.existsSync('data')) {
      fs.mkdirSync('data')
    }

    fs.writeFileSync('data/donnees.json', donneesFinales)
  })
}).on("error", (err) => {
  console.log("Error: " + err.message);
})