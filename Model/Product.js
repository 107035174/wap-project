
class Product {
    constructor(id, name, price, img, stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
        this.stock = stock;
    }

    save() {
        this.id = Math.random().toString();
        products.push(this);
        return this;
    }

    update() {
        const index = products.findIndex(p => p.id === this.id);
        if (index > -1) {
            products.splice(index, 1, this);
            return this;
        }
        else {
            throw new Error('PRODUCT NOT FOUND');
        }
    }

    static fetchAll() {
        return products;
    }

    static findById(productId) {
        const index = products.findIndex(p => p.id === productId)
        if (index > -1) {
            return products[index];
        } else {
            throw new Error('PRODUCT NOT FOUND');
        }
    }
    static deleteById(productId) {
        const index = products.findIndex(p => p.id === productId)
        if (index > -1) {
            products = products.filter(p => p.id !== productId);
        } else {
            throw new Error('PRODUCT NOT FOUND');
        }
    }

}

let products = [
    new Product(1, "Node", 9.99, "node_logo.png", 8),
    new Product(2, "React", 19.99, "react_logo.png", 5),
    new Product(3, "Angular", 29.99, "angular_logo.png", 13)];

module.exports = Product;