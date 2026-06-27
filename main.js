const searchBox = document.getElementById("searchBox");

searchBox.addEventListener("keyup", function () {
    const filter = this.value.toLowerCase();
    const links = document.querySelectorAll(".section a");

    links.forEach(link => {
        link.style.display = link.textContent.toLowerCase().includes(filter)
            ? "block"
            : "none";
    });
});

function loadMore(sectionId, button){
    const hidden = document.querySelectorAll("#"+sectionId+" .hidden");

    hidden.forEach(item=>{
        item.classList.remove("hidden");
    });

    button.style.display="none";
}
