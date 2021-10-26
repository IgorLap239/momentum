const weatherIcon = document.querySelector('.weather-icon'),
      temperature = document.querySelector('.temperature'),weatherDescription = document.querySelector('.weather-description'),
      wind = document.querySelector('.wind'),
      humidity = document.querySelector('.humidity'),
      weatherInput = document.querySelector('.city'),
      weatherError = document.querySelector('.weather-error'),
      langBtn = document.querySelector(".lang-button");

async function getWeather(text = "Minsk") {
  if (lang == "en" && weatherInput.value == "Минск")
    weatherInput.value = "Minsk";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&lang=${lang}&appid=d1bd7591df1888b2d58115ebcffa92bb&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherError.textContent = ``;
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    if (lang == "ru") {
      if (weatherInput.value == "Minsk") {
        weatherInput.value = "Минск";}
      wind.textContent = `Ветер: ${Math.floor(data.wind.speed)} м/с`;
      humidity.textContent = `Влажность: ${data.main.humidity}%`;
    }
    saveCity(text, data);
  } catch (e) {
    weatherError.textContent = `Error! city not found for "${text}"!`
    if (lang == "ru")
      weatherError.textContent = `Нет данных для введенного города "${text}"!`;
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = ``;
    weatherDescription.textContent = "";
    wind.textContent = ``;
    humidity.textContent = ``;
  }
}

const city = "currentCity",
      icon = "icon",
      temp = "temp",
      weatherDescript = "weatherDescript",
      windData = "windData",
      humidityData = "humidityData";

function saveCity(text, data){
  localStorage.setItem(city, text);
  localStorage.setItem(icon, `owf-${data.weather[0].id}`);
  localStorage.setItem(temp, temperature.textContent);
  localStorage.setItem(weatherDescript, data.weather[0].description);
  localStorage.setItem(windData, wind.textContent);
  localStorage.setItem(humidityData, humidity.textContent);
}

function loadCity(){
  const currentCity = localStorage.getItem(city);
  if (currentCity === null){
    weatherInput.value = "Minsk";
    getWeather(weatherInput.value);
  } else {
    paintCity(currentCity);
    weatherIcon.classList.add(localStorage.getItem(icon));
    temperature.textContent = localStorage.getItem(temp);
    weatherDescription.textContent = localStorage.getItem(weatherDescript);
    wind.textContent = localStorage.getItem(windData);
    humidity.textContent = localStorage.getItem(humidityData);
  }
}

function paintCity(text){
  weatherInput.value = `${text}`;
}

function init() {
  loadCity();
  weatherInput.addEventListener("change", (e)=> {
    handleSubmit(e);
    getWeather(weatherInput.value);
  });
  langBtn.addEventListener("click", (e)=> {
    getWeather(weatherInput.value);
  });
}

init();