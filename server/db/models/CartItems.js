const Sequelize = require("sequelize");
const db = require("../db");

const CartItems = db.define("cartItem", {
    productQuantity: {
        type: Sequelize.INTEGER
    },
    itemsPriceTotal: {
        type: Sequelize.DECIMAL
    }

})

module.exports = CartItems