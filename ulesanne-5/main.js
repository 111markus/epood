import { displayAllProductsView } from "./views/allProductsView.js";
import { navigate } from "./router.js";
import { getProductsDataFromJson } from "./api.js";
import { cartConstructor } from "./constructors/Cart.js";
import { customerConstructor } from "./constructors/Customer.js";

const initApp = async () => {
  const homeButton = document.getElementById("home-button");
  homeButton.onclick = () => navigate("products");

  const favoritesButton = document.getElementById("favorites-button");
  favoritesButton.onclick = () => navigate("favorites");

  const cartButton = document.getElementById("cart-button");
  cartButton.onclick = () => navigate("cart");

  const products = await getProductsDataFromJson();
  window.PRODUCTS = products || [];

  cartConstructor.displayTotalItems();
};

// Only initialize app logic — router.js already restores the correct view
document.addEventListener("DOMContentLoaded", initApp);
