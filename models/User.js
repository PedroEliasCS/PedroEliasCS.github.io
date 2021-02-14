const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        // com criptografia de alguns 
        type: String,
        required: true,
    },
    email: {
        // com criptografia de alguns digitos
        type: String,
        required: true
    },
    iconUser: {
        type: String, 
        required: true
    },

})

module.exports = mongoose.model("User", schema, "users")