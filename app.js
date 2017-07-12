const express = require("express");
const { resolve } = require("path");
const request = require("request");
const { JSDOM } = require("jsdom");
const html2json = require("html2json").html2json;
const json2html = require("html2json").json2html;

const app = express();

const allItems = require("./items.json");
const nonExactUrl = allItems.nonExactItems.map(item => `https://www.bns.academy/live-marketplace/?region=na&q=${item}`);
const exactUrl = allItems.exactItems.map(item => `https://www.bns.academy/live-marketplace/?region=na&exact=1&q=${item}`);
const url = nonExactUrl.concat(exactUrl);

app.use(express.static(resolve(__dirname, "public")));

let lastRequestTime;
let text = [];
// tempText overwrites text before sending response; this is to prevent empty text array when requesting for items
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
        text = tempText;
        res.send([text, html2json(text.join(""))]);
      })
      .catch((err) => {
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
      listMarket.getElementsByTagName("tr")[0].className = "show";
      if (listMarket.getElementsByClassName("emptyResult").length) {
        newRequest(item, itemIdx, resolveCb);
      } else {
        text[itemIdx] = listMarket.innerHTML.replace(/\n[\s]*/g, "");
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
