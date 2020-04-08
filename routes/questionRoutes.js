const mongoose = require('mongoose');
const fs = require('fs');
const Question = mongoose.model('Question');

module.exports = (app) => {

  app.get('/api/getAllQuestions', (req, res) => {
    if (req.session.userID) {
      const searchQuery = req.query.searchQuery
      if (searchQuery && searchQuery.length) {
        var regex = new RegExp(searchQuery);
        Question.find({ 
          $and: [
            { createdBy: req.session.userID },
            {  $or : [
              {'tag' : { $regex: regex, $options: 'i' }},
              {'question' : { $regex: regex, $options: 'i' }},
              {'options.description': { $regex: regex, $options: 'i' }}
            ]
            }
          ]
         }).then(questions => {
           console.log(questions);
          return res.send(questions);
        }).catch(err => {
          console.log(err);
          return res.send([]);
        });
      } else {
        Question.find({ createdBy: req.session.userID }).then(questions => {
          return res.send(questions);
        }).catch(err => {
          console.log(err);
          return res.send([]);
        });
      }
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

  app.post('/api/uploadfile', (req, res) =>{
    if(req.session.userID) {
      if(req.files) {
        const data = (req.files.file.data).toString();
        let jsonObj = [];
        const rows = data.split('\n').filter((each)=>{
          return each.length > 0;
        });
        let empty = false;
        let i = 1;
        while(i < rows.length) {
          const eachItem = rows[i].split(',');
          if(!eachItem[0].length ||!eachItem[1].length) {
            empty = true;
            break;
          } 
          const options = eachItem[1].split('/').map((each) => {
              if(each === eachItem[2]) {
                return {
                  description: each,
                  correct: true,
                }
              }
              return {
                description: each,
                correct: false
              }
          });
          jsonObj.push({
            question: eachItem[0],
            options: options,
            tag: eachItem[4] ? eachItem[4]: '',
            point: eachItem[3]? eachItem[3]: 0,
            type: 'MCQ',
            createdBy: req.session.userID
          });
          i += 1;
        }
        if(empty) {
          res.send('Invalid Field! Please check your csv file for empty cell');
        } else {
          if(jsonObj.length > 0){
            Question.insertMany((jsonObj)).then(data=>{
              console.log('Uploaded');
              return res.send('');
            }).catch(err=>{
              console.log(err);
              return res.send('Internal Service Error');
            })
          } else {
            res.send('Empty File');
          }
        }
      } else {
        res.send('Empty File');
      }
    } else {
      res.sendStatus(500);
    }
  });

};
