export class Product {
    constructor(title, description, category, price, img, id = null, status = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.status = status;
        this.price = price;
        this.img = img
    }
}