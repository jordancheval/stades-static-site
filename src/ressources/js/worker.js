importScripts('../donnees/donnees.js')

onmessage = (message) => {
  const recherche = message.data,
    regex = new RegExp(`${recherche}`, 'gi'),
    resultat = donnees.filter(({slug, nom}) => regex.test(slug) || regex.test(nom))

  postMessage(resultat)
}