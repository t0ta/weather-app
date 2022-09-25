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
  return `Updated: ${day}, ${hours}:${minutes}`;
}

function formatForecasdtDate(timestemp) {
  let date = new Date(timestemp * 1000);
  let month = date.getMonth();
  let day = date.getDate();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Now",
    "Dec",
  ];
  return `${months[month]}, ${day}`;
}

function formatForecastDay(timestemp) {
  let date = new Date(timestemp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  console.log(response);
  let forecast = response.data.daily;
  let forecastElement = document.getElementById("forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2 card weather-forecast-card">
        <div class="weather-forecast-weekday">${formatForecastDay(
          forecastDay.dt
        )}</div>
          <div class="weather-forecast-date">${formatForecasdtDate(
            forecastDay.dt
          )}</div>
        <img class="weather-forecast-icon" src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt ="Weather icon"
        />
        <div class="weather-forecast">
          <span id="forecast-temp-max" class="weather-forecast-temp-max">${Math.round(
            forecastDay.temp.max
          )}°</span>
          <span id="forecast-temp-min" class="weather-forecast-temp-min">${Math.round(
            forecastDay.temp.min
          )}°</span>
        </div>
    `;
    }
    forecastHTML = forecastHTML + `</div>`;
    forecastHTML = forecastElement.innerHTML = forecastHTML;
  });
}

function getForecast(coordinates) {
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
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
  windElement.innerHTML = `${wind} mph`;

  let dateElement = document.getElementById("date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.getElementById("icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function catchSearchError(error) {
  if (error) {
    alert("Ops, city not found... Please, enter correct name");
  }
}

function searchCity(city) {
  let apiKey = "5b4060dc448ce090c0895c5c8af48e68";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather).catch(catchSearchError);
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

function displayNewYorkWeather(event) {
  event.preventDefault();
  searchCity("New York");
}

function displayLondonWeather(event) {
  event.preventDefault();
  searchCity("London");
}

function displayTokyoWeather(event) {
  event.preventDefault();
  searchCity("Tokyo");
}

function displaySydneyWeather(event) {
  event.preventDefault();
  searchCity("Sydney");
}

function displayLisbonWeather(event) {
  event.preventDefault();
  searchCity("Lisbon");
}

let celsiusTemperature = null;

let form = document.getElementById("search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.getElementById("fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.getElementById("celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let newYorkElement = document.getElementById("new-york");
newYorkElement.addEventListener("click", displayNewYorkWeather);

let londonElement = document.getElementById("london");
londonElement.addEventListener("click", displayLondonWeather);

let tokyoElement = document.getElementById("tokyo");
tokyoElement.addEventListener("click", displayTokyoWeather);

let sydneyElement = document.getElementById("sydney");
sydneyElement.addEventListener("click", displaySydneyWeather);

let lisbonElement = document.getElementById("lisbon");
lisbonElement.addEventListener("click", displayLisbonWeather);

searchCity("Kyiv");
