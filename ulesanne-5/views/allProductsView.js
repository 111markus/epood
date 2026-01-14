import { cartConstructor } from "../constructors/Cart.js";
import { customerConstructor } from "../constructors/Customer.js";
import { navigate } from "../router.js";
import {
  getProductsDataFromJson,
  fetchCategories,
  fetchProductsByCategory,
} from "../api.js";

const container = document.getElementById("products-container");
const categorySelect = document.getElementById("category-select");

async function renderCategories() {
  const categories = await fetchCategories();
  if (!categorySelect) return;
  // clear
  categorySelect.innerHTML = "";
  const allOpt = document.createElement("option");
  allOpt.value = "";
  allOpt.textContent = "All categories";
  categorySelect.appendChild(allOpt);
  categories.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    categorySelect.appendChild(opt);
  });
}

async function loadAndRenderProducts(category = "") {
  container.innerHTML = "Loading...";
  let products = [];
  if (category) {
    products = await fetchProductsByCategory(category);
  } else {
    products = await getProductsDataFromJson();
  }

  container.innerHTML = "";
  if (!products || products.length === 0) {
    container.textContent = "No products found";
    return;
  }

  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image || ""}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.category || ""}</p>
      <p>$${p.price}</p>
    `;
    container.appendChild(card);
  });
}

// Init
(async function init() {
  await renderCategories();
  await loadAndRenderProducts();
  if (categorySelect) {
    categorySelect.addEventListener("change", async (e) => {
      const cat = e.target.value;
      await loadAndRenderProducts(cat);
    });
  }
})();

export const displayAllProductsView = (products) => {
  const container = document.getElementById("main-container");
  container.innerHTML = "<h2>Tooted</h2>";

  // Controls: category select
  const controls = document.createElement("div");
  controls.classList.add("products-controls");

  const categoryLabel = document.createElement("label");
  categoryLabel.textContent = "Kategooria: ";
  categoryLabel.htmlFor = "view-category-select";

  const select = document.createElement("select");
  select.id = "view-category-select";
  const defaultOpt = document.createElement("option");
  defaultOpt.value = "";
  defaultOpt.textContent = "Kõik kategooriad";
  select.appendChild(defaultOpt);

  controls.appendChild(categoryLabel);
  controls.appendChild(select);
  container.appendChild(controls);

  const productsContainer = document.createElement("div");
  productsContainer.classList.add("products-container");
  container.appendChild(productsContainer);

  function renderProductsList(list) {
    productsContainer.innerHTML = "";
    if (!list || list.length === 0) {
      productsContainer.textContent = "No products found";
      return;
    }

    list.forEach((product) => {
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
  }

  // category
  (async () => {
    const cats = await fetchCategories();
    cats.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      select.appendChild(opt);
    });
  })();

  select.addEventListener("change", async (e) => {
    const cat = e.target.value;
    if (!cat) {
      const all = await getProductsDataFromJson();
      renderProductsList(all);
    } else {
      const byCat = await fetchProductsByCategory(cat);
      renderProductsList(byCat);
    }
  });

  // initial render
  renderProductsList(products);
};
