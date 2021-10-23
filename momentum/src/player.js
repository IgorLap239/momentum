const playButton = document.querySelector(".play"),
      nextButton = document.querySelector(".play-next"),
      prevButton = document.querySelector(".play-prev"),
      muteButton = document.querySelector(".mute"),
      playListContainer = document.querySelector(".play-list"),
      trackName = document.querySelector(".track-name"),
      trackTime = document.querySelector(".track-time"),
      currentTrackTime = document.querySelector(".current-time"),
      fullTime = document.querySelector(".full-time"),
      volume = document.querySelector(".volume"),
      progress = document.querySelector(".progress");

const audio = new Audio();
const playList = [
  {      
    title: 'Aqua Caelestis',
    src: './assets/sounds/Aqua Caelestis.mp3',
    duration: '00:39'
  },  
  {      
    title: 'Ennio Morricone',
    src: './assets/sounds/Ennio Morricone.mp3',
    duration: '01:37'
  },
  {      
    title: 'River Flows In You',
    src: './assets/sounds/River Flows In You.mp3',
    duration: '01:37'
  },
  {      
    title: 'Summer Wind',
    src: './assets/sounds/Summer Wind.mp3',
    duration: '01:50'
  }
]

let isPlay = false,
    playNum = 0,
    volumeValueTmp = 0;


function createPlayList(playList) {
  playList.forEach(el => {
    const li = document.createElement('li');
    const plBut = document.createElement('button');
    plBut.classList.add("play-track");
    li.classList.add("play-item");
    li.textContent = `${el.title}`;
    li.append(plBut);
    playListContainer.append(li);
  })
}

function playAudio() {
  let list = document.querySelectorAll("li");
  if (!audio.src)
    audio.src = playList[playNum].src;
  fullTime.textContent = `/${playList[playNum].duration}`;
  if (!isPlay) {
    audio.play();
    isPlay = true;
    list.forEach(el => {
      el.classList.remove("item-active");
      if(el.textContent == playList[playNum].title) {
        el.classList.add("item-active");
        trackName.textContent = el.textContent;
      }
    })
  } else {
    audio.pause();
    isPlay = false;
  }
}

function toggleBtn() {
  playButton.classList.toggle('pause');
  let trackBtns = document.querySelectorAll(".play-track");
  toggleTrackBtn(trackBtns[playNum]);
}

function toggleTrackBtn(target) {
  target.classList.toggle('pause-track');
}

function setProgress() {
  audio.currentTime = (progress.value * audio.duration) / 100;
}

function updateProgress() {
  progress.value = (audio.currentTime / audio.duration) * 100;
  let minutes = Math.floor(audio.currentTime / 60);
  let seconds = Math.floor(audio.currentTime % 60);
  if (seconds < 10) {
    currentTrackTime.textContent = `0${minutes}:0${seconds}`
  } else {
    currentTrackTime.textContent = `0${minutes}:${seconds}`
  }
  if (audio.currentTime == audio.duration) {
    playNext();
  }
}

function playNext() {
  isPlay = false;
  progress.value = 0;
  if (playNum < 3) {
    playNum++;
    audio.src = playList[playNum].src
  } else if (playNum == 3) {
    playNum = 0;
    audio.src = playList[playNum].src
  }
  playAudio();
  if (!playButton.classList.contains("pause")) {
    toggleBtn();
  }
  let trackBtns = document.querySelectorAll(".play-track");
  for (let i = 0; i < trackBtns.length; i++) {
    if (trackBtns[i].classList.contains("pause-track")) {
      toggleTrackBtn(trackBtns[i]);
      toggleTrackBtn(trackBtns[playNum]);
      i = 5;
    }
  }
}

function playPrev() {
  isPlay = false;
  progress.value = 0;
  if (playNum > 0) {
    playNum--;
    audio.src = playList[playNum].src
  } else if (playNum == 0) {
    playNum = 3;
    audio.src = playList[playNum].src
  }
  playAudio();
  if (!playButton.classList.contains("pause")) {
    toggleBtn();
  }
  let trackBtns = document.querySelectorAll(".play-track");
  for (let i = trackBtns.length - 1; i >= 0; i--) {
    if (trackBtns[i].classList.contains("pause-track")) {
      toggleTrackBtn(trackBtns[i]);
      toggleTrackBtn(trackBtns[playNum]);
      i = -1;
    }
  }
}

function setVolume() {
  audio.volume = volume.value;
  if (volume.value == 0) {
    muteButton.style.backgroundImage = "url('./assets/svg/mute.svg')"
  } else {
    muteButton.style.backgroundImage = "url('./assets/svg/volume.svg')"
  }
}

function muteToggle() {
  if(volume.value != 0) {
    volumeValueTmp = volume.value;
    volume.value = 0;
    audio.volume = volume.value;
    muteButton.style.backgroundImage = "url('./assets/svg/mute.svg')";
  } else {
    volume.value = volumeValueTmp;
    audio.volume = volume.value;
    volumeValueTmp = 0;
    muteButton.style.backgroundImage = "url('./assets/svg/volume.svg')";
  }
}

function init() {
  createPlayList(playList);
  playButton.addEventListener("click", () => {
    playAudio();
    toggleBtn();
  });
  audio.addEventListener('timeupdate', updateProgress);
  progress.addEventListener("change", setProgress);
  nextButton.addEventListener("click", playNext);
  prevButton.addEventListener("click", playPrev);
  volume.addEventListener('mousemove', setVolume);
  volume.addEventListener('change', setVolume);
  muteButton.addEventListener("click", muteToggle);
  playListContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("play-track")) {
      let tracks = document.querySelectorAll(".play-track");
      let tracksArr = Array.prototype.slice.call(tracks);
      tracks.forEach(el => {
        if (el.classList.contains("pause-track") && el != target) {
          toggleBtn();
          isPlay = false;
        }
      })
      if (playNum != tracksArr.indexOf(target)) {
        playNum = tracksArr.indexOf(target);
        audio.src = playList[playNum].src;
      }
      playAudio();
      toggleBtn();
    };
  })
}

init();
