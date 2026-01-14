export class Cart {
  constructor() {
    this.items = [];
    this.load();
  }

  getAllProducts() {
    return this.items;
  }

  save() {
    try {
      localStorage.setItem("cart_items", JSON.stringify(this.items));
    } catch (e) {
      console.warn("Unable to persist cart to localStorage", e);
    }
    this.displayTotalItems();
  }

  load() {
    try {
      const data = localStorage.getItem("cart_items");
      if (data) this.items = JSON.parse(data);
    } catch (e) {
      this.items = [];
    }
    this.displayTotalItems();
  }

  addProduct(product, quantity = 1) {
    const existing = this.items.find((item) => item.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    this.save();
  }

  updateProductQuantity(productId, delta) {
    const item = this.items.find((i) => i.product.id === productId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeProduct(productId);
      return;
    }
    this.save();
  }

  removeProduct(productId) {
    this.items = this.items.filter((i) => i.product.id !== productId);
    this.save();
  }

  calculateTotal() {
    return this.items.reduce(
      (total, item) => total + (item.product.price || 0) * item.quantity,
      0
    );
  }

  displayTotalItems() {
    const el = document.getElementById("cart-count");
    if (!el) return;
    const total = this.items.reduce((sum, it) => sum + it.quantity, 0);
    el.textContent = total;
  }

  clear() {
    this.items = [];
    this.save();
  }
}

export const cartConstructor = new Cart();
