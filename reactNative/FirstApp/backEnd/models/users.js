const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userModel = new Schema({
    Email:{
        type: String,
        required: true,
        unique: true
    },
    Firstname:{
        type: String,
        required: true
    },
    Lastname:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    Phone:{
        type: Number,
        required: true
    },
    Rol:{
        type: Schema.Types.ObjectId,
        ref: "Role",
        required: true
    },
    Banned:{
        type: Boolean,
        default: false
    }
});

userModel.pre("save", async function(next){
    const hash = await bcrypt.hash(this.Password,10);
    this.Password = hash;
    next();
});

userModel.methods.isValidPassword = async function(password){
    const user = this;

    const compare = await bcrypt.compare(password, user.Password);
    return compare;

}

module.exports = mongoose.model("User", userModel);