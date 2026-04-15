let allSongs = [];
const sections = ["new","trending","albums","videos"];
const songsPerPage = 5;
let currentPage = {new:1, trending:1, albums:1, videos:1};

fetch('music.json')
  .then(res => res.json())
  .then(data => {
    allSongs = data;
    sections.forEach(section => loadSongs(section));
  });

// Load songs for section
function loadSongs(section){
  const container = document.querySelector(`#${section} .songs`);
  const page = currentPage[section];
  const filtered = allSongs.filter(s => s.section === section);
  const start = (page-1)*songsPerPage;
  const end = start+songsPerPage;
  const slice = filtered.slice(start,end);

  slice.forEach(song => {
    const div = document.createElement('div');
    div.classList.add('song');
    div.innerHTML = `
      <img src="${song.image}" alt="${song.title}">
      <div>
        <strong>${song.title}</strong><br>
        ${song.artist}<br>
        <audio controls src="${song.audio}"></audio>
        <a href="${song.download}" download><button>Download</button></a>
      </div>`;
    container.appendChild(div);
  });

  const loadBtn = document.querySelector(`#${section} .loadmore`);
  if(end >= filtered.length) loadBtn.style.display="none";
  else loadBtn.style.display="block";

  loadBtn.onclick = () => {
    currentPage[section]++;
    loadSongs(section);
  };
}

// Search function
document.getElementById('search').addEventListener('input', e => {
  const query = e.target.value.toLowerCase();
  sections.forEach(section => {
    const container = document.querySelector(`#${section} .songs`);
    container.innerHTML = '';
    currentPage[section] = 1;
    const filtered = allSongs.filter(s => 
      s.section === section && (s.title.toLowerCase().includes(query) || s.artist.toLowerCase().includes(query))
    );
    filtered.slice(0,songsPerPage).forEach(song => {
      const div = document.createElement('div');
      div.classList.add('song');
      div.innerHTML = `
        <img src="${song.image}" alt="${song.title}">
        <div>
          <strong>${song.title}</strong><br>
          ${song.artist}<br>
          <audio controls src="${song.audio}"></audio>
          <a href="${song.download}" download><button>Download</button></a>
        </div>`;
      container.appendChild(div);
    });
  });
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



