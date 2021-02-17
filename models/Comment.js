const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = mongoose.Schema({
    user: {
        // userName do comentario
        type: mongoose.ObjectId,
        ref: "User",
        required: true
    },
    comment: {
        type: String,
        required: true 
    },
    date: {
        type: String,
        require: true
    },
    calculation: {
        type: mongoose.ObjectId,
        ref: "Calculation",
        required: true
    },
    slug: {
        required: true,
        required: String
    }
})

schema.plugin(mongoosePaginate)

module.exports = mongoose.model("Comments", schema, "comment")