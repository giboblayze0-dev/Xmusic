const songs = [

{
title: "Reggae Vibes",
artist: "Gibo Blayze",
image: "images/reggae.jpg",
audio: "music/reggae.mp3"
},

{
title: "Dancehall Fire",
artist: "DJ Star",
image: "images/dancehall.jpg",
audio: "music/dancehall.mp3"
},

{
title: "Island Love",
artist: "King Melody",
image: "images/island.jpg",
audio: "music/island.mp3"
}

];


function searchSongs(){

let input = document.getElementById("search").value.toLowerCase();
let results = document.getElementById("results");

results.innerHTML="";

songs.forEach(song=>{

if(song.title.toLowerCase().includes(input) || song.artist.toLowerCase().includes(input)){

results.innerHTML += `

<div class="song">

<img src="${song.image}" width="120">

<h3>${song.title}</h3>

<p>${song.artist}</p>

<audio controls src="${song.audio}"></audio>

<br>

<a href="${song.audio}" download>Download</a>

</div>

`;

}

});

}
