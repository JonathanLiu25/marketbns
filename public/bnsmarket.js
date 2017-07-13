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
      $("#listMarket").html(result);
    })
    .catch(err => console.error(err));
}
