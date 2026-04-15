let allSongs = [];

// LOAD MUSIC
fetch('./music.json')
  .then(res => res.json())
  .then(data => {
    allSongs = data;

    renderSongs(allSongs); // show all songs first
  })
  .catch(err => console.error("Fetch error:", err));


// DISPLAY SONGS
function renderSongs(songs) {
  const container = document.getElementById("new");
  container.innerHTML = "";

  songs.forEach(song => {
    container.innerHTML += `
      <div class="song">
        <img src="${song.cover}" width="100%">
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
        <audio controls src="${song.url}"></audio>
      </div>
    `;
  });
}


// SEARCH (INSTANT 🔥)
document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const resultsContainer = document.getElementById("searchResults");

  if (query === "") {
    resultsContainer.innerHTML = "";
    renderSongs(allSongs); // restore all songs
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

  filtered.forEach(song => {
    resultsContainer.innerHTML += `
      <div class="song">
        <img src="${song.cover}" width="100%">
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
      </div>
    `;
  });

  // OPTIONAL: hide main songs when searching
  document.getElementById("new").innerHTML = "";
});










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



