var Product = require('../models/product');
var mongoose = require('mongoose');

exports.products_get_all = (req,res,next) =>{
    Product.find()
    .Select("name price _id")
    .exec()
    .then(docs => {
        var response = {
            count: docs.lenght,
            products: docs.map(doc =>{
                return{
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/products/' +doc._id
                    }
                }
 
            })
        }
        console.log(response);
        res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
 }; 

 exports.products_create_product = (req,res,next) =>{
    console.log(req.file);
    var product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
       product
        .save()
        .then(result => {
           console.log(result);
           res.status(201).json({
            message: "Created product successfully",
            createdProduct: {
                name: result.nmae,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/products/' + result._id
                }
            }
           });
        })
           .catch(err =>{
               console.log(err);
               res.status(500).json({
               error: err
               });
           });
};

exports.products_get_product = (req,res,next) =>{
    var id = req.params.productId;
    Product.FindById(id)
    .select("name price _id")
    .exec()
    .then(doc =>{
        console.log(doc);
        res.status(200).json({
            product: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products' + response._id
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

exports.products_update_product =  (req,res,next) =>{
    var id = req.body.params.productId;
    Product.update({ _id: id }, { $set:{ name: req.body.newName, price: req.body.newPrice}})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Product Updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products/' + _id
            }
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        });
    });
};

exports.products_delete = (req,res,next) =>{
    var id = req.body.params.productId;
    Product.remove({ _id: id })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Product Deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/products',
                body: { name: 'String', price: 'Number'}
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err });
    });
};
