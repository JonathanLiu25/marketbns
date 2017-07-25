const router = require("express").Router();
const Items = require("../models/Items.js");
const itemRequest = require("./itemRequest.js");

// start request time but set it back 10 seconds
let lastRequestTime = Date.now() - 10000;
let text = [];

router.get("/", (req, res, next) => {
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

router.get("/:name", (req, res, next) => {
  let item = { name: req.params.name, exact: req.query.exact };
  const findItem = new Promise(resolveCb => {
    return Items.findOne({ where: item })
      .then(foundItem => {
        if (foundItem) resolveCb(foundItem);
        resolveCb(item);
      })
      .catch(next);
  });

  Promise.resolve(findItem)
    .then(resolveItem => {
      const itemData = new Promise(resolveCb => itemRequest(resolveItem, resolveCb));

      return Promise.resolve(itemData)
        .then(foundItem => res.send(foundItem))
        .catch(next);
    })
    .catch(next);
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

router.put("/:name", (req, res, next) => {
  Items.findOne({
    where: {
      name: req.params.name
    }
  })
    .then(item => {
      return item.update(req.body)
        .then(updatedItem => res.json(updatedItem))
        .catch(next);
    })
    .catch(next);
});

router.delete("/:name/:exact", (req, res, next) => {
  Items.findOne({
    where: {
      name: req.params.name,
      exact: req.params.exact
    }
  })
    .then(item => {
      return item.destroy()
        .then(() => res.sendStatus(204))
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
