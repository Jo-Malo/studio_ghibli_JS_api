const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Films = function () {
  this.filmsData = [];
  this.releaseDates = [];
}

Films.prototype.bindEvents = function () {
  PubSub.subscribe('SelectView:change', (evt) => {
    const releaseIndex = evt.detail;
    this.publishFilmsByDate(releaseIndex);
      console.log(releaseIndex)
  })
};

Films.prototype.getData = function () {
  const requestHelper = new RequestHelper('https://ghibliapi.herokuapp.com/films')
  requestHelper.get((data) => {
    PubSub.publish('Films:films-ready', data);
    this.publishReleaseDates(data);
  });
}

Films.prototype.publishReleaseDates = function (data) {
  this.filmsData = data;
  this.releaseDates = this.uniqueReleaseDateList();
  PubSub.publish('Films:release-dates-ready', this.releaseDates);
}

Films.prototype.releaseDateList = function () {
  const fullList = this.filmsData.map(film => film.release_date);
    // console.log()
  return fullList;
}

Films.prototype.uniqueReleaseDateList = function () {
  return this.releaseDateList().filter((film, index, array) => {
    return array.indexOf(film) === index;
  });
}

Films.prototype.filmsByReleaseDate = function (releaseIndex) {
  const selectedDate = this.releaseDates[releaseIndex];
  return this.filmsData.filter((film) => {
    return film.release_date === selectedDate;
  });
};

Films.prototype.publishFilmsByDate = function (releaseIndex) {
  const foundFilms = this.filmsByReleaseDate(releaseIndex);
  PubSub.publish('Films:films-ready', foundFilms);
};

module.exports = Films;
