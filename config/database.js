const mongoose = require('mongoose')

module.exports = uri => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
}

mongoose.connection.on('connected', () => console.log("Mongo conectado ao servidor!"))

process.on("SIGINT", () => {
    console.log("Mongoose desconetado pelo fim da aplicação!")
    process.exit(0)
})

mongoose.connection.on('disconnected', () => console.log("Mongoose desconectado!"))