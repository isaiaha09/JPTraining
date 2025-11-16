// About Me Slideshow
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".about-slideshow .slide");
  let index = 0;

  function nextSlide() {
    slides[index].classList.remove("show");
    index = (index + 1) % slides.length;
    slides[index].classList.add("show");
  }

  setInterval(nextSlide, 5000); // keep as-is
});