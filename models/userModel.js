const mongoose = require('mongoose');
const { Schema } = mongoose;

var userSchema = new Schema({
    fname: String,
    lname: String,
    email: String,
    password: String,
    verified: Boolean,
    accountType: String
});
mongoose.model('User', userSchema);