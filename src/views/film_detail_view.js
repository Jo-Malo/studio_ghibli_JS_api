const FilmDetailView = function () {
}

FilmDetailView.prototype.createFilmDetail = function (film) {
  const filmDetail = document.createElement('div');
  // CSS
  filmDetail.classList.add('film-detail');

  const title = document.createElement('h2');
  title.textContent = film.title;
  filmDetail.appendChild(title);

  const description = document.createElement('p');
  description.textContent = film.description;
  filmDetail.appendChild(description);

  const detailsList = document.createElement('ul');
  const director = this.createDetailListItem('Director', film.director);
  detailsList.appendChild(director);

  const releaseDate = this.createDetailListItem('Release date', film.release_date);
  detailsList.appendChild(releaseDate);

  filmDetail.appendChild(detailsList);
  return filmDetail;
};

FilmDetailView.prototype.createDetailListItem = function (label, property) {
  const element = document.createElement('li');
  element.textContent = `${label}: ${property}`;
  return element;
};

module.exports = FilmDetailView;
