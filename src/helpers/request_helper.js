const RequestHelper = function (url) {
  this.url = url
}
// this request_helper is good when you make multiple different API requests

// XMLHttpRequest constructor to instantiate an object and send() method to actually make request
// so can recieve JSON object
RequestHelper.prototype.get = function (onComplete) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', this.url);
  xhr.addEventListener('load', function() {
    if(this.status !== 200){
      return;
    }
    // JSON.parse() is to deserialise the data into a JS object
    const data = JSON.parse(this.responseText);
    onComplete(data);
  });
  xhr.send();
};

module.exports = RequestHelper;
