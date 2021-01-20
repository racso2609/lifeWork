const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");


const UserModel = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    rol:{
        type: Schema.Types.ObjectId,
        ref: "Role",
        required: true
    }
})

UserModel.pre("save", async function(next){
    const hash = await bcrypt.hash(this.password,10);
    this.password = hash;
    next();
});

UserModel.methods.isValidPassword = async function(password){
    const user = this;
    
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

module.exports = mongoose.model("User", UserModel);
