// For all sections
document.querySelectorAll('.music-section').forEach(section => {
  const container = section.querySelector('.music-container');
  const loadMoreBtn = section.querySelector('.load-more');

  let itemsToShow = 5; // initial number
  const allItems = Array.from(container.children);

  // hide extra items initially
  allItems.forEach((item, i) => {
    if (i >= itemsToShow) item.style.display = 'none';
  });

  loadMoreBtn.addEventListener('click', () => {
    const hiddenItems = allItems.filter(item => item.style.display === 'none');
    hiddenItems.slice(0, 5).forEach(item => item.style.display = 'block');

    // hide button if no more items
    if (allItems.every(item => item.style.display === 'block')) {
      loadMoreBtn.style.display = 'none';
    }
  });
});
