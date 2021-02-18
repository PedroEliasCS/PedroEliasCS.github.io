const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = mongoose.Schema({
    user: {
        // userName do comentario
        type: mongoose.ObjectId,
        ref: "User",
        // nome do usuario
        required: true
    },
    slug: {
        required: true,
        type: String
    },
    comment: {
        type: String,
        required: true 
    },
    date: {
        type: String,
    },
    calculation: {
        type: mongoose.ObjectId,
        ref: "Calculation",
        // nome do calculo
        required: true
    },

})

schema.plugin(mongoosePaginate)

module.exports = mongoose.model("Comments", schema, "comment")