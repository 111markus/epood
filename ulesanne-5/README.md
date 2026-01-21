# Mis tehtud sai

- Backend (Express)
  - Lisatud API-endpointid, mis toovad andmeid FakeStore API-st ja cache’ivad need faili (products.json):
    - GET /api/products.json — kõik tooted
    - GET /api/products/:id — üksik toode ID järgi
    - GET /api/categories — kategooriate nimekiri
    - GET /api/products/category/:category — tooted kategooria järgi
  - Favorites
    - GET/POST/DELETE /api/favorites — salvestab lemmiktooteid serveris faili (favorites.json) kliendi ID (clientId cookie) alusel.

- Front-end
  - AllProductsView: kuvatakse tooted koos piltidega, kategooria filter.
  - ProductDetailView: kuvatakse toote pilt, kirjeldus, hind, lemmiku- ja ostukorvi nupud.
  - Lemmikud: „Lisa lemmikutesse / Eemalda lemmikust“ on sünkroonis vaadete vahel; FavoritesView uuendab end eemaldamisel.
  - Router: töötab URL-idega. Refresh /product/:id lehel jätab vaate ProductDetailView peale.
  - Stiilid: ühtlustatud nupud (.btn) ja UX täiustused.
  - Ostukorv: säilitatakse localStorage’is, nii et refreshi korral sisu säilib.
  - Teed: parandatud staatiliste failide ja API päringute teed (absoluutsed teed), et värskenduse korral alam-URL-idel stiilid ja andmed laeksid korrektselt.

## Kasutatav Node versioon

- Node 18+ (testitud Node 20-ga).

## Kuidas projekt tööle panna

1. Ava terminal ja liigu projekti kausta:

   cd /Users/kyo/projects/epood/ulesanne-5

2. Paigalda sõltuvused:

   npm install

3. Käivita server:

   node server.js

4. Ava brauseris:

   http://localhost:8000
