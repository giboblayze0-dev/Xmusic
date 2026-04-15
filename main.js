let allSongs = [];

const sections = ["new", "trending", "albums", "videos"];

// LOAD JSON
fetch('./music.json')
  .then(res => res.json())
  .then(data => {
    allSongs = data;

    // show all sections
    sections.forEach(section => {
      displaySongs(section);
    });
  })
  .catch(err => console.error("Error:", err));


// DISPLAY SONGS BY SECTION
function displaySongs(section) {
  const container = document.getElementById(section);
  container.innerHTML = "";

  // filter songs by section
  const filtered = allSongs.filter(song => song.section === section);

  if (filtered.length === 0) {
    container.innerHTML = "<p>No songs</p>";
    return;
  }

  filtered.forEach(song => {
    container.innerHTML += `
      <div class="song-card">
        <img src="${song.cover}" class="cover">

        <h3>${song.title}</h3>
        <p>${song.artist}</p>

        <audio controls src="${song.url}"></audio>

        <a href="${song.url}" download class="download-btn">
          ⬇ Download
        </a>
      </div>
    `;
  });
}


// 🔍 SEARCH ENGINE (INSTANT)
document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const resultsContainer = document.getElementById("searchResults");

  // if empty → restore sections
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
    sections.forEach(sec => {
      document.getElementById(sec).innerHTML = "";
    });
    return;
  }

  filtered.forEach(song => {
    resultsContainer.innerHTML += `
      <div class="song-card">
        <img src="${song.cover}" class="cover">

        <h3>${song.title}</h3>
        <p>${song.artist}</p>

        <audio controls src="${song.url}"></audio>

        <a href="${song.url}" download class="download-btn">
          ⬇ Download
        </a>
      </div>
    `;
  });

  // hide sections when searching
  sections.forEach(sec => {
    document.getElementById(sec).innerHTML = "";
  });
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



