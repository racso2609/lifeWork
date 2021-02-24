const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const farmerModel = new Schema({
    farmerNumber:{
        type: Number,
        required: true,
        unique: true
    },
    Name:{
        type: String,
        required: true
    },
    Address:{
        type: String,
        required: true
    },
    sqm2:{
        type: Number,
        required: true
    },
    Coop:{
        type: Schema.Types.ObjectId,
        ref:"Coorp",
        required: true
    },
    CoopName:{
        type: String,
        required:true
    },
    Banned:{
        type: Boolean,
        required: true
    }
  
})

module.exports = mongoose.model("Farmer", farmerModel);
