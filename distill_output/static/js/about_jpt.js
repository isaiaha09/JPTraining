document.addEventListener("DOMContentLoaded", () => {
  /* -----------------------------
   HERO FADE-IN — ALWAYS FIRES
----------------------------- */
window.addEventListener("load", () => {
  const hero = document.querySelector(".about-hero");
  const heroTitle = document.querySelector(".hero-overlay h1");
  const heroText = document.querySelector(".hero-overlay p");

  // Animate container
  hero.classList.add("show");

  // Animate H1 after container
  setTimeout(() => {
    heroTitle.classList.add("show");
  }, 500);

  // Animate paragraph last
  setTimeout(() => {
    heroText.classList.add("show");
  }, 1000);
});

  /* -----------------------------
     FOCUS ITEMS (YOUR ORIGINAL CODE)
  ----------------------------- */
  const items = document.querySelectorAll(".focus-item");

  const focusObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const header = entry.target.querySelector("h3");
          const paragraph = entry.target.querySelector("p");

          header.style.opacity = "1";
          header.style.transform = "translateY(0)";

          setTimeout(() => {
            paragraph.style.opacity = "1";
            paragraph.style.transform = "translateY(0)";
          }, 800);

          focusObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -150px 0px"
    }
  );

  items.forEach(item => focusObserver.observe(item));
 /* -----------------------------
     STACK ITEMS FADE-IN (NEW)
  ----------------------------- */
  const stackItems = document.querySelectorAll(".stack-item");

  const stackObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          stackObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -100px 0px"
    }
  );

  stackItems.forEach(item => stackObserver.observe(item));

});
