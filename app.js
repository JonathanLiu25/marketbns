const express = require("express");
const { resolve } = require("path");
const request = require("request");
const { JSDOM } = require("jsdom");

const app = express();

const allItems = require("./items.json");
const nonExactUrl = allItems.nonExactItems.map(item => {
  return `https://www.bns.academy/live-marketplace/?region=na&q=${item}`;
});
const exactUrl = allItems.exactItems.map(item => {
  return `https://www.bns.academy/live-marketplace/?region=na&exact=1&q=${item}`;
});
const url = nonExactUrl.concat(exactUrl);

app.use(express.static(resolve(__dirname, "public")));

app.get("/items", (req, res, next) => {
  let text = [];

  const requests = url.map((item, itemIdx) => {
    return new Promise(resolveCb => {
      request(item, (err, response, body) => {
        if (err) {
          text[itemIdx] = err;
        } else {
          const listMarket = new JSDOM(body).window.document.getElementById("listMarket");
          listMarket.getElementsByTagName("tbody")[0].className = "itemTable";
          listMarket.getElementsByTagName("tr")[0].className = "show";
          text[itemIdx] = listMarket.innerHTML;
        }
        resolveCb();
      });
    });
  });

  Promise.all(requests)
    .then(() => {
      res.send(text);
    });
});

const port = process.env.PORT || 3000;

if (module === require.main) {
  const server = app.listen(port, () => {
    console.log("Listening on port", server.address().port);
  });
}

module.exports = app;
