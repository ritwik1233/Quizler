const mongoose = require('mongoose');
const { Schema } = mongoose;

var quizSchema = new Schema({
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
mongoose.model('Quiz', quizSchema);