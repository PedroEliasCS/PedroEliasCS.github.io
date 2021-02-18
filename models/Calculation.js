const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = mongoose.Schema({
    title: {
        // nome do calculo
        type: String,
        required: true
    },
    content: {
        // o conteudo da explicação
        type: String,
        required: true
    },
    example: {
        // exemplos resulução exercicio
        type: String,
        required: true
    },
    formula: {
        type: String,
        required: true
    },
    infoFormula: {
        type: String,
        require: true
    },
    category: {
        type: mongoose.ObjectId,
        // nome da categoria
        ref: "Category",
        required: true
    },
    slug: {
        // codigo de rastreio
        type: String,
        required: true
    },
})

schema.plugin(mongoosePaginate)

module.exports = mongoose.model("Calculations", schema, "calculation")