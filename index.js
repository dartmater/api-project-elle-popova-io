const artworksBtn = document.getElementById("artworks-btn");
const exhibitionsBtn = document.getElementById("exhibitions-btn");
const searchBar = document.getElementById("search-bar");
const contentDiv = document.getElementById("content");

// function for fetching artworks
async function fetchArtworks() {
  try {
    const response = await fetch(
      "https://api.artic.edu/api/v1/artworks?limit=20"
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("You obtained an error:", error);
  }
}

// function for fetching exhibitions
async function fetchExhibitions() {
  try {
    const response = await fetch(
      "https://api.artic.edu/api/v1/exhibitions?limit=20"
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("You obtained an error:", error);
  }
}

/* function for displaying artworks
function displayArtworks(artworks) {
  contentDiv.innerHTML = "";
  artworks.forEach((artwork) => {
    const artworkElement = document.createElement("div");
    artworkElement.innerHTML = `
      <h2>${artwork.title}</h2>
      <p>Artist: ${artwork.artist_title}</p>
      <p>Date: ${artwork.date_display}</p>
      <img src="https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg" alt="${artwork.title}" width="300">
    `;
    contentDiv.appendChild(artworkElement);
  });
}

//  function for displaying exhibitions
function displayExhibitions(exhibitions) {
  contentDiv.innerHTML = "";
  exhibitions.forEach((exhibition) => {
    const exhibitionElement = document.createElement("div");
    exhibitionElement.innerHTML = `
      <h2>${exhibition.title}</h2>
      <p>Date and Time: ${exhibition.aic_start_at}</p>
      <img src="https://www.artic.edu/iiif/2/${exhibition.image_id}/full/843,/0/default.jpg" alt="${exhibition.title}" width="300">
    `;
    contentDiv.appendChild(exhibitionElement);
  });
}*/

//  function for displaying artworks
function displayArtworks(artworks) {
  const wrapper = document.getElementById("wrapper");
  wrapper.innerHTML = "";
  artworks.forEach((artwork) => {
    const artworkElement = document.createElement("div");
    artworkElement.classList.add("artwork");
    artworkElement.innerHTML = `
      <h2>${artwork.title}</h2>
      <p>Artist: ${artwork.artist_title}</p>
      <p>Date: ${artwork.date_display}</p>
      <img src="https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg" alt="${artwork.title}" width="300">
    `;
    wrapper.appendChild(artworkElement);
  });
}

//  function for displaying exhibitions
function displayExhibitions(exhibitions) {
  const wrapper = document.getElementById("wrapper");
  wrapper.innerHTML = "";
  exhibitions.forEach((exhibition) => {
    const exhibitionElement = document.createElement("div");
    exhibitionElement.classList.add("exhibition");
    exhibitionElement.innerHTML = `
      <h2>${exhibition.title}</h2>
      <p>Date and Time: ${exhibition.aic_start_at}</p>
      <img src="https://www.artic.edu/iiif/2/${exhibition.image_id}/full/843,/0/default.jpg" alt="${exhibition.title}" width="300">
    `;
    wrapper.appendChild(exhibitionElement);
  });
}


//  filterItems function for the search bar
function filterItems(items, query) {
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.date_display &&
        item.date_display.toLowerCase().includes(query.toLowerCase()))
  );
}

// Handlesearch
async function handleSearch() {
  const query = searchBar.value.trim();
  let items = [];
  if (artworksBtn.classList.contains("active")) {
    items = await fetchArtworks();
    const filteredItems = filterItems(items, query);
    displayArtworks(filteredItems);
  } else if (exhibitionsBtn.classList.contains("active")) {
    items = await fetchExhibitions();
    const filteredItems = filterItems(items, query);
    displayExhibitions(filteredItems);
  }
}

// event listeners
artworksBtn.addEventListener("click", async () => {
  artworksBtn.classList.add("active");
  exhibitionsBtn.classList.remove("active");
  const artworks = await fetchArtworks();
  displayArtworks(artworks);
});

exhibitionsBtn.addEventListener("click", async () => {
  exhibitionsBtn.classList.add("active");
  artworksBtn.classList.remove("active");
  const exhibitions = await fetchExhibitions();
  displayExhibitions(exhibitions);
});

// searchBar event listener
searchBar.addEventListener("input", handleSearch);

artworksBtn.click();
