// time
setInterval(function () {
  const time = document.querySelector(".time");
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  time.textContent = `${hours}:${minutes}`;
});

//range
let range = document.querySelector(".range");
function rangeBackground() {
  let min = range.min;
  let max = range.max;
  let val = range.value;
  let bgSize = ((val - min) * 100) / (max - min) + "% 100%";
  range.style.backgroundSize = bgSize;
}
range.addEventListener("input", function (e) {
  rangeBackground();
  music.currentTime = range.value;
});
// songs
let songs = [
  {
    name: "BEAUZ & JVNA",
    path: "song1.mp3",
    artist: "Cary",
    cover: "image01.jpg",
  },
  {
    name: "Forever",
    path: "song2.mp3",
    artist: "Vanze, Brenton Mattheus",
    cover: "image02.jpg",
  },
  {
    name: "Disfigure",
    path: "song3.mp3",
    artist: "Blank",
    cover: "image03.jpg",
  },
];
let currentMusic = 0;
const music = document.querySelector(".audio");
const songName = document.querySelector(".music-name");
const artistName = document.querySelector(".music-artist");

const musicCover = document.querySelector(".music-cover");
const currentTime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".song-duration");

const backwardBtn = document.querySelector(".backward-btn");
const playBtn = document.querySelector(".play-btn");
const forwardBtn = document.querySelector(".forward-btn");

playBtn.addEventListener("click", function (e) {
  if (playBtn.className.includes("pause")) {
    music.play();
  } else {
    music.pause();
  }
  playBtn.classList.toggle("pause");
  playBtn.classList.toggle("play");
});

function setMusic(i) {
  range.value = 0;
  let song = songs[i];
  currentMusic = i;
  music.src = `./assets/music/${song.path}`;
  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
  musicCover.style.backgroundImage = `url("./assets/images/${song.cover}")`;
  currentTime.innerHTML = "00:00";
  // 設定歌曲進度條最大長度為歌曲長度
  setTimeout(function () {
    // duration 媒體長度
    range.max = music.duration;
    musicDuration.innerHTML = fourmatTime(music.duration);
  }, 300);
}
setMusic(0);

// fourmatTime 轉換成分:秒
function fourmatTime(time) {
  // Math.floor 會回傳小於等於所給數字的最大整數。
  let min = Math.floor(time / 60);
  // 小於10分前面補0
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  // 小於10秒前面補0
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}
// range 進度條
setInterval(function () {
  // 設定目前音樂時間
  range.value = music.currentTime;
  // 設定時間到初始原本00:00
  currentTime.innerHTML = fourmatTime(music.currentTime);
  rangeBackground();
  // 設定連續撥放
  // 當進度條到最後觸發撥放下一首按鈕
  if (Math.floor(music.currentTime) == Math.floor(range.max)) {
    forwardBtn.click();
  }
}, 500);

// 修復跳轉時會暫停
function playMusic() {
  music.play();
}
//下一首
forwardBtn.addEventListener("click", function () {
  // 如果是最後一首，曲目回到第一首(陣列的0)
  if (currentMusic >= songs.length - 1) {
    currentMusic = 0;
  } else {
    // 不是最後一首則跳至下一首
    currentMusic++;
  }
  setMusic(currentMusic);
  playMusic();
});

// 上一首
backwardBtn.addEventListener("click", function () {
  // 如果是第一首，曲目回到最後一首(陣列的N-1)
  if (currentMusic <= 0) {
    currentMusic = songs.length - 1;
  } else {
    // 不是第一首則跳至上一首
    currentMusic--;
  }
  setMusic(currentMusic);
  playMusic();
});
