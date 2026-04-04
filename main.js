const searchInput = document.getElementById("search");
const musicContainer = document.getElementById("music-container");
const loadMoreBtn = document.getElementById("load-more");

// Grab all your song items
const allSongs = Array.from(document.querySelectorAll(".song"));
let visibleCount = 5; // show first 5 songs

// Function to display songs
function displaySongs(filteredSongs) {
  musicContainer.innerHTML = ""; // clear container
  filteredSongs.slice(0, visibleCount).forEach(song => {
    musicContainer.appendChild(song);
  });

  // Show or hide Load More
  loadMoreBtn.style.display = visibleCount < filteredSongs.length ? "block" : "none";
}

// Get songs matching search
function getFilteredSongs() {
  const query = searchInput.value.toLowerCase().trim();
  return allSongs.filter(song => song.textContent.toLowerCase().includes(query));
}

// Search input event
searchInput.addEventListener("input", () => {
  visibleCount = 5; // reset visible count
  const filteredSongs = getFilteredSongs();
  displaySongs(filteredSongs);
});

// Load More click
loadMoreBtn.addEventListener("click", () => {
  visibleCount += 5; // show 5 more
  const filteredSongs = getFilteredSongs();
  displaySongs(filteredSongs);
});

// Initial display
displaySongs(allSongs);
