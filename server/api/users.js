const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const { requireToken, isAdmin } = require("./gateKeepingMiddleware");
module.exports = router;

router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// router.post ("/", requireToken, isAdmin, async (req, res, next) => {
//   try {
//     const users = await User.create(req.body);
//     res.json(users);
//   } catch (err) {
//     next(err);
//   }
// });
