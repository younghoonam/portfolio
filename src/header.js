document.addEventListener("DOMContentLoaded", () => {
  fetch("/src/header.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load header");
      }
      return response.text();
    })
    .then((html) => {
      const wrapper = document.querySelector(".wrapper");
      wrapper.insertAdjacentHTML("afterbegin", html); // Insert the header at the top of the body
    })
    .catch((error) => console.error(error));
});
