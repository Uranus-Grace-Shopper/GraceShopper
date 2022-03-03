const router = require('express').Router();
const { models: { Product, Winery }} = require('../db');
const { Op } = require('@sequelize/core');
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
        where: {
          quantity: {
                [Op.gt]: 0
          }
        },
      include: Winery,
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get("/:productId", async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.productId)
    console.log(singleProduct)
    res.send(singleProduct);
  } catch (error) {
    next(error);
  }
});
