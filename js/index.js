function convertCurrency(from, to, amount) {
  var localStoragedata = localStorage.getItem(from);
  if (localStoragedata == null) {
    var apiKey = getApi();
    var url = `https://freecurrencyapi.net/api/v1/rates?base_currency=${from}&apikey=${apiKey}`;
    var request = new XMLHttpRequest();
    request.open("GET", url, true);

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(this.response);
        var date = dateString();
        var result = calculateAmount(amount, data.data[date][to]);
        var resultchf = calculateAmount(amount, data.data[date]["CHF"]);
        result = result.toFixed(4);
        resultchf = resultchf.toFixed(4);
        localStorage.setItem(from, JSON.stringify(data.data));

        $("#result").text(
          amount +
            " " +
            from +
            " are " +
            result +
            " " +
            to +
            " and " +
            resultchf +
            " CHF"
        );
        $("#rate").text(
          "The conversion rate from " +
            from +
            " to " +
            to +
            " is: " +
            getRate(from, to)
        );
        $("#errors").text("");
        return result;
      } else {
        console.error("Something went wrong. status:  " + request.status);
        serverUnavailable();
      }
    };

    request.send();
  } else {
    var data = JSON.parse(localStoragedata);
    var date = dateString();
    var result = calculateAmount(amount, data[date][to]);
    var resultchf = calculateAmount(amount, data[date]["CHF"]);
    result = result.toFixed(4);
    resultchf = resultchf.toFixed(4);

    $("#result").text(
      amount +
        " " +
        from +
        " are " +
        result +
        " " +
        to +
        " and " +
        resultchf +
        " CHF"
    );
    $("#rate").text(
      "The conversion rate from " +
        from +
        " to " +
        to +
        " is: " +
        getRate(from, to)
    );
    $("#errors").text("");
    return result;
  }
}

function calculateAmount(amount, rate) {
  return amount * rate;
}

function dateString() {
  var date = new Date();

  var day = String(date.getDate() - 1).padStart(2, "0");
  var month = String(date.getMonth() + 1).padStart(2, "0");
  var year = date.getFullYear();

  var today = year + "-" + month + "-" + day;

  return today;
}

function serverUnavailable() {
  window.location.replace("service-unavailable.html");
}

function getRate(from, to) {
  var date = dateString();
  data = localStorage.getItem(from);
  data = JSON.parse(data);
  return data[date][to];
}

function getKeys() {
  var apiKey = getApi();
  var url = `https://freecurrencyapi.net/api/v1/rates?base_currency=CHF&${apiKey}`;
  var request = new XMLHttpRequest();
  request.open("GET", url, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(this.response);
      var date = dateString();
      var keys = data.data[date];
      keys = Object.keys(keys);
      localStorage.setItem("keys", JSON.stringify(keys));
    }
  };
  request.send();
}
