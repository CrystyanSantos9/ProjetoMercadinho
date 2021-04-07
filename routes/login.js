var express = require('express');
var router = express.Router();
const passport = require("passport")
// const {sysadmin} = require("../helpers/eAdimin");
// const users = require("../models/userLogin");

router.get('/', async function (req, res, next) {
//    const user = await users()
//    const user_email = user.filter(user=>user.email=="raquel21@gmail.com")
//    console.log(user_email)
    try {
    //   const users = await db.selectOneUserLogin();
    res.render('login')
    //   res.json({
    //     user_email
    //   })
    } catch (e) {
    //   res.render('users', {users:""})
      // return res.redirect('/users?erro='+e);
      res.json({
        e
      })
    }
  });

  router.post("/", passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/login",
    failureFlash: true,
}))

module.exports = router;