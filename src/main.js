window.addEventListener("DOMContentLoaded", () => {
  const path = location.pathname;

  // If on the main page (index.html)

  fetch("/src/assets.json")
    .then((response) => response.json())
    .then((assets) => {
      const projectList = document.querySelector(".projects");
      console.log(assets)

      Object.keys(assets.projects).forEach((projectName) => {
        const project = assets.projects[projectName];
        const firstImagePath = `/projects/${projectName}/${project.firstImage}`;

        // Create the project section with the first image
        const projectSection = document.createElement("div");
        projectSection.classList.add("project");

        const imageElement = document.createElement("img");
        imageElement.classList.add("cover-image");
        imageElement.src = firstImagePath;
        imageElement.alt = `${projectName} cover image`;

        const projectLink = document.createElement("a");
        projectLink.href = `/src/projects/${projectName}/${projectName}.html`;

        projectLink.appendChild(imageElement);
        projectSection.appendChild(projectLink);
        projectList.appendChild(projectSection);
      });
    })
    .catch((err) => console.error("Error loading assets:", err));
});
