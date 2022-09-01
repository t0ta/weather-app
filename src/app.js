let apiKey = "5b4060dc448ce090c0895c5c8af48e68";
let units = "metric";
let city = "Lisbon";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

function displayForecast(response) {
  console.log(response.data);
  let cityElement = document.getElementById("city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.getElementById("description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.getElementById("temperature");
  temperatureElement.innerHTML = `${temperature}°C`;

  let humidity = response.data.main.humidity;
  let humidityElement = document.getElementById("humidity");
  humidityElement.innerHTML = `${humidity}%`;

  let feelsLike = Math.round(response.data.main.feels_like);
  let feelsLikeElement = document.getElementById("feels-like");
  feelsLikeElement.innerHTML = `${feelsLike}°C`;

  let wind = response.data.wind.speed;
  let windElement = document.getElementById("wind");
  windElement.innerHTML = `${wind} kph`;
}

axios.get(apiUrl).then(displayForecast);
