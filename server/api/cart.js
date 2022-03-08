const router = require("express").Router();
const {
  models: { Cart, CartItems, Product },
} = require("../db");
const { requireToken } = require("./gateKeepingMiddleware");

module.exports = router;

router.get("/", requireToken, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
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
router.delete("/:id", requireToken, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id,
        isPurchased: false,
      },
      include: Product,
    });
    await cart.removeProducts(2)
    res.send(cart);
  } catch (e) {
    next(e);
  }
});
// router.delete("/:id", requireToken, async (req, res, next) => {
//   try {
//     const cart = await Cart.findOne({
//       where: {
//         userId: 1,
//         isPurchased: false,
//       },
//       include: Product,
//     });
//     await cart.removeProducts(req.params.id)
//     res.send(cart)
//   } catch (e){
//     next(e)
//   }
// })
//logged in user

router.put("/checkout", requireToken, async (req, res, next) => {
  try {
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
    res.status(201);
  } catch (e) {
    next(e);
  }
});




