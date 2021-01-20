const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");


const AdminModel = new Schema({
    Email:{
        type: String,
        required: true,
        unique: true
    },
    Password:{
        type: String,
        required: true
    },
    Banned:{
        type: Boolean,
        default: false
    }
})

AdminModel.pre("save", async function(next){
    const hash = await bcrypt.hash(this.Password,10);
    this.Password = hash;
    next();
});

AdminModel.methods.isValidPassword = async function(password){
    const user = this;
    
    const compare = await bcrypt.compare(password, user.Password);
    return compare;
};

module.exports = mongoose.model("Admin", AdminModel);
