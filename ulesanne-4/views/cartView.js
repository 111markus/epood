import { cartConstructor } from "../constructors/Cart.js";
import { customerConstructor } from "../constructors/Customer.js";

const VAT_RATE = 0.2; // 20%

export const displayCartView = () => {
  const container = document.getElementById("main-container");
  container.innerHTML = "<h2>Ostukorv</h2>";

  const cart = cartConstructor.getAllProducts();

  if (!cart.length) {
    const cartItemElement = document.createElement("p");
    cartItemElement.innerText = "Ostukorv on tühi";
    container.append(cartItemElement);
    return;
  }

  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart-item");

    const info = document.createElement("div");
    info.classList.add("cart-info");

    const title = document.createElement("h3");
    title.textContent = item.product.name;

    const price = document.createElement("p");
    price.textContent = `Hind: $${item.product.price.toFixed(2)}`;

    info.appendChild(title);
    info.appendChild(price);

    const controls = document.createElement("div");
    controls.classList.add("cart-controls");

    const decBtn = document.createElement("button");
    decBtn.classList.add("qty-btn");
    decBtn.textContent = "-";
    decBtn.onclick = () => {
      cartConstructor.updateProductQuantity(item.product.id, -1);
      displayCartView();
    };

    const qty = document.createElement("div");
    qty.classList.add("qty-display");
    qty.textContent = item.quantity;

    const incBtn = document.createElement("button");
    incBtn.classList.add("qty-btn");
    incBtn.textContent = "+";
    incBtn.onclick = () => {
      cartConstructor.updateProductQuantity(item.product.id, 1);
      displayCartView();
    };

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-btn");
    removeButton.textContent = "Eemalda";
    removeButton.onclick = () => {
      cartConstructor.removeProduct(item.product.id);
      displayCartView();
    };

    controls.appendChild(decBtn);
    controls.appendChild(qty);
    controls.appendChild(incBtn);
    controls.appendChild(removeButton);

    cartItemElement.appendChild(info);
    cartItemElement.appendChild(controls);

    container.append(cartItemElement);
  });

  // Totals
  // Products' `price` is treated as BRUTO (hind sisaldab KM).
  // Arvutame esmalt kogusumma brutona, seejärel eraldame KM osaks.
  const totalGross = cartConstructor.calculateTotal();
  const subtotalNet = totalGross / (1 + VAT_RATE);
  const vat = totalGross - subtotalNet;

  const totalsEl = document.createElement("div");
  totalsEl.classList.add("cart-totals");
  totalsEl.innerHTML = `
    <p>Algsumma (ilma KM): $${subtotalNet.toFixed(2)}</p>
    <p>Käibemaks (${(VAT_RATE * 100).toFixed(0)}%): $${vat.toFixed(2)}</p>
    <p><strong>Kokku (sisaldab KM): $${totalGross.toFixed(2)}</strong></p>
  `;

  const buyBtn = document.createElement("button");
  buyBtn.classList.add("buy-btn");
  buyBtn.textContent = "Osta";
  buyBtn.onclick = () => {
    customerConstructor.placeOrder(cartConstructor);
    cartConstructor.clear();
    cartConstructor.displayTotalItems();
    displayCartView();
    alert("Tellimus on kinnitatud!");
  };

  const clearBtn = document.createElement("button");
  clearBtn.classList.add("clear-btn");
  clearBtn.textContent = "Tühjenda ostukorv";
  clearBtn.onclick = () => {
    cartConstructor.clear();
    cartConstructor.displayTotalItems();
    displayCartView();
  };

  const actionsWrap = document.createElement("div");
  actionsWrap.classList.add("cart-actions");
  actionsWrap.appendChild(buyBtn);
  actionsWrap.appendChild(clearBtn);

  container.append(totalsEl, actionsWrap);
};
