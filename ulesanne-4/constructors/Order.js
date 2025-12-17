export class Order {
  constructor(cart) {
    this.orderDate = new Date();
    this.cart = cart;
  }

  printOrder() {
    console.log(`Tellimuse kuupäev: ${this.orderDate.toDateString()}`);
    this.cart.items.forEach((item) => {
      console.log(
        `${item.product.name} - $${item.product.price} x ${item.quantity}`
      );
    });
    console.log(`Kogusumma: $${this.cart.calculateTotal()}`);
  }
}

export const oderConstructor = new Order();
