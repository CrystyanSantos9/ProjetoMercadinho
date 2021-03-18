var express = require('express');
var router = express.Router();

/*GET new page.*/
router.get('/', function(req, res,next){
    res.render('new',{title:'Cadastro de Funcionários', user:{}, action:'/new', errors:""})
  })

  router.post('/', async function(req,res,next){
    const {codigo, nome, situacao, comissao,cargo,criacao} = req.body
    const dia = new Date().getDate()
    const mes = new Date().getDay()
    const ano = new Date().getFullYear()
    const data_atualizacao = `${dia}/${mes}/${ano}`

    const errors = []
        if(codigo==""){
            errors.push({texto:"Código inválido"})
        }
        if(nome==""){
            console.log(nome)
            errors.push({texto:"Nome inválido"})
        }
        if(situacao==""){
            console.log(nome)
            errors.push({texto:"Situação inválida"})
        }
        if(comissao==""){
            console.log(nome)
            errors.push({texto:"Comissão inválida"})
        }
        if(errors.length > 0){  
            res.render('new',{title:'Cadastro de Funcionários', user:{}, action:'/new', errors:errors})
        }else{
                    try{
                            const result = await db.insertUsers({
                                codigo,
                                nome,
                                situacao,
                                comissao,
                                cargo,
                                criacao,
                                atualizacao: data_atualizacao,
                            });
                            console.log("retorno", result)
                            req.flash("success_msg", "Funcionário criado com sucesso!")
                            // console.log(result.rowCount)
                            res.redirect('/users?users=true');
                    }catch(e){
                        req.flash("error_msg", "Ocorreu um erro ao tentar  criar o funcinário!")
                        return res.redirect('/new?erro='+e);
                    }
                }
    })
    




module.exports = router;