const { STRING, INTEGER } = require("sequelize");
const db = require("./db.js");

const Items = db.define("items", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  buy: INTEGER,
  cheap: INTEGER,
  sell: INTEGER,
  order: INTEGER
});

module.exports = Items;
