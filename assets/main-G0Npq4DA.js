import"./modulepreload-polyfill-B5Qt9EMX.js";import"./header-B_kd-Hyw.js";window.addEventListener("DOMContentLoaded",()=>{fetch("/assets.json").then(e=>e.json()).then(e=>{const r=document.querySelector(".projects");console.log(e),Object.keys(e.projects).forEach(t=>{const s=e.projects[t],d=`/projects/${t}/${s.firstImage}`,c=document.createElement("div");c.classList.add("project");const o=document.createElement("img");o.classList.add("cover-image"),o.src=d,o.alt=`${t} cover image`;const n=document.createElement("a");n.href=`/src/projects/${t}/${t}.html`,n.appendChild(o),c.appendChild(n),r.appendChild(c)})}).catch(e=>console.error("Error loading assets:",e))});
