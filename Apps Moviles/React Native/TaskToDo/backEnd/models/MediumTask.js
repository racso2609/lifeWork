const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MediumTask = new Schema({
  Name:{
    type: String,
    required: true
  },
  Description:{
    type: String,
    required: true
  },
  Author:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  FinishOn:{
    type: Date,
    required: true
  },
  Porcentage:{
    type: Number,
    default: 0
  },
  Steps:[{
    type: Schema.Types.ObjectId,
    ref: 'SimpleTask',
    required: false
  }]
},{
  timestamps: true
});

module.exports = mongoose.model('MediumTask', MediumTask);

