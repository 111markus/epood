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

  const productWrapper = document.createElement("div");
  productWrapper.classList.add("product-detail");

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;
  img.style.width = "100%";
  img.style.height = "200px";
  img.style.objectFit = "contain";

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
  favButton.classList.add("btn");
  favButton.textContent = customerConstructor
    .getAllFavorites()
    .includes(product.id)
    ? "Eemalda lemmikust"
    : "Lisa lemmikutesse";
  favButton.onclick = () => {
    customerConstructor.toggleFavorites(product);
    favButton.textContent = customerConstructor
      .getAllFavorites()
      .includes(product.id)
      ? "Eemalda lemmikust"
      : "Lisa lemmikutesse";
  };

  const addButton = document.createElement("button");
  addButton.classList.add("btn");
  addButton.textContent = "Lisa ostukorvi";
  addButton.onclick = () => cartConstructor.addProduct(product, 1);

  // order: image -> title -> description -> category -> price -> id -> actions
  productWrapper.appendChild(img);
  productWrapper.appendChild(title);
  if (desc) productWrapper.appendChild(desc);
  productWrapper.appendChild(category);
  productWrapper.appendChild(price);
  productWrapper.appendChild(idP);
  productWrapper.appendChild(favButton);
  productWrapper.appendChild(addButton);

  container.append(productWrapper);
};
