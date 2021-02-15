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


controller.getOne = async (req, res) => {
    try {
        let user = req.params
        // faz a busca no parametros do link de acesso
        // faz a leitura da informação buscada

        let obj = await User.findById(user.id)
        // o id seŕa passado 
        // busca no banco de dados

        if (obj) res.send(obj)
        else res.status(404).end()


    } catch (error) {
        console.log(error)
        res.send(500).send(error)
    }
}

controller.update = async (req, res) => {
    try {
        const user = req.body

        if (user.email) {
            let checkEmail = await User.findOne({
                "email": user.email
            })

            if (checkEmail) {
                res.status(406).send("email já cadastrado")
                return
            }
        }

        let obj = await User.findByIdAndUpdate(id, req.body)

        if (obj) res.status(204).end()
        else res.status(404).end()
    } catch (err) {
        console.error(err)
        res.status(500).end()
    }
}

controller.list = (req, res) => {
    res.status(404).send("invalid id")
}


module.exports = controller