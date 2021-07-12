const container = document.getElementById("container");
const songName = document.getElementById("name");
const progress = document.getElementById("progress");
const previousBtn = document.getElementById("previous");
const playBtn = document.getElementById("play");
const forwardBtn = document.getElementById("forward");
const songImage = document.getElementById("image");
const audio = document.getElementById("audio");
const progressBar = document.getElementById("progress-bar");

const tracks = ["A_to_Z", "Ek_chaturnaar", "roar"];
let trackIndex = 0;

loadSong(tracks[trackIndex]);

// function to change the title,audio track,image of newly loaded song
function loadSong(track) {
  songName.innerText = track;
  audio.src = `audio/${track}.mp3`;
  songImage.src = `images/${track}.jpg`;
}

//function to play audio
function playTrack() {
  container.classList.add("play");
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  audio.play();
}

//function to pause audio
function pauseTrack() {
  container.classList.remove("play");
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  audio.pause();
}

//function to play previous Track
function previousTrack() {
  trackIndex--;
  if (trackIndex < 0) {
    //tracks.length = 3 , where array.length = 2
    trackIndex = tracks.length - 1;
  }
  loadSong(tracks[trackIndex]);
  playTrack();
}

//function to play forward Track
function forwardTrack() {
  trackIndex++;
  //tracks.length = 3 , where array.length = 2
  if (trackIndex > tracks.length - 1) {
    trackIndex = 0;
  }
  loadSong(tracks[trackIndex]);
  playTrack();
}


//function for updateProgress bar
function updateProgress(e){
const {duration , currentTime} = e.srcElement;
// console.log(duration);
// console.log(currentTime);
//calculate the %age of the song that has been played
 const progressPercent = currentTime / duration * 100;
//set the width of progress bar as %age of song that has been played
 progressBar.style.width = `${progressPercent}%`;

}

//function for setProgress
function setProgress(e){
   let width = this.clientWidth;
   const clickLocation = e.offsetX;
   const duration = audio.duration;
   audio.currentTime = clickLocation / width * duration; 
}



//Events.
//Listen for click on play button.
playBtn.addEventListener("click", () => {
  const isplaying = container.classList.contains("play");
  if (isplaying) {
    pauseTrack();
  } else {
    playTrack();
  }
});

//Listen for click on previous button.
previousBtn.addEventListener("click", previousTrack);

//Listen for click on forward button.
forwardBtn.addEventListener("click", forwardTrack);

//Listen for playing audio 
audio.addEventListener("timeupdate" , updateProgress);

//Listen for on progress container
progress.addEventListener("click", setProgress); 

audio.addEventListener("ended",forwardTrack);