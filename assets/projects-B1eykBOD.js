const l=location.pathname,c=l.split("/").pop().split(".")[0],i="/portfolio/assets.json";fetch(i).then(t=>t.json()).then(t=>{console.log(t);let n=t.projects[c].assets;n=n.sort((s,e)=>{const o=parseInt(s.match(/\d+/)||0,10),a=parseInt(e.match(/\d+/)||0,10);return o-a});const r=document.querySelector(".gallery");n.forEach(s=>{const e=`/portfolio/projects/${c}/${s}`;let o;s.endsWith(".jpg")||s.endsWith(".png")?o=`<img class="image" src="${e}" alt="${s}" />`:(s.endsWith(".mp4")||s.endsWith(".mov"))&&(o=`<video controls class="video"><source src="${e}" /></video>`),r.innerHTML+=o})}).catch(t=>console.error("Error loading assets:",t));
