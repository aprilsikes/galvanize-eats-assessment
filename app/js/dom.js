$(document).ready(function() {

  $("button[name='placeOrder']").click(function() {
    window.location.href="pages/orders.html";

    var getter = $.ajax ({
      url: "https://galvanize-eats-api.herokuapp.com/menu",
      method: "GET",
      dataType: "json"
    });

    getter.done(function(response) {
      console.log("success!");
    });

    getter.fail(function(response) {
      console.log("fail");
    })
  });

})
