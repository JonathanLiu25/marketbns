$("#main").append("<div class='items'></div>");
$(".items").append("<div id='listMarket' class='listMarket'><span class='loading'>Loading items</span></div>");


setInterval(() => {
  $.ajax({
    type: "GET",
    url: "/items"
  })
    .then(listMarket => {
      $("#listMarket").remove();
      $(".items").append("<div id='listMarket' class='listMarket'></div>");
      $(".loading").remove();
      $(".listMarket").append(listMarket);
    });
}, 10000);
