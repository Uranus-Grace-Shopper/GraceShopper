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
