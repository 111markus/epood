import { customerConstructor } from "../constructors/Customer.js";
import { cartConstructor } from "../constructors/Cart.js";
import { navigate } from "../router.js";

export const displayFavoritesView = () => {
  const favorites = customerConstructor.getAllFavorites();

  const container = document.getElementById("main-container");
  container.innerHTML = "<h2>Lemmikud</h2>";

  if (!favorites.length) {
    container.appendChild(
      Object.assign(document.createElement("p"), {
        innerText: "Lemmikuid pole",
      })
    );
    return;
  }

  favorites.forEach((item) => {
    const favoriteItemElement = document.createElement("div");
    favoriteItemElement.classList.add("favorite-item");

    const title = document.createElement("h3");
    title.textContent = item.product.name;
    title.style.cursor = "pointer";
    title.onclick = () => navigate("productDetail", item.product.id);

    const price = document.createElement("p");
    price.textContent = `Hind: $${item.product.price}`;

    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Lisa ostukorvi";
    addToCartBtn.onclick = () => cartConstructor.addProduct(item.product, 1);

    const removeFavBtn = document.createElement("button");
    removeFavBtn.textContent = "Eemalda lemmikust";
    removeFavBtn.onclick = () => {
      customerConstructor.toggleFavorites(item.product);
      displayFavoritesView();
    };

    favoriteItemElement.appendChild(title);
    favoriteItemElement.appendChild(price);
    favoriteItemElement.appendChild(addToCartBtn);
    favoriteItemElement.appendChild(removeFavBtn);

    container.appendChild(favoriteItemElement);
  });
};
