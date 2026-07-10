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
    if (songs[song.section]) {
      songs[song.section].push(song);
    }
  });

  show("new");
  show("trending");
  show("album");

});


function show(section){

  let html = "";

  songs[section].slice(0, limit[section]).forEach(song => {

    html += `
    <div class="song">

      <a href="${song.url}">
  <img src="${song.image}" alt="${song.title}">
  <h3>${song.title}</h3>
  <p>${song.artist}</p>
</a>

    </div>
    `;

  });

  document.getElementById(section).innerHTML = html;

}

  


function loadMore(section){

  limit[section] += 6;
  show(section);

}
