//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require ('./models/Product')

const Winery = require ('./models/Winery')

const Cart = require('./models/Cart')
const CartItems = require('./models/CartItems')

//associations could go here!
Product.belongsTo (Winery)
Winery.hasMany (Product)

User.hasMany(Cart)
Cart.belongsTo(User)
Product.belongsToMany( Cart, { through: CartItems})
Cart.belongsToMany( Product, {through: CartItems})

Cart.hasMany(CartItems)
CartItems.belongsTo(Cart)
Product.hasMany(CartItems)
CartItems.belongsTo(Product)


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
