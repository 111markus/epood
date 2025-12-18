// import { Product } from "./constructors/Product.js";
import { displayAllProductsView } from "./views/allProductsView.js";
import { navigate } from "./router.js";
import { getProductsDataFromJson } from "./api.js";

/* const products = [
  new Product(1, "Sülearvuti", 999.99, "Elektroonika"),
  new Product(2, "Telefon", 599.99, "Elektroonika"),
  new Product(3, "Tahvelarvuti", 299.99, "Elektroonika"),
];
*/

const initApp = async () => {
  const homeButton = document.getElementById("home-button");
  homeButton.onclick = () => initApp();

  const favoritesButton = document.getElementById("favorites-button");
  favoritesButton.onclick = () => navigate("favourites");

  const cartButton = document.getElementById("cart-button");
  cartButton.onclick = () => navigate("cart");

  const products = await getProductsDataFromJson();
  displayAllProductsView();
};

document.addEventListener("DOMContentLoaded", initApp);
