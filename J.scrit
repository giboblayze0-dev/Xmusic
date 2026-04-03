// JavaScript
const songs = document.querySelectorAll(".song");
const loadMoreBtn = document.getElementById("load-more");

let visibleCount = 5; // Number of songs to show initially
songs.forEach((song, index) => {
  if (index >= visibleCount) song.style.display = "none";
});

loadMoreBtn.addEventListener("click", () => {
  let hiddenSongs = Array.from(songs).filter(song => song.style.display === "none");
  
  for (let i = 0; i < 5 && i < hiddenSongs.length; i++) {
    hiddenSongs[i].style.display = "block";
  }
  
  // Hide button if no more songs
  if (Array.from(songs).every(song => song.style.display === "block")) {
    loadMoreBtn.style.display = "none";
  }
});
