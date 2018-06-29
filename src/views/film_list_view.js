const PubSub = require('../helpers/pub_sub.js');
const FilmDetailView = require('./film_detail_view.js');


const FilmListView = function (container) {
  this.container = container;
};

FilmListView.prototype.bindEvents = function () {
  PubSub.subscribe('Films:films-ready', (evt) => {
    this.clearList();
    this.renderFilmDetailViews(evt.detail);
  });
};

FilmListView.prototype.clearList = function () {
  this.container.innerHTML = '';
};

//OLD VERSION
// FilmListView.prototype.renderFilmDetailViews = function (films) {
//   films.forEach((film) => {
//     const filmItem = this.createFilmListItem(film);
//     this.container.appendChild(filmItem);
//   });
// };

FilmListView.prototype.renderFilmDetailViews = function (films) {
  films.forEach((film) => {
    const filmItem = this.createFilmListItem(film);
    this.container.appendChild(filmItem);
    console.log(filmItem)
  });
};

FilmListView.prototype.createFilmListItem = function (film) {
  const filmDetailView = new FilmDetailView();
  const filmDetail = filmDetailView.createFilmDetail(film);
  return filmDetail;
};

module.exports = FilmListView;
