export class Product {
    constructor(id = null, title, description, category, price, img, enabled = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.enabled = enabled;
        this.price = price;
        this.img = img
    }
}