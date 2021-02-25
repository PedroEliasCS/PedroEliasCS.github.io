var express = require('express');
const { route } = require('.');
var router = express.Router();


async function checkAuthenticated(req, res, next) {
    // funcao que testa autenticacao
    if (req.isAuthenticated()) {
        return next()
    }
    // se n houver chave de autenticacao redirecionar ao login
    res.redirect('/login');
}

router.get('/login', (req, res) => {
    res.send('home login')
})

router.get('/register', (req, res) => {
    res.send('home register')
})

router.post('/register', async (req, res) => {
    try {
        
        // faz a criptografia da senha
        const hashedPassword = await bcrypt.hash(req.body.password, 10) 

        let obj = {
            userName: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }

        let returnUser = await userDB.checkAndCreactUser(obj)

        if (returnUser['error'] == false) {
            res.redirect('/login') // se deu tudo certo ir para o login
        } else {
            res.send(returnUser['error'])
        }
    } catch (e) {
        console.log(e)
        res.redirect('/login/register') // se algo falhar  login cadastro
    }
})

module.exports = router;
