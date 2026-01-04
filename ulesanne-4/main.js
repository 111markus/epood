import { displayAllProductsView } from "./views/allProductsView.js";
import { navigate } from "./router.js";
import { getProductsDataFromJson } from "./api.js";
import { cartConstructor } from "./constructors/Cart.js";
import { customerConstructor } from "./constructors/Customer.js";

const initApp = async () => {
  const homeButton = document.getElementById("home-button");
  homeButton.onclick = () => displayAllProductsView(window.PRODUCTS || []);

  const favoritesButton = document.getElementById("favorites-button");
  favoritesButton.onclick = () => navigate("favorites");

  const cartButton = document.getElementById("cart-button");
  cartButton.onclick = () => navigate("cart");

  const products = await getProductsDataFromJson();
  // Store products globally so views/router can access them by id
  window.PRODUCTS = products || [];
  // Ensure cart count reflects any persisted items
  cartConstructor.displayTotalItems();
  displayAllProductsView(window.PRODUCTS);
};

document.addEventListener("DOMContentLoaded", initApp);
