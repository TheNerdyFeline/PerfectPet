var db  = require('../models');
var express = require('express');
var router  = express.Router();
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");

// homepage load
router.get("/", function(req , res) {
    res.render("index");
});

// new user sign up page
router.get("/newuser", function(req, res) {
    res.render("newuser");
});

//this is the new pet form page
router.get("/newpet", function(req,res) {
	res.render("newpet");
});

// user signout
router.get("/sign-out", function(req,res) {
  req.logout();
  res.redirect("/");
});

// current pet homepage
router.get("/pets/:id", isAuthenticated, function(req, res) {
    db.Pet.findAll({
	where: {uuid: req.params.id}
    }).then(function(results) {
	var userAllPets = {userPets: results};
	res.render("profile", userAllPets);
    });
});

// main feed
router.get("//mainFeed/:id",  isAuthenticated, function(req, res) {
    // get posts from db to load in feed
    res.render("feed");
});

// load settings pages
router.get("/settings/:id",  isAuthenticated, function(req, res) {
    db.User.findOne({
	where: {id: req.params.id}
    }).then(function(user){
	var userInfo =  {userInfo: user};
	res.render("settings", userInfo);
    });
});


// login authenticate
router.post("/login", passport.authenticate("local"), function(req, res) {
    // sending the user back the route to the members page because the redirect will happen on the front end
    console.log(req.user);
    var userId = (req.user.id);
    //res.send('ok');
    res.json("/pets/" + userId);
});


// register a new user
router.post("/signup", function(req,res) {
    db.User.findOne({
    where: {email: req.body.email}
  }).then(function(results) {
    if (results !== null) {
      res.json({
        duplicateUser: true
      });
    } else {
	db.User.create({
            first_name: req.body.firstname,
	    last_name: req.body.lastname,
            email: req.body.email,
            password: req.body.password
	}).then(function(newUser) {
	    console.log(newUser.dataValues.id);
	    var userId = (newUser.dataValues.id).toString();
	    res.send(userId);
	}).catch(function(err) {
            res.json(err);
	});
    }
  });
});

//register new pet
router.post("/petreg", isAuthenticated, function(req, res) {
    console.log(req.body);
    db.Pet.create({
	petname: req.body.petname,
	birthday: req.body.birthday,
	gender: req.body.gender,
	species: req.body.species,
	breed: req.body.breed,
	uuid: req.body.uuid
    }).then(function(newPet) {
	console.log(newPet);
	res.send('ok');
	// var petId = newPet.uuid;
	// loads profile page with new pet
	// res.json("/pets/" + petId);
    }).catch(function(err){
	console.log(err);
    });
});

// create new post
router.post(isAuthenticated, function(req, res) {
    db.Post.create({
	post: req.body.post
    });
});


// update pet page
router.put("/:id/petupdate", isAuthenticated, function(req, res) {
    
});

// update user info page
router.put("/:id/settings", isAuthenticated, function(req, res) {
    
});

module.exports = router;
