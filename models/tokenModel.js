const mongoose = require('mongoose');
const { Schema } = mongoose;

const tokenSchema = new Schema({
  value: String,
});
mongoose.model('token', tokenSchema);
