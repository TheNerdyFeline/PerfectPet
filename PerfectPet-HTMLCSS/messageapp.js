$("#message-submit").on("click", function(event) {
  event.preventDefault();

  // Make a newMessage object
  var newMessage = {
    User: $("#user").val().trim(),
    body: $("#message-box").val().trim(),
    created_at: moment().format("YYYY-MM-DD HH:mm:ss")
  };

  console.log(newMessage);

  $.post("/api/new", newMessage)
    // On success, run the following code
    .done(function() {

      var row = $("<div>");
      row.addClass("message");

      row.append("<p>" + newMessage.author + " messaged: </p>");
      row.append("<p>" + newMessage.body + "</p>");
      row.append("<p>At " + moment(newMessage.created_at).format("h:mma on dddd") + "</p>");

      $("#message-area").prepend(row);

    });

     // Empty each input box by replacing the value with an empty string
  $("#user").val("");
  $("#message-box").val("");
});

// When the page loads, grab all of our messages
$.get("/api/all", function(data) {

  if (data.length !== 0) {

    for (var i = 0; i < data.length; i++) {

      var row = $("<div>");
      row.addClass("chirp");

      row.append("<p>" + data[i].author + " messaged.. </p>");
      row.append("<p>" + data[i].body + "</p>");
      row.append("<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>");

      $("#message-area").prepend(row);

    }

  }

});

