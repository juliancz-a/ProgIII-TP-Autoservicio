let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slider = document.querySelector('.slider');
const indicatorsContainer = document.querySelector('.indicators');
const indicators = [];
let interval;

function goToSlide(index) {
  currentSlide = index;
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  stopSlider();
  updateIndicators();
}

function nextSlide() {
  goToSlide((currentSlide + 1) % totalSlides);
  stopSlider();
}

function prevSlide() {
  goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
  stopSlider();
}

function updateIndicators() {
  indicators.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

// Botones
document.querySelector('.next-slide').addEventListener('click', nextSlide);
document.querySelector('.prev-slide').addEventListener('click', prevSlide);

// Crear indicadores
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('div');
  dot.classList.add('indicator');
  dot.addEventListener('click', () => goToSlide(i));
  indicatorsContainer.appendChild(dot);
  indicators.push(dot);
}

function startSlider() {
  interval = setInterval(nextSlide, 4000);
}

function stopSlider() {
  clearInterval(interval);
}

// Inicializar
goToSlide(0);
startSlider();