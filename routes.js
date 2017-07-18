const router = require("express").Router();
const request = require("request");
const { JSDOM } = require("jsdom");
const html2json = require("html2json").html2json;

const allItems = require("./items.json");
const nonExactUrl = Object.keys(allItems.nonExactItems).map(item => `https://www.bns.academy/live-marketplace/?region=na&q=${item}`);
const exactUrl = Object.keys(allItems.exactItems).map(item => `https://www.bns.academy/live-marketplace/?region=na&exact=1&q=${item}`);
const url = nonExactUrl.concat(exactUrl);

let lastRequestTime;
let text = [];
let tempText = [];

router.get("/", (req, res, next) => {
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
        text = [...tempText];
        res.send(text);
      })
      .catch(next);
  }
});

function newRequest(item, itemIdx, resolveCb) {
  request(item, (err, response, body) => {
    if (err) {
      tempText[itemIdx] = err;
      resolveCb();
    } else {
      const listMarket = new JSDOM(body).window.document.getElementById("listMarket");
      if (listMarket.getElementsByClassName("emptyResult").length) {
        newRequest(item, itemIdx, resolveCb);
      } else {
        const marketHTML = listMarket.innerHTML.replace(/\n[\s]*/g, "");
        convertToObject(marketHTML, itemIdx);
        resolveCb();
      }
    }
  });
}

function convertToObject(marketHTML, itemIdx) {
  const marketObject = html2json(marketHTML);
  const rows = marketObject.child[0].child;
  const tBody = [];

  for (var i = 0; i < rows.length; i++) {
    tBody[i] = {
      show: i === 0,
      grade: rows[i].child[1].attr.class[1],
      src: rows[i].child[0].child[0].attr.src,
      alt: Array.isArray(rows[i].child[0].child[0].attr.alt) ? rows[i].child[0].child[0].attr.alt.join(" ") : rows[i].child[0].child[0].attr.alt,
      amount: rows[i].child[0].child[1] ? rows[i].child[0].child[1].child[0].text : 1,
      price: getPrice(rows[i].child[2])
    };
  }

  tempText[itemIdx] = tBody;
}

function getPrice(prices) {
  const price = {};
  const bulk = prices.child[0].attr.class;
  price[bulk] = {};
  price.total = {};

  for (var i = 0; i < 3; i++) {
    if (prices.child[0].child[i]) price[bulk][prices.child[0].child[i].attr.class] = prices.child[0].child[i].child[0].text;
    if (prices.child[1] && prices.child[1].child[i]) price.total[prices.child[1].child[i].attr.class] = prices.child[1].child[i].child[0].text;
  }

  return price;
}

module.exports = router;
