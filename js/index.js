function convertCurrency(from, to, amount) {
  var apiKey = getApi();

  var url = "https://freecurrencyapi.net/api/v1/rates?base_currency=USD";

  var request = new XMLHttpRequest();
  request.open("GET", url, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(this.response);
      console.log(data);
    } else {
      console.error("Something went wrong. status:  " + request.status);
    }
  };

  request.send();
}
