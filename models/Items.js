const { STRING, INTEGER, ENUM } = require("sequelize");
const db = require("./db.js");

const Items = db.define("items", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  exact: {
    type: ENUM("0", "1"),
    default: "0"
  },
  buy: INTEGER,
  cheap: INTEGER,
  sell: INTEGER,
  order: INTEGER
});

module.exports = Items;
