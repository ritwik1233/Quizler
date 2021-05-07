class AndQueryBuilder {
  constructor() {
    this.queryObject = {
      $and: [],
    };
  }
  addQuery(query) {
    this.queryObject.$and.push(query);
    return this;
  }
  getQuery() {
    return this.queryObject;
  }
}

module.exports = AndQueryBuilder;
