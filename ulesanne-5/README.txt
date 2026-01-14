Mis tehtud sai

- Backend (Express): lisatud API-endpointid, mis toovad andmeid fakestoreapi'st ja cache'ivad need faili (products.json).
  - /api/products — kõik tooted
  - /api/products/:id — üksik toode ID järgi
  - /api/categories — kategooriate nimekiri
  - /api/products/category/:category — tooted kategooria järgi
- Favorites: lisatud /api/favorites (GET, POST, DELETE), mis salvestab lemmiktooteid serveris faili (favorites.json) kliendi ID (clientId cookie) alusel.
- Frontend: uuendatud, et kasutada BE endpoint'e (api.js ja views/allProductsView.js). Kuvatakse kategooriate dropdown ja filtreeritakse tooteid.
- Ostukorv: säilitatakse localStorage'is, nii et refreshi korral ostukorvi sisu säilib.

Kasutatav Node versioon

- Node 18+ soovitatav (global fetch on Node 18+). 

Kuidas projekt tööle panna

1. Ava terminal ja liigu projekti kausta:

   cd /epood/ulesanne-5

2. Paigalda sõltuvused (kuna package.json sisaldab skripte jne):

   npm install

3. Käivita server:

   node server või node server dev

4. Ava brauseris:

   http://localhost:8000

