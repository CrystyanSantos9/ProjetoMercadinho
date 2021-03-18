var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  let options = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: true, // The cookie only accessible by the web server
    signed: false // Indicates if the cookie should be signed -- para usar com validação
  }

  // Set cookie -- enviando para navegador cliente
 res.cookie('cookieName', 'cookieValue', options) // options is optional
//paralercokies
console.log('Cookies', res.cookies)
  res.render('index', { title: 'Express' });


});

module.exports = router;
