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

function displayTemperature(response) {
  let mainTemperature = document.querySelector("#current-temperature");
  mainTemperature.innerHTML = Math.round(response.data.main.temp);
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
}

let apiKey = "2a5f42ec0e56eeb52bee2cc8b3e92147";
let city = "New York";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTemperature);
