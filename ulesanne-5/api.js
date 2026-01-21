import { Product } from "./constructors/Product.js";

export async function fetchProducts() {
  try {
    const res = await fetch("/api/products");
    return await res.json();
  } catch (e) {
    console.error("fetchProducts error", e);
    return [];
  }
}

export async function fetchCategories() {
  try {
    const res = await fetch("/api/categories");
    return await res.json();
  } catch (e) {
    console.error("fetchCategories error", e);
    return [];
  }
}

export async function fetchProductsByCategory(category) {
  try {
    const res = await fetch(
      "/api/products/category/" + encodeURIComponent(category),
    );
    return await res.json();
  } catch (e) {
    console.error("fetchProductsByCategory error", e);
    return [];
  }
}

export const getProductsDataFromJson = async () => {
  try {
    const jsonData = await fetchProducts();
    const constructedData = jsonData.map(
      (product) =>
        new Product(
          product.id,
          product.name || product.title || "",
          product.price,
          product.category,
          product.description || "",
          product.image || "",
        ),
    );
    return constructedData;
  } catch (error) {
    console.error(error);
    return [];
  }
};
