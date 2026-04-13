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





const links = document.querySelectorAll('.menu a');

links.forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.menu').classList.remove('active');
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



const firebaseConfig = {
  apiKey: "AIzaSyDI7b7BqUopaBfTC-P0vE1o5PVX3ustFOw",
  authDomain: "xmusic-eb387.firebaseapp.com",
  projectId: "xmusic-eb387",
  storageBucket: "xmusic-eb387.firebasestorage.app",
  messagingSenderId: "758209934631",
  appId: "1:758209934631:web:adab7279758b7ae2172502",
  measurementId: "G-2S7F5P03ZD"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log("Firebase connected ✅");


const searchInput = document.getElementById("search");
const songsContainer = document.getElementById("songs");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = songs.filter(song =>
    song.title.toLowerCase().includes(value)
  );

  displaySongs(filtered); // Only update songs
});
