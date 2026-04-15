document.getElementById('search').addEventListener('input', e => {
  const query = e.target.value.toLowerCase();

  const resultBox = document.querySelector('#searchResults');
  const resultContainer = resultBox.querySelector('.songs');
  fetch('music.json')
  .then(res => res.json())
  .then(data => {
    allSongs = data;
  });

  resultContainer.innerHTML = '';

  // ✅ IF EMPTY → HIDE RESULTS & SHOW NORMAL SECTIONS
  if(query === ""){
    resultBox.style.display = "none";

    sections.forEach(section => {
      document.getElementById(section).style.display = "block";
      const container = document.querySelector(`#${section} .songs`);
      container.innerHTML = '';
      currentPage[section] = 1;
      loadSongs(section);
    });

    return;
  }

  // ✅ SHOW RESULT BOX & HIDE SECTIONS
  resultBox.style.display = "block";
  sections.forEach(section => {
    document.getElementById(section).style.display = "none";
  });

  // ✅ FILTER ALL SONGS (NOT BY SECTION)
  const filtered = allSongs.filter(s => 
    s.title.toLowerCase().includes(query) ||
    s.artist.toLowerCase().includes(query)
  );

  // ✅ NO RESULTS
  if(filtered.length === 0){
    resultContainer.innerHTML = `<p style="color:white;">No results found</p>`;
    return;
  }

  // ✅ SHOW RESULTS
  filtered.forEach(song => {
    const div = document.createElement('div');
    div.classList.add('song');
    div.innerHTML = `
      <img src="${song.image}" alt="${song.title}">
      <div>
        <strong>${song.title}</strong><br>
        ${song.artist}<br>
        <audio controls src="${song.audio}"></audio>
        <a href="${song.download}" download>
          <button>Download</button>
        </a>
      </div>`;
    resultContainer.appendChild(div);
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



