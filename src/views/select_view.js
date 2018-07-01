const PubSub = require('../helpers/pub_sub.js');

const SelectView = function (selectElement) {
  this.selectElement = selectElement;
};

SelectView.prototype.subscribeToDatesAndPopulateDropDown = function () {
  PubSub.subscribe('Films:release-dates-ready', (evt) => {
    this.populateSelect(evt.detail);
  });

this.selectElement.addEventListener('change', (evt) => {
  const selectedIndex = evt.target.value;
  PubSub.publish('SelectView:change', selectedIndex);
  });
};

SelectView.prototype.populateSelect = function (releaseDates) {
  releaseDates.forEach((release_date, index) => {
    const option = this.createReleaseDateOption(release_date, index);
    // console.log(option)
    this.selectElement.appendChild(option);
  })
};

SelectView.prototype.createReleaseDateOption = function (release_date, index) {
  const option = document.createElement('option');
  option.textContent = release_date;
  option.value = index;
  return option;
};

module.exports = SelectView;
