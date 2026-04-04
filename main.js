<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Xmusic</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    #search { width: 100%; padding: 10px; margin-bottom: 20px; font-size: 16px; }
    .song { margin-bottom: 10px; padding: 10px; border: 1px solid #ccc; border-radius: 5px; }
    #load-more { padding: 10px 20px; font-size: 16px; cursor: pointer; margin-top: 10px; }
  </style>
</head>
<body>
<script>
  <input type="text" id="search" placeholder="Search music...">

  <div id="music-container"></div>

  <button id="load-more">Load More</button>

  <script src="main.js"></script>
    [
  {"title": "Song 1", "artist": "Artist A", "link": "song1.mp3"},
  {"title": "Song 2", "artist": "Artist B", "link": "song2.mp3"},
  {"title": "Song 3", "artist": "Artist C", "link": "song3.mp3"},
  {"title": "Song 4", "artist": "Artist D", "link": "song4.mp3"},
  {"title": "Song 5", "artist": "Artist E", "link": "song5.mp3"},
  {"title": "Song 6", "artist": "Artist F", "link": "song6.mp3"},
  {"title": "Song 7", "artist": "Artist G", "link": "song7.mp3"},
  {"title": "Song 8", "artist": "Artist H", "link": "song8.mp3"}
    loadMoreBtn.style.display
const musicContainer = document.getElementById("music-container");
const loadMoreBtn = document.getElementById("load-more");
const searchInput = document.getElementById("search");

let allSongs = []; // This will hold all songs from JSON
let currentIndex = 0; // Track how many songs are displayed
const itemsPerPage = 5; // Songs per "Load More"

// Load songs from JSON
fetch("songs.json")
  .then(response => response.json())
  .then(data => {
    allSongs = data;
    displaySongs(); // Show initial songs
  });

// Display songs function
function displaySongs(filteredSongs = null) {
  const songsToDisplay = filteredSongs || allSongs.slice(currentIndex, currentIndex + itemsPerPage);

  if (!filteredSongs) currentIndex += itemsPerPage;

  songsToDisplay.forEach(song => {
    const div = document.createElement("div");
    div.className = "song";
    div.innerHTML = `<strong>${song.title}</strong> - ${song.artist}`;
    musicContainer.appendChild(div);
  });

  // Hide Load More button if all songs are displayed
  if (!filteredSongs && currentIndex >= allSongs.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}

// Load More button
loadMoreBtn.addEventListener("click", () => {
  displaySongs();
});

// Search functionality
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  musicContainer.innerHTML = "";
  currentIndex = 0; // Reset index for Load More

  if (query === "") {
    displaySongs();
  } else {
    const filtered = allSongs.filter(song =>
      song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)
    );
    displaySongs(filtered);
  }
});
]
                </script>
</body>
</html>
