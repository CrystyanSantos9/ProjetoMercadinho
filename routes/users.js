var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  // console.log('SELECT * FUNCIONARIOS');
  try {
    const users = await db.selectUsers();
    res.render('users', {users})
    // res.json({
    //   users
    // })
  } catch (e) {
    return res.redirect('users/?erro='+e);
  }
});

// //para testar
// (async () => {
// 
// console.log(user);
// })()

/*GET edit page. */
router.get('/edit/:id',async function (req, res, next) {
  const id = parseInt(req.params.id);
  try{
    const user = await db.selectOneUser(id);
      res.render('new', {
      title: 'Edição de Funcionários',
      user: user[0],
      action: '/users/edit/'+ id
    })
  }catch(e){
      return res.redirect('users/?erro='+e);
  }
});

//POST EDIT 
router.post('/edit/:id', async function (req, res, next) {
  const id = parseInt(req.params.id);
  // console.log("Valor do id", id)
  const {codigo, nome, situacao, comissao,cargo,criacao} = req.body
  const dia = new Date().getDate()
  const mes = new Date().getDay()
  const ano = new Date().getFullYear()
  const data_atualizacao = `${dia}/${mes}/${ano}`
try{
  const result2 = await db.updateUser( id, {
      codigo,
      nome,
      situacao,
      comissao,
      cargo,
      criacao,
      atualizacao: data_atualizacao,
    });
res.redirect('/users?edit=true')
}catch(e){
  return res.redirect('/users?erro='+e);
}
})

/* POST users. */
// router.post('/', async function (req, res, next) {
//   var {
//     codigo,
//     nome,
//     situacao,
//     comissao,
//     cargo,
//   } = req.query
//   const data = new Date().toLocaleDateString()
//   console.log('INSERT * FUNCIONARIOS');
//   const result = await db.insertUsers({
//     codigo,
//     nome,
//     situacao,
//     comissao,
//     cargo,
//     criacao: data,
//     atualizacao: data,
//   });

//   res.json({
//     "Linhas afetadas": result.rowCount
//   })
//   console.log(result.rowCount);
// });

// /* POST Insert users. */
// router.post('/', async function (req, res, next) {
//   var {
//     codigo,
//     nome,
//     situacao,
//     comissao,
//     cargo,
//   } = req.query
//   const data = new Date().toLocaleDateString()
//   console.log('INSERT * FUNCIONARIOS');
//   const result = await db.insertUsers({
//     codigo,
//     nome,
//     situacao,
//     comissao,
//     cargo,
//     criacao: data,
//     atualizacao: data,
//   });

//   res.json({
//     "Linhas afetadas": result.rowCount
//   })
//   console.log(result.rowCount);
// });

// /* DELETE users. */
// router.delete('/', async function (req, res, next) {
//   const {
//     id
//   } = req.query

//   try {
//     const result3 = await db.deleteUser(id);
//     console.log(result3.rowCount);
//     res.json({
//       "Linhas afetadas": result3.rowCount
//     })
//   } catch (e) {
//     throw new Error("update or delete on table 'funcionarios' violates foreign key constraint'")
//   }
// })



/* GET delete page. */
router.get('/delete/:id',async function (req, res) {
  const id  = parseInt(req.params.id)
  try{
    const result3 = await db.deleteUser(id);
    console.log(result3);
    res.redirect('/users?delete=true')
  }catch(e){
    return res.redirect('/users?erro='+e);
  }
})

module.exports = router;


