import { customerConstructor } from "../constructors/Customer.js";

export const displayFavoritesView = () => {
  const favorites = customerConstructor.getAllFavorites();

  const container = document.getElementById("main-container");
  container.innerHTML = "<h2>Lemmikud</h2>";

  favorites.forEach((item) => {
    const favoriteItemElement = document.createElement("div");
    favoriteItemElement.classList.add("favorite-item");
    favoriteItemElement.innerHTML = `
        <h3>${item.product.name}</h3>
        <p>Hind: $${item.product.price}</p>
      `;
    container.appendChild(favoriteItemElement);
  });
};
