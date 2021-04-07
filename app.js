require('dotenv/config');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const flash = require("connect-flash");
//chamar passport antes
const passport = require("passport");
//inserindo passport como dependencia
require("./config/auth")(passport);
// import routes
const newLogin = require('./routes/login');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const newUser = require('./routes/new');
const newCadastro = require('./routes/cadastro');
const {sysadmin} = require("../vendas/helpers/eAdimin");
const logout = require("../vendas/routes/logout");

//SESSÂO
app.use(session({
  secret:process.env.SECRET,
  resave: true, 
  saveUninitialized: true
}))
//IMPORTANTE SER AQUI ENTRE SESSÃO E FLASH
app.use(passport.initialize())

app.use(passport.session())

app.use(flash())
app.use((req, res, next) =>{
  
  console.log("\n--------To dentro do flash-----\n")
  res.locals.success_msg = req.flash("success_msg")
  res.locals.error_msg = req.flash("error_msg")
  res.locals.error = req.flash("error")
  res.locals.user = req.user || null;
  
  next();
  console.log("\n--------passei do next-----\n")
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//sessions



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//setando rotas 
app.use('/', indexRouter);
app.use('/login', newLogin);
app.use('/users', sysadmin,usersRouter);
app.use('/new', newUser);
app.use('/cadastro', newCadastro);
app.use('/logout', logout);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
