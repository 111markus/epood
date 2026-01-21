import { cartConstructor } from "../constructors/Cart.js";
import { navigate } from "../router.js";
import { customerConstructor } from "../constructors/Customer.js";

export const displayFavoritesView = async () => {
  const container = document.getElementById("main-container");
  container.innerHTML = "<h2>Lemmikud</h2>";

  const favorites = customerConstructor.getAllFavorites();
  container.innerHTML = "";
  if (!favorites || favorites.length === 0) {
    container.appendChild(
      Object.assign(document.createElement("p"), {
        innerText: "Lemmikuid pole",
      }),
    );
    return;
  }

  favorites.forEach((id) => {
    const product = window.PRODUCTS.find((p) => p.id === id);
    if (!product) return;

    const favoriteItemElement = document.createElement("div");
    favoriteItemElement.classList.add("favorite-item");

    const title = document.createElement("h3");
    title.textContent = product.name;
    title.style.cursor = "pointer";
    title.onclick = () => navigate("productDetail", product.id);

    const price = document.createElement("p");
    price.textContent = `Hind: $${product.price}`;

    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Lisa ostukorvi";
    addToCartBtn.onclick = () => cartConstructor.addProduct(product, 1);

    const removeFavBtn = document.createElement("button");
    removeFavBtn.textContent = "Eemalda lemmikust";
    removeFavBtn.onclick = () => {
      customerConstructor.toggleFavorites(product);
      // Re-render the favorites view after removing
      displayFavoritesView();
    };

    favoriteItemElement.appendChild(title);
    favoriteItemElement.appendChild(price);
    favoriteItemElement.appendChild(addToCartBtn);
    favoriteItemElement.appendChild(removeFavBtn);

    container.appendChild(favoriteItemElement);
  });
};
