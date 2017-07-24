const { resolve } = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const models = require("../models");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/items", require("./routes.js"));

app.use(express.static(resolve(__dirname, "..", "public")));

app.use("/", (req, res, next) => { res.sendFile(resolve(__dirname, "..", "public", "index.html")); });

const port = process.env.PORT || 3000;

if (module === require.main) {
  const force = false;
  models.db.sync({ force })
    .then(() => console.log(`Synced models to db ${force ? "-forced" : ""}`))
    .catch(console.error);

  const server = app.listen(port, () => {
    console.log("Listening on port", server.address().port);
  });
}

module.exports = app;
