function loadMore(sectionId, button){
    const hidden = document.querySelectorAll("#"+sectionId+" .hidden");

    hidden.forEach(item=>{
        item.classList.remove("hidden");
    });

    button.style.display="none";
}
