const path = location.pathname;
const projectName = path.split("/").pop().split(".")[0];

fetch("/src/assets.json")
  .then((response) => response.json())
  .then((assetsData) => {
    console.log(assetsData);
    let assets = assetsData.projects[projectName].assets;

    // Sort the assets array numerically
    assets = assets.sort((a, b) => {
      const aNum = parseInt(a.match(/\d+/) || 0, 10); // Extract number from filename
      const bNum = parseInt(b.match(/\d+/) || 0, 10);
      return aNum - bNum;
    });

    const gallery = document.querySelector(".gallery");

    assets.forEach((file) => {
      const filePath = `/projects/${projectName}/${file}`;
      let mediaElement;

      if (file.endsWith(".jpg") || file.endsWith(".png")) {
        mediaElement = `<img class="image" src="${filePath}" alt="${file}" />`;
      } else if (file.endsWith(".mp4") || file.endsWith(".mov")) {
        mediaElement = `<video controls class="video"><source src="${filePath}" /></video>`;
      }

      gallery.innerHTML += mediaElement;
    });
  })
  .catch((err) => console.error("Error loading assets:", err));