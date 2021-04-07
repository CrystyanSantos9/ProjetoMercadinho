var express = require('express');
var router = express.Router();
const passport = require("passport")
const bcrypt = require("bcryptjs");

router.get('/', async function (req, res, next) {
    try {
        res.render('cadastro')
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

router.post("/", async (req, res, next) => {
    const {
        nome,
        email,
        senha2
    } = req.body
    let {
        senha
    } = req.body

    const errors = []

    if (nome == "") {
        console.log(nome)
        errors.push({
            texto: "Nome inválido"
        })
    }
    if (email == "") {
        console.log(email)
        errors.push({
            texto: "email inválido"
        })
    }
    if (senha == "") {
        console.log(senha)
        errors.push({
            texto: "Senha inválida"
        })
    }
    if (senha !== senha2) {
        console.log(senha2)
        errors.push({
            texto: "As senhas são diferentes, tente novamente"
        })
    }
    if (errors.length > 0) {
        res.render('cadastro', {
            title: 'Cadastro de Funcionários',
            user: {},
            action: '/cadastro',
            errors: errors
        })
    } else {

        //verifica se já não existe um email com mesmo valor 
        db.selectOneUserLogin(email).then((usuario) => {
            try {
                console.log("Dentro do Passport - Verificando se usuário existe no banco", usuario)
                if (usuario.length > 0) {
                    console.log("email passado ", email)
                    console.log("email do banco ", usuario)
                    req.flash("error_msg", "Já existe uma conta com este e-mail ")
                    res.redirect("/cadastro");
                } else {

                    const dia = new Date().getDate()
                    const mes = new Date().getDay()
                    const ano = new Date().getFullYear()
                    const data = `${dia}/${mes}/${ano}`

                    const novoUsuario = {
                        nome,
                        email,
                        senha,
                        created_at: data,
                        updated_at: data,
                    }

                    console.log("Usuario antes de encriptar", novoUsuario)

                    bcrypt.genSalt(10, (erro, salt) => {
                        //recebe tres params , o que quero hashear , o salt gerado, e um callback
                        bcrypt.hash(novoUsuario.senha, salt, async (erro, hash) => {
                            if (erro) {
                                req.flash("error_msg", "houve um erro durante a tentativa de salvamente do usuário. ")
                                res.redirect("/cadastro");
                            }

                            senha = hash

                            console.log(senha)

                            try {
                                const result = await db.insertCadastro({
                                    nome,
                                    email,
                                    senha,
                                    created_at: data,
                                    updated_at: data,
                                    sysadmin:1,
                                })
                                console.log(result)
                                req.flash("success_msg", "Usuário cadastrado com sucesso!")
                                res.redirect("/")
                            } catch (e) {
                                req.flash("error_msg", "houve um erro durante a tentativa de salvamente do usuário, tente novamente ")
                                res.redirect("/cadastro");
                            }
                        })
                    })
                }
            } catch (e) {
                console.log({
                    error: e.message
                })
            }
            //se usuário já existe no banco

        })
    }
})

module.exports = router;