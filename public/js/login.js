$(document).ready(function() {
  // Getting references to our form and inputs
  var email = $("#email");
  var password = $("#password");

  // When the form is submitted, we validate there's an email and password entered
    $("#login").on("click", function(event) {
    event.preventDefault();
    var userData = {
      email: email.val().trim(),
      password: password.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    email.val("");
    password.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/login", {
      email: email,
      password: password
    }).then(function(data) {
	var info = data.split("/");
	var last = info.slice(-1);
	console.log(info);
	console.log(last);
	sessionStorage.setItem('userId', last);
	window.location.replace(data);
      // If there's an error, log the error
    }).catch(function(err) {
      console.log(err);
    });
  }

});
