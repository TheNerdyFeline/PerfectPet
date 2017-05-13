// need to check all routes file names for layout
var db  = require('../models');
var express = require('express');
var router  = express.Router();
var passport = require("../config/passport");

// this is for current user to log-in
router.get('/login', function(req, res){
    res.render('login');
});

//this is the new pet form
router.get('/petreg', function(req,res) {
	res.render('petreg', {
    layout: 'pet-registration'
  });
});

// user signout
router.get('/sign-out', function(req,res) {
  req.logout();
  res.redirect("/");
});


// login authenticate
router.post('/login', passport.authenticate("local"), function(req, res) {
    // sending the user back the route to the members page because the redirect will happen on the front end
  res.json("/");
});


// register a new user
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
    db.Pets.create({
	petName: req.body.name,
	birthday: req.body.birthday
	gender: req.body.gender
	species: req.body.species
	breed: req.body.breed
    });
});

// current pet homepage
// needs to default to first pet reg how?
router.get("/:id", function(req, res) {
    if(req.params.id === null) {
	db.Pet.findOne({
	    where: {}
	})
    } else {
	db.Pet.findOne({
	    where: {id: req.params.id}
	}).then(function(results) {
	    res.render("");
	});
    }
});

// main feed
router.get("/mainFeed", function(req, res) {
    res.render();
});

// update pet page


module.exports = router;
