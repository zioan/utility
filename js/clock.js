const clock = document.querySelector(".clock");
const alarmHrs = document.querySelector(".alarm-hrs");
const alarmMins = document.querySelector(".alarm-mins");
const setButton = document.querySelector(".setButton");
const clearButton = document.querySelector(".clearButton");
const notification = document.querySelector(".notification");

setButton.addEventListener("click", alarmSet);
clearButton.addEventListener("click", alarmClear);

let sound = new Audio("../bell.mp3");
let isActive = false;

const currentTime = setInterval(function () {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  clock.textContent = `${addZero(hours)}:${addZero(minutes)}`;
}, 1000);

function addZero(time) {
  return time < 10 ? "0" + time : time;
}

function hoursMenu() {
  let hrs = 24;
  for (i = 1; i <= hrs; i++) {
    alarmHrs.options[alarmHrs.options.length] = new Option(
      i < 10 ? "0" + i : i,
      i
    );
  }
}
hoursMenu();

function minMenu() {
  let min = 59;
  for (i = 0; i <= min; i++) {
    alarmMins.options[alarmMins.options.length] = new Option(
      i < 10 ? "0" + i : i,
      i
    );
  }
}
minMenu();

function alarmSet() {
  const selectedHour = alarmHrs.options[alarmHrs.selectedIndex].value;
  const selectedMin = alarmMins.options[alarmMins.selectedIndex].value;
  const defaultSeconds = 0;

  const alarmTime = `${addZero(selectedHour)}:${addZero(
    selectedMin
  )}:${defaultSeconds}`;

  alarmHrs.disabled = true;
  alarmMins.disabled = true;
  notification.innerHTML = "Alarm active!";

  setInterval(function () {
    isActive = true;
    const date = new Date();
    const seconds = date.getSeconds();
    const currentTime = `${clock.textContent}:${seconds}`;

    if (alarmTime == currentTime && isActive) {
      sound.play();
      alert("It's time for a break :)");
      setTimeout(function () {
        alarmClear();
      }, 2000);
    }
  }, 1000);
}

function alarmClear() {
  alarmHrs.disabled = false;
  alarmMins.disabled = false;
  sound.pause();
  isActive = false;
  notification.innerHTML = "Alarm off";
}
