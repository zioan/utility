const input = document.querySelector(".input");
const city = document.querySelector(".city");
const Temp = document.querySelector(".temp");
const discription = document.querySelector(".discription");
const image = document.querySelector(".weather-img");

input.onsubmit = (e) => {
  e.preventDefault();
  weatherUpdate(city.value);
  city.value = "";
};

weatherUpdate = (city) => {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=77015739912443f487dfa66463e8ac46`
  );

  xhr.send();
  xhr.onload = () => {
    if (xhr.status === 404) {
      alert("Place not found");
    } else if (xhr.status === 400) {
      alert("Type a city name");
    } else {
      let data = JSON.parse(xhr.response);
      Temp.innerHTML = `${Math.round(data.main.temp - 273.15)}°C`;
      discription.innerHTML = `${data.name} - ${data.weather[0].main}`;
      image.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    }
  };
};

weatherUpdate("oldenburg");
