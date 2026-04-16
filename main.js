import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "YOUR_SUPABASE_URL",
  "YOUR_SUPABASE_ANON_KEY"
);

// ---------------- CHECK LOGIN ----------------
async function checkAuth() {
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    window.location.href = "login.html";
  }
}
checkAuth();

// ---------------- UPLOAD SONG ----------------
window.uploadSong = async function () {
  const title = document.getElementById("title").value;
  const artist = document.getElementById("artist").value;
  const audio = document.getElementById("audio").files[0];
  const image = document.getElementById("image").files[0];

  if (!audio) return alert("Select audio file");

  const audioName = Date.now() + audio.name;

  const { data: audioData, error: audioError } = await supabase.storage
    .from("songs")
    .upload(audioName, audio);

  if (audioError) return alert("Audio upload failed");

  let imagePath = "";
  if (image) {
    const imageName = Date.now() + image.name;

    const { data: imgData } = await supabase.storage
      .from("songs")
      .upload(imageName, image);

    imagePath = imgData.path;
  }

  const { error } = await supabase
    .from("songs")
    .insert([
      {
        title,
        artist,
        file_path: audioData.path,
        image: imagePath
      }
    ]);

  if (error) {
    alert("Upload failed");
  } else {
    document.getElementById("msg").innerText = "Uploaded!";
    loadSongs();
  }
};

// ---------------- LOAD ALL SONGS ----------------
window.loadSongs = async function () {
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  const list = document.getElementById("songList");
  list.innerHTML = "";

  data.forEach(song => {
    list.innerHTML += `
      <div class="song">
        <b>${song.title}</b> - ${song.artist}
        <br>
        <button onclick="deleteSong('${song.id}')">Delete</button>
      </div>
    `;
  });
};

// ---------------- DELETE SONG ----------------
window.deleteSong = async function (id) {
  const confirmDelete = confirm("Delete this song?");
  if (!confirmDelete) return;

  const { error } = await supabase
    .from("songs")
    .delete()
    .eq("id", id);

  if (!error) {
    loadSongs();
  }
};

// ---------------- LOGOUT ----------------
window.logout = async function () {
  await supabase.auth.signOut();
  window.location.href = "login.html";
};

// ---------------- INIT ----------------
loadSongs();






const supabaseUrl = "YOUR_SUPABASE_URL";
const supabaseKey = "YOUR_ANON_KEY";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

let allSongs = [];

// LOAD SONGS
async function loadSongs() {
  const { data, error } = await supabase
    .from("songs")
    .select("*");

  if (error) {
    console.log("Error loading songs:", error);
    return;
  }

  allSongs = data;
  renderSongs();
}

loadSongs();

// GET AUDIO URL FROM STORAGE
function getAudioUrl(filePath) {
  return supabase
    .storage
    .from("music")
    .getPublicUrl(filePath).data.publicUrl;
}

// DOWNLOAD SONG
function downloadSong(filePath, title) {
  const url = getAudioUrl(filePath);

  const a = document.createElement("a");
  a.href = url;
  a.download = title + ".mp3";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// RENDER SONGS (EDIT THIS PART TO MATCH YOUR UI)
function renderSongs() {
  const container = document.getElementById("songsContainer");
  container.innerHTML = "";

  allSongs.forEach(song => {
    const div = document.createElement("div");

    div.innerHTML = `
      <img src="${song.image}" width="100">
      <h3>${song.title}</h3>
      <p>${song.artist}</p>

      <audio controls src="${getAudioUrl(song.file_path)}"></audio>

      <button onclick="downloadSong('${song.file_path}', '${song.title}')">
        Download
      </button>
    `;

    container.appendChild(div);
  });
}













let allSongs = [];

const state = {
  new: 1,
  trending: 1,
  albums: 1,
  news: 1
};

const songsPerPage = 5;

// LOAD DATA
fetch("music.json")
  .then(res => res.json())
  .then(data => {
    allSongs = data;
    renderAll();
  });

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
        <img src="${song.image}" alt="${song.title}">
        <h3>${song.title}</h3>
        <p>${song.artist}</p>

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



