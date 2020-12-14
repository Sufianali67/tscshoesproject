var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    price:{ type: Number, required: true},
    imagePath:{type:String},
    imageOriginalName :{type: String}
}, { timestamps: true });
module.exports = mongoose.model('Product', ProductSchema);
