export class Product {
    constructor(title, description, category, price, img, id = null) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.price = price;
        this.img = img;
    }
}