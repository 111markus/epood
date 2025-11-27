//TOODETE LISAMINE E-POODI
class Product {
  constructor(id, title, price, category) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.category = category;
  }

  describe() {
    return `${this.title} – ${this.price}€ (${this.category})`;
  }

  static discountedPrice(price, percent) {
    return price - (price * percent) / 100;
  }
}

const laptop = new Product(1, "Sülearvuti", 999.99, "Elektroonika");

console.log(laptop.describe());
console.log(Product.discountedPrice(laptop.price, 10)); // 10% allahindlus

//OSTUKORV

class Cart {
  constructor() {
    this.items = [];
  }

  addProduct(product, quantity) {
    const existing = this.items.find((item) => item.product.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  removeProduct(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }

  calculateTotal() {
    return this.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  get totalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}

const cart = new Cart();
cart.addProduct(laptop, 2);

console.log(cart.calculateTotal()); // kokku hind
console.log(cart.totalItems); // kokku tooteid ostukorvis

//ORDER

class Order {
  constructor(cart) {
    this.orderDate = new Date();
    this.cart = cart;
  }

  printOrder() {
    console.log(`Tellimuse kuupäev: ${this.orderDate.toLocaleString()}`);
    console.log("Tellimuse tooted:");

    this.cart.items.forEach((item) => {
      console.log(
        `- ${item.product.title} x ${item.quantity} = ${
          item.product.price * item.quantity
        }€`
      );
    });

    console.log(`Kogusumma: ${this.cart.calculateTotal().toFixed(2)}€`);
  }
}

const order = new Order(cart);
order.printOrder();

//Kliendi klass ja tellimuste ajalugu

class Customer {
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

const customer = new Customer("Mart");
customer.placeOrder(cart);
customer.printOrderHistory();
