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
        $("#selector").append("<option value='" +foodPrice+ "'>" +foodName+ "" +foodPrice+ "</option>");
      }

      $("#add").click(function() {
        var arr = [];
        var arr2 = [];
        $("select :selected").clone().appendTo("#order");

        $("select :selected").each(function() {
          arr.push($(this).val());
        }); console.log(arr);
          for (var i = 0; i < arr.length; i++) {
            arr2.push(Number(arr[i]));
        } console.log(arr2);
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
    total += parseFloat(array[i]);
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
