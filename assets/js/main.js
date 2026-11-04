/**
 * Laxmi Pedhewale (लक्ष्मी पेढेवाले) - Official Website JavaScript
 * Traditional Maharashtrian Sweet Shop Established in 1971
 * Handles Language Switching (Marathi default & English), Mobile Nav, Lightbox & Dynamic WhatsApp CTAs
 */

(function () {
  'use strict';

  // State
  let currentLang = 'mr'; // Default language is Marathi
  const PHONE_NUMBER = '+919890517950';
  const WHATSAPP_NUMBER = '919890517950';

  // WhatsApp Default Messages
  const WA_MESSAGES = {
    mr: 'नमस्कार, मला लक्ष्मी पेढेवाले येथील पेढ्यांबद्दल माहिती हवी आहे.',
    en: 'Hello, I would like to know more about the products at Laxmi Pedhewale.'
  };

  // DOM Elements
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const langBtns = document.querySelectorAll('.lang-btn');
  const waButtons = document.querySelectorAll('.btn-wa-dynamic');

  /**
   * Initialize Language
   */
  function initLanguage() {
    // Check if the current page is English path (/en/)
    const isEnPath = window.location.pathname.includes('/en/') || window.location.pathname.endsWith('/en');
    
    // Check localStorage, default to 'mr'
    const storedLang = localStorage.getItem('laxmi_pedhewale_lang');
    
    if (isEnPath) {
      currentLang = 'en';
    } else if (storedLang === 'en') {
      currentLang = 'en';
    } else {
      currentLang = 'mr';
    }

    applyLanguage(currentLang);
  }

  /**
   * Apply Language to Translatable Elements
   */
  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('laxmi_pedhewale_lang', lang);
    document.documentElement.lang = lang;

    // Update Language Buttons
    langBtns.forEach(btn => {
      const btnLang = btn.getAttribute('data-lang-btn');
      if (btnLang === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Translate all elements with data-mr and data-en
    const translatables = document.querySelectorAll('[data-mr][data-en]');
    translatables.forEach(el => {
      const translation = el.getAttribute(`data-${lang}`);
      if (translation) {
        el.innerHTML = translation;
      }
    });

    // Update page title if specified
    const pageTitle = document.querySelector('title');
    if (pageTitle && pageTitle.getAttribute(`data-${lang}`)) {
      pageTitle.innerText = pageTitle.getAttribute(`data-${lang}`);
    }

    // Update dynamic WhatsApp links
    updateWhatsAppLinks();
  }

  /**
   * Update WhatsApp Links based on current language
   */
  function updateWhatsAppLinks() {
    const defaultText = encodeURIComponent(WA_MESSAGES[currentLang]);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${defaultText}`;

    waButtons.forEach(btn => {
      // Check if button has specific product context
      const productContext = btn.getAttribute(`data-product-${currentLang}`);
      if (productContext) {
        const prodMsg = currentLang === 'mr'
          ? `नमस्कार! मला लक्ष्मी पेढेवाले यांच्या '${productContext}' बद्दल माहिती व ऑर्डर हवी आहे.`
          : `Hello! I would like to inquire about '${productContext}' from Laxmi Pedhewale.`;
        btn.setAttribute('href', `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prodMsg)}`);
      } else {
        btn.setAttribute('href', waUrl);
      }
    });
  }

  /**
   * Language Switcher Click Handler
   */
  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetLang = btn.getAttribute('data-lang-btn');
      if (targetLang === currentLang) return;

      // Smooth switch in-page
      applyLanguage(targetLang);

      // Check if we should synchronize URL without reload or navigate
      const isEnPath = window.location.pathname.includes('/en/');
      if (targetLang === 'en' && !isEnPath && window.location.pathname.endsWith('index.html')) {
        // If user is on root index.html and explicitly switches to en, we update or can navigate to en/index.html
        window.location.href = 'en/index.html';
      } else if (targetLang === 'mr' && isEnPath) {
        window.location.href = '../index.html';
      }
    });
  });

  /**
   * Mobile Menu Drawer Toggle
   */
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', false);
      }
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  /**
   * Sticky Header on Scroll
   */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  /**
   * Active Navigation Link on Scroll Spy
   */
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-menu a[href*="#${sectionId}"]`);

      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  }, { passive: true });

  /**
   * Photo Gallery Dynamic Carousel & Enhanced Lightbox
   */
  const galleryTrack = document.getElementById('galleryTrack');
  const galleryViewport = document.getElementById('galleryTrackViewport');
  const galleryPrevBtn = document.getElementById('galleryPrevBtn');
  const galleryNextBtn = document.getElementById('galleryNextBtn');
  const galleryDotsContainer = document.getElementById('galleryDots');
  const gallerySlides = Array.from(document.querySelectorAll('.gallery-slide'));

  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxCounter = document.getElementById('lightboxCounter');

  if (galleryTrack && gallerySlides.length > 0) {
    let currentSlide = 0;
    let autoplayTimer = null;
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;

    function getSlidesPerView() {
      const w = window.innerWidth;
      if (w <= 640) return 1;
      if (w <= 991) return 2;
      return 3;
    }

    function getMaxIndex() {
      return Math.max(0, gallerySlides.length - getSlidesPerView());
    }

    function createDots() {
      if (!galleryDotsContainer) return;
      galleryDotsContainer.innerHTML = '';
      const maxIndex = getMaxIndex();
      const dotCount = maxIndex + 1;

      for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot' + (i === currentSlide ? ' active' : '');
        dot.setAttribute('aria-label', `स्लाइड ${i + 1} वर जा / Go to slide ${i + 1}`);
        dot.addEventListener('click', () => {
          goToSlide(i);
          resetAutoplay();
        });
        galleryDotsContainer.appendChild(dot);
      }
    }

    function updateDots() {
      if (!galleryDotsContainer) return;
      const dots = galleryDotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, idx) => {
        if (idx === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function updateSlidePosition() {
      const maxIndex = getMaxIndex();
      if (currentSlide > maxIndex) {
        currentSlide = maxIndex;
      }
      if (currentSlide < 0) {
        currentSlide = 0;
      }

      if (gallerySlides[0]) {
        const slideWidth = gallerySlides[0].getBoundingClientRect().width;
        const gap = 20; // 20px CSS gap
        const offset = currentSlide * (slideWidth + gap);
        galleryTrack.style.transform = `translateX(-${offset}px)`;
      }

      updateDots();
    }

    function nextSlide() {
      const maxIndex = getMaxIndex();
      if (currentSlide >= maxIndex) {
        currentSlide = 0; // Seamless wraparound
      } else {
        currentSlide++;
      }
      updateSlidePosition();
    }

    function prevSlide() {
      const maxIndex = getMaxIndex();
      if (currentSlide <= 0) {
        currentSlide = maxIndex; // Seamless wraparound
      } else {
        currentSlide--;
      }
      updateSlidePosition();
    }

    function goToSlide(index) {
      currentSlide = Math.max(0, Math.min(index, getMaxIndex()));
      updateSlidePosition();
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(nextSlide, 4500);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // Navigation Buttons
    if (galleryPrevBtn) {
      galleryPrevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
      });
    }

    if (galleryNextBtn) {
      galleryNextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
      });
    }

    // Pause autoplay on mouse hover, touch and focus
    const carouselWrapper = document.querySelector('.gallery-carousel-wrapper');
    if (carouselWrapper) {
      carouselWrapper.addEventListener('mouseenter', stopAutoplay);
      carouselWrapper.addEventListener('mouseleave', startAutoplay);
      carouselWrapper.addEventListener('focusin', stopAutoplay);
      carouselWrapper.addEventListener('focusout', startAutoplay);
    }

    // Touch & Swipe gestures
    if (galleryViewport) {
      galleryViewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        isSwiping = true;
        stopAutoplay();
      }, { passive: true });

      galleryViewport.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        touchEndX = e.changedTouches[0].screenX;
        isSwiping = false;
        const diffX = touchStartX - touchEndX;

        if (Math.abs(diffX) > 40) {
          if (diffX > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
        startAutoplay();
      }, { passive: true });
    }

    // Resize recalculation
    window.addEventListener('resize', () => {
      createDots();
      updateSlidePosition();
    }, { passive: true });

    // Initialize carousel
    createDots();
    updateSlidePosition();
    startAutoplay();

    // =========================================================================
    // Enhanced Lightbox with Next / Previous & Keyboard Navigation
    // =========================================================================
    let activeLightboxIndex = 0;

    function getMarathiNumber(num) {
      const marathiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
      return String(num).split('').map(d => marathiDigits[d] || d).join('');
    }

    function showLightboxImage(index) {
      if (index < 0) index = gallerySlides.length - 1;
      if (index >= gallerySlides.length) index = 0;
      activeLightboxIndex = index;

      const slide = gallerySlides[activeLightboxIndex];
      if (!slide || !lightboxImg) return;

      const fullImgSrc = slide.getAttribute('data-full-img') || slide.querySelector('img')?.getAttribute('src') || '';
      const caption = slide.getAttribute('data-caption') || slide.querySelector('.gallery-caption')?.innerText || '';

      lightboxImg.style.opacity = '0';
      lightboxImg.style.transform = 'scale(0.96)';

      setTimeout(() => {
        lightboxImg.setAttribute('src', fullImgSrc);
        lightboxImg.setAttribute('alt', caption);
        if (lightboxCaption) {
          lightboxCaption.innerText = caption;
        }

        if (lightboxCounter) {
          const isMr = currentLang === 'mr';
          const currentDisp = isMr ? getMarathiNumber(activeLightboxIndex + 1) : (activeLightboxIndex + 1);
          const totalDisp = isMr ? getMarathiNumber(gallerySlides.length) : gallerySlides.length;
          lightboxCounter.innerText = `${currentDisp} / ${totalDisp}`;
        }

        lightboxImg.style.opacity = '1';
        lightboxImg.style.transform = 'scale(1)';
      }, 100);
    }

    function openLightbox(index) {
      if (!lightbox) return;
      stopAutoplay();
      showLightboxImage(index);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      if (lightboxImg) {
        lightboxImg.setAttribute('src', '');
      }
      startAutoplay();
    }

    // Bind click on each gallery slide
    gallerySlides.forEach((slide, index) => {
      slide.addEventListener('click', () => {
        openLightbox(index);
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        showLightboxImage(activeLightboxIndex - 1);
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        showLightboxImage(activeLightboxIndex + 1);
      });
    }

    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content-box') || e.target.classList.contains('lightbox-img-wrapper')) {
          closeLightbox();
        }
      });
    }

    // Keyboard navigation: Escape, ArrowLeft, ArrowRight
    document.addEventListener('keydown', (e) => {
      if (!lightbox || !lightbox.classList.contains('active')) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        showLightboxImage(activeLightboxIndex - 1);
      } else if (e.key === 'ArrowRight') {
        showLightboxImage(activeLightboxIndex + 1);
      }
    });
  }

  // Run on DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
  });

})();

