function convertCurrency(from, to, amount) {
  var apiKey = getApi();

  // var url = `https://freecurrencyapi.net/api/v1/rates?base_currency=${from}&apikey=${apiKey}`;
  var url = "aaaa"
  var request = new XMLHttpRequest();
  request.open("GET", url, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(this.response);
      var date = dateString();
      var result = calculateAmount(amount, data.data[date][to]);
      result = result.toFixed(4);
      console.log(result);
      
      $("#result").text("is "+result + " "+to);

      return result;
    } else {
      console.error("Something went wrong. status:  " + request.status);
      serverUnavailable();
    }
  };

  request.send();
}

function calculateAmount(amount, rate) {
  return amount * rate;
}

function dateString() {
  var date = new Date();

  var day = String(date.getDate()-1).padStart(2, "0");
  var month = String(date.getMonth() + 1).padStart(2, "0"); 
  var year = date.getFullYear();

  var today = year + "-" + month + "-" + day;
   
  return today;
}

function serverUnavailable(){
  window.location.replace("service-unavailable.html");
}