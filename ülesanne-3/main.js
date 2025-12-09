import { cartConstructor } from "./constructors/Cart.js";
import { customerConstructor } from "./constructors/Customer.js";
import { Product } from "./constructors/Product.js";
import { displayAllProductsView } from "./views/allProductsView.js";
import { displayCartView } from "./views/cartView.js";
import { displayFavoritesView } from "./views/favoritesView.js";
import { dispalyProductDetailView } from "./views/productDetailView.js";

const products = [
  new Product(1, "Sülearvuti", 999.99, "Elektroonika"),
  new Product(2, "Telefon", 599.99, "Elektroonika"),
  new Product(3, "Tahvelarvuti", 299.99, "Elektroonika"),
];

cartConstructor.addProduct(products[0], products[2]);
customerConstructor.toggleFavorites(products[0]);

const initApp = async () => {
  const favoritesButton = document.getElementById("favorites-button");

  const cartButton = document.getElementById("cart-button");

  displayAllProductsView(products);
  dispalyProductDetailView(products[1]);
  displayCartView();
  displayFavoritesView();
};

document.addEventListener("DOMContentLoaded", initApp);
