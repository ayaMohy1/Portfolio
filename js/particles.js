/**
 * Interactive Neural Network Constellation Background Canvas
 * Provides dynamic neural nodes that float, connect with synaptic lines,
 * and subtly react to mouse movement. Adapts to Dark and Light modes.
 */

(function () {
  'use strict';

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 140 };

  // Theme-aware particle configuration
  function getThemeColors() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    return {
      particle: isLight ? 'rgba(77, 141, 186, 0.65)' : 'rgba(159, 160, 255, 0.55)',
      particleAccent: isLight ? 'rgba(8, 98, 136, 0.75)' : 'rgba(213, 232, 230, 0.75)',
      line: isLight ? '77, 141, 186' : '159, 160, 255',
      mouseLine: isLight ? '8, 98, 136' : '255, 113, 113',
    };
  }

  let themeColors = getThemeColors();

  // Resize canvas
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  // Particle Class
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2 + 1.2;
      this.baseRadius = this.radius;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.isAccent = Math.random() > 0.75;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce on boundaries
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 1.5;
          this.y -= Math.sin(angle) * force * 1.5;
          this.radius = this.baseRadius * (1 + force * 0.8);
        } else {
          this.radius = this.baseRadius;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.isAccent ? themeColors.particleAccent : themeColors.particle;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    // Number of particles relative to screen area (optimized for 60fps)
    const particleCount = Math.min(Math.floor((width * height) / 14000), 85);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  // Connect particles with neural lines
  function connectParticles() {
    const maxDist = 125;
    const len = particles.length;

    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.22;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${themeColors.line}, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }

      // Connect to mouse
      if (mouse.x !== null && mouse.y !== null) {
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < mouse.radius) {
          const mAlpha = (1 - mDist / mouse.radius) * 0.35;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${themeColors.mouseLine}, ${mAlpha})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
  }

  // Animation Loop
  let animationFrameId;
  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    connectParticles();
    animationFrameId = requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Listen to theme changes
  const observer = new MutationObserver(() => {
    themeColors = getThemeColors();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // Pause when offscreen/hidden to save battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      animate();
    }
  });

  // Initialize
  resize();
  animate();
})();

