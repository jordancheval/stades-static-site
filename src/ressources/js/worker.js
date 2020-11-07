importScripts('../donnees/donnees.js')

onmessage = (message) => {
  const recherche = message.data.replace(new RegExp('(\\.)', 'g'), '\\$1'),
    regex = new RegExp(`${recherche}`, 'gi'),
    resultat = donnees.filter(({slug, nom, tags}) => regex.test(slug) || regex.test(nom) || tags.some((tag) => regex.test(tag)))

  postMessage(resultat)
}