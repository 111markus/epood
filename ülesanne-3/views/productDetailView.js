export const dispalyProductDetailView = (product) => {
  const container = document.getElementById("detailed-view");
  container.innerHTML = "";

  const productCard = document.createElement("div");
  productCard.classList.add("product");

  productCard.innerHTML = `
      <h2>${product.name}</h2>
      <p>Kategooria: ${product.category}</p>
      <p>Hind: $${product.price}</p>
      <p>ID: ${product.id}</p>
    `;

  container.append(productCard);
};
