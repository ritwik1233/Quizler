const mongoose = require('mongoose');
const Question = mongoose.model('Question');
const OrQueryBuilder = require('../utils/OrQueryBuilder.js');
const AndQueryBuilder = require('../utils/AndQueryBuilder.js');
const QuestionService = require('../service/QuestionsService.js');

module.exports = (app) => {
  app.get('/api/getAllQuestions', async (req, res) => {
    if (req.session.userID) {
      let searchValue = req.query.searchQuery ? req.query.searchQuery : '';
      const _id = req.session.userID;
      const searchQuery = { createdBy: _id };
      const orQuery = new OrQueryBuilder(searchValue, 'Questions');
      let andQuery = new AndQueryBuilder().addQuery(searchQuery);
      if (orQuery.$or) {
        andQuery = andQuery.addQuery(orQuery);
      }
      const response = await QuestionService.getQuestions(andQuery.getQuery());
      return res.status(200).send(response.data);
    }
    return res.status(401).send([]);
  });

  app.post('/api/addQuestion', async (req, res) => {
    if (req.session.userID) {
      const data = {
        ...req.body,
        createdBy: req.session.userID,
        createdDate: new Date(),
      };
      const response = await QuestionService.addQuestion(data);
      return res.status(response.status).send(response.message);
    }
    return res.status(401).send('Unauthorised Access');
  });

  app.put('/api/updateQuestion', async (req, res) => {
    if (req.session.userID) {
      const response = await QuestionService.updateQuestion(req.body);
      return res.status(response.status).send(response.message);
    }
    return res.status(401).send('Unauthorised Access');
  });

  app.delete('/api/deleteQuestion', async (req, res) => {
    if (req.session.userID) {
      const response = await QuestionService.deleteQuestion(req.query._id);
      return res.status(response.status).send(response.message);
    }
    return res.status(401).send('Unauthorised Access');
  });

  app.get('/api/getAllTag', (req, res) => {
    if (req.session.userID) {
      const tag = req.query.tag;
      var regex = new RegExp(tag);
      Question.find({
        $and: [
          { createdBy: req.session.userID },
          { tag: { $regex: regex, $options: 'i' } },
        ],
      })
        .select({ tag: 1, _id: 0 })
        .distinct('tag')
        .then((questions) => {
          return res.send(questions);
        })
        .catch((err) => {
          console.log(err);
          return res.send([]);
        });
    } else {
      return res.send([]);
    }
  });

  app.post('/api/uploadfile', (req, res) => {
    if (req.session.userID) {
      if (req.files) {
        const data = req.files.file.data.toString();
        let jsonObj = [];
        const rows = data.split('\n').filter((each) => {
          return each.length > 0;
        });
        let empty = false;
        let i = 1;
        while (i < rows.length) {
          const eachItem = rows[i].split(',');
          if (!eachItem[0].length || !eachItem[1].length) {
            empty = true;
            break;
          }
          const options = eachItem[1].split('/').map((each) => {
            if (each === eachItem[2]) {
              return {
                description: each,
                correct: true,
              };
            }
            return {
              description: each,
              correct: false,
            };
          });
          jsonObj.push({
            question: eachItem[0],
            options: options,
            tag: eachItem[4] ? eachItem[4] : '',
            point: eachItem[3] ? eachItem[3] : 0,
            type: 'MCQ',
            createdBy: req.session.userID,
          });
          i += 1;
        }
        if (empty) {
          res.send('Invalid Field! Please check your csv file for empty cell');
        } else {
          if (jsonObj.length > 0) {
            Question.insertMany(jsonObj)
              .then((data) => {
                console.log('Uploaded');
                return res.send('');
              })
              .catch((err) => {
                console.log(err);
                return res.send('Internal Service Error');
              });
          } else {
            return res.send('Empty File');
          }
        }
      } else {
        return res.send('Empty File');
      }
    } else {
      return res.sendStatus(500);
    }
  });
};
