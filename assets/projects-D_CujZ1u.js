const l=location.pathname,c=l.split("/").pop().split(".")[0];fetch("/assets.json").then(t=>t.json()).then(t=>{console.log(t);let n=t.projects[c].assets;n=n.sort((s,o)=>{const e=parseInt(s.match(/\d+/)||0,10),a=parseInt(o.match(/\d+/)||0,10);return e-a});const r=document.querySelector(".gallery");n.forEach(s=>{const o=`/projects/${c}/${s}`;let e;s.endsWith(".jpg")||s.endsWith(".png")?e=`<img class="image" src="${o}" alt="${s}" />`:(s.endsWith(".mp4")||s.endsWith(".mov"))&&(e=`<video controls class="video"><source src="${o}" /></video>`),r.innerHTML+=e})}).catch(t=>console.error("Error loading assets:",t));
