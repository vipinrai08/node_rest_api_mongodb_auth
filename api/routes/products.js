var express = require('express');
var router = express.Router();
var multer = require('multer');
var checkAuth = require('../middleware/check-auth');
var upload = multer({ dest: 'uploads/'});
var ProductsController = require('../controllers/products');


router.get('/', ProductsController.products_get_all);

router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_create_product);

router.get('/:productId', ProductsController.products_get_product);

router.put('/:productId', checkAuth,ProductsController.products_update_product);

router.delete('/:productId', checkAuth, ProductsController.products_delete);

module.exports = router;