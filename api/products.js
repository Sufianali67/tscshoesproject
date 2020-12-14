var Product = require('../models/products.js');
var Order = require('../models/orders.js');
var Service = require('../services/service.js')
exports.addProduct = async (req, res) => {
    var params = req.body
    if (req.user.role == "admin") {
        if (params.name != null && params.name != undefined && params.name != "") {
            if (params.quantity != null && params.quantity != undefined && params.quantity != "") {
                if (params.price != null && params.price != undefined && params.price != "") {
                    if (req.files.length > 0) {
                        Service.uploadImage(req.files[0]).then(image => {
                            params.imageOriginalName = req.files[0].originalname
                            params.imagePath = image.url
                            Product.create(params).then(result => {
                                if (result) {
                                    res.status(200).send({ success: true, message: "Product added successfully" })
                                } else {
                                    res.status(403).send({ success: false, message: "Something went wrong in adding product" })
                                }
                            })
                        })
                    } else {
                        res.status(403).send({ success: false, message: "Product image required" })
                    }
                } else {
                    res.status(403).send({ success: false, message: "Price required" })
                }
            } else {
                res.status(403).send({ success: false, message: "Quantity required" })
            }
        } else {
            res.status(403).send({ success: false, message: "Product name required" })
        }
    } else {
        res.status(400).send({ success: false, message: "Only admin can perform this action" })
    }
}

exports.getAllProducts = (req, res) => {
    Product.find({ isDeleted: false }).exec((err, result) => {
        if (err) {
            res.status(500).send({ success: false, message: "Internal server error" })
        } else {
            if (result.length > 0) {
                res.status(200).send({ success: true, message: "Products found successfully", products: result })
            } else {
                res.status(403).send({ success: false, message: "No products found" })
            }
        }
    })
}

exports.updateProduct = async (req, res) => {
    if (req.user.role == "admin") {
        let params = req.body
        Product.findOne({ _id: params.id }).exec(async (error, result) => {
            if (error) {
                res.status(500).send({ success: false, message: "Internal server error", error: error })
            } else {
                if (result) {
                    if (req.files.length > 0) {
                        await Service.uploadImage(req.files[0]).then(image => {
                            result.imagePath = image.url
                        })
                        result.imageOriginalName = req.files[0].originalname

                    }
                    result.name = params.name
                        ? params.name
                        : result.name;
                    result.quantity = params.quantity
                        ? params.quantity
                        : result.quantity;
                    result.price = params.price
                        ? params.price
                        : result.price;

                    result.save((err, updatedProduct) => {
                        if (err) {
                            res.status(500).send({ success: false, message: "Internal server error", error: err })
                        } else {
                            res.status(200).send({ success: true, message: "Product updated successfully", user: updatedProduct })
                        }
                    })
                } else {
                    res.status(403).send({ success: false, message: "Product not found" })
                }
            }
        })
    } else {
        res.status(400).send({ success: false, message: "Only admin can perform this action" })
    }
}

exports.deleteProduct = (req, res) => {
    if (req.user.role == "admin") {
        let params = req.body
        Product.updateOne({ _id: params.id }, { isDeleted: true }).exec((error, result) => {
            if (error) {
                res.status(500).send({ success: false, message: "Internal server error", error: error })
            } else {
                res.status(200).send({ success: false, message: "Product deleted successfully" })
            }
        })
    } else {
        res.status(400).send({ success: false, message: "Only admin can perform this action" })
    }
}

exports.checkout = async (req, res) => {
    var params = req.body
    console.log("params are",params)
    await Promise.all(params.products.map(async (x,idx,y)=>{
        console.log("here")
        var product = await Product.findOne({ _id: x._id }).exec()
        var quantity = product.quantity - parseInt(x.selectedQuantity)
        var update = await Product.updateOne({ _id: x._id }, { quantity: quantity }).exec()
    }));    
    if (params.bill != null && params.bill != undefined && params.bill != "") {
        if (params.address != null && params.address != undefined && params.address != "") {
            Order.create(params).then(result => {
                if (result) {
                    res.status(200).send({ success: true, message: "Order created successfully" })
                } else {
                    res.status(403).send({ success: false, message: "Something went wrong in creating order" })
                }
            })
        } else {
            res.status(403).send({ success: false, message: "Address is required" })
        }
    } else {
        res.status(403).send({ success: false, message: "Total bill is required" })
    }
}

exports.getOrder = (req, res) => {
    if (req.user.role == "admin") {
        Order.find({}).exec((err, result) => {
            if (err) {
                res.status(500).send({ success: false, message: "Internal server error" })
            } else {
                res.status(200).send({ success: true, result: result })
            }
        })
    } else {
        res.status(401).send({ success: false, message: "You are unauthorised for this action" })
    }
}