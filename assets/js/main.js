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
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery-item');
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
   * Lightbox Modal for Photo Gallery
   */
  if (lightbox && lightboxImg && galleryItems.length > 0) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const fullImgSrc = item.getAttribute('data-full-img') || item.querySelector('img').getAttribute('src');
        const caption = item.getAttribute('data-caption') || item.querySelector('.gallery-caption')?.innerText || '';
        
        lightboxImg.setAttribute('src', fullImgSrc);
        lightboxImg.setAttribute('alt', caption);
        if (lightboxCaption) {
          lightboxCaption.innerText = caption;
        }
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      lightboxImg.setAttribute('src', '');
    }

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // Run on DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
  });

})();

