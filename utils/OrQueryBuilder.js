const mongoose = require('mongoose');
const defaultQuizFields = [
  'name',
  'description',
  'questions.question',
  'questions.question.options.description',
  'comments.message',
];
const defaultQuestionFields = ['tag', 'question', 'options.description'];
class OrQueryBuilder {
  constructor(searchValue, collectionName) {
    if (searchValue && searchValue.length > 0) {
      this.searchValue = new RegExp(searchValue);
      this.fields = [];
      if (collectionName === 'Quiz') {
        this.fields = defaultQuizFields;
      } else if (collectionName === 'Questions') {
        this.fields = defaultQuestionFields;
      }
      this.queryObject = { $or: [] };
      for (let i = 0; i < this.fields.length; i++) {
        const query = {};
        query[this.fields[i]] = { $regex: searchValue, $options: 'i' };
        this.queryObject.$or.push(query);
      }
      return this.queryObject;
    }
    return {};
  }
}

module.exports = OrQueryBuilder;
