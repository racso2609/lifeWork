const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const userSchema = new Schema({
    admin:{
        type:Boolean,
        default: false
    }
});

var user = mongoose.model("user",userSchema);
module.exports = user;