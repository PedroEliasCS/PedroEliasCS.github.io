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
    slug: {
        // codigo de rastreio
        type: String,
        required: true
    },
    author: {
        type: mongoose.ObjectId,
        ref: "Adm",
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: "Category",
        required: true
    }
})

schema.plugin(mongoosePaginate)

module.exports = mongoose.model("Article", schema, "articles")