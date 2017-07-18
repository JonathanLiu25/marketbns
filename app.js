const express = require("express");
const { resolve } = require("path");
const request = require("request");
const { JSDOM } = require("jsdom");
const html2json = require("html2json").html2json;
const json2html = require("html2json").json2html;

const app = express();

const allItems = require("./items.json");
const nonExactUrl = Object.keys(allItems.nonExactItems).map(item => `https://www.bns.academy/live-marketplace/?region=na&q=${item}`);
const exactUrl = Object.keys(allItems.exactItems).map(item => `https://www.bns.academy/live-marketplace/?region=na&exact=1&q=${item}`);
const url = nonExactUrl.concat(exactUrl);

app.use(express.static(resolve(__dirname, "public")));

let lastRequestTime;
let text = "";
let tempText = [];

app.get("/items", (req, res, next) => {
  // waits 9 seconds before making another request
  // client sends a request every 10 seconds, but 9 seconds is to account for latency
  if (lastRequestTime && (Date.now() - lastRequestTime < 9000)) {
    res.send(text);
  } else {
    lastRequestTime = Date.now();
    tempText = [];
    const requests = url.map((item, itemIdx) => {
      return new Promise(resolveCb => {
        newRequest(item, itemIdx, resolveCb);
      });
    });

    Promise.all(requests)
      .then(() => {
        text = tempText.join("");
        const testText = tempText;
        res.send(testText);
      })
      .catch((err) => {
        next(err);
      });
  }
});

function newRequest(item, itemIdx, resolveCb) {
  request(item, (err, response, body) => {
    if (err) {
      tempText[itemIdx] = err;
      resolveCb();
    } else {
      const listMarket = new JSDOM(body).window.document.getElementById("listMarket");
      listMarket.getElementsByTagName("tr")[0].className = "show";
      if (listMarket.getElementsByClassName("emptyResult").length) {
        newRequest(item, itemIdx, resolveCb);
      } else {
        const marketHTML = listMarket.innerHTML.replace(/\n[\s]*/g, "");
        checkCost(marketHTML, itemIdx);
        resolveCb();
      }
    }
  });
}

function checkCost(marketHTML, itemIdx) {
  const marketObject = html2json(marketHTML);
  // items -> 1st row of the item (displayed row) -> 3rd child for price -> 1st child for unit price
  const price = marketObject.child[0].child[0].child[2].child[0];
  const name = marketObject.child[0].child[0].child[1].child[0].child[0].text;
  const cost = {};
  price.child.forEach(el => {
    cost[el.attr.class] = el.child[0].text;
  });
  const item = allItems.exactItems[name] || allItems.nonExactItems[name];
  const buyCost = item.gold * 10000 + item.silver * 100 + item.bronze;
  const itemCost = (cost.gold || 0) * 10000 + (cost.silver || 0) * 100 + (cost.bronze || 0);
  if (itemCost <= buyCost) {
    marketObject.child[0].child[0].child[2].attr.class += " buyNow";
  }
  tempText[itemIdx] = marketObject;
  // tempText[itemIdx] = json2html(marketObject);
}

const port = process.env.PORT || 3000;

if (module === require.main) {
  const server = app.listen(port, () => {
    console.log("Listening on port", server.address().port);
  });
}

module.exports = app;
