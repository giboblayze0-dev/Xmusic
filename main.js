let allSongs = [];

const state = {
  new: 1,
  trending: 1,
  albums: 1,
  news: 1
};

const songsPerPage = 5;

// LOAD DATA

  .then(res => res.json())
  .then(data => {
    allSongs = data;
    renderAll();
  });

// RENDER ALL SECTIONS
function renderAll() {
  Object.keys(state).forEach(section => renderSection(section));
}

// POWER SEARCH FUNCTION
function powerSearch(songs, searchValue) {
  const words = searchValue.toLowerCase().trim().split(" ");

  return songs
    .map(song => {
      let score = 0;

      const title = song.title.toLowerCase();
      const artist = song.artist.toLowerCase();
      const section = song.section.toLowerCase();

      words.forEach(word => {
        if (title.includes(word)) score += 3;
        if (artist.includes(word)) score += 2;
        if (section.includes(word)) score += 1;
      });

      return { ...song, score };
    })
    .filter(song => song.score > 0)
    .sort((a, b) => b.score - a.score);
}

// RENDER SECTION
function renderSection(section) {
  const container = document.querySelector(`.songs[data-section="${section}"]`);
  if (!container) return;

  let songs = allSongs.filter(s => s.section === section);

  const searchValue = document.getElementById("search")?.value?.toLowerCase().trim();

  // 🔥 APPLY POWER SEARCH
  if (searchValue) {
    songs = powerSearch(songs, searchValue);
  }

  // ❌ NO RESULTS
  if (searchValue && songs.length === 0) {
    container.innerHTML = `<p>No results found 😢</p>`;
    return;
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

// 🔍 REAL-TIME SEARCH
document.getElementById("search").addEventListener("input", () => {
  // Reset pages when searching
  Object.keys(state).forEach(sec => state[sec] = 1);

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




fetch("/data/songs.json")
.then(res => res.json())
.then(songs => {

  let html = "";

  songs.forEach(song => {
    html += `
      <div>
        <h3>${song.artist} - ${song.title}</h3>
        <a href="/songs/song.html?song=${song.slug}">
          Play / Download
        </a>
      </div>
    `;
  });

  document.getElementById("songs").innerHTML = html;

});


