const router = require("express").Router();
const {
  models: { Cart, CartItems, Product },
} = require("../db");
const { requireToken, isAdmin } = require("./gateKeepingMiddleware");

module.exports = router;
// JOE CR: Wassup huge commented out code. How you doin?
// router.post("/", async (req, res, next) => {
//   try {
//     const userId = req.body.id;

//     //guest cart
//     // if(!userId) {

//     // }
//     if (userId) {
//       const cart = await Cart.findAll({
//         where: {
//           userId: userId,
//         },
//         include: Product,
//       });
//       res.send(cart);
//     }
//   } catch (e) {
//     next(e);
//   }
// });
//need requirToken to get userId

// JOE CR: I love love love that y'all got this route working with the user token and not being
// passed cartId or userId. Very nice!!
router.get("/", requireToken, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        // JOE CR: Although it seems the case when console.logging, dataValues does not have to be used.
        // Let's discuss what req.user.toJSON() would do.
        userId: req.user.dataValues.id,
        isPurchased: false,
      },
      include: Product,
    });
    res.send(cart);
  } catch (e) {
    next(e);
  }
});
//logged in user

//need requirToken to get userId
router.put("/checkout", requireToken, async (req, res, next) => {
  try {
    // JOE CR: Notice how often you are making the same kind of query to get a user's cart?
    // This is the perfect opportunity for something like a class method!!
    let cart = await Cart.findOne({
      where: {
        userId: req.user.dataValues.id,
        isPurchased: false,
      },
    });
    await cart.update({ isPurchased: true });
    cart = await Cart.create({
      userId: req.user.dataValues.id,
      isPurchased: false,
    });
    //console.log('req.body in checkout+++++',req.body)
    res.status(201);
  } catch (e) {
    next(e);
  }
});

// JOE CR: The bottom of this file looks like a graveyard D:

//     //  const cartItems = await CartItems.findAll( {

//     //    //where: {cartId:cart.id}

//     //  });

//     //const products = await Product.findByPk(cartItems.productId)

//     //const products = await Product.findByPk(cart.products);

//     // console.log('products',cartItems.productId)

//     // cart.isPurchased = true;

//     //substract quantity in product table

//     //products.quantity = products.quantity - cart.product.productQuantity;

//     //send new produts quantity to front end to update the state?

//     res.send(await cart.update(req.body));
//   } catch (e) {
//     next(e);
//   }
// });

// //guste user

// router.post("/checkout/:userId", async (req, res, next) => {
//   try {
//     //req.body = localStorage.getItem();

//     const cart = await Cart.create(req.body);

//     cart.isPurchased = true;

//     //const products = await Product.findByPk(cart.product.id);

//     //products.quantity = products.quantity - cart.product.productQuantity;

//     //send new produts quantity to front end to update the state?

//     res.send(cart);
//   } catch (e) {
//     next(e);
//   }
// });

// router.get("/:id", async (req, res, next) => {
//   try {
//     const cart = await Cart.findByPk(req.params.id, {
//       include: Product,
//     });

//     res.send(cart);
//   } catch (e) {
//     next(e);
//   }
// });

// router.put("/checkout/:userId", async (req, res, next) => {
//   try {
//     //if user exists, find the cart

//     const cart = await Cart.findByPk(1, {
//       include: [
//         {
//           model: Product,
//         },
//       ],
//     });

//  const cartItems = await CartItems.findAll( {

//    //where: {cartId:cart.id}

//  });

//const products = await Product.findByPk(cartItems.productId)

//const products = await Product.findByPk(cart.products);

// console.log('products',cartItems.productId)

// cart.isPurchased = true;

//substract quantity in product table

//products.quantity = products.quantity - cart.product.productQuantity;

//send new produts quantity to front end to update the state?

//     res.send(await cart.update(req.body));
//   } catch (e) {
//     next(e);
//   }
// });

//guste user

// router.post("/checkout/:userId", async (req, res, next) => {
//   try {
//     //req.body = localStorage.getItem();

//     const cart = await Cart.create(req.body);

//     cart.isPurchased = true;

//     //const products = await Product.findByPk(cart.product.id);

//     //products.quantity = products.quantity - cart.product.productQuantity;

//     //send new produts quantity to front end to update the state?

//     res.send(cart);
//   } catch (e) {
//     next(e);
//   }
// });
