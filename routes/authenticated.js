const express = require('express');
var app = express();
var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.resolve(__dirname + '/../productImages'))
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname)
  }
})
var router = express.Router();
var user = require('../api/user.js');
var product = require('../api/products.js');
router.post('/updatePassword', user.updatePassword);
router.post('/changePassword', user.changePassword);
router.post('/updateUser', user.updateUser);
router.post('/addProduct', multer({ storage: storage }).array('file', 1), product.addProduct);
router.post('/updateProduct', multer({ storage: storage }).array('file', 1), product.updateProduct);
router.post('/deleteProduct', product.deleteProduct);
router.get('/pendingUsers', user.pendingUsers);
router.post('/approveAdmin', user.approveAdmin);
router.post('/rejectVerification', user.rejectVerification)
router.get('/getOrders', product.getOrder)

module.exports = router;