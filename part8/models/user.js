const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 4,
    },
    favoriteGenre: String,
});

module.exports = mongoose.model('User', schema);
