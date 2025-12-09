export class Cart {
  constructor() {
    this.items = [];
  }

  getAllProducts() {
    return this.items;
  }

  addProduct(product, quantity = 1) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    this.displayTotalItems();
  }

  updateProductQuantity(productId, delta) {
    const item = this.items.find((item) => item.product.id === productId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.removeProduct(productId);
      }
    }
    this.displayTotalItems();
  }

  removeProduct(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.displayTotalItems();
  }

  calculateTotal() {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  displayTotalItems() {
    const cartCout = document.getElementById("cart-count");

    cartCout.innerHTML = this.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  clear() {
    this.items = [];
  }
}

export const cartConstructor = new Cart();
