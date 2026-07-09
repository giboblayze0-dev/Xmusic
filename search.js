let searchBox=document.getElementById("search");


searchBox.addEventListener("keyup",function(){

let text=this.value.toLowerCase();


fetch("music.json")
.then(res=>res.json())
.then(data=>{


let result="";


data.forEach(song=>{


if(
song.title.toLowerCase().includes(text) ||
song.artist.toLowerCase().includes(text)
){


result += `

<div>

<a href="${song.link}">

${song.title} - ${song.artist}

</a>

</div>

`;

}


});


document.getElementById("search-result").innerHTML=result;


});


});
