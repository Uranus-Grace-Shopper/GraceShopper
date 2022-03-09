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
router.post("/:productId", requireToken, async (req, res, next) => {
  try {
    // console.log(req.user.dataValues.id, "token is hereeeee")
    const singleProduct = await Product.findByPk(req.params.productId);
    console.log(req.user.id);
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id,
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
