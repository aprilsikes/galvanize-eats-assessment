$(document).ready(function() {
var quantity = $("#quan").val


  var getter = $.ajax ({
      url: "https://galvanize-eats-api.herokuapp.com/menu",
      method: "GET",
      dataType: "json"
    });

    getter.done(function(response) {
      console.log("success");
      var items = response["menu"];
      for (var i = 0; i < items.length; i++) {
        var foodName =  items[i].name;
        var foodPrice = items[i].price;
        var foodType = items[i].type;
        if (foodType === "burger") {
          $("#burgers").append("<option value='" +foodPrice+ "'>" +foodName+ " " +foodPrice+ "</option>")
        } else {
          $("#pizza").append("<option value='" +foodPrice+ "'>" +foodName+ " " +foodPrice+ "</option>")
        }
      }

      var arr = [];

      $("#add").click(function() {
        var arr2 = [];
        $("select :selected").clone().appendTo("#order");

        $("select :selected").each(function() {
          arr.push($(this).val() * getQuantity());
        });
          for (var i = 0; i < arr.length; i++) {
            arr2.push(Number(arr[i]));
        };
        $("#sub").html(getSelectedSum(arr2));
        var tax = ((getSelectedSum(arr2)) * .083).toFixed(2);

        $("#foodTax").html(tax);
        var grandTotal = parseFloat(getSelectedSum(arr2)) + parseFloat(tax);

        $("#gTotal").html(grandTotal.toFixed(2));

      });
    });

    getter.fail(function(response) {
      console.log("fail");
    });

    $("#deliver").click(function() {
      var userName = $("#name").html();
      var userPhone = $("#phone").html();
      var userAddress = $("#address").html();
      var userOrder = $("#order").html();
      var poster = $.ajax ({
        url:  "https://galvanize-eats-api.herokuapp.com/orders",
        method: "POST",
        data: userName, userPhone, userAddress, userOrder
      });
      poster.done(function(msg) {
        console.log("Order Sent: " + msg);
      });

    });
});

function getSelectedSum(array) {
  var total = 0;
  for (var i = 0; i < array.length; i++) {
    total += parseFloat(array[i]);
  } return total.toFixed(2);
}

function getQuantity() {
  var theForm = document.forms["foodForm"];
  var quantity = theForm.elements["quan"];
  var howMany = 0;
  if(quantity.value != "") {
    howMany = parseInt(quantity.value);
  } return howMany;
}
