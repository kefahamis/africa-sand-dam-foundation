document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. Sticky Header scroll behavior
  // ==========================================
  const header = document.getElementById('siteHeader');
  
  const topBar = document.getElementById('topBar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 60;
    header.classList.toggle('scrolled', scrolled);
    header.classList.toggle('top-hidden', scrolled);
    if (topBar) topBar.classList.toggle('hidden', scrolled);
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
  });



  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // 2. Mobile Nav Hamburger Toggle
  // ==========================================
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const navItems = document.querySelectorAll('.nav-item');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
    });

    // Close menu when navigation items are clicked
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        
        // Update active class
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }

  // ==========================================
  // 3. Hero Carousel Slider Engine
  // ==========================================
  const slides = document.querySelectorAll('#heroSlider .slide');
  const indicators = document.querySelectorAll('#heroSlider .indicator');
  let currentSlide = 0;
  let slideInterval;
  const slideDuration = 5000; // 5 seconds

  function showSlide(index) {
    // Wrap around index
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    // Reset slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));

    // Activate the current slide & indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    currentSlide = index;

    // For progress bar resets
    resetProgressBarAnimation();
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function startSlideShow() {
    stopSlideShow(); // Clear any existing
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  function stopSlideShow() {
    if (slideInterval) {
      clearInterval(slideInterval);
    }
  }

  function resetProgressBarAnimation() {
    // We trigger browser reflow to restart the CSS progress bar animation
    const progressBars = document.querySelectorAll('.progress-bar::after');
    // For simplicity, updating active class handles it, but manual click requires timer reset
  }

  // Set up indicator click events
  indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      const clickedIndex = parseInt(indicator.getAttribute('data-slide'));
      showSlide(clickedIndex);
      startSlideShow();
    });
  });

  // Prev / Next arrow buttons
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentSlide - 1);
      startSlideShow();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentSlide + 1);
      startSlideShow();
    });
  }

  // Start hero carousel
  startSlideShow();

  // ==========================================
  // 4. Scroll Count Statistics Animation
  // ==========================================
  const statNumbers = document.querySelectorAll('.cell-number');

  function animateCounter(el) {
    const rawTarget = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    
    let targetValue = rawTarget;
    let decimals = 0;

    // Format larger numbers like Millions
    if (suffix.includes('M')) {
      targetValue = rawTarget / 1000000;
      decimals = targetValue % 1 === 0 ? 0 : 1;
    }

    const duration = 2000; // Animation duration in milliseconds
    const frameRate = 60; // 60 frames per second
    const totalFrames = Math.round((duration / 1000) * frameRate);
    let currentFrame = 0;

    const counterInterval = setInterval(() => {
      currentFrame++;
      // Easing function: easeOutQuad
      const progress = currentFrame / totalFrames;
      const easedProgress = progress * (2 - progress);
      const currentValue = easedProgress * targetValue;

      // Update text
      el.textContent = currentValue.toFixed(decimals) + suffix;

      if (currentFrame >= totalFrames) {
        // Ensure exact target is rendered
        el.textContent = targetValue.toFixed(decimals) + suffix;
        clearInterval(counterInterval);
      }
    }, 1000 / frameRate);
  }

  // IntersectionObserver to trigger counter when in view
  const observerOptions = {
    root: null,
    threshold: 0.1, // Trigger when 10% visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animateCounter(el);
        observer.unobserve(el); // Stop observing after animation triggers
      }
    });
  }, observerOptions);

  statNumbers.forEach(num => {
    observer.observe(num);
  });

});
