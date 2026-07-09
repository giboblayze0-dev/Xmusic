fetch("music.json")
.then(res => res.json())
.then(data => {

  let newMusic = "";
  let trending = "";
  let albums = "";

  data.forEach(song => {

    let item = `
      <div class="song-card">
        <a href="${song.link}">
          <img src="${song.image}" alt="music">
        </a>
      </div>
    `;

    if(song.section === "new"){
      newMusic += item;
    }

    if(song.section === "trending"){
      trending += item;
    }

    if(song.section === "album"){
      albums += item;
    }

  });

  document.getElementById("new").innerHTML = newMusic;
  document.getElementById("trending").innerHTML = trending;
  document.getElementById("albums").innerHTML = albums;

});







const searchBox = document.getElementById("searchBox");

searchBox.addEventListener("keyup", function () {
    const filter = this.value.toLowerCase();
    const links = document.querySelectorAll("#songs a");

    links.forEach(link => {
        if (link.textContent.toLowerCase().includes(filter)) {
            link.style.display = "";
        } else {
            link.style.display = "none";
        }
    });
});

async function searchSongs() {
  const query = document.getElementById("searchInput").value;
  const loading = document.getElementById("loading");
  const results = document.getElementById("results");

  // Show loading
  loading.style.display = "block";
  results.innerHTML = "";

  try {
    // simulate API request (replace with your real API)
    const response = await fetch(`/api/songs?search=${query}`);
    const data = await response.json();

    // Display results
    results.innerHTML = data.map(song => `
      <p>${song.title} - ${song.artist}</p>
    `).join("");

  } catch (error) {
    results.innerHTML = "Error loading songs.";
  }

  // Hide loading
  loading.style.display = "none";
}



const songsPerPage = 5;

// LOAD DATA

 fetch("music.json")
   .then(res=>res.json())
  .then(data => {
    allSongs = data;
    renderAll()  });
// RENDER ALL SECTIONS
function renderAll() {
  Object.keys(state).forEach(section => renderSection(section));
}

// POWER SEARCH FUNCTION
function powerSearch(songs, searchValue) {
  const words = searchValue.toLowerCase().trim().split(" ");

  return songs
    .map(song => {
      let score = 0;

      const title = song.title.toLowerCase();
      const artist = song.artist.toLowerCase();
      const section = song.section.toLowerCase();

      words.forEach(word => {
        if (title.includes(word)) score += 3;
        if (artist.includes(word)) score += 2;
        if (section.includes(word)) score += 1;
      });

      return { ...song, score };
    })
    .filter(song => song.score > 0)
    .sort((a, b) => b.score - a.score);
}

// RENDER SECTION
function renderSection(section) {
  const container = document.querySelector(`.songs[data-section="${section}"]`);
  if (!container) return;

  let songs = allSongs.filter(s => s.section === section);

  const searchValue = document.getElementById("search")?.value?.toLowerCase().trim();

  // 🔥 APPLY POWER SEARCH
  if (searchValue) {
    songs = powerSearch(songs, searchValue);
  }

  // ❌ NO RESULTS
  if (searchValue && songs.length === 0) {
    container.innerHTML = `<p>No results found 😢</p>`;
    return;
  }

  const visible = songs.slice(0, state[section] * songsPerPage);

container.innerHTML = "";

visible.forEach(song => {
  container.innerHTML += `
  <div class="song-card">
    <a href="${song.link}">
      <img src="${song.image}" alt="${song.title}">
      <h3>${song.title}</h3>
    </a>
  </div>
  `;
});


<audio controls>  
      <source src="${song.audio}" type="audio/mpeg">  
    </audio>  

    <a href="${song.download}" download>⬇ Download</a>  
  </div>  
`;

});
} 

// LOAD MORE BUTTONS
document.querySelectorAll(".loadmore").forEach(btn => {
  btn.addEventListener("click", () => {
    const section = btn.dataset.section;
    state[section]++;
    renderSection(section);
  });
});

// 🔍 REAL-TIME SEARCH
document.getElementById("search").addEventListener("input", () => {
  // Reset pages when searching
  Object.keys(state).forEach(sec => state[sec] = 1);

  renderAll();
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




fetch("/data/songs.json")
.then(res => res.json())
.then(songs => {

  let html = "";

  songs.forEach(song => {
    html += `
      <div>
        <h3>${song.artist} - ${song.title}</h3>
        <a href="/songs/song.html?song=${song.slug}">
          Play / Download
        </a>
      </div>
    `;
  });

  document.getElementById("songs").innerHTML = html;

});

