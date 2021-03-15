const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SimpleTask = new Schema({
  Name: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: false,
  },
  AuthorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  AuthorName:{
    type: String,
    require: true
  },
  FinishOn: {
    type: Date,
    required: true
  },
  Complete: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SimpleTask', SimpleTask);
