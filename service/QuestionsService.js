const mongoose = require('mongoose');
const Question = mongoose.model('Question');

const QuestionsService = {};

QuestionsService.getQuestions = async (query) => {
  try {
    const result = await Question.find(query).exec();
    return {
      status: 200,
      data: result,
    };
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      data: [],
    };
  }
};

QuestionsService.addQuestion = async (data) => {
  try {
    const newQuestion = new Question(data);
    await newQuestion.save();
    return {
      status: 200,
      message: 'Document Added sucessfully',
    };
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      message: 'Error Ocurred while adding the quiz',
    };
  }
};

QuestionsService.updateQuestion = async (data) => {
  try {
    await Question.updateOne(
      {
        _id: data._id,
      },
      { ...data },
      { upsert: true }
    );
    return {
      status: 200,
      message: 'Document updated sucessfully',
    };
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      message: 'Document updated failed',
    };
  }
};

QuestionsService.deleteQuestion = async (_id) => {
  try {
    await Question.deleteOne({ _id });
    return {
      status: 200,
      message: 'Document deleted sucessfully',
    };
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      message: 'Document updated failed',
    };
  }
};

module.exports = QuestionsService;
