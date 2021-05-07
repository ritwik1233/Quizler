const OrQueryBuilder = require('../utils/OrQueryBuilder.js');
const AndQueryBuilder = require('../utils/AndQueryBuilder.js');
const QuizService = require('../service/QuizService.js');

module.exports = (app) => {
  app.post('/api/addQuiz', async (req, res) => {
    if (req.session.userID) {
      const data = {
        ...req.body,
        createdBy: req.session.userID,
        createdDate: new Date(),
      };
      const response = await QuizService.addQuiz(data);
      return res.status(response.status).send(response.message);
    }
    return res.status(401).send('Unauthorised Access');
  });

  app.put('/api/updateQuiz', async (req, res) => {
    if (req.session.userID) {
      const response = await QuizService.updateQuiz(req.body);
      return res.status(response.status).send(response.message);
    }
    return res.status(401).send('Unauthorised Access');
  });

  app.get('/api/getAllQuiz', async (req, res) => {
    if (req.session.userID) {
      let searchValue = req.query.searchQuery ? req.query.searchQuery : '';
      const _id = req.session.userID;
      const searchQuery = { createdBy: _id };
      const orQuery = new OrQueryBuilder(searchValue, 'Quiz');
      let andQuery = new AndQueryBuilder().addQuery(searchQuery);
      if (orQuery.$or) {
        andQuery = andQuery.addQuery(orQuery);
      }
      let response = await QuizService.getQuiz(andQuery.getQuery());
      return res.status(response.status).send(response.data);
    }
    return res.status(401).send([]);
  });

  app.delete('/api/deleteQuiz', async (req, res) => {
    if (req.session.userID) {
      const response = await QuizService.deleteQuiz(req.query._id);
      return res.status(response.status).send(response.message);
    }
    return res.status(401).send('Unauthorised Access');
  });
};
