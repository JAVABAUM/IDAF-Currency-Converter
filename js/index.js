function convertCurrency(from, to, amount) {
  var apiKey = getApi();

  var url = `https://freecurrencyapi.net/api/v1/rates?base_currency=${from}&apikey=cb4655c0-00e1-11ec-8704-774472d2bb87`;

  var request = new XMLHttpRequest();
  request.open("GET", url, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(this.response);
      // console.log(data);
      // console.log(data.data["2021-08-18"][to]);
      console.log(calculateAmount(amount , data.data["2021-08-18"][to]))

    } else {
      console.error("Something went wrong. status:  " + request.status);
    }
  };

  request.send();
}

function calculateAmount(amount, rate){
    return amount * rate;
}