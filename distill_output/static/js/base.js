// base.js
document.addEventListener('DOMContentLoaded', () => {
  // --------------------------
  // HAMBURGER MENU
  // --------------------------
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    // Optional overlay
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    document.body.appendChild(overlay);

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('show');
      overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('show');
      overlay.classList.remove('active');
    });
  }

    // --------------------------
    // THEME COLOR SCROLL LOGIC
    // --------------------------
    const themeMeta = document.getElementById("theme-color-meta");
    if (!themeMeta) return;

    const threshold = 100;
    const colorDefault = "#1b1e55";
    const colorScrolled = "#d2b48c";

    function updateThemeColor() {
      const scrollY = window.scrollY || window.pageYOffset;
      themeMeta.setAttribute("content", scrollY > threshold ? colorScrolled : colorDefault);
    }

    window.addEventListener("scroll", updateThemeColor);
    updateThemeColor(); // initial set
});

  // --------------------------
  // NAV BUTTON DOT ANIMATION
  // --------------------------
  document.querySelectorAll('.nav-button').forEach(button => {
    const dot = button.querySelector('.orbit-dot');
    if (!dot) return;

    // Create second dot
    const dot2 = dot.cloneNode(true);
    dot2.classList.add('orbit-dot-2');
    button.appendChild(dot2);

    const w = button.offsetWidth;
    const h = button.offsetHeight;
    const r = parseInt(getComputedStyle(button).borderRadius) || 15;
    const shrink = 3;

    const d = `
      M${r},0 
      H${w-r-shrink} 
      A${r},${r} 0 0 1 ${w-shrink},${r} 
      V${h-r} 
      A${r},${r} 0 0 1 ${w-r-shrink},${h-shrink} 
      H${r} 
      A${r},${r} 0 0 1 0,${h-r-shrink} 
      V${r} 
      A${r},${r} 0 0 1 ${r},0
    `;

    const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
    svg.setAttribute("width", 0);
    svg.setAttribute("height", 0);
    const path = document.createElementNS("http://www.w3.org/2000/svg","path");
    path.setAttribute("d", d);
    svg.appendChild(path);
    button.appendChild(svg);

    const pathLength = path.getTotalLength();
    let progress1 = 0;
    let progress2 = 0.5;
    let animationId;

    function animate() {
      // Dot 1
      const point1 = path.getPointAtLength(progress1 * pathLength);
      const nextPoint1 = path.getPointAtLength((progress1 + 0.001) * pathLength);
      const angle1 = Math.atan2(nextPoint1.y - point1.y, nextPoint1.x - point1.x) * (180/Math.PI);
      dot.style.left = (point1.x - dot.offsetWidth/2 - 4) + 'px';
      dot.style.top  = (point1.y - dot.offsetHeight/2.5 - 4) + 'px';
      dot.style.transform = `rotate(${angle1}deg)`;
      progress1 += 0.007;
      if(progress1 > 1) progress1 = 0;

      // Dot 2
      const point2 = path.getPointAtLength(progress2 * pathLength);
      const nextPoint2 = path.getPointAtLength((progress2 + 0.001) * pathLength);
      const angle2 = Math.atan2(nextPoint2.y - point2.y, nextPoint2.x - point2.x) * (180/Math.PI);
      dot2.style.left = (point2.x - dot2.offsetWidth/2 - 4) + 'px';
      dot2.style.top  = (point2.y - dot2.offsetHeight/2.5 - 4) + 'px';
      dot2.style.transform = `rotate(${angle2}deg)`;
      progress2 += 0.007;
      if(progress2 > 1) progress2 = 0;

      animationId = requestAnimationFrame(animate);
    }

    button.addEventListener('mouseenter', () => {
      dot.style.display = 'block';
      dot2.style.display = 'block';
      animate();
    });

    button.addEventListener('mouseleave', () => {
      dot.style.display = 'none';
      dot2.style.display = 'none';
      cancelAnimationFrame(animationId);
      progress1 = 0;
      progress2 = 0.5;
      dot.style.transform = 'rotate(0deg)';
      dot2.style.transform = 'rotate(0deg)';
    });
  });
