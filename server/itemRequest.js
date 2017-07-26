const request = require("request");
const { JSDOM } = require("jsdom");
const { html2json } = require("html2json");

const itemStorage = {};

function itemRequest(item, resolveCb, retries = 0, maxRetries = 5) {
  // waits 9 seconds before making another request
  // client sends a request every 10 seconds, but 9 seconds is to account for latency
  if (itemStorage[item.name] && Date.now() - itemStorage[item.name].lastRequestTime < 9000) {
    resolveCb(itemStorage[item.name].tBody);
  } else {
    const url = `https://www.bns.academy/live-marketplace/?region=na&exact=${item.exact}&q=${item.name}`;

    return request(url, (err, response, body) => {
      if (err) {
        resolveCb([err]);
      } else {
        const listMarket = new JSDOM(body).window.document.getElementById("listMarket");

        if (listMarket.getElementsByClassName("emptyResult").length && retries < maxRetries) {
          itemRequest(item, resolveCb, ++retries);
        } else if (retries >= maxRetries) {
          resolveCb([{ show: true, info: item, price: { total: {} } }]);
        } else {
          const marketHTML = listMarket.innerHTML.replace(/\n[\s]*/g, "");
          resolveCb(convertToObject(marketHTML, item));
        }
      }
    });
  }
}

function convertToObject(marketHTML, item) {
  const marketObject = html2json(marketHTML);
  const rows = marketObject.child[0].child;
  const tBody = []; // array of rows

  for (var i = 0; i < rows.length; i++) {
    tBody[i] = {
      info: item,
      grade: rows[i].child[1].attr.class[1], // determines item text color
      src: rows[i].child[0].child[0].attr.src, // image source
      alt: Array.isArray(rows[i].child[0].child[0].attr.alt) ? rows[i].child[0].child[0].attr.alt.join(" ") : rows[i].child[0].child[0].attr.alt,
      amount: rows[i].child[0].child[1] ? rows[i].child[0].child[1].child[0].text : 1,
      price: getPrice(rows[i].child[2])
    };
  }

  itemStorage[item.name] = { tBody, lastRequestTime: Date.now() };
  return tBody;
}

function getPrice(prices) {
  const price = {};
  const bulk = prices.child[0].attr.class; // bulk is either 'unit' or 'total'
  price[bulk] = {};
  price.total = {};

  for (var i = 0; i < 3; i++) { // 3 times for gold, silver, and bronze
    if (prices.child[0].child[i]) price[bulk][prices.child[0].child[i].attr.class] = prices.child[0].child[i].child[0].text;
    if (prices.child[1] && prices.child[1].child[i]) price.total[prices.child[1].child[i].attr.class] = prices.child[1].child[i].child[0].text;
  }

  return price;
}

module.exports = itemRequest;
