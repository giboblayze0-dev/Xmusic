let allSongs = [];
let displayCount = {
  new: 5,
  trending: 5,
  album: 5,
  video: 5
};

// LOAD JSON
fetch("data/music.json"):


// DISPLAY ALL SECTIONS
function displayAll() {
  displaySection('new');
  displaySection('trending');
  displaySection('album');
  displaySection('video');
}

// DISPLAY SECTION
function displaySection(section) {
  const container = document.getElementById(section + "-music");
  container.innerHTML = "";

  const filtered = allSongs.filter(song => song.section === section);

  filtered.slice(0, displayCount[section]).forEach(song => {
    container.innerHTML += `
      <div class="song">
        <img src="${song.image}" width="100">
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
        <audio controls src="${song.file}"></audio>
      </div>
    `;
  });
}

// LOAD MORE
function loadMore(section) {
  displayCount[section] += 5;
  displaySection(section);
}

// SEARCH ENGINE 🔍
document.getElementById("search").addEventListener("input", function () {
  const value = this.value.toLowerCase();

  const results = allSongs.filter(song =>
    song.title.toLowerCase().includes(value) ||
    song.artist.toLowerCase().includes(value)
  );

  // CLEAR ALL SECTIONS
  document.getElementById("new-music").innerHTML = "";
  document.getElementById("trending-music").innerHTML = "";
  document.getElementById("album-music").innerHTML = "";
  document.getElementById("video-music").innerHTML = "";

  // SHOW SEARCH RESULTS IN NEW SECTION
  const container = document.getElementById("new-music");

  results.forEach(song => {
    container.innerHTML += `
      <div class="song">
        <img src="${song.image}" width="100">
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
        <audio controls src="${song.file}"></audio>
      </div>
    `;
  });
});
