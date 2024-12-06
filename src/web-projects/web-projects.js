window.addEventListener("DOMContentLoaded", () => {
  const path = location.pathname;

  // If on the main page (index.html)

  fetch("/src/assets.json")
    .then((response) => response.json())
    .then((assets) => {
      const projectList = document.querySelector(".web-projects");
      console.log(assets)

      Object.keys(assets.webProjects).forEach((projectName) => {
        const project = assets.webProjects[projectName];
        const firstImagePath = `/web-projects/${projectName}/${project.firstImage}`;

        // Create the project section with the first image
        const projectSection = document.createElement("div");
        projectSection.classList.add("project");

        const imageElement = document.createElement("img");
        imageElement.classList.add("cover-image");
        imageElement.src = firstImagePath;
        imageElement.alt = `${projectName} cover image`;

        const projectLink = document.createElement("a");
        projectLink.href = `/src/web-projects/${projectName}/${projectName}.html`;

        projectLink.appendChild(imageElement);
        projectSection.appendChild(projectLink);
        projectList.appendChild(projectSection);
      });
    })
    .catch((err) => console.error("Error loading assets:", err));
});
