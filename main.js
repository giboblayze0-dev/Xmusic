const sectionNames = {
  1: "New Music",
  2: "Trending Music",
  3: "Album",
  4: "Videos"
};

Object.keys(grouped).forEach(sec => {
  let div = document.createElement("div");
  div.className = "section";

  // Add section name as heading
  let heading = document.createElement("h2");
  heading.textContent = sectionNames[sec];
  heading.style.marginBottom = "10px"; // optional styling
  div.appendChild(heading);

  let visible = 5;

  grouped[sec].forEach((song, index) => {
    let songDiv = document.createElement("div");
    songDiv.className = "song";
    songDiv.textContent = song.title + " - " + song.artist;
    if(index >= visible) songDiv.style.display = "none";
    div.appendChild(songDiv);
  });

  let btn = document.createElement("button");
  btn.className = "load-more";
  btn.textContent = "Load More";

  btn.addEventListener("click", () => {
    visible += 5;
    div.querySelectorAll(".song").forEach((s, i) => {
      if(i < visible) s.style.display = "block";
    });
    if(visible >= grouped[sec].length) btn.style.display = "none";
  });

  div.appendChild(btn);
  sectionsContainer.appendChild(div);
});
