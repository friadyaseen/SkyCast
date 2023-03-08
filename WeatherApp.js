
//make it more biutiflul
//responsivness

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(GetWeather);
} else {
  console.log('ERROR CANT GET LOCATION');
}



function GetWeather(positon) {
  lat = Math.round(positon.coords.latitude);
  lon = Math.round(positon.coords.longitude);
  console.log(positon.coords.latitude, positon.coords.longitude)
  fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=d683d4ce2bb76c53f54bda835a48260c")
    .then(response =>
      response.json().then(data => ({
        data: data,
        status: response.status
      })
      ).then(res => {
        GetCurrentWeather(res.data)
      }));


  fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=d683d4ce2bb76c53f54bda835a48260c")
    .then(response =>
      response.json().then(data => ({
        data: data,
        status: response.status
      })
      ).then(res => {
        SetWeakTemp(res.data)
      }));

  fetch("https://us1.locationiq.com/v1/reverse?key=pk.c006302e4e7295adba0bed3dfdf5297b&lat=" + positon.coords.latitude + "&lon=" + positon.coords.longitude + "&format=json")
    .then(response =>
      response.json().then(data => ({
        data: data,
        status: response.status
      })
      ).then(res => {
        Getcityname(res.data)
      }));
}

function GetCurrentWeather(currentweather) {

  let tempnaw = Math.round(currentweather.main.temp - 273);

  document.getElementById("CurrentTemp").innerText = tempnaw;
  document.getElementById("CurrentTemp1").innerText = tempnaw;

  document.getElementById("CurrentWeathericon").src = "/icons/" + currentweather.weather[0].icon.replace(/(n)|(d)/, '') + ".svg";
  document.getElementById("CurrentWeathericon1").src = "/icons/" + currentweather.weather[0].icon.replace(/(n)|(d)/, '') + ".svg";

  document.getElementById('weather').innerText = currentweather.weather[0].main;

  document.getElementById("feel").innerText = Math.round(currentweather.main.feels_like - 273);


  document.getElementById("pres").innerText = currentweather.main.pressure + "hPa";
  document.getElementById("humi").innerText = currentweather.main.humidity + "%";
  document.getElementById("wind").innerText = currentweather.wind.speed + "m/s";
}



function SetWeakTemp(weatherFor) {
  let j = 1;
  for (i = 0; i < weatherFor.list.length; i++) {
    let time = String(weatherFor.list[i].dt_txt)
    if (time.includes("12:00:00")) {
      document.getElementById('name' + j).innerText = Getdate(i, weatherFor);
      document.getElementById('temp' + j).innerText = Math.round(weatherFor.list[i].main.temp - 273);
      document.getElementById('weather' + j).innerText = weatherFor.list[i].weather[0].main;
      document.getElementById("weathericon" + j).src = "/icons/" + GetIcon(i, weatherFor) + ".svg";
      j++;
    }
  }
}

function Getdate(i, weatherFor) {
  let date = new Date(weatherFor.list[i].dt * 1000);
  switch (date.getDay()) {
    case 0:
      return ("Saturday")
    case 1:
      return ("Sunday")
    case 2:
      return ("Monday")
    case 3:
      return ("Tuesday")
    case 4:
      return ("Wednesday")
    case 5:
      return ("Thursday")
    case 6:
      return ("Friday")
  }
}

function GetIcon(i, weatherFor) {
  let j = weatherFor.list[i].weather[0].icon.replace(/(n)|(d)/, '')
  return (j);
}

function Getcityname(file) {
  document.getElementById("country").innerText = file.address.country;
  document.getElementById("city").innerText = file.address.state.replace("Governorate", "");
}

let hello = false;

function changedegree() {
  hello = !hello;
  if (hello) {
    tofahrenheit();
  }
  else {
    tocelsius()
  }
}

function tofahrenheit() {
  for (i = 1; i < 6; i++) {
    document.getElementById('temp' + i).innerText = Math.round((document.getElementById('temp' + i).innerText) * (9 / 5) + 32);
    document.getElementById('degree' + i).innerHTML = "&#8457;";
  }
  document.getElementById('CurrentTemp').innerText = Math.round((document.getElementById('CurrentTemp').innerText) * (9 / 5) + 32);
  document.getElementById('degree').innerHTML = "&#8457;";

  document.getElementById('CurrentTemp1').innerText = Math.round((document.getElementById('CurrentTemp1').innerText) * (9 / 5) + 32);
  document.getElementById('degreee').innerHTML = "&#8457;";

  document.getElementById('feel').innerText = Math.round((document.getElementById('feel').innerText) * (9 / 5) + 32);
  document.getElementById('degreea').innerHTML = "&#8457;";
}

function tocelsius() {
  for (i = 1; i < 6; i++) {
    document.getElementById('temp' + i).innerText = Math.round(((document.getElementById('temp' + i).innerText) - 32) * (5 / 9));
    document.getElementById('degree' + i).innerHTML = "&#8451;";
  }
  document.getElementById('CurrentTemp').innerText = Math.round(((document.getElementById('CurrentTemp').innerText) - 32) * (5 / 9));
  document.getElementById('degree').innerHTML = "&#8451;";

  document.getElementById('CurrentTemp1').innerText = Math.round(((document.getElementById('CurrentTemp1').innerText) - 32) * (5 / 9));
  document.getElementById('degreee').innerHTML = "&#8451;";

  document.getElementById('feel').innerText = Math.round(((document.getElementById('feel').innerText) - 32) * (5 / 9));
  document.getElementById('degreea').innerHTML = "&#8451;";
}