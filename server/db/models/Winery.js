const Sequelize = require("sequelize");
const db = require("../db");

const Winery = db.define("winery", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Winery;
