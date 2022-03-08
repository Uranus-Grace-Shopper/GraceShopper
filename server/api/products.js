const router = require("express").Router();
const {
  models: { Product, Winery, Cart },
} = require("../db");
const { Op } = require("@sequelize/core");
const { requireToken, isAdmin } = require("./gateKeepingMiddleware");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        quantity: {
          // JOE CR: Nice usage of the greater than operator!
          [Op.gt]: 0,
        },
      },
      include: {
        model: Winery,
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:productId", async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.productId);
    res.send(singleProduct);
  } catch (error) {
    next(error);
  }
});

// put requireToken before async when it works
// JOE CR: This is okay but I was a little surprised to find a route that would add a product to cart here
// in products router instead of the cart router. Let's discuss the flexibility of our server's interface and pros/cons.
router.post("/:productId", requireToken, async (req, res, next) => {
  try {
    // console.log(req.user.dataValues.id, "token is hereeeee")
    const singleProduct = await Product.findByPk(req.params.productId);
    const cart = await Cart.findOne({
      where: {
        userId: req.user.dataValues.id,
        isPurchased: false,
      },
    });
    console.log(cart, "cart in post route");
    await cart.addProducts(singleProduct);
    res.status(201).send(singleProduct);
  } catch (error) {
    next(error);
  }
});
