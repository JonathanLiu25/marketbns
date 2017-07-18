const router = require("express").Router();
const request = require("request");
const { JSDOM } = require("jsdom");
const html2json = require("html2json").html2json;
const Items = require("./models/Items");

// start request time but set it back 10000 ms
let lastRequestTime = Date.now() - 10000;
let text = [];
let tempText = [];

router.get("/", (req, res, next) => {
  // waits 9 seconds before making another request
  // client sends a request every 10 seconds, but 9 seconds is to account for latency
  if (Date.now() - lastRequestTime < 9000) {
    res.send(text);
  } else {
    lastRequestTime = Date.now();
    tempText = [];

    Items.findAll()
      .then(allItems => {
        const requests = allItems.map(item => {
          const url = `https://www.bns.academy/live-marketplace/?region=na&exact=${item.exact}&q=${item.name}`;
          return new Promise(resolveCb => newRequest(url, item, resolveCb));
        });

        Promise.all(requests)
          .then(() => {
            text = [...tempText];
            res.send(text);
          })
          .catch(next);
      })
      .catch(next);
  }
});

router.post("/", (req, res, next) => {
  Items.findOrCreate({
    where: {
      name: req.body.name
    },
    defaults: req.body
  })
    .spread((item, created) => {
      if (created) {
        res.json(item);
      } else {
        item.update(req.body)
          .then(updatedItem => res.json(updatedItem))
          .catch(next);
      }
    })
    .catch(next);
});

router.put("/:name", (req, res, next) => {
  Items.findOne({
    where: req.params.name
  })
    .then(item => {
      item.update(req.body)
        .then(updatedItem => res.json(updatedItem))
        .catch(next);
    })
    .catch(next);
});

router.delete("/:name", (req, res, next) => {
  Items.findOne({
    where: req.params.name
  })
    .then(item => {
      item.destroy()
        .then(() => res.sendStatus(204))
        .catch(next);
    })
    .catch(next);
});

function newRequest(url, item, resolveCb) {
  request(url, (err, response, body) => {
    if (err) {
      tempText[item.id - 1] = err;
      resolveCb();
    } else {
      const listMarket = new JSDOM(body).window.document.getElementById("listMarket");
      if (listMarket.getElementsByClassName("emptyResult").length) {
        newRequest(url, item, resolveCb);
      } else {
        const marketHTML = listMarket.innerHTML.replace(/\n[\s]*/g, "");
        convertToObject(marketHTML, item);
        resolveCb();
      }
    }
  });
}

function convertToObject(marketHTML, item) {
  const marketObject = html2json(marketHTML);
  const rows = marketObject.child[0].child;
  const tBody = [];

  for (var i = 0; i < rows.length; i++) {
    tBody[i] = {
      info: item,
      show: i === 0, // show the first row
      grade: rows[i].child[1].attr.class[1], // determines item text color
      src: rows[i].child[0].child[0].attr.src, // image source
      alt: Array.isArray(rows[i].child[0].child[0].attr.alt) ? rows[i].child[0].child[0].attr.alt.join(" ") : rows[i].child[0].child[0].attr.alt,
      amount: rows[i].child[0].child[1] ? rows[i].child[0].child[1].child[0].text : 1,
      price: getPrice(rows[i].child[2])
    };
  }

  tempText[item.id - 1] = tBody;
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
