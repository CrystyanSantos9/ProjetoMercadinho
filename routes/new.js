var express = require('express');
var router = express.Router();

/*GET new page.*/
router.get('/', function(req, res,next){
    res.render('new',{title:'Cadastro de Funcionários', user:{}, action:'/new'})
  })

  router.post('/',async function(req,res,next){
    const {codigo, nome, situacao, comissao,cargo,criacao} = req.body
    const dia = new Date().getDate()
    const mes = new Date().getDay()
    const ano = new Date().getFullYear()
    const data_atualizacao = `${dia}/${mes}/${ano}`
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
        console.log(result.rowCount)
        res.redirect('/users?users=true');
    }catch(e){
        return res.redirect('/?erro='+e);
    }

    })
    




module.exports = router;