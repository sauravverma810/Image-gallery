// SONG DATA
const songs = [
    { title: "Song One", artist: "Artist A", src: "song1.mp3", cover: "cover1.jpg" },
    { title: "Song Two", artist: "Artist B", src: "song2.mp3", cover: "cover2.jpg" },
    { title: "Song Three", artist: "Artist C", src: "song3.mp3", cover: "cover3.jpg" }
];

let index = 0;

// ELEMENTS
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

const volumeSlider = document.getElementById("volume");

const current = document.getElementById("current");
const durationText = document.getElementById("duration");

const songList = document.getElementById("song-list");
const playerUI = document.querySelector(".music-player");

// LOAD SONG
function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    cover.src = song.cover;
}

loadSong(songs[index]);

// PLAY / PAUSE
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
        playerUI.classList.add("playing");
    } else {
        audio.pause();
        playBtn.textContent = "▶";
        playerUI.classList.remove("playing");
    }
});

// NEXT SONG
nextBtn.addEventListener("click", () => {
    index = (index + 1) % songs.length;
    loadSong(songs[index]);
    audio.play();
    playBtn.textContent = "⏸";
});

// PREVIOUS SONG
prevBtn.addEventListener("click", () => {
    index = (index - 1 + songs.length) % songs.length;
    loadSong(songs[index]);
    audio.play();
    playBtn.textContent = "⏸";
});

// PROGRESS BAR UPDATE
audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";

    current.textContent = formatTime(audio.currentTime);
    durationText.textContent = formatTime(audio.duration);
});

// SEEK MUSIC
progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});

// FORMAT TIME
function formatTime(sec) {
    if (isNaN(sec)) return "0:00";
    let minutes = Math.floor(sec / 60);
    let seconds = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

// VOLUME CONTROL
volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});

// AUTOPLAY NEXT
audio.addEventListener("ended", () => {
    nextBtn.click();
});

// ================= PLAYLIST GENERATION =================
songs.forEach((song, i) => {
    let li = document.createElement("li");
    li.textContent = song.title;
    li.onclick = () => {
        index = i;
        loadSong(songs[index]);
        audio.play();
        playBtn.textContent = "⏸";

        document.querySelectorAll("li").forEach(li => li.classList.remove("active"));
        li.classList.add("active");
    };
    songList.appendChild(li);
});
