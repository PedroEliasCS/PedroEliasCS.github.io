let User = require('../models/User')
// faz as requisições para o banco
let bcrypt = require('bcryptjs')
// para a criptografia de email e senha

const controller = {}

controller.new = async (req, res) => {
    try {
        let user = req.body

        let emailTest = await User.findOne({
            email: user.email
        })

        if (!emailTest) {
            // caso o email n esteja cadastrado
            // CADASTRA o maldito

            let salt = bcrypt.genSaltSync(10)
            user.password = bcrypt.hashSync(user.password, salt)

            await User.create(user)
            // esse comando ignora qualquer itens adicional malicioso
            // sendo assim ele não chega ao banco de dados

            res.status(201).end()
        } else {
            res.status(500).end()
        }

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports = controller