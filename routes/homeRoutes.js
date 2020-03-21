const mongoose = require('mongoose');
const Quiz = mongoose.model('Quiz');
const User = mongoose.model('User');

module.exports = (app) => {
  app.get('/api/getAllHomeQuiz', async (req, res) => {
    let quizArray = await Quiz.find({});
    if (quizArray.length === 0){
        res.send([]);
    } else {
        for ( let i = 0 ; i < quizArray.length; i += 1) {
            const userData = await User.findOne({ _id: quizArray[i].createdBy }).select({ 'email': 1 })
            quizArray[i] = { ...quizArray[i]._doc, createdBy: userData.email };
        }
        res.send(quizArray);   
    }
  });
};
