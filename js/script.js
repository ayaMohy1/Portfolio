/**
 * Aya Mohy — AI Engineer & Data Scientist Portfolio
 * Core Vanilla JavaScript Application
 */

(function () {
  'use strict';

  // ========================================================================
  // 1. Theme Toggle (Dark / Light Mode)
  // ========================================================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const htmlRoot = document.documentElement;

  // Determine initial theme
  const savedTheme = localStorage.getItem('aya_portfolio_theme');
  const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const initialTheme = savedTheme || (systemPrefersLight ? 'light' : 'dark');

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('aya_portfolio_theme', theme);

    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.textContent = '🌙'; // Click for dark
        themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
      } else {
        themeIcon.textContent = '☀️'; // Click for light
        themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
      }
    }
  }

  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme);
    });
  }

  // ========================================================================
  // 2. Fixed Navbar Scroll Effect
  // ========================================================================
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // ========================================================================
  // 3. Mobile Navigation Drawer
  // ========================================================================
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileNav() {
    hamburgerBtn?.classList.add('open');
    mobileNav?.classList.add('open');
    mobileBackdrop?.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburgerBtn?.setAttribute('aria-expanded', 'true');
  }

  function closeMobileNav() {
    hamburgerBtn?.classList.remove('open');
    mobileNav?.classList.remove('open');
    mobileBackdrop?.classList.remove('open');
    document.body.style.overflow = '';
    hamburgerBtn?.setAttribute('aria-expanded', 'false');
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileNav?.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  mobileBackdrop?.addEventListener('click', closeMobileNav);

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMobileNav);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav?.classList.contains('open')) {
      closeMobileNav();
    }
  });

  // ========================================================================
  // 4. Rotating Hero Subtitle (Typewriter & Cycle)
  // ========================================================================
  const rotatingSubtitleEl = document.getElementById('rotatingSubtitle');
  const specialties = [
    'AI Engineer',
    'Machine Learning Enthusiast',
    'Data Scientist',
    'Deep Learning Developer'
  ];

  let currentSpecialtyIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeRotateText() {
    if (!rotatingSubtitleEl) return;

    const currentText = specialties[currentSpecialtyIdx];

    if (isDeleting) {
      rotatingSubtitleEl.textContent = currentText.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 45;
    } else {
      rotatingSubtitleEl.textContent = currentText.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIdx === currentText.length) {
      // Pause at full word
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      currentSpecialtyIdx = (currentSpecialtyIdx + 1) % specialties.length;
      typingSpeed = 400;
    }

    setTimeout(typeRotateText, typingSpeed);
  }

  typeRotateText();

  // ========================================================================
  // 5. Scrollspy: Active Navigation Link Tracking
  // ========================================================================
  const navSections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-menu .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function updateActiveNav() {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 180;

    navSections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (!currentSectionId && window.scrollY < 200) {
      currentSectionId = 'home';
    }

    desktopLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });

    mobileLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // ========================================================================
  // 6. Intersection Observer for Scroll Reveals
  // ========================================================================
  const revealElements = document.querySelectorAll('.reveal-init');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback if no observer
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  // ========================================================================
  // 7. Interactive 3D Card Tilt (Desktop Only)
  // ========================================================================
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!prefersReduced && !isTouchDevice && window.innerWidth >= 1024) {
    const tiltCards = document.querySelectorAll('[data-tilt="true"]');

    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cardWidth = rect.width;
        const cardHeight = rect.height;
        const centerX = rect.left + cardWidth / 2;
        const centerY = rect.top + cardHeight / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Subtle rotation range (-6 to +6 degrees)
        const rotateXUncapped = (-1 * (mouseY / (cardHeight / 2))) * 5.5;
        const rotateYUncapped = (mouseX / (cardWidth / 2)) * 5.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateXUncapped}deg) rotateY(${rotateYUncapped}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // ========================================================================
  // 8. Custom Ambient Cursor Glow (Desktop Only)
  // ========================================================================
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && !isTouchDevice && !prefersReduced) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function renderCursor() {
      // Smooth linear interpolation (lerp)
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;

      requestAnimationFrame(renderCursor);
    }

    renderCursor();
  }

  // ========================================================================
  // 9. Project Filtering by Category
  // ========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card-featured');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Toggle active button state
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'grid';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // ========================================================================
  // 10. Project Deep Dive Modal System
  // ========================================================================
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBody = document.getElementById('modalBody');

  function openProjectModal(projectId) {
    if (!projectModal || !modalBody || !window.projectsData) return;

    const data = window.projectsData[projectId];
    if (!data) return;

    // Build modal markup
    let classesSection = '';
    if (data.classesDetected && data.classesDetected.length > 0) {
      const classPills = data.classesDetected
        .map((cls) => `<span class="class-chip">🏷️ ${cls}</span>`)
        .join('');
      classesSection = `
        <div style="margin: 1.5rem 0;">
          <h4 style="font-size: 0.95rem; font-family: var(--font-mono); color: var(--color-primary); margin-bottom: 0.65rem; text-transform: uppercase;">Classes Detected (7 Categories)</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">${classPills}</div>
        </div>
      `;
    }

    const techPills = data.technologies
      .map((tech) => `<span class="tech-pill">${tech}</span>`)
      .join('');

    const highlightsList = data.keyHighlights
      .map((h) => `<li style="display: flex; gap: 0.65rem; margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.95rem;"><span style="color: var(--color-primary); font-weight: bold;">✦</span><span>${h}</span></li>`)
      .join('');

    modalBody.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
        <span class="project-category-badge">✦ ${data.category}</span>
        <span style="font-family: var(--font-mono); font-size: 0.9rem; padding: 0.35rem 0.9rem; border-radius: var(--radius-full); background: rgba(var(--color-primary-rgb), 0.15); color: var(--color-primary); font-weight: 700;">${data.score}</span>
      </div>

      <h2 style="font-size: 2rem; margin-bottom: 1.25rem;">${data.title}</h2>

      <div style="border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-subtle); margin-bottom: 2rem; box-shadow: var(--shadow-card);">
        <img src="${data.image}" alt="${data.title}" style="width: 100%; height: auto; display: block;" />
      </div>

      <div style="display: grid; grid-template-columns: 1fr; gap: 1.75rem; margin-bottom: 2rem;">
        <div>
          <h3 style="font-size: 1.2rem; color: var(--text-main); margin-bottom: 0.5rem;">The Challenge &amp; Problem</h3>
          <p style="font-size: 0.98rem; line-height: 1.7; color: var(--text-muted);">${data.problemStatement}</p>
        </div>

        <div>
          <h3 style="font-size: 1.2rem; color: var(--text-main); margin-bottom: 0.5rem;">Engineering Solution &amp; Architecture</h3>
          <p style="font-size: 0.98rem; line-height: 1.7; color: var(--text-muted);">${data.solutionDescription}</p>
        </div>
      </div>

      ${classesSection}

      <div style="margin: 1.75rem 0;">
        <h3 style="font-size: 1.2rem; color: var(--text-main); margin-bottom: 0.85rem;">Key Technical Achievements</h3>
        <ul style="list-style: none;">${highlightsList}</ul>
      </div>

      <div style="margin: 1.75rem 0;">
        <h4 style="font-size: 0.95rem; font-family: var(--font-mono); color: var(--text-soft); margin-bottom: 0.65rem; text-transform: uppercase;">Tech Stack &amp; Tools</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">${techPills}</div>
      </div>

      <div style="display: flex; gap: 1rem; margin-top: 2.25rem; border-top: 1px solid var(--border-subtle); padding-top: 1.75rem;">
        <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <span>GitHub Code</span> <span>↗</span>
        </a>
        <a href="${data.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
          <span>Live Demo / App</span> <span>↗</span>
        </a>
      </div>
    `;

    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Trigger buttons
  document.querySelectorAll('[data-open-project]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-open-project');
      openProjectModal(projId);
    });
  });

  modalCloseBtn?.addEventListener('click', closeProjectModal);

  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeProjectModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal?.classList.contains('open')) {
      closeProjectModal();
    }
  });

  // ========================================================================
  // 11. Contact Form Real-Time Validation & Submission Handling
  // ========================================================================
  const contactForm = document.getElementById('contactForm');
  const formToast = document.getElementById('formToast');

  if (contactForm) {
    const nameInput = document.getElementById('senderName');
    const emailInput = document.getElementById('senderEmail');
    const subjectInput = document.getElementById('senderSubject');
    const messageInput = document.getElementById('senderMessage');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateField(input, errorEl, condition, errorMsg) {
      if (!condition) {
        input.classList.add('error');
        if (errorEl) errorEl.textContent = errorMsg;
        return false;
      } else {
        input.classList.remove('error');
        if (errorEl) errorEl.textContent = '';
        return true;
      }
    }

    // Real-time blur validation
    nameInput?.addEventListener('blur', () => {
      validateField(nameInput, nameError, nameInput.value.trim().length >= 2, 'Please enter your full name (minimum 2 characters).');
    });

    emailInput?.addEventListener('blur', () => {
      validateField(emailInput, emailError, emailRegex.test(emailInput.value.trim()), 'Please enter a valid email address.');
    });

    subjectInput?.addEventListener('blur', () => {
      validateField(subjectInput, subjectError, subjectInput.value.trim().length >= 3, 'Please enter a subject (minimum 3 characters).');
    });

    messageInput?.addEventListener('blur', () => {
      validateField(messageInput, messageError, messageInput.value.trim().length >= 10, 'Please write a message (minimum 10 characters).');
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, nameError, nameInput.value.trim().length >= 2, 'Please enter your full name.');
      const isEmailValid = validateField(emailInput, emailError, emailRegex.test(emailInput.value.trim()), 'Please enter a valid email address.');
      const isSubjectValid = validateField(subjectInput, subjectError, subjectInput.value.trim().length >= 3, 'Please enter a subject.');
      const isMessageValid = validateField(messageInput, messageError, messageInput.value.trim().length >= 10, 'Please enter a message (min 10 characters).');

      if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Show validation confirmation toast
        const senderName = nameInput.value.trim();
        if (formToast) {
          formToast.innerHTML = `
            <strong>Message Validated!</strong> Thank you, <em>${senderName}</em>. In this live portfolio demonstration, client-side validation succeeded.
            <br />
            To connect directly with Aya Mohy, please email <a href="mailto:contact@ayamohy.com" style="text-decoration: underline; font-weight: bold; color: inherit;">contact@ayamohy.com</a> or message on <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style="text-decoration: underline; font-weight: bold; color: inherit;">LinkedIn</a>.
          `;
          formToast.classList.add('visible');
          formToast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        contactForm.reset();

        setTimeout(() => {
          formToast?.classList.remove('visible');
        }, 12000);
      }
    });
  }

  // ========================================================================
  // 12. Floating Back-to-Top Button with Circular SVG Scroll Progress
  // ========================================================================
  const backToTopBtn = document.getElementById('backToTopBtn');
  const progressCircleBar = document.getElementById('progressCircleBar');
  const circumference = 145; // 2 * Math.PI * 23 ≈ 144.5

  function updateScrollProgress() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (docHeight > 0) {
      const scrollPercent = Math.min(scrollY / docHeight, 1);
      const dashoffset = circumference - scrollPercent * circumference;

      if (progressCircleBar) {
        progressCircleBar.style.strokeDashoffset = dashoffset;
      }
    }

    if (scrollY > 350) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Profile Photo Error Fallback: if user hasn't added custom photo yet, avatar SVG displays smoothly
  const profileImgEl = document.getElementById('personalProfilePhoto');
  if (profileImgEl) {
    profileImgEl.addEventListener('error', () => {
      profileImgEl.src = 'assets/images/profile-avatar.svg';
    });
  }

})();

