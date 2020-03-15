const mongoose = require('mongoose');
const { Schema } = mongoose;

var questionSchema = new Schema({
    question: String,
    options: [{
      description: String,
      correct: Boolean
    }],
    tag: String,
    point: Number,
    type: String,
    createdBy: String
});
mongoose.model('Question', questionSchema);