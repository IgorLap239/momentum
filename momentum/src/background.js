const body = document.querySelector("body");
let imgNum = getRandomNum();

body.style.backgroundImage = "url('https://raw.githubusercontent.com/IgorLap239/stage1-tasks/assets/images/evening/02.jpg')";

function getTimeOfDay() {
  const time = document.querySelector(".time");
  const hours = time.datetime.split(":")[0];
  let timeOfDay = "";
  if (hours >= 6 && hours < 12) {
    timeOfDay = "morning";
  } else if (hours >= 12 && hours < 18) {
    timeOfDay = "afternoon";
  } else if (hours <= 23 && hours >= 18) {
    timeOfDay = "evening";
  } else if (hours < 6 && hours >= 00) {
    timeOfDay = "night";
  }
  return timeOfDay;
}

function  getRandomNum() {
  min = Math.ceil(1);
  max = Math.floor(20);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changeBackground () {
  const timeOfDay = getTimeOfDay();
  let urlStr = "";
  if (imgNum < 10) {
    urlStr = `https://raw.githubusercontent.com/IgorLap239/stage1-tasks/assets/images/${timeOfDay}/0${imgNum}.jpg`
  } else {
    urlStr = `https://raw.githubusercontent.com/IgorLap239/stage1-tasks/assets/images/${timeOfDay}/${imgNum}.jpg`
  }
  body.style.backgroundImage = `url('${urlStr}')`;
}

function getSlideNext() {
  const timeOfDay = getTimeOfDay();
  imgNum = imgNum + 1;
  if (imgNum == 21) {
    imgNum = 1;
    urlStr = `https://raw.githubusercontent.com/IgorLap239/stage1-tasks/assets/images/${timeOfDay}/01.jpg`
  } else {
    if (imgNum < 10) {
      urlStr = `https://raw.githubusercontent.com/IgorLap239/stage1-tasks/assets/images/${timeOfDay}/0${imgNum}.jpg`
    } else {
      urlStr = `https://raw.githubusercontent.com/IgorLap239/stage1-tasks/assets/images/${timeOfDay}/${imgNum}.jpg`
    }
  }
  setBg(urlStr);
}

function setBg(urlStr) {
  const img = new Image();
  img.src = urlStr;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  }; 
}

function getSlidePrev() {
  const timeOfDay = getTimeOfDay();
  imgNum = imgNum - 1;
  if (imgNum == 0) {
    imgNum = 20;
    urlStr = `https://raw.githubusercontent.com/IgorLap239/stage1-tasks/assets/images/${timeOfDay}/20.jpg`;
  } else {
    if (imgNum < 10) {
      urlStr = `https://raw.githubusercontent.com/IgorLap239/stage1-tasks/assets/images/${timeOfDay}/0${imgNum}.jpg`
    } else {
      urlStr = `https://raw.githubusercontent.com/IgorLap239/stage1-tasks/assets/images/${timeOfDay}/${imgNum}.jpg`
    }
  }
  setBg(urlStr)
}

 function init () {
  document.querySelector(".greeting").addEventListener("DOMSubtreeModified", changeBackground());
  document.querySelector(".slide-prev").addEventListener("click", getSlidePrev);
  document.querySelector(".slide-next").addEventListener("click", getSlideNext);
 }

init();