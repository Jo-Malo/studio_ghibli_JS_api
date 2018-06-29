const Films = require('./models/films.js');
const FilmListView = require('./views/film_list_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JS loaded')
  const listContainer = document.querySelector('#film-list');
  const filmListView = new FilmListView(listContainer);
  filmListView.bindEvents();

  const films = new Films;
  films.getData();
})
