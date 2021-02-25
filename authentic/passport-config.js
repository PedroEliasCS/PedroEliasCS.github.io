const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const users = require('../models/User'); // faz requisição da checagem do DB

const getUserByEmail = async (userName) => { // sub func
    const findUser = userName
    console.log('authentic login')
    let obj = await users.findOne({
        'name': findUser

    })

    return obj
};

const getUserById = async (id) => { // sup func
    console.log('authentic manutenção')
    let obj = await users.findOne({
        'id': id
    })
    return obj
}

function inicialize(passport) {  // func main para authenticação
    console.log('dentro do inicialize')
    const authenticateUser = async (userName, password, done) => {
        // console.log(email,'  email')
        console.log('dentro do athenticate');
        const user = await getUserByEmail(userName);

        console.log(user, ' // user ')
        if (user == null) {
            return done(null, false, {
                message: ' não cadastrado'
            })
        }
        
        try {
            if (await bcrypt.compare(password, user.password)) {
                console.log('login com sucesso')
                return done(null, user)
            } else {
                console.log('senha invalida')
                return done(null, false, {
                    message: ' senha invalidada'
                })
            }
        } catch (e) {
            console.log('erro para autenticar inicialize()  :', e)
            return done(e)
        }
    }
    passport.use(new localStrategy({
        usernameField: 'userName'
    }, authenticateUser))

    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}



module.exports = inicialize