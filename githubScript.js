
//Slide show
let fractalTreeSlideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("fractalTreeSlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  fractalTreeSlideIndex++;
  if (fractalTreeSlideIndex > slides.length) { fractalTreeSlideIndex = 1 }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[fractalTreeSlideIndex - 1].style.display = "block";
  dots[fractalTreeSlideIndex - 1].className += " active";
  setTimeout(showSlides, 2000); // Change image every second
}