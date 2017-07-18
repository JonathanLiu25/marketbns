const express = require("express");
const { resolve } = require("path");

const app = express();

app.use("/items", require("./routes"));

app.use(express.static(resolve(__dirname, "public")));

const port = process.env.PORT || 3000;

if (module === require.main) {
  const server = app.listen(port, () => {
    console.log("Listening on port", server.address().port);
  });
}

module.exports = app;
