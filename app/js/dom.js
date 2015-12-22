$(document).ready(function() {

  var getter = $.ajax ({
      url: "https://galvanize-eats-api.herokuapp.com/menu",
      method: "GET",
      dataType: "json"
    });

    getter.done(function(response) {
      console.log("success");
      var obj = {};
      var array = [];
      var array2 = [];
      var newArray = [];
      var items = response["menu"];
      for (var i = 0; i < items.length; i++) {
        var foodName =  items[i].name;
        var foodPrice = items[i].price;
        $("#selector").append("<option value='" +foodPrice+ "'>'" +foodName+ "''" +foodPrice+ "'</option>");
      }

      $("#add").click(function() {
        $("select :selected").clone().appendTo("#results");
        var arr = [];
        var arr2 = [];
        // var total = 0;
        $("select :selected").each(function() {
          arr.push($(this).val());
          for (var i = 0; i < arr.length; i++) {
          arr2.push(Number(arr[i]));
        }
        }); console.log(arr2);
        // for (var i = 0; i < arr.length; i++) {
        //   total += parseInt(arr[i]);
        // }
        // $("#results").html(total);
        $("#total").append(getSelectedSum(arr2));
        console.log(getSelectedSum(arr2));
      });
    });

    getter.fail(function(response) {
      console.log("fail");
    });
});

function getSelectedSum(array) {
  var total = 0;
  for (var i = 0; i < array.length; i++) {
    // if (foodPrice.selected) {
      total += parseFloat(array[i]);
    // }
  } return total.toFixed(2);
}

function getCount(prices) {
  var count = 0;
  for (var i = 0; i < prices.length; i++) {
    if (prices[i].selected) {
      count ++;
    }
  } return count;
}
