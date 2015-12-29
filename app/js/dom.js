$(document).ready(function() {

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
        $("#selector").append("<option value='" +foodPrice+ "'>" +foodName+ " " +foodPrice+ "</option>");
      }

      var arr = [];
      // var arr3 = [];
      $("#add").click(function() {
        var arr2 = [];
        $("select :selected").clone().appendTo("#order");

        $("select :selected").each(function() {
          arr.push($(this).val() * getQuantity());
        }); console.log(arr);
          for (var i = 0; i < arr.length; i++) {
            arr2.push(Number(arr[i]));
        } console.log(arr2);
        $("#total").html(getSelectedSum(arr2));
        console.log(getSelectedSum(arr2));
      });
    });

    getter.fail(function(response) {
      console.log("fail");
    });

    var poster = $.ajax ({
      url:  "https://galvanize-eats-api.herokuapp.com/orders",
      method: "POST",
      
    })
});

function getSelectedSum(array) {
  var total = 0;
  for (var i = 0; i < array.length; i++) {
    total += parseFloat(array[i]);
  } return total.toFixed(2);
}

// function getCount(prices) {
//   var count = 0;
//   for (var i = 0; i < prices.length; i++) {
//     if (prices[i].selected) {
//       count ++;
//     }
//   } return count;
// }

function getQuantity() {
  var theForm = document.forms["foodForm"];
  var quantity = theForm.elements["quan"];
  var howMany = 0;
  if(quantity.value != "") {
    howMany = parseInt(quantity.value);
  } return howMany;
}
