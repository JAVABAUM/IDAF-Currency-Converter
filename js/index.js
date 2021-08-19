function convertCurrency(from, to, amount) {
  var baseUrl = "https://free.currconv.com";
  var apiKey = getApi();

  fromCurrency = encodeURIComponent(from);
  toCurrency = encodeURIComponent(to);
  var query = fromCurrency + "_" + toCurrency;

  var url =
    baseUrl + "api/v7/convert?q=" + query + "&compact=ultra&apiKey=" + apiKey;

  var request = new XMLHttpRequest();
  request.open(
    "GET",
    url,
    true
  );

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
