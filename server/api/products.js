const router = require("express").Router();
const {
  models: { Product, Winery, Cart },
} = require("../db");
const { Op } = require("@sequelize/core");
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
    console.log(singleProduct);
    res.send(singleProduct);
  } catch (error) {
    next(error);
  }
});

// put requireToken before async when it works
router.post("/:productId", async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.productId);
    const cart = await Cart.findOne({
      where: {
        userId: 3, 
        isPurchased: false
      }
    })
    await cart.addProducts(singleProduct);
    res.status(201).send(singleProduct)
  } catch (error) {
    next(error)
  }
})


