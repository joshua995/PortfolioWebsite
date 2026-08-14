
//Slide show
let itchSlideIndex = 0;
showItchSlides();

function showItchSlides() {
  let i;
  let itchSlides = document.getElementsByClassName("itchSlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < itchSlides.length; i++) {
    itchSlides[i].style.display = "none";
  }
  itchSlideIndex++;
  if (itchSlideIndex > itchSlides.length) { itchSlideIndex = 1 }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  itchSlides[itchSlideIndex - 1].style.display = "block";
  dots[itchSlideIndex - 1].className += " active";
  setTimeout(showItchSlides, 2000); // Change image every second
}

let gitSlideIndex = 0;
let videoTimes = {}; // store playback positions

let isTransitioning = false;
showGitSlides();

function showGitSlides(indexChange = 1) {
  if (isTransitioning) return;
  isTransitioning = true;

  setTimeout(() => {
    isTransitioning = false;
  }, 100);

  let i;
  let gitSlides = document.getElementsByClassName("gitSlides");

  // Hide all slides and add click to next
  for (i = 0; i < gitSlides.length; i++) {
    gitSlides[i].style.display = "none";
    gitSlides[i].addEventListener("click", function () {
      if (video) {
        video.onended = null;
        video = null;
      }
      showGitSlides(1);
    });
  }

  // Move index
  gitSlideIndex += indexChange;
  if (gitSlideIndex >= gitSlides.length) gitSlideIndex = 0;
  if (gitSlideIndex < 0) gitSlideIndex = gitSlides.length - 1;

  let nextSlide = gitSlides[gitSlideIndex];
  nextSlide.style.display = "block";

  let video = nextSlide.querySelector("video");

  if (video) {
    video.currentTime = 0;
    video.play();

    video.onended = function () {
      showGitSlides(1);
    };
  } else {
    setTimeout(showGitSlides, 2000); // Change image every second
  }
}



document.querySelectorAll("iframe").forEach(video => {
  video.preload = "auto";
  video.load();
});
