import { getProductsDataFromJson } from "./api.js";
import { displayAllProductsView } from "./views/allProductsView.js";
import { displayProductDetailView } from "./views/productDetailView.js";
import { displayFavoritesView } from "./views/favoritesView.js";
import { displayCartView } from "./views/cartView.js";

// Map named routes to path builders
function routeToPath(route, param) {
  switch (route) {
    case "home":
    case "products":
      return "/";
    case "productDetail":
      return `/product/${encodeURIComponent(String(param))}`;
    case "favorites":
      return "/favorites";
    case "cart":
      return "/cart";
    default:
      return "/";
  }
}

// Navigate programmatically
export async function navigate(route, param) {
  const path = routeToPath(route, param);
  if (location.pathname !== path) {
    history.pushState({}, "", path);
  }
  await handleRoute(path);
}

// Core router: resolve pathname to a view and render
async function handleRoute(pathname) {
  const clean = pathname.replace(/\/+$/g, "");

  if (clean === "" || clean === "/" || clean === "/products") {
    const products = await getProductsDataFromJson();
    displayAllProductsView(products);
    return;
  }

  if (clean.startsWith("/product/")) {
    const parts = clean.split("/");
    const id = parts[2];
    displayProductDetailView(Number(id));
    return;
  }

  if (clean === "/favorites") {
    displayFavoritesView();
    return;
  }

  if (clean === "/cart") {
    displayCartView();
    return;
  }

  const products = await getProductsDataFromJson();
  displayAllProductsView(products);
}

// Handle browser navigation (back/forward)
window.addEventListener("popstate", () => {
  handleRoute(location.pathname).catch((err) => console.error(err));
});

// Initial load
document.addEventListener("DOMContentLoaded", () => {
  handleRoute(location.pathname).catch((err) => console.error(err));
});
