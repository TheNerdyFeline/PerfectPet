// need to check all routes file names for layout
var db  = require('../models');
var express = require('express');
var router  = express.Router();
var passport = require("../config/passport");

// this is for current user to log-in
router.get('/login', function(req, res){
    res.render('login', {
    });
});

//this is the new pet form
router.get('/petreg', function(req,res) {
	res.render('petreg', {
    layout: 'pet-registration'
  });
});

router.get('/sign-out', function(req,res) {
  req.logout();
  res.redirect("/");
});


// login
router.post('/login', passport.authenticate("local"), function(req, res) {
    // sending the user back the route to the members page because the redirect will happen on the front end
  res.json("/");
});


// register a user
router.post('/signup', function(req,res) {
	db.User.findOne({
    where: {email: req.body.email}
  }).then(function(results) {
    if (results !== null) {
      res.json({
        duplicateUser: true
      });
    //At some point, make sure that only one user can be associated with an email.
    } else {
	db.User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
	}).then(function() {
            res.send({redirect: '/'});
	}).catch(function(err) {
            res.json(err);
	});
    }
  });
});

//register new pet
router.post("/petreg", function(req, res) {
    db.pets
});

module.exports = router;
