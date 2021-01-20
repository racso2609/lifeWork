const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");


const coorpModel = new Schema(
  {
    Firstname: {
        type: String,
        required: true
    },
    Lastname: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    PostCode: {
        type: Number,
        max: 999999,
        required: true
    },
    Suburb:{
        type: String,
        required: true
    },
    State:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true,
        unique: true
    },
    Phone:{
        type: Number,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    Banned:{
        type: Boolean,
        required: true
    },
    CoopName:{
        type: String,
        required: true,
        unique: true
    }
  }
);

coorpModel.pre("save", async function(next){
    const hash = await bcrypt.hash(this.Password,10);
    this.Password = hash;
    next();
});
coorpModel.methods.isValidPassword = async function(password){
    const user = this;
    
    const compare = await bcrypt.compare(password, user.Password);
    return compare;
};


module.exports = mongoose.model("Coorp", coorpModel);