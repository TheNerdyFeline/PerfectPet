$(document).ready(function() {
    // declare var
    var userObj = {};
    var petObj = {};
    var userId = sessionStorage.getItem('userId');

    // materialize functions
    $(".button-collapse").sideNav();
    $("#login-modal").modal();
    $(".parallax").parallax();
    $('.modal').modal();

    // grab new user info from form on click
    $('#signmeup').on('click', function(e){
      document.querySelectorAll('input, select').forEach(function(el){
        userObj[el.name] = el.value;
      });
	// post new user to db
	$.post("/signup", userObj, function(response) {
	    sessionStorage.setItem('userId', response);
	    window.location.href = "/";
	    $("#login-modal").modal("open");
	});
	
    });
    
    // grab new pet info from form on click
    $('#addpet').on('click', function(e){
	console.log("add pet clicked");
      document.querySelectorAll('input, select').forEach(function(el){
        petObj[el.id] = el.value;
      });
	petObj.uuid = sessionStorage.getItem('userId');
	console.log("new pet: " + petObj);
	// post new user to db
	$.post("/petreg", petObj, function(response) {
	    window.location.href="/pets/" + userId;
	});
    });

    // sends userid to server to load current user info
    $(".settings").on("click", function() {
	$.get("/settings/:id", function() {
	    window.location.href = "/settings/" + userId;
	});
    });

    // update user info
    $("#updateUser").on("click", function() {
	document.querySelectorAll('input, select').forEach(function(el){
        userObj[el.id] = el.value;
	});
	$.ajax({
	    method: "PUT",
	    url: "/settings/" + userId,
	    data: userObj
	}).done(function() {
	    console.log("User info updated");
	    window.location.href = "/pets/" + userId; 
	});
	//$.post("/settings/" + userId, userObj, function() {
	    
    });

    // sends petId to server to load current pet
    $(".pets").on("click", function() {
	$.get("/pets/:id", function() {
	    window.location.href = "/pets/" + userId;
	});
    });


	     

    
}); // end of document ready
