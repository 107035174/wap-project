const express = require('express');
const productController = require('../Controller/productController');
const middleware = require('../Middleware/Auth');

const router = express.Router();

router.get('/', productController.getProducts);

router.get('/:productId', productController.getProductById);

router.post('/', productController.save)

router.put('/:productId', productController.update)

router.delete('/:productId', productController.deleteById);

middleware(router);

module.exports = router;