import { Order } from "./Order.js";

export class Customer {
  constructor(name) {
    this.name = name;
    this.orderHistory = [];
    this.favorites = [];
    // laadime serverist olemasolevad lemmikud
    this.loadFavorites();
  }

  placeOrder(cart) {
    const order = new Order(cart);
    this.orderHistory.push(order);
  }

  printOrderHistory() {
    console.log(`${this.name} tellimuste ajalugu:`);
    this.orderHistory.forEach((order, index) => {
      console.log(
        `Tellimus ${
          index + 1
        } - Kuupäev: ${order.orderDate.toDateString()}, Kogusumma: $${order.cart.calculateTotal()}`,
      );
    });
  }

  async loadFavorites() {
    try {
      const res = await fetch("/api/favorites");
      const favs = await res.json();
      // Normalize to { product } shape
      this.favorites = favs.map((f) => f.product || f);
    } catch (err) {
      console.error("Failed to load favorites", err);
      this.favorites = [];
    }
  }

  toggleFavorites(product) {
    const id = product.id;
    if (this.favorites.includes(id)) {
      this.favorites = this.favorites.filter((f) => f !== id);
    } else {
      this.favorites.push(id);
    }
  }

  getAllFavorites() {
    return this.favorites;
  }
}

export const customerConstructor = new Customer("Mart");
