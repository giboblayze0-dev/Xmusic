const searchInput = document.getElementById("search");
const sections = {
  new: { container: document.getElementById("new-music"), index: 0 },
  trending: { container: document.getElementById("trending-music"), index: 0 },
  album: { container: document.getElementById("album-music"), index: 0 },
  video: { container: document.getElementById("video-music"), index: 0 }
};
const itemsPerPage = 5;
let allItems = [];

fetch("music.json")
  .then(res => res.json())
  .then(data => {
    allItems = data;
    Object.keys(sections).forEach(type => displayItems(type));
  });

function displayItems(type, filtered = null) {
  const container = sections[type].container;
  const startIndex = sections[type].index;
  const items = filtered || allItems.filter(item => item.type === type);

  const slice = items.slice(startIndex, startIndex + itemsPerPage);
  slice.forEach(item => {
    const div = document.createElement("div");
    div.className = "song";
    div.innerHTML = `<strong>${item.title}</strong> - ${item.artist}`;
    container.appendChild(div);
  });

  if (!filtered) sections[type].index += itemsPerPage;
  document.querySelector(`button[data-type="${type}"]`).style.display =
    sections[type].index >= items.length ? "none" : "block";
}

// Load More buttons
document.querySelectorAll(".load-more").forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type;
    displayItems(type);
  });
});

// Search functionality
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  Object.keys(sections).forEach(type => {
    sections[type].container.innerHTML = "";
    sections[type].index = 0;
    const filtered = allItems.filter(item =>
      item.type === type &&
      (item.title.toLowerCase().includes(query) || item.artist.toLowerCase().includes(query))
    );
    displayItems(type, filtered);
  });
});
