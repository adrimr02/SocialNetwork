const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: { type: String, required: true, min: 3, max: 15, unique: true },
  email: { type: String, required: true, max: 50, unique: true },
  password: { type: String, required: true, min: 6 },
  profilePic: { type: String, default: '' },
  coverPic: { type: String, default: '' },
  desc: { type: String, max: 80, default:'' },
  followers: { type: Array, default: [] },
  following: { type: Array, default: [] },
  location: { type: String, max: 50 },
  birthday: { type: Date },
  isAdmin: { type: Boolean, default: false }
},
{ timestamps: true });

module.exports = model('user', UserSchema);