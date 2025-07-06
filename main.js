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

// --- Faded Circle Follower ---
(function() {
  // Create the faded circle element
  const fadedCircle = document.createElement('div');
  fadedCircle.style.position = 'fixed';
  fadedCircle.style.pointerEvents = 'none';
  fadedCircle.style.width = '50px';
  fadedCircle.style.height = '50px';
  fadedCircle.style.borderRadius = '50%';
  fadedCircle.style.background = 'transparent'; // No fill
  fadedCircle.style.border = '3px solid #041E42'; // Navy blue border
  fadedCircle.style.boxSizing = 'border-box';
  fadedCircle.style.zIndex = '9999';
  fadedCircle.style.transition = 'opacity 0.2s';
  fadedCircle.style.opacity = '0.7';
  fadedCircle.style.left = '0px';
  fadedCircle.style.top = '0px';
  document.body.appendChild(fadedCircle);

  // Smooth follow variables
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  // Track mouse and update target position
  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX - 25;
    targetY = e.clientY - 25;
    fadedCircle.style.opacity = '0.7';
  });

  // Animation loop for smooth movement
  function followMouse() {
    currentX += (targetX - currentX) * 0.18;
    currentY += (targetY - currentY) * 0.18;
    fadedCircle.style.left = currentX + 'px';
    fadedCircle.style.top = currentY + 'px';
    requestAnimationFrame(followMouse);
  }
  followMouse();

  // Fade out when mouse leaves window
  document.addEventListener('mouseleave', () => {
    fadedCircle.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    fadedCircle.style.opacity = '0.7';
  });
})();
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