console.log("Start Music");


let songIndex = 0;
let audioElement = new Audio('songs.mp3');
let smPlay = document.getElementById('smPlay');
let progressSet = document.getElementById('progressSet');
let gif = document.getElementById('gif');
let smSongName = document.getElementById('smSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Davido Stand Strong New Song", filePath: "songs/1.mp3", coverPath: "m2.jpg"},
    {songName: "Call Me Every Day", filePath: "songs/2.mp3", coverPath: "m3.jpg"},
    {songName: "DEAF KEV - Invincible ", filePath: "songs/3.mp3", coverPath: "m4.jpg"},
    {songName: "Let Me Down Slowly", filePath: "songs/4.mp3", coverPath: "m5.jpg"},
    {songName: "Love Me Like You Do", filePath: "songs/6.mp3", coverPath: "m6.jpg"},
  
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
smPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        smPlay.classList.remove('fa-play-circle');
        smPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        smPlay.classList.remove('fa-pause-circle');
        smPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    progressSet.value = progress;
})

progressSet.addEventListener('change', ()=>{
    audioElement.currentTime = progressSet.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        smSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        smPlay.classList.remove('fa-play-circle');
        smPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    smSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    smPlay.classList.remove('fa-play-circle');
    smPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    smSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    smPlay.classList.remove('fa-play-circle');
    smPlay.classList.add('fa-pause-circle');
})