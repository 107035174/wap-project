const express = require('express');
const shoppingCartController = require('../Controller/ShoppingCartController');
const middleware = require('../Middleware/Auth');

const router = express.Router();

router.get('/', shoppingCartController.getShoppingCarts);

router.post('/', shoppingCartController.addToCart)

router.put('/', shoppingCartController.removeCart)

router.post('/order', shoppingCartController.placeOrder)

middleware(router);

module.exports = router;