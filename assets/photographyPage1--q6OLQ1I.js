import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css              */let b=new Splide(".splide",{type:"loop",drag:"free",snap:!0,perPage:3,focus:"center",padding:"5rem",arrows:!1,pagination:!1,breakpoints:{1e3:{perPage:2},640:{perPage:1}}});document.addEventListener("DOMContentLoaded",function(){b.mount()});const o=document.querySelector(".photo-main").children,u=document.querySelector(".photo-main"),e=document.querySelectorAll(".thumbnail-wrapper");console.log(o);const i=[{photoSpeed:.25,maxTranslation:80,minTranslation:-80,xTranslation:6},{photoSpeed:.1,maxTranslation:90,minTranslation:-170,xTranslation:-4},{photoSpeed:.15,maxTranslation:50,minTranslation:-60,xTranslation:4},{photoSpeed:.2,maxTranslation:60,minTranslation:-60,xTranslation:-2},{photoSpeed:.25,maxTranslation:70,minTranslation:-60,xTranslation:0},{photoSpeed:-.15,maxTranslation:60,minTranslation:-120,xTranslation:-4},{photoSpeed:.1,maxTranslation:90,minTranslation:-170,xTranslation:2},{photoSpeed:.2,maxTranslation:60,minTranslation:-60,xTranslation:-2}];function d(){for(let t=0;t<o.length;t++){const r=parseInt(getComputedStyle(u).paddingInline,10),c=u.offsetWidth,p=o[t].offsetWidth,m=(c-p)/2-r;let n=O(i[t].xTranslation);n<-1*m?n=-1*m:n>m&&(n=m);let a=0;if(c-r*2>p){const S=window.scrollY,w=o[t].offsetTop;a=(S-w)*i[t].photoSpeed,a<i[t].minTranslation?a=i[t].minTranslation:a>i[t].maxTranslation&&(a=i[t].maxTranslation),e[t].style.marginBottom="-0.5rem"}else e[t].style.marginBottom="";const x=n*.1;o[t].style.transform=`translate3d(${n}px, ${a}px, 0)`,e[t].style.transform=`translate3d(${x}px, 0, 0)`;const f=o[t].offsetTop,y=o[t].offsetHeight,h=window.innerHeight/2+window.scrollY;h>f&&h<f+y?l[t]=!0:l[t]=!1,l[t]==!0&&s[t]==!1?(e[t].style.scale="1.3",e[t].children[1].style.opacity="0",s[t]=!0,console.log("changing "+t+" thumb")):l[t]==!1&&s[t]==!0&&(e[t].style.scale="",e[t].children[1].style.opacity="",s[t]=!1,console.log("reverting "+t+" thumb"))}}let s=[],l=[];e.forEach(t=>{l.push(!1),s.push(!1)});const q=document.querySelector(".album-main-image").offsetHeight+document.querySelector(".album-main-image").offsetTop,T=document.querySelector(".album-title");function P(){scrollY>q-500?T.style.opacity="0":T.style.opacity=""}function W(){d(),P()}function v(){d(),E()}function E(){const t=document.querySelectorAll(".splide__slide"),r=t[0].offsetWidth;t.forEach(c=>{const p=r*1.2;c.style.height=`${p}px`})}function O(t){return t*parseFloat(getComputedStyle(document.documentElement).fontSize)}d();window.addEventListener("resize",v);window.addEventListener("scroll",W);const A=new Lenis;function g(t){A.raf(t),requestAnimationFrame(g)}requestAnimationFrame(g);