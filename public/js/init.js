$(document).ready(function() {
    // declare var
    var userObj = {};
    var petObj = {};

    // materialize functions
    $(".button-collapse").sideNav();
    $("#login-modal").modal();
    $(".parallax").parallax();

    // grab new user info from form on click
    $('#signmeup').on('click', function(e){
      document.querySelectorAll('input, select').forEach(function(el){
        userObj[el.name] = el.value;
      });
	// post new user to db
	$.post("/signup", userObj, function(response) {
	    sessionStorage.setItem('userId', response);
	    window.location.href = "/newpet";
	});
    });

    // grab new pet info from form on click
    $('#addpet').on('click', function(e){
      document.querySelectorAll('input, select').forEach(function(el){
        petObj[el.id] = el.value;
      });
	petObj.uuid = sessionStorage.getItem('userId');
	// post new user to db
	$.post("/petreg", petObj, function(response) {
	    window.location.href="/pets/userId";
	});
    });



	     

    
}); // end of document ready
