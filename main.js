<script>
const songs = [/* your JSON data here */];

let visibleCount = 6;

// render function
function renderSection(sectionId, filterType, searchText = "") {
  const container = document.getElementById(sectionId);
  container.innerHTML = "";

  let filtered = songs.filter(s => s.type === filterType);

  // search filter
  if (searchText) {
    filtered = filtered.filter(s =>
      s.title.toLowerCase().includes(searchText) ||
      s.artist.toLowerCase().includes(searchText)
    );
  }

  filtered.slice(0, visibleCount).forEach(song => {
    const card = document.createElement("div");
    card.className = "song-card";

    card.innerHTML = `
      <img src="${song.cover}">
      <div class="info">
        <div>${song.title}</div>
        <small>${song.artist}</small>
      </div>
    `;

    card.onclick = () => {
      window.location.href = `/song/${song.slug}`;
    };

    container.appendChild(card);
  });
}

// initial load
function loadAll() {
  renderSection("newMusic", "new");
  renderSection("trendingMusic", "trending");
  renderSection("albums", "album");
}

// load more button
document.getElementById("loadMoreBtn").onclick = () => {
  visibleCount += 6;
  loadAll();
};

// search engine
document.getElementById("search").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  renderSection("newMusic", "new", value);
  renderSection("trendingMusic", "trending", value);
  renderSection("albums", "album", value);
});

loadAll();
</script>
