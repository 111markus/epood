class Product {
  constructor(id, title, price, category) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.category = category;
  }

  describe() {
    console.log(
      `Toode: ${this.title}, hind: ${this.price}€, kategooria: ${this.category}`
    );
  }

  static discountedPrice(price, discountPercent) {
    const discount = price * (discountPercent / 100);
    return +(price - discount).toFixed(2); //
  }
}

const laptop = new Product(
  Math.floor(Math.random() * 100),
  "Sülearvuti",
  999.99,
  "Elektroonika"
);

console.log(laptop.describe());
console.log(Product.discountedPrice(laptop.price, 10)); // 10% allahindlus

//OSTUKORV
