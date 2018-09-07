var mongoose = require('mongoose');
 productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    }
});
module.exports = mongoose.model('Product', productSchema);