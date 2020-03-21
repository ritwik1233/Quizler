const mongoose = require('mongoose');
const { Schema } = mongoose;

const quizSchema = new Schema({
  name: String,
  time: Number,
  description: String,
  questions: [{
    question: String,
    options: [{
      description: String,
      correct: Boolean
    }],
    point: Number
  }],
  like: Number,
  dislike: Number,
  comments: [{
    message: String,
    date: Date,
    createdBy: String
  }],
  createdBy: String,
  createdDate: String
});
mongoose.model('Quiz', quizSchema);