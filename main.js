const music = document.querySelector("audio");
const img = document.querySelector("img");
const play = document.getElementById('play');
const artist = document.getElementById('artist');
const title = document.getElementById('title');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
let volumeslider = document.getElementById('volumeslider');
let progressed = document.getElementById('progressed');
let progress_bar = document.getElementById('progress_bar');
let current_time = document.getElementById('current_time');
let total_duration = document.getElementById('duration');
let repeat = document.getElementById('repeat');
const songs =[
    {
        name:"rula_ke_gaya",
        title:"Rula ke gaya ishq tera",
        artist:"Stebin Ben"
    },
    {
        name:"imagin_dragons",
        title:"Bad-liars",
        artist:"imagin dragons"
    },
    {
        name:"jogi",
        title:"jogi",
        artist:"Yasser Desai & Aakanksha Sharma"
    },
    {
        name:"mastmaagan",
        title:"Mast magan",
        artist:"Arijit Singh"
    },
    {
        name:"Kabhi_yaado",
        title:"Kabhi yaado me aao",
        artist:"Digvijay Singh pariyar "
    },
];


let isPlaying = false;
//for play
const playMusic=("click",()=>{
    music.play();
    isPlaying =true;
    play.classList.replace("fa-play","fa-pause");
});

//for pause 
const pauseMusic= ("click",()=>{
    isPlaying =false;
    music.pause();
    play.classList.replace("fa-pause","fa-play");
});
play.addEventListener('click',()=>{
    isPlaying ? pauseMusic() :  playMusic();
});

// changing song songs name artists

const loadSong =(songs)=>{
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src ="music/" + songs.name + ".mp3";
    img.src ="images/" + songs.name + ".jpg";
};
 songIndex = 0;
const nextSong =()=>{
    songIndex =(songIndex + 1)% songs.length;
    loadSong(songs[songIndex]) ;
    playMusic();
};
const previousSong =()=>{
    songIndex =(songIndex - 1 + songs.length)% songs.length;
    loadSong(songs[songIndex]) ;
    playMusic();
};  
 
// progress
music.addEventListener("timeupdate",(event) => {
    //console.log(event);
    const {currentTime, duration}= event.srcElement;
    let progress_time = (currentTime / duration)*100;
    progressed.style.width = `${progress_time}% `;

    //music duration --- duration time
    let min_duration =Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    let  tot_duration = `${min_duration}:${sec_duration}`;
    if (duration){
    total_duration.textContent =`${tot_duration}`;
    }

    //current time duration 
    let min_currentTime =Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);
    if (sec_currentTime < 10){
        sec_currentTime = `0${sec_currentTime}`;
    }
    let  tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
    current_time.textContent =`${tot_currentTime}`;
});
//  if music finished
music.addEventListener('ended',nextSong);

progress_bar.onclick = function(e){
   music.currentTime=((e.offsetX/progress_bar.offsetWidth) *music.duration);

}

next.addEventListener("click", nextSong);
previous.addEventListener("click",  previousSong);

// volume
volumeslider.addEventListener('mousemove',(setvolume)=>{
    music.volume=volumeslider.value / 100;
});


