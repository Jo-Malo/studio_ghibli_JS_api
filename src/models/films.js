const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Films = function () {
  this.filmsData = [];
}

Films.prototype.getData = function () {
  const requestHelper = new RequestHelper('https://ghibliapi.herokuapp.com/films')
  requestHelper.get((data) => {
    PubSub.publish('Films:films-ready', data);
  });
}

module.exports = Films;
