// import Splide from '@splidejs/splide';

let splide = new Splide( '.splide', {
    type   : 'loop',
    drag   : 'free',
    snap   : true,
    perPage: 3,
    focus  : 'center',
    padding: '5rem',
    arrows: false,
    pagination: false,
    breakpoints: {
		1000: {
			perPage: 2,
		},
        640: {
			perPage: 1,
		}
  }
  } );

document.addEventListener( 'DOMContentLoaded', function() {
      splide.mount();
} );

const photos = document.querySelector(".photo-main").children;
const photoWrapper = document.querySelector(".photo-main");
const photoThumbnails = document.querySelectorAll(".thumbnail-wrapper");
console.log(photos);

const parallaxPhotos = [
	{
		photoSpeed: 0.25,
		maxTranslation: 80,
		minTranslation: -80,
		xTranslation: 6
	},
	{
		photoSpeed: 0.1,
		maxTranslation: 90,
		minTranslation: -170,
		xTranslation: -4
	},
	{
		photoSpeed: 0.15,
		maxTranslation: 50,
		minTranslation: -60,
		xTranslation: 4
	},
	{
		photoSpeed: 0.2,
		maxTranslation: 60,
		minTranslation: -60,
		xTranslation: -2
	},
	{
		photoSpeed: 0.25,
		maxTranslation: 70,
		minTranslation: -60,
		xTranslation: 0
	},
	{
		photoSpeed: -0.15,
		maxTranslation: 60,
		minTranslation: -120,
		xTranslation: -4
	},
    {
		photoSpeed: 0.1,
		maxTranslation: 90,
		minTranslation: -170,
		xTranslation: 2
	},
    {
		photoSpeed: 0.2,
		maxTranslation: 60,
		minTranslation: -60,
		xTranslation: -2
	}
]

function updatePhotoTransform(){
    for(let i = 0; i < photos.length; i++){

        //X Translation
        const wrapperPadding = parseInt(getComputedStyle(photoWrapper).paddingInline, 10); //px
        const wrapperWidth = photoWrapper.offsetWidth;
        const photoWidth = photos[i].offsetWidth;
    
        const maxOffset = (wrapperWidth - photoWidth) / 2 - wrapperPadding;
        let xOffsetTranslation = remToPixels(parallaxPhotos[i].xTranslation);
    
        if(xOffsetTranslation < -1 * maxOffset){ xOffsetTranslation = -1 * maxOffset; }
        else if(xOffsetTranslation > maxOffset){ xOffsetTranslation = maxOffset; }

        //Parallax Y Translation
        let parallaxTranslation = 0
        if(wrapperWidth - (wrapperPadding * 2) > photoWidth){
            const scrollPosition = window.scrollY;
            const photoOffset = photos[i].offsetTop;
        
            parallaxTranslation = (scrollPosition - photoOffset) * parallaxPhotos[i].photoSpeed;
            if (parallaxTranslation < parallaxPhotos[i].minTranslation) { parallaxTranslation = parallaxPhotos[i].minTranslation; }
            else if (parallaxTranslation > parallaxPhotos[i].maxTranslation) { parallaxTranslation = parallaxPhotos[i].maxTranslation; }

            photoThumbnails[i].style.marginBottom = "-0.5rem";
        } else {
            photoThumbnails[i].style.marginBottom = ""
        }

        //Thumbnail Translation
        const thumbnailXOffsetTranslation = xOffsetTranslation * 0.1;
        const thumbnailParallaxTranslation = parallaxTranslation * 0.1;

        //Apply Transform: translate
        photos[i].style.transform = `translate3d(${xOffsetTranslation}px, ${parallaxTranslation}px, 0)`;
        photoThumbnails[i].style.transform = `translate3d(${thumbnailXOffsetTranslation}px, 0, 0)`;

        const photoOffset = photos[i].offsetTop;
        const photoHeight = photos[i].offsetHeight;
        const midScreenScrollY = (window.innerHeight / 2) + window.scrollY;
        if(midScreenScrollY > photoOffset && midScreenScrollY < photoOffset + photoHeight){
            thumbnailSwitch[i] = true;
        } else {
            thumbnailSwitch[i] = false;
        }

        if(thumbnailSwitch[i] == true && thumbnailSwitchAfter[i] == false){
            photoThumbnails[i].style.scale = "1.3";
            photoThumbnails[i].children[1].style.opacity = "0";
            thumbnailSwitchAfter[i] = true;
            console.log("changing " + i + " thumb");
        } else if(thumbnailSwitch[i] == false && thumbnailSwitchAfter[i] == true){
            photoThumbnails[i].style.scale = "";
            photoThumbnails[i].children[1].style.opacity = "";
            thumbnailSwitchAfter[i] = false;
            console.log("reverting " + i + " thumb");
        }


    }
}

let thumbnailSwitchAfter = [];
let thumbnailSwitch = [];
photoThumbnails.forEach(element => { 
    thumbnailSwitch.push(false);
    thumbnailSwitchAfter.push(false);
});

const coverImageBottom = 
    document.querySelector(".album-main-image").offsetHeight
    + document.querySelector(".album-main-image").offsetTop;
const coverTitle = document.querySelector(".album-title");

function titlePositionUpdate() {
    if(scrollY > coverImageBottom - 500){
        coverTitle.style.opacity = "0";
    } else {
        coverTitle.style.opacity = "";
    }
}

function scrollUpdate(){
    updatePhotoTransform();
    titlePositionUpdate();
}

function resizeUpdate(){
    updatePhotoTransform();
    cardSizeUpdate();
}



function cardSizeUpdate(){
    const cards = document.querySelectorAll(".splide__slide");
    const cardWidth = cards[0].offsetWidth;
    cards.forEach(element => {
        const cardHeight = cardWidth * 1.2;
        element.style.height = `${cardHeight}px`;
    });
    
}



function remToPixels(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

updatePhotoTransform();
window.addEventListener("resize", resizeUpdate);
window.addEventListener("scroll", scrollUpdate);


const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)