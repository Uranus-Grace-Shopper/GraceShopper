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
