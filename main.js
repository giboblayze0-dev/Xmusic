let allSongs = [];
let currentSongIndex = 0;

const sections = ["new", "trending", "albums", "videos"];
let currentList = []; // currently playing list


// LOAD JSON
fetch('./music.json')
  .then(res => res.json())
  .then(data => {
    allSongs = data;

    sections.forEach(section => {
      displaySongs(section);
    });
  });


// DISPLAY SONGS
function displaySongs(section) {
  const container = document.getElementById(section);
  container.innerHTML = "";

  const filtered = allSongs.filter(song => song.section === section);

  filtered.forEach((song, index) => {
    container.innerHTML += `
      <div class="song-card" onclick="playSong('${section}', ${index})">
        <img src="${song.cover}" class="cover">

        <h3>${song.title}</h3>
        <p>${song.artist}</p>

        <a href="${song.url}" download class="download-btn" onclick="event.stopPropagation()">
          ⬇
        </a>
      </div>
    `;
  });
}


// 🎧 PLAY SONG
function playSong(section, index) {
  currentList = allSongs.filter(song => song.section === section);
  currentSongIndex = index;

  const song = currentList[currentSongIndex];

  const player = document.getElementById("player");
  const title = document.getElementById("player-title");
  const artist = document.getElementById("player-artist");
  const cover = document.getElementById("player-cover");

  player.src = song.url;
  title.innerText = song.title;
  artist.innerText = song.artist;
  cover.src = song.cover;

  player.play();
}


// ⏭ NEXT SONG
function nextSong() {
  currentSongIndex++;
  if (currentSongIndex >= currentList.length) currentSongIndex = 0;
  playSong(currentList[currentSongIndex].section, currentSongIndex);
}


// ⏮ PREVIOUS SONG
function prevSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) currentSongIndex = currentList.length - 1;
  playSong(currentList[currentSongIndex].section, currentSongIndex);
}


// 🔍 SEARCH
document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const resultsContainer = document.getElementById("searchResults");

  if (query === "") {
    resultsContainer.innerHTML = "";
    sections.forEach(section => displaySongs(section));
    return;
  }

  const filtered = allSongs.filter(song =>
    song.title.toLowerCase().includes(query) ||
    song.artist.toLowerCase().includes(query)
  );

  resultsContainer.innerHTML = "";

  if (filtered.length === 0) {
    resultsContainer.innerHTML = "<p>No results found</p>";
    return;
  }

  filtered.forEach((song, index) => {
    resultsContainer.innerHTML += `
      <div class="song-card" onclick="playFromSearch(${index})">
        <img src="${song.cover}" class="cover">
        <h3>${song.title}</h3>
        <p>${song.artist}</p>

        <a href="${song.url}" download onclick="event.stopPropagation()">⬇</a>
      </div>
    `;
  });

  sections.forEach(sec => document.getElementById(sec).innerHTML = "");
});


// PLAY FROM SEARCH
function playFromSearch(index) {
  currentList = allSongs;
  currentSongIndex = index;

  const song = currentList[index];

  document.getElementById("player").src = song.url;
  document.getElementById("player-title").innerText = song.title;
  document.getElementById("player-artist").innerText = song.artist;
  document.getElementById("player-cover").src = song.cover;

  document.getElementById("player").play();
}










function setNowPlaying(title) {
  document.getElementById("now-playing").innerHTML =
    "Now Playing: " + title;
                      }


document.addEventListener("play", function(e){
  const audios = document.querySelectorAll("audio");
  audios.forEach(audio => {
    if (audio !== e.target) {
      audio.pause();
    }
  });
}, true);








document.querySelector("a[href='#']").addEventListener("click", function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});




const resultsContainer = document.getElementById("results");

if (results.length === 0) {
  resultsContainer.innerHTML = "<p>No results found ❌</p>";
} else {
  resultsContainer.innerHTML = "";

  results.forEach(song => {
    resultsContainer.innerHTML += `
      <div class="song">
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
      </div>
    `;
  });
}




const query = searchInput.toLowerCase();

const results = songs.filter(song => 
  song.title.toLowerCase().includes(query) ||
  song.artist.toLowerCase().includes(query)
);



