const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  year: {
    type: Sequelize.INTEGER,
    validate: {
      min: 2000,
      max: 2022
    }
  },
  variety: {
    type: Sequelize.ENUM("red", "white"),
  },
  description: {
    type: Sequelize.TEXT,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.DECIMAL,
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue:
      "https://i.pinimg.com/originals/d7/a1/27/d7a127c2fd32d8e3dae3164a9f71a177.jpg",
  },
});

module.exports = Product;
