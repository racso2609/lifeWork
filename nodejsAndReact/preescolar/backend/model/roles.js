const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const rolesModel = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Role", rolesModel);