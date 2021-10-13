const input = document.querySelector(".input");
const city = document.querySelector(".city");
const Temp = document.querySelector(".temp");
const description = document.querySelector(".description");
const image = document.querySelector(".weather-img");

let cityName = localStorage.getItem("cityName");

input.onsubmit = (e) => {
  e.preventDefault();
  localStorage.setItem("cityName", city.value);
  cityName = localStorage.getItem("cityName");
  weatherUpdate(cityName);
  city.value = "";
};

weatherUpdate = (cityName) => {
  console.log(cityName);
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=77015739912443f487dfa66463e8ac46`
  );

  xhr.send();
  xhr.onload = () => {
    if (xhr.status === 404) {
      alert("Invalid city name");
      localStorage.setItem("cityName", "oldenburg");
    } else if (xhr.status === 400) {
      alert("Type a city name");
    } else {
      let data = JSON.parse(xhr.response);
      Temp.innerHTML = `${Math.round(data.main.temp - 273.15)}°C`;
      description.innerHTML = `${data.name} - ${data.weather[0].main}`;
      image.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    }
  };
};

if (localStorage.getItem("cityName") === null) {
  localStorage.setItem("cityName", "oldenburg");
  cityName = localStorage.getItem("cityName");
  weatherUpdate(cityName);
}

weatherUpdate(cityName);
