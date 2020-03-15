const mongoose = require('mongoose');
const Question = mongoose.model('Question');

module.exports = (app) => {

  app.get('/api/getAllQuestions', (req, res) => {
    if (req.session.userID) {
      Question.find({ createdBy: req.session.userID }).then(questions => {
        return res.send(questions);
      }).catch(err => {
        console.log(err);
        return res.send([]);
      });
   } else {
     res.send([]);
   }
  });

  app.post('/api/addQuestion', (req, res) => {
    if (req.session.userID) {
      if(req.body._id) {
        Question.updateOne({
          _id: req.body._id},
          { ...req.body }, { upsert: true }).then(result => {
            return res.sendStatus(200);
          }).catch(err => {
            console.log(err);
            return res.sendStatus(500);
          });
      } else {
        const newQuestion = new Question({
          ...req.body,
          createdBy: req.session.userID
        });
        newQuestion.save().then(() => {
          return res.sendStatus(200);
        }).catch(err => {
          console.log(err);
          return res.status(500).send('Internal Server Error');      
        });
      }
   } else {
     res.sendStatus(500);
   }
  });

  app.delete('/api/deleteQuestion', (req, res) => {
    if (req.session.userID) {
      Question.remove({ _id: req.query._id }).then(result => {
        return res.sendStatus(200);
      }).catch(err => {
        console.log(err);
        return res.sendStatus(500);
      });
    } else {
      res.sendStatus(500);
    }
  });

  app.get('/api/getAllTag', (req, res) => {
    if (req.session.userID) {
      const tag = req.query.tag
      var regex = new RegExp(tag);
      Question.find({ 
        $and: [
          { createdBy: req.session.userID },
          { 'tag' : { $regex: regex, $options: 'i' }  }
        ]
       }).select({ 'tag': 1, '_id': 0 }).distinct('tag').then(questions => {
        return res.send(questions);
      }).catch(err => {
        console.log(err);
        return res.send([]);
      })
    } else {
      res.send([]);
    }
  });

};
