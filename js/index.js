function convertCurrency(from, to, amount) {
  var baseUrl = "https://free.currconv.com";
  var apiKey = getApi();

  fromCurrency = encodeURIComponent(from);
  toCurrency = encodeURIComponent(to);
  var query = fromCurrency + "_" + toCurrency;

  var url =
    baseUrl + "api/v7/convert?q=" + query + "&compact=ultra&apiKey=" + apiKey;

  $.ajax({
    url: url,
    context: document.body,
  }).done(function () {
      console.log("sucess");
  });
}
