const localStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs')
const users = require("../models/userLogin");

// (async ()=>{
//     const email = 'cryssantos9@hotmail.com'
//    db.selectOneUserLogin(email) .then(i=>{
//     if(i){
//         // console.log(i)
//     }
// })
// })()

module.exports =  function(passport)
{
 
    //campo de identificação de usuário 
    passport.use(new localStrategy({usernameField: 'email', passwordField:'senha'}, (email, senha, done)=>{
     
        db.selectOneUserLogin(email).then((usuario)=>{
         
            if(!usuario){
                console.log("\n-----Usuario não existe-----\n")

                //declarar no flash lá em app a mensagem de erro 
                return done(null, false, {message: "Esta conta não existe"})
            }
         try{
            bcrypt.compare(senha, usuario[0].password_hash, (erro, batem)=>{
                if(batem){
                 
                    return done(null, usuario[0])
                }else{
                
                    return done(null, false, {message: "Senha incorreta"})
                }
            })
         }catch(e){
            return done(null, false, {message: "Esta conta não existe"})
         }
        })
    }))

   

    //guardar os dados do usuário na sessão 
    //logando
    passport.serializeUser((usuario, done)=>{
       
        // console.log(usuario.id)
        done(null, usuario.id)
        
    })

    //deslogando
    passport.deserializeUser((id, done)=>{
      
        try{
            db.findById(id).then((user,erro)=>{
             
               
                done(erro,user.rows[0])
              
            })
        }catch(e){
            console.log(e)
        }
       
    })
   
}