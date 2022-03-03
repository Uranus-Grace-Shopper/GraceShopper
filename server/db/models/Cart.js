const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
    isPurchased: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    cartPriceTotal: {
        type: Sequelize.DECIMAL
    }
})

module.exports = Cart;

