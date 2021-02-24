const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
        User:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }, 
        Msg:{
            type: String,
            required:true
        }
    },{
  
        timestamps: true
});

module.exports = mongoose.model("Message",MessageSchema); 