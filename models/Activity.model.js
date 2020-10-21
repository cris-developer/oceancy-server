//Activity.model.js
const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const activitySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      maxlength: 500
    },
    startDate: {
        type: Date,
        default: Date.now, 
        required: true
    },

    endDate: {
        type: Date,
        default: Date.now, 
        required: true
    },

    duration: {
        type: String,
        required: true
    },
    price:  {
        type: String,
        required: true
    },
    type : {
        type: String,
        required: true
        
    },
    address : {
      type: String,
      //required: [true, 'Please add an address']
    },
    destination:{
      type: String,
    },
    location: {
      type: {
        type: String,
        enum: ['Point']
      },
      
    },
    photoUrl: {
        type: String,
    },
    
    host: { 
      type: Schema.Types.ObjectId, ref: 'User' 
    },
    
  },
  {
    timestamps: true
  }
);


module.exports = model('Activity', activitySchema);





