$(document).ready(function() {
    // declare var
    var userObj = {};

    // materialize functions
    $(".button-collapse").sideNav();
    $("#login-modal").modal();
    $(".parallax").parallax();

    // grab new user info from form on click
    $('#signmeup').on('click', function(e){
      console.log(userObj);
      document.querySelectorAll('input, select').forEach(function(el){
        userObj[el.name] = el.value;
      });
	// post new user to db
	$.post("/signup", userObj, function(response) {
	    window.location.href = "/newpet";
	});
    });


	     

    
}); // end of document ready
