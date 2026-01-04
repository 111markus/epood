import { cartConstructor } from "../constructors/Cart.js";
import { customerConstructor } from "../constructors/Customer.js";

export const displayProductDetailView = (productId) => {
  const product = (window.PRODUCTS || []).find((p) => p.id === productId);
  const container = document.getElementById("main-container");
  container.innerHTML = "";
  if (!product) {
    container.innerText = "Toode ei leitud";
    return;
  }

  const productCard = document.createElement("div");
  productCard.classList.add("product");

  const title = document.createElement("h2");
  title.textContent = product.name;

  // other info elements
  const category = document.createElement("p");
  category.textContent = `Kategooria: ${product.category}`;

  const price = document.createElement("p");
  price.textContent = `Hind: $${product.price}`;

  // description element
  let desc = null;
  if (product.description) {
    desc = document.createElement("div");
    desc.classList.add("product-description");
    desc.innerText = product.description;
  }

  const idP = document.createElement("p");
  idP.textContent = `ID: ${product.id}`;

  const favButton = document.createElement("button");
  favButton.textContent = customerConstructor
    .getAllFavorites()
    .some((f) => f.product.id === product.id)
    ? "Eemalda lemmikust"
    : "Lisa lemmikutesse";
  favButton.onclick = () => {
    customerConstructor.toggleFavorites(product);
    favButton.textContent = customerConstructor
      .getAllFavorites()
      .some((f) => f.product.id === product.id)
      ? "Eemalda lemmikust"
      : "Lisa lemmikutesse";
  };

  const addButton = document.createElement("button");
  addButton.textContent = "Lisa ostukorvi";
  addButton.onclick = () => cartConstructor.addProduct(product, 1);

  // order: title -> description -> category -> price -> id -> actions
  productCard.appendChild(title);
  if (desc) productCard.appendChild(desc);
  productCard.appendChild(category);
  productCard.appendChild(price);
  productCard.appendChild(idP);
  productCard.appendChild(favButton);
  productCard.appendChild(addButton);

  container.append(productCard);
};
