
  let key = "aapka api key yaha hoga";
  let Cityinput = document.getElementById("Cityinput");
  let btn = document.getElementById("search-btn");
  let city = document.getElementById("city-name");
  let weatherInfoCard = document.getElementById("weather-info");
  console.log(weatherInfoCard);
  let temerature = document.getElementById("temerature");
  let descriptions = document.getElementById("descriptions");
  let errorMessage = document.getElementById("error-message");
  let icon = document.getElementById("weather-icon");
  console.log(icon);

  btn.addEventListener("click", () => {
    const city = Cityinput.value;
    if (city) {
      getWeather(city);
    }
  });

  async function getWeather(city) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
    );
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      displayWeather(data);
    } else {
      showError(data.message);
    }
  }

  function displayWeather(data) {
    city.textContent = `${data.name}, ${data.sys.country}`;
    temerature.textContent = `${Math.round(data.main.temp)}°C`;
    descriptions.textContent = `${data.weather[0].description.toUpperCase()}`;

    const iconCode = data.weather[0].icon;
    icon.style.backgroundImage = `url(https://openweathermap.org/img/wn/${iconCode}@2x.png)`;

    weatherInfoCard.style.display = "block";
    errorMessage.textContent = "";
  }

  function showError(message) {
    errorMessage.textContent = message;
    weatherInfoCard.style.display = "none";
  }

