const songs = {
  new: [],
  trending: [],
  album: []
};

const limit = {
  new: 6,
  trending: 6,
  album: 6
};

const searchBox = document.getElementById("search");
const results = document.getElementById("results");

let music = [];

// Load music.json once
fetch("music.json")
  .then(res => res.json())
  .then(data => {

    music = data;

    data.forEach(song => {
      if (songs[song.section]) {
        songs[song.section].push(song);
      }
    });

    show("new");
    show("trending");
    show("album");

  })
  .catch(err => console.log(err));

// Show songs
function show(section) {

  let html = "";

  songs[section]
    .slice(0, limit[section])
    .forEach(song => {

      html += `
      <div class="song">
        <a href="${song.link}">
          <img src="${song.image}" alt="${song.title}">
          <h3>${song.title}</h3>
          <p>${song.artist}</p>
        </a>
      </div>
      `;

    });

  document.getElementById(section).innerHTML = html;
}

// Load More
function loadMore(section) {
  limit[section] += 6;
  show(section);
}

// Search
searchBox.addEventListener("input", function () 

  const text = this.value.trim().toLowerCase();

  if (text === "") {
    results.style.display = "none";
    results.innerHTML = "";
    return;
  }

  const found = music.filter(song =>
    song.title.toLowerCase().includes(text) ||
    song.artist.toLowerCase().includes(text)
  );

  if (found.length === 0) {
    results.style.display = "block";
    results.innerHTML = "<p>No results found.</p>";
    return;
  }

  results.style.display = "block";

  results.innerHTML = found.map(song => `
    <div class="search-item">
      <a href="${song.link}" onclick="document.getElementById('results').style.display='none';">
        <img src="${song.image}" alt="${song.title}">
        <div>
          <h3>${song.title}</h3>
          <p>${song.artist}</p>
        </div>
      </a>
    </div>
  `).join("");

});
