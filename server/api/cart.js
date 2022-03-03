const router = require('express').Router()
const { models: { Cart, CartItems, Product }} = require('../db')
module.exports = router

router.get('/:id', async (req, res, next) => {
    try {
        const cart = await Cart.findByPk(req.params.id, {
            include: Product
        });
        res.send(cart)
    } catch (e) {
        next(e)
    }
})

