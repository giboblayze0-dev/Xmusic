fetch('music.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('songs');

    data.forEach(song => {
      container.innerHTML += `
        <div>
          <h3>${song.title}</h3>
          <p>${song.artist}</p>

          <audio controls src="${song.audio}"></audio>

          <br>
          <a href="${song.download}" download>Download</a>
        </div>
      `;
    });
  })
  .catch(err => console.log(err));
