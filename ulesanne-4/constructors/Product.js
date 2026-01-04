export class Product {
  constructor(id, name, price, category, description = "") {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.description = description;
  }

  describe() {
    return `${this.name} - ${this.category} - $${this.price}`;
  }

  static discountedPrice(price, discount) {
    return price - (price * discount) / 100;
  }
}
