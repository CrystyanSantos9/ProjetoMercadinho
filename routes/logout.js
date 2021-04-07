var express = require('express');
var router = express.Router();
// const passport = require("passport")

router.get("/", (req, res, next)=>{
    console.log("passou aqui ")
     req.logout(); 
     req.flash("success_msg", "Deslogando com sucesso.")
     res.redirect("/")
   })

 module.exports = router;