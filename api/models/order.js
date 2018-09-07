var mongoose = require('mongoose');

 orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type:mongoose.Schema.Types.ObjectId, ref: 'Product', require: true},
    quantity: { type: Number, deafault: 1 }
});
module.exports = mongoose.model('Order', orderSchema);