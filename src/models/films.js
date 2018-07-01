const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

// empty arrays to fill
const Films = function () {
  this.filmsData = [];
  this.releaseDates = [];
}

//subscribe to click event and publish film relevant to selection
Films.prototype.watchSelectAndPublishSelectedYearFilm = function () {
  PubSub.subscribe('SelectView:change', (evt) => {
    const releaseIndex = evt.detail;
    this.publishFilmsByDate(releaseIndex);
      // console.log(releaseIndex)
  })
};

// getting data direct from url and publishing to films-ready
Films.prototype.getData = function () {
  const requestHelper = new RequestHelper('https://ghibliapi.herokuapp.com/films')
  requestHelper.get((data) => {
    PubSub.publish('Films:films-ready', data);
    this.publishReleaseDates(data);
  });
}

// publishing films by year to releaseDates array and release-dates-ready channel
Films.prototype.publishReleaseDates = function (data) {
  this.filmsData = data;
  this.releaseDates = this.uniqueReleaseDateList();
  PubSub.publish('Films:release-dates-ready', this.releaseDates);
  // console.log(this.releaseDates)
}

// mapping full list of release dates to variable fullList
Films.prototype.releaseDateList = function () {
  const fullList = this.filmsData.map(film => film.release_date);
    // console.log()
  return fullList;
}

// array of films by index
Films.prototype.uniqueReleaseDateList = function () {
  return this.releaseDateList().filter((film, index, array) => {
    return array.indexOf(film) === index;
  });
}

// finding the right film in response to request
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
