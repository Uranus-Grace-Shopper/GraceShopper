const {
  models: { User },
} = require("../db");

/* store functions that will act as middleware between
 our request and our response. */

// JOE CR: Let's review this middleware as a team--it's valuable for everyone to understand!
const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization || req.body.headers.authorization;
    console.log('token in middleware',req.body)
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const isAdmin = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("Access Denied!");
  } else {
    next();
  }
};

module.exports = {
  requireToken,
  isAdmin,
};
