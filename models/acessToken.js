const mongoose = require('mongoose');

const acessTokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    Token: {
        type: String
    },

    valid: {
        type: Boolean
    }
},{
    timestamps: true
});

const Token = mongoose.model('Token',acessTokenSchema);
module.exports = Token;