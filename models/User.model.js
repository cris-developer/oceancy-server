// models/User.model.js

const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, 'Full name is required.'],
      unique: true
    },
    // name: {
    //   firstName: {
    //     type: String,
    //     trim: true,
    //     required: [true, "Firstname is required."],
    //   },
    //   lastName: {
    //     type: String,
    //     trim: true,
    //     required: [true, "Lastname is required."],
    //   },
    // },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      // this match will disqualify all the emails with accidental empty spaces, missing dots in front of (.)com and the ones with no domain at all
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },

    favoriteActivity :{
      type : String,
      // type: Schema.Types.ObjectId, ref: 'Activity' 
    },
    
    level : {
      type: String,
    },

    photoUrl: {
        type: String,
    },

    isAdmin :{
      type :Boolean,
      default :false,
    },

    activitiesHosting: [
      {
        type: Schema.Types.ObjectId, ref: "Activity",
      },
    ],
    activitiesAttending: [
      {
        type : Schema.Types.ObjectId, ref: "Activity",
      },
    ],
    
  },
  {
    timestamps: true
  }
);

module.exports = model('User', userSchema);