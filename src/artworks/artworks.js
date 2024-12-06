const path = location.pathname;

fetch("/src/assets.json")
  .then((response) => response.json())
  .then((assetsData) => {
    console.log(assetsData);
    const assets = assetsData.artworks.assets;
    const gallery = document.querySelector(".artworks");

    assets.forEach((file) => {
      const filePath = `/artworks/${file}`;
      let mediaElement;

      if (file.endsWith(".jpg") || file.endsWith(".png")) {
        mediaElement = `<img class="artworks-image" src="${filePath}" alt="${file}" />`;
      }

      gallery.innerHTML += mediaElement;
    });
  })
  .catch((err) => console.error("Error loading assets:", err));
