// --- Three.js 3D Hero Background ---
window.addEventListener('DOMContentLoaded', () => {
  // Remove the 3D sphere from the hero background
  // If you want to keep Three.js for other effects, leave the setup, but don't add any geometry

  const container = document.getElementById('three-hero-bg');
  if (!container) return;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.offsetWidth / container.offsetHeight,
    0.1,
    1000
  );
  camera.position.z = 3;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0); // transparent
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);

  // Responsive resize
  window.addEventListener('resize', () => {
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
  });

  // No geometry added, so nothing will be rendered except a transparent canvas

  // Animation loop (optional, can be removed if not needed)
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
});

// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  const navButtons = document.querySelector('.nav-buttons');
  if (menuToggle && navButtons) {
    menuToggle.addEventListener('click', function() {
      navButtons.classList.toggle('active');
    });
    // Optional: close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!menuToggle.contains(e.target) && !navButtons.contains(e.target)) {
        navButtons.classList.remove('active');
      }
    });
  }
});

window.addEventListener('scroll', function() {
  const navButtons = document.querySelector('.nav-buttons');
  if (window.scrollY > 50) {
    navButtons.classList.add('scrolled');
  } else {
    navButtons.classList.remove('scrolled');
  }
});