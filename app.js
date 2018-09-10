var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restshop');
var db = mongoose.connection;


var productRoutes = require('./api/routes/products');
var orderRoutes = require('./api/routes/orders');
var userRoutes = require('./api/routes/user');  

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//for CORS
app.use((req,res,next) =>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Header", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    if(request.methode === "OPTION"){
        res.header("Access-Control-Allow-Methods",'PUT, PATCH, POST, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// routes which should handle request
app.use('./products', productRoutes);
app.use('./orders', orderRoutes);
app.use('./user', userRoutes);

app.use((req,res,next) =>{
let error = new Error('Not Found'); 
    error.status = 404;
    next(error);
})
app.use((error,req,res,next) =>{
    res.status(error.status ||500);
    res.json({
        error:{
            message: error.message
        }
    });
});

var port = process.env.PORT || 3000;
app.use((req, res, next) => {
    res.status(200).json({
        message: 'its work!'
    });
});
app.listen(port,function(){
    console.log('running api-demo on port' +port)
});
