const mongoose = require('mongoose');
const Quiz = mongoose.model('Quiz');

const QuizService = {};

QuizService.getQuiz = async (query) => {
  try {
    const aggregatePipeline = [
      {
        $match: query,
      },
      {
        $project: {
          _id: 1,
          name: 1,
          time: 1,
          description: 1,
          questions: 1,
          createdBy: { $toObjectId: '$createdBy' },
          createdDate: 1,
          comments: 1,
          userDocs: 1,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'userDocs',
        },
      },
      {
        $unwind: {
          path: '$userDocs',
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          time: 1,
          description: 1,
          questions: 1,
          createdBy: '$userDocs.email',
          createdDate: 1,
          comments: 1,
        },
      },
    ];
    let result = await Quiz.aggregate(aggregatePipeline).exec();
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

QuizService.addQuiz = async (data) => {
  try {
    const newQuiz = new Quiz(data);
    await newQuiz.save();
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

QuizService.updateQuiz = async (data) => {
  try {
    await Quiz.updateOne(
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

QuizService.deleteQuiz = async (_id) => {
  try {
    await Quiz.deleteOne({ _id });
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

module.exports = QuizService;
