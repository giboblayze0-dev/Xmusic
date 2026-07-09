let songs = {
  new: [],
  trending: [],
  album: []
};

let limit = {
  new: 6,
  trending: 6,
  album: 6
};

fetch("music.json")
.then(res => res.json())
.then(data => {

  data.forEach(song => {
    songs[song.section].push(song);
  });

  showSection("new");
  showSection("trending");
  showSection("album");

});


function showSection(section){

  let html = "";

  songs[section].slice(0, limit[section]).forEach(song => {

    html += `
    <div class="song-card">
      <a href="${song.link}">
        <img src="${song.image}" alt="${song.title}">
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
      </a>
    </div>`;

  });

  document.getElementById(section).innerHTML = html;
}


function loadMore(section){

  limit[section] += 6;
  showSection(section);

}
