let allSongs = [];

fetch("music.json")
  .then(res => res.json())
  .then(data => {
    allSongs = data;
  });

const searchInput = document.getElementById("searchInput");
const resultsBox = document.getElementById("searchResults");

searchInput.addEventListener("input", function () {
  const query = this.value.trim();

  if (query === "") {
    resultsBox.innerHTML = "";
    return;
  }

  // 🔥 GLOBAL SEARCH (ALL DATA: new, trending, album, news)
  let results = allSongs.filter(song => {
    return (
      (song.title && song.title.includes(query)) ||
      (song.artist && song.artist.includes(query)) ||
      (song.section && song.section.includes(query))
    );
  });

  // 🔥 SMART RANKING (PRO LEVEL)
  results.sort((a, b) => {
    const score = (s) => {
      let points = 0;

      if (s.title && s.title.includes(query)) points += 3;
      if (s.artist && s.artist.includes(query)) points += 2;
      if (s.section && s.section.includes(query)) points += 1;

      if (s.title === query) points += 5;
      if (s.artist === query) points += 4;

      return points;
    };

    return score(b) - score(a);
  });

  if (results.length === 0) {
    resultsBox.innerHTML = "<p style='padding:10px'>No results found</p>";
    return;
  }

  // 🔥 GROUP RESULTS BY SECTION
  const grouped = {
    "new music": [],
    "trending music": [],
    "music album": [],
    "news": []
  };

  results.forEach(song => {
    const sec = (song.section || "").toLowerCase();

    if (sec.includes("new")) grouped["new music"].push(song);
    else if (sec.includes("trend")) grouped["trending music"].push(song);
    else if (sec.includes("album")) grouped["music album"].push(song);
    else if (sec.includes("news")) grouped["news"].push(song);
    else grouped["new music"].push(song);
  });

  // 🔥 RENDER SEARCH RESULTS (INDEPENDENT FROM LOADMORE)
  resultsBox.innerHTML = Object.keys(grouped).map(section => {
    if (grouped[section].length === 0) return "";

    return `
      <div class="section-result">
        <h3>${section.toUpperCase()}</h3>

        ${grouped[section].map(song => `
          <div class="song">
            <img src="${song.image}" width="50">

            <div>
              <h4>${song.title}</h4>
              <p>${song.artist}</p>

              <audio controls src="${song.audio}"></audio>

              <a href="${song.audio}" download>Download</a>
            </div>
          </div>
        `).join("")}

      </div>
    `;
  }).join("");
});

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



