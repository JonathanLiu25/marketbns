const router = require("express").Router();
const Items = require("../models/Items.js");
const itemRequest = require("./itemRequest.js");

// start request time but set it back 10 seconds
let lastRequestTime = Date.now() - 10000;
let text = [];

router.get("/", (req, res, next) => {
  // const fs = require("fs");
  // fs.writeFile("./all_item_names.json", `{ "items": [${require("../all_items.json").map(item => `"${item.Name}"`)}]}`, err => {
  //   if (err) throw err;
  // });
  // waits 9 seconds before making another request
  // client sends a request every 10 seconds, but 9 seconds is to account for latency
  if (Date.now() - lastRequestTime < 9000) {
    res.send(text);
  } else {
    lastRequestTime = Date.now();

    Items.findAll()
      .then(allItems => {
        const requests = allItems.map(item => new Promise(resolveCb => itemRequest(item, resolveCb)));

        Promise.all(requests)
          .then(items => {
            text = items;
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
        const updateTo = {
          exact: req.body.exact,
          buy: req.body.buy || item.buy,
          cheap: req.body.cheap || item.cheap,
          sell: req.body.sell !== 999999999 ? req.body.sell : item.sell
        };
        return item.update(updateTo)
          .then(updatedItem => res.json(updatedItem))
          .catch(next);
      }
    })
    .catch(next);
});

router.get("/:name", (req, res, next) => {
  const item = { name: req.params.name, exact: req.query.exact };
  console.log(item);
  const itemData = new Promise(resolveCb => itemRequest(item, resolveCb));

  Promise.resolve(itemData)
    .then(foundItem => res.send(foundItem))
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

module.exports = router;
