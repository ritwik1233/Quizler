const QuizService = require('../service/QuizService.js');
const OrQueryBuilder = require('../utils/OrQueryBuilder.js');

module.exports = (app) => {
  app.get('/api/getAllHomeQuiz', async (req, res) => {
    let searchValue = req.query.searchQuery ? req.query.searchQuery : '';
    const query = new OrQueryBuilder(searchValue, 'Quiz');
    let response = await QuizService.getQuiz(query);
    return res.status(response.status).send(response.data);
  });
};
