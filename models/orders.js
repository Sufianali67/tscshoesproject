var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    phone: {type:Number, required: false},
    bill:{ type: Number, required: true},
    address:{ type: String,required : true},
    products :{type: Array},
    name: {type: String, required: false}
}, { timestamps: true });
module.exports = mongoose.model('Order', orderSchema);
