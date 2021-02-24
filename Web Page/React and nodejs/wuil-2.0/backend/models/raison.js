const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const raisonSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    raison:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    }
},{
        timestamps: true
})

var raison = mongoose.model("raison", raisonSchema);
module.exports = raison;