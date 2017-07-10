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

let text = [];
app.get("/items", (req, res, next) => {
  if (text.length) {
    res.send(text);
  } else {
    const requests = url.map((item, itemIdx) => {
      return new Promise(resolveCb => {
        newRequest(item, itemIdx, resolveCb);
      });
    });

    Promise.all(requests)
      .then(() => {
        res.send(text);
        setTimeout(() => { text = []; }, 5000);
      })
      .catch((err) => {
        setTimeout(() => { text = []; }, 5000);
        next(err);
      });
  }
});

function newRequest(item, itemIdx, resolveCb) {
  request(item, (err, response, body) => {
    if (err) {
      text[itemIdx] = err;
      resolveCb();
    } else {
      const listMarket = new JSDOM(body).window.document.getElementById("listMarket");
      listMarket.getElementsByTagName("tbody")[0].className = "itemTable";
      listMarket.getElementsByTagName("tr")[0].className = "show";
      if (listMarket.getElementsByClassName("emptyResult").length) {
        newRequest(item, itemIdx, resolveCb);
      } else {
        text[itemIdx] = listMarket.innerHTML;
        resolveCb();
      }
    }
  });
}

const port = process.env.PORT || 3000;

if (module === require.main) {
  const server = app.listen(port, () => {
    console.log("Listening on port", server.address().port);
  });
}

module.exports = app;
