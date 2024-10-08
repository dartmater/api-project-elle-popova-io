const artworksBtn = document.getElementById("artworks-btn");
const exhibitionsBtn = document.getElementById("exhibitions-btn");
const searchBar = document.getElementById("search-bar");
const wrapper = document.getElementById("wrapper");

let currentArtworks = [];
let currentExhibitions = [];

// Fetch artworks with a random parameter
async function fetchArtworks() {
  try {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks?limit=20&random=${Math.random()}`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching artworks:", error);
  }
}

// Fetch exhibitions
async function fetchExhibitions() {
  try {
    const response = await fetch(
      `https://api.artic.edu/api/v1/exhibitions?limit=20&random=${Math.random()}`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching exhibitions:", error);
  }
}

// Display artworks
function displayArtworks(artworks) {
  wrapper.innerHTML = ""; // Clear previous content
  artworks.forEach((artwork) => {
    const artworkElement = document.createElement("div");
    artworkElement.classList.add("artwork");
    artworkElement.innerHTML = `
      <h2>${artwork.title}</h2>
      <p>Artist: ${artwork.artist_display}</p> <!-- Fixed to artist_display -->
      <p>Date: ${artwork.date_display}</p>
      <img src="https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg" alt="${artwork.title}">
    `;
    wrapper.appendChild(artworkElement);
  });
}
// Function to format date and time
function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  return date.toLocaleString(); // Use default locale
}

// Display exhibitions
function displayExhibitions(exhibitions) {
  wrapper.innerHTML = ""; // Clear previous content
  exhibitions.forEach((exhibition) => {
    const exhibitionElement = document.createElement("div");
    exhibitionElement.classList.add("exhibition");
    exhibitionElement.innerHTML = `
      <h2>${exhibition.title}</h2>
      <p>Date and Time: ${formatDateTime(exhibition.aic_start_at)}</p>
      <ul class="artworks-mentioned">
        ${
          exhibition.artwork_titles.length > 0
            ? exhibition.artwork_titles
                .map((title) => `<li>${title}</li>`)
                .join("")
            : "<li>No artworks available</li>"
        }
      </ul>
    `;
    wrapper.appendChild(exhibitionElement);
  });
}

// Filter items based on search query
function filterItems(items, query) {
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.date_display &&
        item.date_display.toLowerCase().includes(query.toLowerCase()))
  );
}

// Handle search functionality
async function handleSearch() {
  const query = searchBar.value.trim();
  if (artworksBtn.classList.contains("active")) {
    const filteredItems = filterItems(currentArtworks, query);
    displayArtworks(filteredItems);
  } else if (exhibitionsBtn.classList.contains("active")) {
    const filteredItems = filterItems(currentExhibitions, query);
    displayExhibitions(filteredItems);
  }
}

// Event listeners
artworksBtn.addEventListener("click", async () => {
  artworksBtn.classList.add("active");
  exhibitionsBtn.classList.remove("active");
  displayArtworks(currentArtworks); // Display already fetched artworks
});

exhibitionsBtn.addEventListener("click", async () => {
  exhibitionsBtn.classList.add("active");
  artworksBtn.classList.remove("active");
  displayExhibitions(currentExhibitions); // Display already fetched exhibitions
});

// Search bar event listener
searchBar.addEventListener("input", handleSearch);

// Reset function for search
function resetSearch() {
  searchBar.value = ""; // Clear the search bar
  handleSearch(); // Refresh the displayed items
}

// // Optional: Add a reset button to clear the search
// const resetBtn = document.createElement("button");
// resetBtn.innerText = "Reset Search";
// resetBtn.addEventListener("click", resetSearch);
// document.body.appendChild(resetBtn); // Add the reset button to the body

// Initialize by fetching both artworks and exhibitions
async function initializeApp() {
  currentArtworks = await fetchArtworks(); // Store fetched artworks
  currentExhibitions = await fetchExhibitions(); // Store fetched exhibitions
  artworksBtn.click(); // Click the artworks button to display artworks by default
}

// Start the application
initializeApp(); // Initialize the app by fetching both artworks and exhibitions
