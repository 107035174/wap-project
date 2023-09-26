const ShoppingCart = require("../Model/ShoppingCart");
const User = require("../Model/User");

exports.getShoppingCarts = (req, res) => {
    const user = User.auth(req.get("Authorization"));
    res.status(200).json(ShoppingCart.getShoppingCart(user.username));
}

exports.addToCart = (req, res) => {
    console.log(req.body)
    const { productid } = req.body;
    if (!productid) {
        res.status(403).json({ error: "please include products" })
    }
    console.log(productid);
    const user = User.auth(req.get("Authorization"));
    const cart = ShoppingCart.addToShoppingCart(productid, user.username);
    res.status(200).json(cart);
}

exports.removeCart = (req, res) => {
    console.log(req.body)
    const { productid } = req.body;
    if (!productid) {
        res.status(403).json({ error: "please include products" })
    }
    console.log(productid);
    const user = User.auth(req.get("Authorization"));
    const cart = ShoppingCart.removeFromShoppingCart(productid, user.username);
    res.status(200).json(cart);
}

exports.placeOrder = (req, res) => {
    const user = User.auth(req.get("Authorization"));
    const result = ShoppingCart.placeOrder(user.username);
    res.status(200).json(result);
}