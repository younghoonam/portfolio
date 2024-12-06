const o=`<header>
  <div class="logo">
    <a href="/">Younghoo Nam</a>
  </div>
  <img class="burger hide" id="burger" src="/burger.svg"">
  <div class="links">
    <a href="/">Projects</a>
    <a href="/src/artworks/artworks.html">Artwork</a>
    <a href="/src/web-projects/web-projects.html">Web</a>
    <a href="/src/contact/contact.html">Contact</a>
  </div>
</header>
`,a=`    <div class="burger-menu hide">
      <a href="/">Projects</a>
      <a href="/src/artworks/artworks.html">Artwork</a>
      <a href="/src/web-projects/web-projects.html">Web</a>
      <a href="/src/contact/contact.html">Contact</a>
    </div>`,r=document.querySelector(".wrapper");r.insertAdjacentHTML("afterbegin",o);r.insertAdjacentHTML("afterbegin",a);const i=document.querySelector("header"),t=document.querySelector(".links"),d=document.querySelector(".burger-menu"),e=document.querySelector(".burger");function u(){t.classList.add("hide")}function h(){t.classList.remove("hide")}function l(){e.classList.add("hide")}function f(){e.classList.remove("hide")}function s(){w()?(u(),f()):(h(),l())}function w(){const c=window.innerWidth,n=i.offsetWidth;return!(c>n)}e.onclick=function(){d.classList.toggle("hide")};window.addEventListener("resize",s);s();
