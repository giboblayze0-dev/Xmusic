let songs = [];
let page = {
  new: 1,
  trending: 1,
  album: 1,
  video: 1
};

const perLoad = 6;

// LOAD JSON
fetch("data/songs.json")
  .then(res => res.json())
  .then(data => {
    songs = data;
    renderAll();
  });

// RENDER SECTION
function render(type, containerId) {
  const container = document.getElementById(containerId);

  const filtered = songs.filter(s => s.type === type);

  const visible = filtered.slice(0, page[type] * perLoad);

  container.innerHTML = "";

  visible.forEach(song => {
    const card = document.createElement("div");
    card.className = "song-card";

    card.innerHTML = `
      <a href="song.html?slug=${song.slug}">
        <img src="${song.cover}">
      </a>

      <div class="info">
        <a href="song.html?slug=${song.slug}">
          <h3>${song.title}</h3>
        </a>
        <p>${song.artist}</p>
      </div>
    `;

    container.appendChild(card);
  });

  // hide button if done
  const btn = document.querySelector(`button[onclick="loadMore('${type}')"]`);
  if (visible.length >= filtered.length) {
    btn.style.display = "none";
  }
}

// LOAD MORE
function loadMore(type) {
  page[type]++;
  renderAll();
}

// RENDER ALL
function renderAll() {
  render("new", "new");
  render("trending", "trending");
  render("album", "album");
  render("video", "video");
}

// SEARCH ENGINE
document.getElementById("search").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  document.querySelectorAll(".song-card").forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(value) ? "block" : "none";
  });
});
