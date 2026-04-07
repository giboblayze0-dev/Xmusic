document.addEventListener("DOMContentLoaded", () => {

const songsData = [
  { title: "Be Strong", artist: "Taycee", section: new-music },
  { title: "Ye", artist: "Burna Boy", section: new-music },
  { title: "Essence", artist: "Wizkid", section: new-music },
  { title: "Fall", artist: "Davido", section: new-music },
  { title: "Free Mind", artist: "Tems", section: new-music },
  { title: "Calm Down", artist: "Rema", section: new-music },

  { title: "Fever", artist: "Vybz Kartel", section: 2 },
  { title: "Lick", artist: "Shenseea", section: 2 },
  { title: "So Mi Like It", artist: "Spice", section: 2 },
  { title: "After All", artist: "Alkaline", section: 2 },
  { title: "Crocodile Teeth", artist: "Skillibeng", section: 2 },

  { title: "Yeah", artist: "Usher", section: 3 },
  { title: "So Sick", artist: "Ne-Yo", section: 3 },
  { title: "Blinding Lights", artist: "The Weeknd", section: 3 },
  { title: "Say Aah", artist: "Trey Songz", section: 3 },
  { title: "Let Me Love You", artist: "Mario", section: 3 },

  { title: "Jerusalema", artist: "Master KG", section: 4 },
  { title: "Ke Star", artist: "Focalistic", section: 4 },
  { title: "Sponono", artist: "Kabza De Small", section: 4 },
  { title: "Izolo", artist: "DJ Maphorisa", section: 4 },
  { title: "Tanzania", artist: "Uncle Waffles", section: 4 }
];

const sectionsContainer = document.getElementById("sections");
const resultsContainer = document.getElementById("search-results");

// CREATE SECTIONS
function createSections() {
  sectionsContainer.innerHTML = "";
  let grouped = {new-music: [], trending-music: [], album: [], videos: []};
  songsData.forEach(song => grouped[song.section].push(song));

  Object.keys(grouped).forEach(sec => {
    let div = document.createElement("div");
    div.className = "section";

    let visible = 5;

    grouped[sec].forEach((song, index) => {
      let songDiv = document.createElement("div");
      songDiv.className = "song";
      songDiv.textContent = song.title + " - " + song.artist;
      if(index >= visible) songDiv.style.display = "none";
      div.appendChild(songDiv);
    });

    let btn = document.createElement("button");
    btn.className = "load-more";
    btn.textContent = "Load More";

    btn.addEventListener("click", () => {
      visible += 5;
      div.querySelectorAll(".song").forEach((s, i) => {
        if(i < visible) s.style.display = "block";
      });
      if(visible >= grouped[sec].length) btn.style.display = "none";
    });

    div.appendChild(btn);
    sectionsContainer.appendChild(div);
  });
}

// Initial render
createSections();

// UNLIMITED SEARCH
document.getElementById("search").addEventListener("keyup", function(){
  const value = this.value.toLowerCase();
  resultsContainer.innerHTML = "";

  if(value === ""){
    sectionsContainer.style.display = "block";
    resultsContainer.style.display = "none";
    return;
  }

  sectionsContainer.style.display = "none";
  resultsContainer.style.display = "block";

  const filtered = songsData.filter(song => (song.title + " " + song.artist).toLowerCase().includes(value));
  
  if(filtered.length === 0){
    resultsContainer.innerHTML = "<p>No results found</p>";
    return;
  }

  filtered.forEach(song => {
    let div = document.createElement("div");
    div.className = "song";
    div.textContent = song.title + " - " + song.artist;
    resultsContainer.appendChild(div);
  });
});

});
