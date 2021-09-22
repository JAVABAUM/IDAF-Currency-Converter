function calculateAmount(amount, rate) {
  return amount * rate;
}

function serverUnavailable() {
  window.location.replace("service-unavailable.html");
}
function getRate(from, to) {
  data = localStorage.getItem(from);
  data = JSON.parse(data);
  return data[to];
}

function getKeys() {
  var apiKey = getApi2();
  var url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
  var request = new XMLHttpRequest();
  request.open("GET", url, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(this.response);
      var keys = data.conversion_rates;
      keys = Object.keys(keys);
      localStorage.setItem("keys", JSON.stringify(keys));
      keys = keys.sort();
      $.each(keys, function (index, value) {
        $("#fromcurrency").append(`
        <option value="${value}">${value}</option>
      `);
        $("#tocurrency").append(`
        <option value="${value}">${value}</option>
      `);
      });
    } else {
      console.error("Something went wrong. status:  " + request.status);
      serverUnavailable();
    }
  };
  request.send();
}

function convertCurrency(from, to, amount) {
  $("#errors").text("");
  var localStoragedata = localStorage.getItem(from);
  if (localStoragedata == null) {
    var apiKey = getApi2();
    var url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(this.response);
        var result = calculateAmount(amount, data.conversion_rates[to]);
        var resultchf = calculateAmount(amount, data.conversion_rates["CHF"]);
        result = result.toFixed(4);
        resultchf = resultchf.toFixed(4);

        localStorage.setItem(from, JSON.stringify(data.conversion_rates));

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
          "The exchange rate from " +
            from +
            " to " +
            to +
            " is: " +
            getRate(from, to)
        );
      } else {
        console.error("Something went wrong. status:  " + request.status);
        serverUnavailable();
      }
    };
    request.send();
  } else {
    var data = JSON.parse(localStoragedata);
    var result = calculateAmount(amount, data[to]);
    var resultchf = calculateAmount(amount, data["CHF"]);
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
      "The exchange rate from " +
        from +
        " to " +
        to +
        " is: " +
        getRate(from, to)
    );
  }
}
