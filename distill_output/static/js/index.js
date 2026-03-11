document.addEventListener("DOMContentLoaded", () => {

  // --------------------------
  // HERO PARTICLES
  // --------------------------
  const canvas = document.getElementById("hero-particles");
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const particles = [];
  const particleCount = 100;

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 10;
      this.size = Math.random() * 3 + 1;
      this.speed = Math.random() * 1.5 + 0.5;
      this.angle = -Math.PI / 2;
    }
    update() {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      if (this.x > canvas.width + 50 || this.y < -50) this.reset();
    }
    draw() {
      ctx.fillStyle = "#d2b48c";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    let shadowOpacity = 0;          // current opacity
    let shadowTarget = 1;           // final opacity
    let shadowDelayCounter = 0;
    const shadowDelayThreshold = 400; // frames to wait before starting fade
    const shadowFadeSpeed = 0.03;    // how quickly it moves toward target (smaller = slower)

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => { p.update(); p.draw(); });

      // Gradually fade in header shadow after delay
      if (shadowDelayCounter < shadowDelayThreshold) {
          shadowDelayCounter++;
      } else {
          // Smooth easing towards target opacity
          shadowOpacity += (shadowTarget - shadowOpacity) * shadowFadeSpeed;
      }

      const header = document.querySelector("body.index-page header");
      if (header) {
          header.style.boxShadow = `0 7px 5px rgba(210, 180, 140, ${shadowOpacity})`;
      }

      requestAnimationFrame(animateParticles);
  }

  animateParticles();

  window.addEventListener("resize", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  });

  // --------------------------
  // HERO LOGO + SCROLL LOGIC
  // --------------------------
  const hero = document.getElementById("hero");
  const heroLogo = document.querySelector("#hero-logo img");
  const navbarLogo = document.querySelector(".jplogoclass img");
  const heroLogoLink = document.getElementById("hero-logo"); 
  const mainContent = document.getElementById("main-content");
  const heroHeight = hero.offsetHeight;

  let lastScrollY = window.scrollY;
  const fadeDownDistance = 20;

  // Fade in hero logo container on page load
  const heroContainer = document.getElementById("hero-logo-container");
  heroLogo.style.opacity = 0;
  heroLogo.style.transform = `translateY(-10px)`;
  heroLogo.style.transition = "opacity 1.5s ease-out, transform 1.5s ease-out";

  setTimeout(() => {
    heroContainer.classList.add("visible");
    heroLogo.style.opacity = 1;
    heroLogo.style.transform = `translateY(0)`;
  }, 50);

  window.addEventListener("scroll", () => {
    
    const scrollY = window.scrollY;
    let progress = scrollY / heroHeight * 1.5;
    if (progress > 1) progress = 1;

    const scrollingDown = scrollY > lastScrollY;

    if (scrollingDown) {
      // fade out when scrolling down
      heroLogo.style.opacity = `${1 - progress}`;
      heroLogo.style.transform = `translateY(${-50 * progress}px)`;
    } else {
      // fade in when scrolling up
      const reverseProgress = Math.min(progress, 1);
      heroLogo.style.opacity = `${1 - reverseProgress + fadeDownDistance / 50}`;
      heroLogo.style.transform = `translateY(${-50 * reverseProgress + fadeDownDistance}px)`;
    }

    // Navbar logo fade in
    const fadeStart = 0.3;
    let navbarProgress = 0;
    if (progress > fadeStart) {
      navbarProgress = (progress - fadeStart) / (1 - fadeStart);
      if (navbarProgress > 1) navbarProgress = 1;
    }
    navbarLogo.style.opacity = `${navbarProgress}`;
    navbarLogo.style.transform = `translateY(${(1 - navbarProgress) * 20}px)`;

    // Address bar color
    const themeMeta = document.getElementById("theme-color-meta");
    themeMeta.setAttribute("content", scrollY > heroHeight ? "#d2b48c" : "#1b1e55");

    lastScrollY = scrollY;
  });

  // Smooth scroll on hero logo click
  heroLogoLink.addEventListener("click", (e) => {
    e.preventDefault();
    const targetPosition = hero.offsetTop + hero.offsetHeight;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1500;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  });

  // Smooth scroll to top when clicking navbar logo + fade hero down
  navbarLogo.addEventListener("click", (e) => {
    e.preventDefault();
    const startPosition = window.scrollY;
    const distance = -startPosition;
    const duration = 1500; // slower than before
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      let t = timeElapsed / duration;
      if (t > 1) t = 1;

      const easeProgress = t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t;

      // scroll page
      window.scrollTo(0, startPosition + distance * easeProgress);

      // fade down hero logo smoothly while scrolling up
      heroLogo.style.opacity = 0.3 + 0.7 * easeProgress; // fades in
      heroLogo.style.transform = `translateY(${-50 * (1 - easeProgress) + fadeDownDistance * easeProgress}px)`;

      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
  });
  const startButton = document.querySelector(".start-button");

  const startObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // delay start
              setTimeout(() => {
                  startButton.classList.add("show");
              }, 800); // delay in milliseconds
              startObserver.unobserve(entry.target);
          }
      });
  }, { threshold: 0.5 });

  startObserver.observe(startButton);

});
