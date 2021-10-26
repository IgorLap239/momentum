const body = document.querySelector("body"),
      switchArr = document.querySelectorAll(".switch-back"),
      switchInputs = document.querySelectorAll(".back-button"),
      setTag = document.querySelector(".set-tag"),
      tagInput = document.querySelector(".tag-input");

let imgNum = getRandomNum();
let urlStr = "";
let sourceNum = 0;

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

function  getRandomNum(a=1, b=20) {
  min = Math.ceil(a);
  max = Math.floor(b);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changeBackground () {
  const timeOfDay = getTimeOfDay();
    if (imgNum < 10) {
      urlStr = `https://raw.githubusercontent.com/IgorLap239/stage1-tasks/assets/images/${timeOfDay}/0${imgNum}.jpg`
    } else {
      urlStr = `https://raw.githubusercontent.com/IgorLap239/stage1-tasks/assets/images/${timeOfDay}/${imgNum}.jpg`
    }
    body.style.backgroundImage = `url('${urlStr}')`;
}

function getSlideNext() {
  const timeOfDay = getTimeOfDay();
  if (sourceNum == 0) {
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
  } else if (sourceNum == 1) {
    changeSourceUnsplash();
  } else if (sourceNum == 2) {
    changeSourceFlickr();
  }
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
  if (sourceNum == 0) {
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
  } else if (sourceNum == 1) {
    changeSourceUnsplash();
  } else if (sourceNum == 2) {
    changeSourceFlickr();
  }
}

async function changeSourceUnsplash() {
  let tag = getTimeOfDay();
  if (tagInput.value)
    tag = tagInput.value;
  const url = `https://api.unsplash.com/photos/random?query=${tag}&client_id=b3QNBkP9eQkDwY7Hbaxy6Bur13B_3Hu69Ts02dWTetY`;
  const res = await fetch(url);
  const data = await res.json();
  setBg(data.urls.raw)
};

async function changeSourceFlickr() {
  let tag = getTimeOfDay();
  if (tagInput.value)
    tag = tagInput.value;
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1b48515ab42f4eb7a79eb1df0284371f&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  imgNum = getRandomNum(0 , data.photos.photo.length);
  setBg(data.photos.photo[imgNum].url_l);
  return;
};

function backgroundFunc() {
  changeBackground();
  switchArr.forEach(el => {
    el.addEventListener("change", (e)=> {
      switchInputs.forEach(el => {
        el.checked = false;
      })
      const target = e.target;
      target.checked = true;
      if (target.closest(".git")) {
        if (!setTag.classList.contains("hidden"))
          setTag.classList.add("hidden");
        sourceNum = 0;
        if (imgNum > 20)
          imgNum = getRandomNum();
        changeBackground();
      } else if (target.closest(".unsplash")) {
        if (setTag.classList.contains("hidden"))
          setTag.classList.remove("hidden");
        sourceNum = 1;
        changeSourceUnsplash();
      } else if (target.closest(".flickr")) {
        if (setTag.classList.contains("hidden"))
          setTag.classList.remove("hidden");
        sourceNum = 2;
        changeSourceFlickr();
      }
    })
  })
  document.querySelector(".slide-prev").addEventListener("click", getSlidePrev);
  document.querySelector(".slide-next").addEventListener("click", getSlideNext);
  tagInput.addEventListener("change", changeSourceFlickr)
};

backgroundFunc();