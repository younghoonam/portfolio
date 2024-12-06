
const coverImage = document.querySelector(".cover-image");
// console.log(coverImage);

coverImage.onload = function(){
    // console.log("cover image loaded");
    document.querySelector(".cover").classList.add("cover-animation");
    document.querySelectorAll(".cover-title").forEach( (element) => {
        element.classList.add("cover-title-animation");
    })
}

//Album Cover Sliding Animation
const albums = document.querySelectorAll(".album-article");
const albumCovers = document.querySelectorAll(".album-cover");

window.addEventListener("scroll", updateAlbumOpener);

function updateAlbumOpener(){
    let albumScrollProgress = [];
    albums.forEach( (element) => {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        let scrollProgress = (window.scrollY + window.innerHeight - offsetTop) / offsetHeight;
        if (scrollProgress < 0){ scrollProgress = 0; }
        else if ( scrollProgress > 1){ scrollProgress = 1;}
        albumScrollProgress.push(scrollProgress);
    })

    console.log(albumScrollProgress);
    
    for(let i = 0; i < albumCovers.length; i+=2){
        const slide = 40 * albumScrollProgress[Math.floor(i/2)];
        const rotate = 5 * albumScrollProgress[Math.floor(i/2)];
        console.log(slide)
        albumCovers[i].style.transform = `translateX(${slide}rem) rotate(${rotate}deg)`;
        albumCovers[i + 1].style.transform = `translateX(${-1 * slide}rem) rotate(${-1* rotate}deg)`;
    }
}

const lenis = new Lenis()

lenis.on('scroll', (e) => {
  console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)