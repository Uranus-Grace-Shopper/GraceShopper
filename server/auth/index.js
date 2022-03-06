const router = require('express').Router()
const { models: {User, Cart }} = require('../db')
//const { requireToken } = require('./gateKeepingMiddleware')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)}); 
  } catch (err) {
    next(err)
  }
})


router.post('/signup', async (req, res, next) => {
  try {
    /* desconstructs req.body so users can not inject data 
    with postman to force themselves to be admin */
    const { username, password }  = req.body;
    //if user creates user with postman, only username and password would be successfully created. 
    //isAdmin will be defaulted to false
    const user = await User.create( { username, password } )

    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})

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

//guste user




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
