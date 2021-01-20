const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const walkerModel = new Schema({
    Name:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true,
        unique:true
    },
    Password:{
        type: String,
        required:true
    },
    Banned:{
        type: Boolean,
        required: true
    },
    Coop:{
        type: Schema.Types.ObjectId,
        ref:"Coorp",
        required: false
    },
    CoopName:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Walker", walkerModel);
