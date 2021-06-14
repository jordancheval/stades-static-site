---
layout: 'accueil'
titre: 'Gérer les cookies'
permalink: cookies.html
---

# Gérer les cookies

Google Maps

<button id="googlemaps_accepter">Accepter</button> <button id="googlemaps_refuser">Refuser</button>

<script src="{{ './js/cookiesConsentement.js' | url}}"></script>
<script>
  document.querySelector('#googlemaps_accepter').addEventListener('click', () => {
    CookiesConsentement.ecrireCookie('carte-google-maps', 'true')
  })
  document.querySelector('#googlemaps_refuser').addEventListener('click', () => {
    CookiesConsentement.ecrireCookie('carte-google-maps', 'false')
  })
</script>