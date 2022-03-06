const { models: { User } } = require("../db");


/* store functions that will act as middleware between
 our request and our response. */

 const requireToken = async (req, res, next) => {
     try {
        const token = req.headers.authorization;
        console.log('token>>>>>>>>>>>',req.headers.authorization)
        const user = await User.findByToken(token);
        req.user = user;
        next()
     } catch (err) {
         next (err)
     }
 }

 const isAdmin = async (req, res, next) => {
     if (!req.user.isAdmin) {
         return res.status(403).send('Access Denied!');
     } else {
         next ()
     }
 }

 module.exports = {
     requireToken,
     isAdmin
 }