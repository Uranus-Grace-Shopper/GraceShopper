//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require ('./models/Product')

const Winery = require ('./models/Winery')

const Cart = require('./models/Cart')
const CartItems = require('./models/CartItems')

//associations could go here!

// JOE CR: Inconsistent whitespacing on these lines. Are we using our formatters?

Product.belongsTo (Winery)
Winery.hasMany (Product)

User.hasMany(Cart)
Cart.belongsTo(User)

// JOE CR: Let's discuss the result of this association.
Product.belongsToMany( Cart, { through: CartItems})
Cart.belongsToMany( Product, {through: CartItems})



module.exports = {
  db,
  models: {
    User,
    Product,
    Winery,
    Cart,
    CartItems
  },
}
