let allSongs = [];
let displayCount = {
  new: 5,
  trending: 5,
  album: 5,
  video: 5
};

// Load JSON
fetch("music.json")
  .then(res => res.json())
  .then(data => {
    allSongs = data;
    renderAll();
  });

// Render all sections
function renderAll() {
  renderSection("new");
  renderSection("trending");
  renderSection("album");
  renderSection("video");
}

// Render section
function renderSection(category) {
  let container = document.getElementById(category + "-container");
  container.innerHTML = "";

  let filtered = allSongs.filter(song => song.category === category);

  filtered.slice(0, displayCount[category]).forEach(song => {
    container.innerHTML += `
      <div class="song">
        <img src="${song.image}" width="100%">
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
        <audio controls src="${song.audio}"></audio>
      </div>
    `;
  });
}

// Load More
function loadMore(category) {
  displayCount[category] += 5;
  renderSection(category);
}

// SEARCH ENGINE
document.getElementById("search").addEventListener("input", function () {
  let value = this.value.toLowerCase();

  let results = allSongs.filter(song =>
    song.title.toLowerCase().includes(value) ||
    song.artist.toLowerCase().includes(value)
  );

  let containers = ["new", "trending", "album", "video"];
  containers.forEach(cat => {
    document.getElementById(cat + "-container").innerHTML = "";
  });

  results.forEach(song => {
    let container = document.getElementById(song.category + "-container");

    container.innerHTML += `
      <div class="song">
        <img src="${song.image}" width="100%">
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
        <audio controls src="${song.audio}"></audio>
      </div>
    `;
  });
});
