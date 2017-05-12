var express = require("express");
var router = express.Router();
var pets = require("../models/pets.js");

router.get("/", function(req, res) {
    pets.selectAll(function(data) {
	var burObj = {
	    pets: data
	};
	res.render("index", burObj);
    });
});

router.post("/", function(req, res) {
    pets.create([], [], function() {
	res.redirect("/");
    });

});

router.put("/:id", function(req, res) {
    pets.updateOne([req.params.id], function() {
	res.redirect("/");
    });
});
module.exports = router;
