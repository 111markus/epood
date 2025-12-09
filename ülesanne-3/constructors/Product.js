export class Product {
  constructor(id, name, price, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
  }

  describe() {
    return `${this.name} - ${this.category} - $${this.price}`;
  }

  static discountedPrice(price, discount) {
    return price - (price * discount) / 100;
  }
}
