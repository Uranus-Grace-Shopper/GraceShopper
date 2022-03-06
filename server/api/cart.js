const router = require("express").Router();
const {
  models: { Cart, CartItems, Product },
} = require("../db");

module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    const userId = req.body.id;

    //guest cart
    // if(!userId) {

    // }
    if (userId) {
      const cart = await Cart.findAll({
        where: {
          userId: userId,
        },
        include: Product,
      });
      res.send(cart);
    }
  } catch (e) {
    next(e);
  }
});

router.post("/checkout", async (req, res, next) => {
  try {
    console.log('req.body in checkout==========================',req.body)
    const cart = await Cart.create({isPurchased:true});
 // await cart.addProduct(req.body) 
    //const products = await Product.findByPk(cart.product.id);
    //products.quantity = products.quantity - cart.product.productQuantity;
    //send new produts quantity to front end to update the state?
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
});
//logged in user

router.post("/add/:productId", async (req, res, next) => {
  try {
    //if(user)

    const product = await Product.findByPk(req.body.id);

    const cart = await Cart.findAll({where:{userId: user.id}})

    //await cart.addProduct(product)

    //if(!token){

    //err

    //}

    //const newCart = Cart.create(req.body)

    // const productId = req.body.id;

    // const price = req.body.price;

    // const quantity = req.body.quantity;

    // req.body.productQuantity = quantity;

    // req.body.itemsPriceTotal = price * quantity;

    // req.body.productId = productId;

    // req.body.cartId = 1;

    // console.log('>>>>>>>>>req.body',products)

    //await CartItems.create(req.body)

    //const cart =  await Cart.findByPk(req.params.id

    // const newCartItems = await CartItems.create(req.params.id);

    res.send(201);
  } catch (e) {
    next(e);
  }
});

