const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
})

schema.plugin(mongoosePaginate)

module.exports = mongoose.model("Article", schema, "articles")