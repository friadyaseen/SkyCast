//get location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(GetWeather);
} else {
  console.log('ERROR CANT GET LOCATION');
}


//get data
function GetWeather(positon) {
  lat = Math.round(positon.coords.latitude);
  lon = Math.round(positon.coords.longitude);

  //get current weather data
  fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=d683d4ce2bb76c53f54bda835a48260c")
    .then(response =>
      response.json().then(data => ({
        data: data,
        status: response.status
      })).then(res => {
        GetCurrentWeather(res.data)
      }));

  //get weather forcast data
  fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=d683d4ce2bb76c53f54bda835a48260c")
    .then(response =>
      response.json().then(data => ({
        data: data,
        status: response.status
      })).then(res => {
        SetWeakTemp(res.data)
      }));

  //get country and city name
  fetch("https://us1.locationiq.com/v1/reverse?key=pk.c006302e4e7295adba0bed3dfdf5297b&lat=" + positon.coords.latitude + "&lon=" + positon.coords.longitude + "&format=json")
    .then(response =>
      response.json().then(data => ({
        data: data,
        status: response.status
      })).then(res => {
        Getcityname(res.data)
      }));
}


//set current weather data to html
function GetCurrentWeather(currentweather) {

  let tempnaw = Math.round(currentweather.main.temp - 273);
  
  document.getElementById("tempnow").innerText = tempnaw;
  document.getElementById("CurrentTemp").innerText = tempnaw;

  document.getElementById("CurrentWeathericon").src = "./icons/" + currentweather.weather[0].icon.replace(/(n)|(d)/, '') + ".svg";
  document.getElementById("cicon").src = "./icons/" + currentweather.weather[0].icon.replace(/(n)|(d)/, '') + ".svg";

  document.getElementById('weather').innerText = currentweather.weather[0].main;

  document.getElementById("feelnow").innerText = Math.round(currentweather.main.feels_like - 273);


  document.getElementById("pres").innerText = currentweather.main.pressure + "hPa";
  document.getElementById("humi").innerText = currentweather.main.humidity + "%";
  document.getElementById("wind").innerText = currentweather.wind.speed + "m/s";
}


//set weather forcast data to html
function SetWeakTemp(weatherFor) {
  let j = 0;
  for (i = 1; i < weatherFor.list.length; i++) {
    let time = String(weatherFor.list[i].dt_txt)
    if (time.includes("00:00:00")) {
      document.getElementById('name' + j).innerText = Getdate(i, weatherFor);
      document.getElementById('temp' + j).innerText = Math.round(weatherFor.list[i].main.temp - 273);
      document.getElementById('weather' + j).innerText = weatherFor.list[i].weather[0].main;
      document.getElementById("weathericon" + j).src = "./icons/" + GetIcon(i, weatherFor) + ".svg";
      j++;
    }
  }
}


//turn number to days of the week
function Getdate(i, weatherFor) {
  let date = new Date(weatherFor.list[i].dt * 1000);
  switch (date.getDay()) {
    case 6:
      return ("Saturday")
    case 0:
      return ("Sunday")
    case 1:
      return ("Monday")
    case 2:
      return ("Tuesday")
    case 3:
      return ("Wednesday")
    case 4:
      return ("Thursday")
    case 5:
      return ("Friday")
  }
}


//remove n and d for icon names from data
function GetIcon(i, weatherFor) {
  let j = weatherFor.list[i].weather[0].icon.replace(/(n)|(d)/, '')
  return (j);
}

//remove governorate eh
function Getcityname(file) {
  document.getElementById("country").innerText = file.address.country;
  document.getElementById("city").innerText = file.address.state.replace("Governorate", "");
}

let hello = false;
//change for C to F
function changedegree() {
  hello = !hello;
  if (hello) {
    tofahrenheit();
  } else {
    tocelsius()
  }
}


// set C to F
function tofahrenheit() {
  for (i = 0; i < 8; i++) {
    if(i < 5)
    {
      document.getElementById('temp' + i).innerText = Math.round((document.getElementById('temp' + i).innerText) * (9 / 5) + 32);
    }
    document.getElementById("cdegree" + i).innerHTML = "&#8457;";
  }
  document.getElementById('tempnow').innerText = Math.round((document.getElementById('tempnow').innerText) * (9 / 5) + 32);

  document.getElementById('CurrentTemp').innerText = Math.round((document.getElementById('CurrentTemp').innerText) * (9 / 5) + 32);


  document.getElementById('feelnow').innerText = Math.round((document.getElementById('feelnow').innerText) * (9 / 5) + 32);
}


//Set F to C
function tocelsius() {
  for (i = 0; i < 8; i++) {
    if(i < 5)
    {

      document.getElementById('temp' + i).innerText = Math.round(((document.getElementById('temp' + i).innerText) - 32) * (5 / 9));
    }
    document.getElementById("cdegree" + i).innerHTML = "&#8451;";
  }
  document.getElementById('tempnow').innerText = Math.round(((document.getElementById('tempnow').innerText) - 32) * (5 / 9));

  document.getElementById('CurrentTemp').innerText = Math.round(((document.getElementById('CurrentTemp').innerText) - 32) * (5 / 9));

  document.getElementById('feelnow').innerText = Math.round(((document.getElementById('feelnow').innerText) - 32) * (5 / 9));
}