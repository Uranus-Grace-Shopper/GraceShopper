const router = require("express").Router();
//const { default: Cart } = require("../../client/components/Cart");
const {
  models: { User,Cart},
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    //console.log("name: req.body.name====",req.body.username)
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    //create a cart for user when they sign up
    /* desconstructs req.body so users can not inject data 
    with postman to force themselves to be admin */
    const { username, password } = req.body;
    //if user creates user with postman, only username and password would be successfully created.
    //isAdmin will be defaulted to false
    const user = await User.create({ username, password });
    // JOE CR: Good idea! This could also be done on the first item added to a cart.
    const cart = await Cart.create({userId:user.id});
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
