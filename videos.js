let videos = [];
let limit = 6;

const videoList = document.getElementById("video-list");
const loadMore = document.getElementById("loadMore");


fetch("videos.json")
.then(response => response.json())
.then(data => {

    videos = data;
    displayVideos();

});


function displayVideos(){

    videoList.innerHTML = "";

    videos.slice(0, limit).forEach(video => {

        videoList.innerHTML += `

        <div class="video-card">

            <a href="${video.youtube}" target="_blank">

                <img src="${video.image}" alt="${video.title}">

                <h2>${video.title}</h2>

                <p>${video.artist}</p>

            </a>

        </div>

        `;

    });


    if(limit >= videos.length){

        loadMore.style.display = "none";

    }

}


loadMore.onclick = () => {

    limit += 6;

    displayVideos();

};
