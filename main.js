let songs = [];
let currentIndex = 0;
const limit = 5;

fetch("music.json")
  .then(res => res.json())
  .then(data => {
    songs = data;
    displaySongs();
  });

function displaySongs(filter = "") {
  const container = document.getElementById("music-list");

  let filtered = songs.filter(song =>
    song.title.toLowerCase().includes(filter.toLowerCase())
  );

  let slice = filtered.slice(0, currentIndex + limit);

  container.innerHTML = "";

  slice.forEach(song => {
    container.innerHTML += `
      <div>
        <img src="${song.image}" width="100">
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
        <audio controls src="${song.audio}"></audio>
      </div>
    `;
  });
}

document.getElementById("loadMore").addEventListener("click", () => {
  currentIndex += limit;
  displaySongs(document.getElementById("search").value);
});

document.getElementById("search").addEventListener("input", (e) => {
  currentIndex = 0;
  displaySongs(e.target.value);
});
