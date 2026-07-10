const searchBox = document.getElementById("search");
const results = document.getElementById("results");

let music = [];

fetch("music.json")
  .then(res => res.json())
  .then(data => {
    music = data;
  })
  .catch(err => {
    console.log(err);
  });

searchBox.addEventListener("input", function () {

  const text = this.value.toLowerCase().trim();

  if (text === "") {
    results.innerHTML = "";
    return;
  }

  const found = music.filter(song =>
    song.title.toLowerCase().includes(text) ||
    song.artist.toLowerCase().includes(text)
  );

  if (found.length === 0) {
    results.innerHTML = "<p>No results found.</p>";
    return;
  results.innerHTML = found.map(song => `
  <div class="search-item">
    <a href="${song.link}">
      <img src="${song.image}" alt="${song.title}">
      <div>
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
      </div>
    </a>
  </div>
`).join("");

});
