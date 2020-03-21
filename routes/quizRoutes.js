const mongoose = require('mongoose');
const Quiz = mongoose.model('Quiz');

module.exports = (app) => {
    app.post('/api/addQuiz', (req, res) => {
        if (req.session.userID) {
          if(req.body._id) {
            Quiz.updateOne({
              _id: req.body._id
            },
              { ...req.body }, { upsert: true }).then(result => {
                return res.sendStatus(200);
              }).catch(err => {
                console.log(err);
                return res.sendStatus(500);
              });
          } else {
            const newQuiz = new Quiz({
              ...req.body,
              createdBy: req.session.userID,
              createdDate: new Date()
            });
            newQuiz.save().then(() => {
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

    app.get('/api/getAllQuiz', (req, res) => {
        if (req.session.userID) {
            Quiz.find({ createdBy: req.session.userID }).then(quiz => {
              return res.send(quiz);
            }).catch(err => {
              console.log(err);
              return res.send([]);
            });
         } else {
           res.send([]);
         }
    });

    app.delete('/api/deleteQuiz', (req, res) => {
        if (req.session.userID) {
            Quiz.remove({ _id: req.query._id }).then(result => {
            return res.sendStatus(200);
          }).catch(err => {
            console.log(err);
            return res.sendStatus(500);
          });
        } else {
          res.sendStatus(500);
        }
      });

};
