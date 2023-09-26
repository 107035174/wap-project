const Product = require("../Model/Product");

exports.getProducts = (req, res, next) => {
    res.status(200).json(Product.fetchAll());
}

exports.getProductById = (req, res, next) => {
    res.status(200).json(Product.fetchById(req.param.bookId));
}

exports.save = (req, res, next) => {
    const product = req.body;
    const savedBook = new Product(null, product.name, product.price, product.stock).save();
    res.status(200).json(savedBook);
}

exports.update = (req, res, next) => {
    const product = req.body;
    const updatedBook = new Product(req.param.productId, product.name, product.price, product.stock).update();
    res.status(200).json(updatedBook);
}

exports.deleteById = (req, res, next) => {
    Product.deleteById(req.param.bookId);
    res.status(200).end();
}