var chai = require('chai');
var should = chai.should();
var Product = require('../models/product');
var Order = require('../models/order');
var User = require('../models/user');


describe('User Model', function() {
	it('should create a new user', function(done) {
         if(user.length <1)
		var user = new User({
			email: 'test@gmail.com',
			password: 'password'
		});
		user.save(function(err) {
			if (err) return done(err);
			done();
		});
    });

     it('should email string', function () {
         var user = new User({
             email: "test@gmail.com",
             password: "password"
         });
         user.save(function(err){
             if(err) return done(err);
             done();
         });
     });
 
    it('should not create with invalide user email', function(done) {
		var user = new User({
			email: 'test@gmail.com',
			password: 'password'
		});
		user.save(function(err) {
			if (err) err.code.should.equal(10000);
			done();
		});
	});

	it('should find user by email', function(done) {
		User.findOne({ email: 'test@gmail.com' }, function(err, user) {
			if (err) return done(err);
			user.email.should.equal('test@gmail.com');
			done();
		});
	});

	it('should delete a user', function(done) {
		User.remove({ email: 'test@gmail.com' }, function(err) {
			if (err) return done(err);
			done();
		});
	});
});

