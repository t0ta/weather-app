function formatDate(timestemp) {
  let date = new Date(timestemp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function displayForecast(response) {
  let cityElement = document.getElementById("city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.getElementById("description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let temperatureElement = document.getElementById("temperature");
  let temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = temperature;

  celsiusTemperature = response.data.main.temp;

  let humidityElement = document.getElementById("humidity");
  let humidity = response.data.main.humidity;
  humidityElement.innerHTML = `${humidity}%`;

  let feelsLikeElement = document.getElementById("feels-like");
  let feelsLike = Math.round(response.data.main.feels_like);
  feelsLikeElement.innerHTML = `${feelsLike}°C`;

  let windElement = document.getElementById("wind");
  let wind = response.data.wind.speed;
  windElement.innerHTML = `${wind} kph`;

  let dateElement = document.getElementById("date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.getElementById("icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "5b4060dc448ce090c0895c5c8af48e68";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.getElementById("city-input");
  searchCity(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.getElementById("temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.getElementById("temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.getElementById("search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.getElementById("fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.getElementById("celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("Kyiv");
