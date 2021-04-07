module.exports = {
    sysadmin: function(req, res, next){
        if(req.isAuthenticated() && req.user.sysadmin === 1){
            console.log(req.user.sysadmin)
            return next();
        }
        console.log("\n ---- to do lado do middleware de autenticao dando erro -----\n")
        req.flash("error", "Você deve estar logado e ser administrador para ter acesso a esta página.");
        res.redirect("/");
    }
}