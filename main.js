let allSongs = [];
const state = {
  new: 1,
  trending: 1,
  albums: 1,
  news: 1
};

const songsPerPage = 5;

// Load JSON
fetch("music.json")
  .then(res => res.json())
  .then(data => {
    allSongs = data;
    renderAllSections();
  });

// Render all sections
function renderAllSections() {
  Object.keys(state).forEach(section => {
    renderSection(section);
  });
}

// Render one section
function renderSection(section) {
  const container = document.querySelector(`#${section} .songs`);
  container.innerHTML = "";

  const filtered = allSongs.filter(song => song.section === section);

  const start = 0;
  const end = state[section] * songsPerPage;

  const visibleSongs = filtered.slice(start, end);

  visibleSongs.forEach(song => {
    container.innerHTML += `
      <div class="song-card">
        <img src="${song.image}" alt="${song.title}">
        <div class="info">
          <h3>${song.title}</h3>
          <p>${song.artist}</p>

          <audio controls>
            <source src="${song.audio}" type="audio/mpeg">
          </audio>

          <a href="${song.download}" download>⬇ Download</a>
        </div>
      </div>
    `;
  });
}

// Load more button
document.querySelectorAll(".loadmore").forEach(btn => {
  btn.addEventListener("click", () => {
    const section = btn.dataset.section;
    state[section]++;

    renderSection(section);
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



