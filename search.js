const searchBox = document.getElementById("search");
const results = document.getElementById("results");

fetch("../music.json")
  .then(res => res.json())
  .then(data => {

    searchBox.addEventListener("keyup", function () {

      const text = this.value.toLowerCase().trim();

      if (text === "") {
        results.innerHTML = "";
        return;
      }

      const found = data.filter(song =>
        song.title.toLowerCase().includes(text) ||
        song.artist.toLowerCase().includes(text)
      );

      if (found.length === 0) {
        results.innerHTML = "<p>No results found</p>";
        return;
      }

      results.innerHTML = found.map(song => `
  <div class="song">
    <a href="${song.link}">
      <img src="${song.image}" alt="${song.title}">
      <h3>${song.title}</h3>
      <p>${song.artist}</p>
    </a>
  </div>
`).join("");

    });

  });
