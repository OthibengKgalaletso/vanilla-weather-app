function formatDate(timestamp) {
  let currentTime = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentYear = currentTime.getFullYear();
  let currentDay = days[currentTime.getDay()];
  let currentMonth = months[currentTime.getMonth()];
  let currentDate = currentTime.getDate();
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${currentDay} | ${currentDate} ${currentMonth} ${currentYear} | ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`; // Everything downstream will be in the same row (creating a grid)
  forecast.forEach(function (forecastDay, index) {
    //To loop through the days in the array one at a time - so that it may display forecast for different days
    //we are using the same HTML but for different days
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="forecast-dates">${formatDay(forecastDay.dt)}</div>
                <img
                  src="https://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="43"
                />
                <div class="forecast-temperatures">
                  <span class="weather-forecast-max-temperature">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="weather-forecast-min-temperature">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`; //This is for closing the row div element.
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;
  let units = "metric";
  let apiKey = "210d99196a88b9257ed8cb3535a0a0c5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let mainTemperature = document.querySelector("#current-temperature");
  mainTemperature.innerHTML = Math.round(response.data.main.temp);

  celsiusTemperature = response.data.main.temp;

  let mainCity = document.querySelector("#current-city");
  mainCity.innerHTML = response.data.name;
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].description;

  let cityHumidity = document.querySelector("#current-humidity");
  cityHumidity.innerHTML = `Humidity: ${humidity}%`;

  let cityWind = document.querySelector("#current-wind");
  cityWind.innerHTML = `Wind: ${wind} km/h`;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `${description}`;

  let editDate = document.querySelector("#current-date-details");
  editDate.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#weather-icon");
  let iconCode = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "2a5f42ec0e56eeb52bee2cc8b3e92147";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function enterCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  search(searchInput.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  //remove the active class from celsius and add to fahrenheit
  celsiusLinkElement.classList.remove("active");
  fahrenheitLinkElement.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLinkElement.classList.add("active");
  fahrenheitLinkElement.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", enterCity);

let fahrenheitLinkElement = document.querySelector("#fahrenheit-link");
fahrenheitLinkElement.addEventListener("click", displayFahrenheitTemperature);

let celsiusLinkElement = document.querySelector("#celsius-link");
celsiusLinkElement.addEventListener("click", displayCelsiusTemperature);

search("New York");
