const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Steps = new Schema({
    Actions:{
        type: String,
        required: true
    },
    Complete:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Step', Steps);