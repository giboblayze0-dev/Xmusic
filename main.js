let allSongs = [];

fetch("music.json")
  .then(res => res.json())
  .then(data => {
    allSongs = data;
  });

const searchInput = document.getElementById("searchInput");
const resultsBox = document.getElementById("searchResults");

searchInput.addEventListener("input", function () {
  const query = this.value.trim();

  if (query === "") {
    resultsBox.innerHTML = "";
    return;
  }

  // 🔥 GLOBAL SEARCH (ALL DATA: new, trending, album, news)
  let results = allSongs.filter(song => {
    return (
      (song.title && song.title.includes(query)) ||
      (song.artist && song.artist.includes(query)) ||
      (song.section && song.section.includes(query))
    );
  });

  // 🔥 SMART RANKING (PRO LEVEL)
  results.sort((a, b) => {
    const score = (s) => {
      let points = 0;

      if (s.title && s.title.includes(query)) points += 3;
      if (s.artist && s.artist.includes(query)) points += 2;
      if (s.section && s.section.includes(query)) points += 1;

      if (s.title === query) points += 5;
      if (s.artist === query) points += 4;

      return points;
    };

    return score(b) - score(a);
  });

  if (results.length === 0) {
    resultsBox.innerHTML = "<p style='padding:10px'>No results found</p>";
    return;
  }

  // 🔥 GROUP RESULTS BY SECTION
  const grouped = {
    "new music": [],
    "trending music": [],
    "music album": [],
    "news": []
  };

  results.forEach(song => {
    const sec = (song.section || "").toLowerCase();

    if (sec.includes("new")) grouped["new music"].push(song);
    else if (sec.includes("trend")) grouped["trending music"].push(song);
    else if (sec.includes("album")) grouped["music album"].push(song);
    else if (sec.includes("news")) grouped["news"].push(song);
    else grouped["new music"].push(song);
  });

  // 🔥 RENDER SEARCH RESULTS (INDEPENDENT FROM LOADMORE)
  resultsBox.innerHTML = Object.keys(grouped).map(section => {
    if (grouped[section].length === 0) return "";

    return `
      <div class="section-result">
        <h3>${section.toUpperCase()}</h3>

        ${grouped[section].map(song => `
          <div class="song">
            <img src="${song.image}" width="50">

            <div>
              <h4>${song.title}</h4>
              <p>${song.artist}</p>

              <audio controls src="${song.audio}"></audio>

              <a href="${song.audio}" download>Download</a>
            </div>
          </div>
        `).join("")}

      </div>
    `;
  }).join("");
});











function setNowPlaying(title) {
  document.getElementById("now-playing").innerHTML =
    "Now Playing: " + title;
                      }


document.addEventListener("play", function(e){
  const audios = document.querySelectorAll("audio");
  audios.forEach(audio => {
    if (audio !== e.target) {
      audio.pause();
    }
  });
}, true);








document.querySelector("a[href='#']").addEventListener("click", function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});




const resultsContainer = document.getElementById("results");

if (results.length === 0) {
  resultsContainer.innerHTML = "<p>No results found ❌</p>";
} else {
  resultsContainer.innerHTML = "";

  results.forEach(song => {
    resultsContainer.innerHTML += `
      <div class="song">
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
      </div>
    `;
  });
}




const query = searchInput.toLowerCase();

const results = songs.filter(song => 
  song.title.toLowerCase().includes(query) ||
  song.artist.toLowerCase().includes(query)
);



