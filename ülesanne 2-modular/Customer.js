import { Order } from "./Order.js";

export class Customer {
  constructor(name) {
    this.name = name;
    this.orderHistory = [];
  }

  placeOrder(cart) {
    const order = new Order(cart);
    this.orderHistory.push(order);
  }

  printOrderHistory() {
    console.log(`Kliendi "${this.name}" tellimuste ajalugu:`);

    this.orderHistory.forEach((order, index) => {
      console.log(
        `${
          index + 1
        }. Tellimus – ${order.orderDate.toLocaleString()}, kokku: ${order.cart
          .calculateTotal()
          .toFixed(2)}€`
      );
    });
  }
}
