export class Product {
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
