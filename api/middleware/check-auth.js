 var jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        var token = token.headers.authorization.split(" ")[1];
        var decoded = jwt.verify(token, procees.env.JWT_KEY);
        req.userData = decoded;
        next();
    }
    catch  (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
    
   

};