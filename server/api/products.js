const router = require('express').Router()
const { models: { Product }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
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
