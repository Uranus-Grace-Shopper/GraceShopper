const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
    isPurchased: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    // JOE CR: Is this column necessary? What sort of work have you had to do to keep it accurate?
    cartPriceTotal: {
        type: Sequelize.DECIMAL
    }
})

module.exports = Cart;

