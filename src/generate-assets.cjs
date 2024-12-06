const fs = require("fs");
const path = require("path");

// Directories where your projects and artworks are stored
const projectsDir = "public/projects";
const artworksDir = "public/artworks";
const webProjectsDir = "public/web-projects";

// Function to gather assets from a directory with subfolders
function gatherAssetsFromSubfolders(directory) {
  const assets = {};

  fs.readdirSync(directory).forEach((folderName) => {
    const folderPath = path.join(directory, folderName);

    if (fs.statSync(folderPath).isDirectory()) {
      const folderAssets = [];
      let firstImage = null;

      fs.readdirSync(folderPath).forEach((file) => {
        const ext = path.extname(file).toLowerCase();
        if ([".jpg", ".jpeg", ".png", ".gif", ".mp4", ".mov"].includes(ext)) {
          folderAssets.push(file);
          if (!firstImage && [".jpg", ".jpeg", ".png", ".gif"].includes(ext)) {
            firstImage = file;
          }
        }
      });

      if (folderAssets.length > 0) {
        assets[folderName] = {
          firstImage,
          assets: folderAssets,
        };
      }
    }
  });

  return assets;
}

// Function to gather assets directly from a directory
function gatherAssetsFromDirectory(directory) {
  const assets = [];
  let firstImage = null;

  fs.readdirSync(directory).forEach((file) => {
    const ext = path.extname(file).toLowerCase();
    if ([".jpg", ".jpeg", ".png", ".gif", ".mp4", ".mov"].includes(ext)) {
      assets.push(file);
      if (!firstImage && [".jpg", ".jpeg", ".png", ".gif"].includes(ext)) {
        firstImage = file;
      }
    }
  });

  return assets.length > 0
    ? {
        firstImage,
        assets,
      }
    : null;
}

// This function will generate the assets.json file
function generateAssetsJson() {
  const projectAssets = gatherAssetsFromSubfolders(projectsDir);
  const artworkAssets = gatherAssetsFromDirectory(artworksDir);
  const webProjectAssets = gatherAssetsFromSubfolders(webProjectsDir);

  // Combine both assets into a single object
  const combinedAssets = {
    projects: projectAssets,
    artworks: artworkAssets,
    webProjects: webProjectAssets,
  };

  // Write the combined assets to the assets.json file
  fs.writeFileSync(
    path.join(__dirname, "assets.json"),
    JSON.stringify(combinedAssets, null, 2),
    "utf-8"
  );
}

// Call the function to generate the JSON
generateAssetsJson();
