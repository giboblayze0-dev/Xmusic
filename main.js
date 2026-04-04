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
// main.js

// Search Input
const searchInput = document.getElementById("search");

// Handle all music sections independently
document.querySelectorAll('.music-section').forEach(section => {
  const container = section.querySelector('.music-container');
  const loadMoreBtn = section.querySelector('.load-more');
  const allItems = Array.from(container.querySelectorAll('.music-item'));

  let itemsToShow = 5;

  // Initial hide extra items
  allItems.forEach((item, i) => {
    if (i >= itemsToShow) item.style.display = 'none';
  });

  // Load More Button
  loadMoreBtn.addEventListener('click', () => {
    const hiddenItems = allItems.filter(item => item.style.display === 'none');
    hiddenItems.slice(0, 5).forEach(item => item.style.display = 'block');

    if (allItems.every(item => item.style.display === 'block')) {
      loadMoreBtn.style.display = 'none';
    }
  });

  // Search
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    allItems.forEach(item => {
      const title = item.dataset.title.toLowerCase();
      const artist = item.dataset.artist.toLowerCase();

      if (title.includes(query) || artist.includes(query)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });

    // Optionally hide Load More when searching
    loadMoreBtn.style.display = query === '' ? 'block' : 'none';
  });
});
