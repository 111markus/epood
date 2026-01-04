import { displayFavoritesView } from "./views/favoritesView.js";
import { displayProductDetailView } from "./views/productDetailView.js";
import { displayCartView } from "./views/cartView.js";
import { displayAllProductsView } from "./views/allProductsView.js";

export const navigate = (view, param) => {
  const views = {
    allProducts: () => displayAllProductsView(window.PRODUCTS || []),
    productDetail: () => displayProductDetailView(param),
    cart: () => displayCartView(),
    favorites: () => displayFavoritesView(),
  };

  if (views[view]) {
    views[view]();
  }
};
