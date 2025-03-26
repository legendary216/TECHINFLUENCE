const mongoose = require('mongoose');
//import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['candidate', 'employer'], required: true },
  phoneNumber: { type: String },
  address: { type: String },
  profilePicture: { type: String },

});

// module.exports = mongoose.model('User', UserSchema);
 const User = mongoose.model("User",UserSchema)
module.exports = User; 