import { cartConstructor } from "../constructors/Cart.js";
import { customerConstructor } from "../constructors/Customer.js";
import { navigate } from "../router.js";

export const displayAllProductsView = (products) => {
  const container = document.getElementById("main-container");
  container.innerHTML = "<h2>Tooted</h2>";

  const productsContainer = document.createElement("div");
  productsContainer.classList.add("products-container");

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product");

    const title = document.createElement("h3");
    title.textContent = product.name;
    title.style.cursor = "pointer";
    title.onclick = () => navigate("productDetail", product.id);

    const category = document.createElement("p");
    category.textContent = `Kategooria: ${product.category}`;

    const price = document.createElement("p");
    price.textContent = `Hind: $${product.price}`;

    const favButton = document.createElement("button");
    favButton.textContent = customerConstructor
      .getAllFavorites()
      .some((f) => f.product.id === product.id)
      ? "Eemalda lemmikust"
      : "Lisa lemmikutesse";
    favButton.onclick = (e) => {
      e.stopPropagation();
      customerConstructor.toggleFavorites(product);
      // update button text
      favButton.textContent = customerConstructor
        .getAllFavorites()
        .some((f) => f.product.id === product.id)
        ? "Eemalda lemmikust"
        : "Lisa lemmikutesse";
    };

    const cartButton = document.createElement("button");
    cartButton.textContent = "Lisa ostukorvi";
    cartButton.onclick = (e) => {
      e.stopPropagation();
      cartConstructor.addProduct(product, 1);
    };

    productCard.appendChild(title);
    productCard.appendChild(category);
    productCard.appendChild(price);
    productCard.appendChild(favButton);
    productCard.appendChild(cartButton);

    productsContainer.append(productCard);
  });
  container.append(productsContainer);
};
