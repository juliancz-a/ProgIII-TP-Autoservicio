let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slider = document.querySelector('.slider');

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

setInterval(nextSlide, 4000); // cada 4 segundos