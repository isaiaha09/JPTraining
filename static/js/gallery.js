document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const nextBtn = document.querySelector('.carousel-next');
  const prevBtn = document.querySelector('.carousel-prev');

  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      const video = slide.querySelector('video');

      if (i === index) {
        slide.classList.add('active');
        slide.style.zIndex = 10;
      } else {
        slide.classList.remove('active');
        slide.style.zIndex = 1;

        // Pause inactive videos
        if (!video.paused) video.pause();
      }
    });

    // Update dots
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }

  // Arrow navigation
  nextBtn?.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  prevBtn?.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  // Dot navigation
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      currentSlide = parseInt(dot.dataset.index);
      showSlide(currentSlide);
    });
  });

  // Initialize first slide
  showSlide(currentSlide);
});
