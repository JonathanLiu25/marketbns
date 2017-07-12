$("#main").append("<div class='items'></div>");
$(".items").append("<table id='listMarket' class='listMarket'><tbody><tr class='show'><td class='loading'><span>Loading items</span></td></tr></tbody></table>");

request();
setInterval(request, 10000);

function request() {
  $.ajax({
    type: "GET",
    url: "/items"
  })
    .then(result => {
      $("#listMarket").html(result[0]);
      for (var i = 0; i < result[1].child.length; i++) {
        // results -> items -> 1st row of the item (displayed row) -> 3rd child for price -> 1st child for unit price
        console.log(result[1].child[i].child[0].child[2].child[0]);
      }
    })
    .catch(err => console.error(err));
}
