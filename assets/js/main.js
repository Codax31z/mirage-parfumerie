const body = document.body;
const heroTitle = document.querySelector('.hero__title');
const heroSubtitle = document.querySelector('.hero__subtitle');
const heroCta = document.querySelector('.hero__cta');
const slides = Array.from(document.querySelectorAll('.hero__slide'));
const controls = Array.from(document.querySelectorAll('.hero__control'));

let currentIndex = 0;
let autoSlideInterval = null;

const activateSlide = (index) => {
  if (!slides[index]) return;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  controls.forEach((control, i) => {
    control.classList.toggle('active', i === index);
  });

  const activeSlide = slides[index];
  const title = activeSlide.dataset.title;
  const button = activeSlide.dataset.button;
  const link = activeSlide.dataset.link;

  heroSubtitle.textContent = title;
  heroCta.textContent = button;
  heroCta.setAttribute('href', link || '#');

  currentIndex = index;
};

const nextSlide = () => {
  const nextIndex = (currentIndex + 1) % slides.length;
  activateSlide(nextIndex);
};

const startAutoSlide = () => {
  stopAutoSlide();
  autoSlideInterval = setInterval(nextSlide, 6000);
};

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
};

controls.forEach((control, index) => {
  control.addEventListener('click', () => {
    activateSlide(index);
    startAutoSlide();
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
        body.classList.add('scrolled');
      } else {
        body.classList.remove('scrolled');
      }
    });
  },
  {
    threshold: 0.3,
  }
);

if (heroTitle) {
  observer.observe(heroTitle);
}

activateSlide(0);
startAutoSlide();

window.addEventListener('blur', stopAutoSlide);
window.addEventListener('focus', startAutoSlide);
