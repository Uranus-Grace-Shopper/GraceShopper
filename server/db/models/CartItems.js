const Sequelize = require("sequelize");
const db = require("../db");

const CartItems = db.define("cartItem", {
    productQuantity: {
        type: Sequelize.INTEGER
    },
    // JOE CR: Is this column necessary? What sort of work have you had to do to keep it accurate?
    itemsPriceTotal: {
        type: Sequelize.DECIMAL
    }

})

module.exports = CartItems