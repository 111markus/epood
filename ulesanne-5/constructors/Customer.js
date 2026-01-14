import { Order } from "./Order.js";

export class Customer {
  constructor(name) {
    this.name = name;
    this.orderHistory = [];
    this.favorites = [];
    // laadime serverist olemasolevad lemmikud (asünkroonne)
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
        } - Kuupäev: ${order.orderDate.toDateString()}, Kogusumma: $${order.cart.calculateTotal()}`
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

  async toggleFavorites(product) {
    const existing = this.favorites.find(
      (f) => Number(f.product?.id || f.id) === Number(product.id)
    );
    if (existing) {
      // optimistlik update + DELETE to BE
      this.favorites = this.favorites.filter(
        (f) => Number((f.product || f).id) !== Number(product.id)
      );
      try {
        await fetch(`/api/favorites/${product.id}`, { method: "DELETE" });
      } catch (err) {
        console.error("Failed to delete favorite", err);
      }
    } else {
      // optimistlik update + POST to BE
      this.favorites.push({ product });
      try {
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product }),
        });
      } catch (err) {
        console.error("Failed to add favorite", err);
      }
    }
  }

  getAllFavorites() {
    // return normalized { product } array for backward compat
    return this.favorites.map((f) => (f.product ? f : { product: f }));
  }
}

export const customerConstructor = new Customer("Mart");
