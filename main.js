let allSongs = [];

const state = {
  new: 1,
  trending: 1,
  albums: 1,
  news: 1
};

const songsPerPage = 5;

// LOAD DATA
fetch("music.json")
  .then(res => res.json())
  .then(data => {
    allSongs = data;
    renderAll();
  });

// RENDER ALL SECTIONS
function renderAll() {
  Object.keys(state).forEach(section => renderSection(section));
}

// RENDER SECTION
function renderSection(section) {
  const container = document.querySelector(`.songs[data-section="${section}"]`);

  if (!container) return;

  let songs = allSongs.filter(s => s.section === section);

  const searchValue = document.getElementById("search")?.value?.toLowerCase();

  if (searchValue) {
    songs = songs.filter(s =>
      s.title.toLowerCase().includes(searchValue) ||
      s.artist.toLowerCase().includes(searchValue)
    );
  }

  const visible = songs.slice(0, state[section] * songsPerPage);

  container.innerHTML = "";

  visible.forEach(song => {
    container.innerHTML += `
      <div class="song-card">
        <img src="${song.image}" alt="${song.title}">
        <h3>${song.title}</h3>
        <p>${song.artist}</p>

        <audio controls>
          <source src="${song.audio}" type="audio/mpeg">
        </audio>

        <a href="${song.download}" download>⬇ Download</a>
      </div>
    `;
  });
}

// LOAD MORE BUTTONS
document.querySelectorAll(".loadmore").forEach(btn => {
  btn.addEventListener("click", () => {
    const section = btn.dataset.section;
    state[section]++;

    renderSection(section);
  });
});

// SEARCH (REAL TIME)
document.getElementById("search").addEventListener("input", () => {
  renderAll();
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



