const mongoose = require('mongoose');
const USER = 'users'

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    trim: true,
    lowercase: true
  },
  user_fullName: {
    type: String,
    trim: true,
    lowercase: true
  },
  user_email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  user_DOB: {
    type: Date
  },
  user_phone: {
    type: String
  },
  user_img: {
    type: String
  },
  user_gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  user_country: {
    type: String
  },
  user_bio: {
    type: String
  },
  user_isGoogle: {
    type: Boolean,
  },
  user_isPhone: {
    type: Boolean
  },
  user_isFacebook: {
    type: Boolean
  },
  user_token: {
    type: String
  },
  createdTime: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
}, {
  collection: USER
});


const user = mongoose.model(USER, userSchema);


module.exports = {
  modal: user,
  collectionName: USER
}
