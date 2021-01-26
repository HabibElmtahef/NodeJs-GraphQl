const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
    },
    image : {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('Games', gameSchema)