const PubSub = require('../helpers/pub_sub.js');

const SelectView = function (selectElement) {
  this.selectElement = selectElement;
};

// populating menu after subscribing to dates ready channel in films.js after get
SelectView.prototype.subscribeToDatesAndPopulateDropDown = function () {
  PubSub.subscribe('Films:release-dates-ready', (evt) => {
    this.populateSelect(evt.detail);
  });

// recording year selection and publish index to SelectView channel
this.selectElement.addEventListener('change', (evt) => {
  const selectedIndex = evt.target.value;
  PubSub.publish('SelectView:change', selectedIndex);
  });
};

// Runs through releaseDate array and initial add to menu option
SelectView.prototype.populateSelect = function (releaseDates) {
  releaseDates.forEach((release_date, index) => {
    const option = this.createReleaseDateOption(release_date, index);
    // console.log(option)
    this.selectElement.appendChild(option);
  })
};

// cretes initial menu option with date and index
SelectView.prototype.createReleaseDateOption = function (release_date, index) {
  const option = document.createElement('option');
  option.textContent = release_date;
  option.value = index;
  return option;
};

module.exports = SelectView;
