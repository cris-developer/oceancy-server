//Destination.model.js

const mongoose = require('mongoose');
const { Schema, model } = mongoose;
//var ObjectId = mongoose.Schema.Types.ObjectId;

const destinationSchema = new Schema(
  { 
    name: { 
      type: String,
      required :true
    },
    photoUrl: {
      type: String
    },
  
  },
    {
      timestamps: true
    }
);

module.exports = model('Destination', destinationSchema);