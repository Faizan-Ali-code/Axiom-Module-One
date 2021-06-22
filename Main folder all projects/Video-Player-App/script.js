const video = document.getElementById("video");
const play = document.getElementById("play");
const Stop = document.getElementById("stop");
const progress_bar = document.getElementById("progress-bar");
const playtime = document.getElementById("playtime");


//create function for toggleVideoStatus
function toggleVideoStatus(){
    if(video.paused){
        video.play();
    }
    else{
        video.pause();
    }
}

//create function for updateIcon
function updateIcon(){
    if(video.paused){
        play.innerHTML = "<i class='fas fa-play fa-2x'></i>";
    }
    else{
        play.innerHTML = "<i class='fas fa-pause fa-2x'></i>";
    }
}

// create function for updateProgress
function updateProgress(){
    progress_bar.value = (video.currentTime /video.duration) * 100;

    let mins = Math.floor(video.currentTime / 60);
    if(mins < 10){
        mins = '0' + String(mins);
    }

    let sec = Math.floor(video.currentTime % 60);
    if (sec < 10){
        sec = '0' + String(sec);
    }

    playtime.innerHTML = `${mins}:${sec}` ;
}

//create function for setVideoProgress
function setVideoProgress(){
    video.currentTime = (+progress_bar.value * video.duration) / 100;
}



//create function for stopVideo
function stopVideo(){
    video.currentTime = "0";
    video.pause();
}


//Event listener for video 
video.addEventListener("click",toggleVideoStatus);
video.addEventListener("play",updateIcon);
video.addEventListener("pause",updateIcon);
video.addEventListener("timeupdate",updateProgress);


//Event for play button
play.addEventListener("click",toggleVideoStatus);


//Event for pause button
Stop.addEventListener("click",stopVideo);

//Event for progress_bar
progress_bar.addEventListener("change",setVideoProgress);
