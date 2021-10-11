const work = document.querySelector(".work");
const pause = document.querySelector(".pause");
const increseWorkTime = document.querySelector(".increse-work").addEventListener("click", increseWork);
const decreaseWorkTime = document.querySelector(".decrease-work").addEventListener("click", decreaseWork);
const incresePauseTime = document.querySelector(".increse-pause").addEventListener("click", incresePause);
const decreasePauseTime = document.querySelector(".decrease-pause").addEventListener("click", decreasePause);

console.log(work);

let workValue = 20;
let pauseValue = 5;


function increseWork() {
  workValue++
  work.innerHTML = workValue;
}

function decreaseWork() {
  workValue--
  work.innerHTML = workValue;
}

function incresePause() {
  pauseValue++
  pause.innerHTML = pauseValue;
}

function decreasePause() {
  pauseValue--
  pause.innerHTML = pauseValue;
}