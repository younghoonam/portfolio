import"./modulepreload-polyfill-B5Qt9EMX.js";import"./header-Cq8kSbgc.js";fetch("/assets.json").then(s=>s.json()).then(s=>{console.log(s);const r=s.artworks.assets,e=document.querySelector(".artworks");r.forEach(t=>{const n=`/artworks/${t}`;let o;(t.endsWith(".jpg")||t.endsWith(".png"))&&(o=`<img class="artworks-image" src="${n}" alt="${t}" />`),e.innerHTML+=o})}).catch(s=>console.error("Error loading assets:",s));
