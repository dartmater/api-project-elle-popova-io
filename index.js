async function fetchData() {
  try {
    const response = await fetch(" https://api.artic.edu/api/v1/publications");
    const data = await response.json();
    displayData(data);
  } catch (error) {
    console.error("You obtained an error:", error);
  }
}

function displayData(data) {
  const artworksDiv = document.getElementById("artworks");
  data.data.forEach((artwork) => {
    const artworkElement = document.createElement("div");
    artworkElement.innerHTML = `
            <h2>${artwork.title}</h2>
            <p>Artist: ${artwork.artist_title}</p>
            <p>Date: ${artwork.date_display}</p>
            <img src="https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg" alt="${artwork.title}" width="300">
        `;
    artworksDiv.appendChild(artworkElement);
  });
}

fetchData();
