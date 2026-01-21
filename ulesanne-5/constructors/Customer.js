import { Order } from "./Order.js";

export class Customer {
  constructor(name) {
    this.name = name;
    this.orderHistory = [];
    this.favorites = []; // store IDs
    this.favoritesLoaded = false;
    // load but don't block constructor
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
      // Map server response ([{ product }]) to array of IDs
      this.favorites = (favs || [])
        .map((f) => {
          const p = f.product || f;
          return Number(p.id);
        })
        .filter(Boolean);
    } catch (err) {
      console.error("Failed to load favorites", err);
      this.favorites = [];
    } finally {
      this.favoritesLoaded = true;
    }
  }

  async toggleFavorites(product) {
    const id = Number(product.id);
    const exists = this.favorites.includes(id);

    if (exists) {
      // optimistic update
      this.favorites = this.favorites.filter((f) => f !== id);
      try {
        await fetch(`/api/favorites/${id}`, { method: "DELETE" });
      } catch (e) {
        console.error("Failed to remove favorite", e);
        // revert on failure
        if (!this.favorites.includes(id)) this.favorites.push(id);
      }
    } else {
      this.favorites.push(id);
      try {
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product }),
        });
      } catch (e) {
        console.error("Failed to add favorite", e);
        // revert on failure
        this.favorites = this.favorites.filter((f) => f !== id);
      }
    }
  }

  getAllFavorites() {
    return this.favorites;
  }
}

export const customerConstructor = new Customer("Mart");
