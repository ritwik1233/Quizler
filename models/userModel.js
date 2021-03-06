const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
  verified: Boolean,
});
mongoose.model('User', userSchema);
