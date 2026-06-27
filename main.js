function loadMore(sectionId, button) {
    const hiddenItems = document.querySelectorAll("#" + sectionId + " .hidden");

    hiddenItems.forEach(function(item) {
        item.style.display = "block";
        item.classList.remove("hidden");
    });

    button.style.display = "none";
}
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

