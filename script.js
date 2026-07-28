const heroMainImage = document.getElementById('heroMainImage');
const thumbButtons = document.querySelectorAll('.thumb');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxNext = document.querySelector('.lightbox-next');
const lightboxPrev = document.querySelector('.lightbox-prev');
const faqQuestions = document.querySelectorAll('.faq-question');
const backToTopBtn = document.getElementById('backToTop');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.querySelector('.search-btn');

let galleryImages = ['./foto1.jpeg', './foto2.jpeg', './foto3.jpeg'];
let currentLightboxIndex = 0;

const initGallery = () => {
  thumbButtons.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      const selected = thumb.dataset.image;
      heroMainImage.src = selected;
      thumbButtons.forEach(button => button.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      const selected = item.dataset.image;
      openLightbox(index, selected);
    });
  });
};

const openLightbox = (index, image) => {
  currentLightboxIndex = index;
  lightboxImage.src = image;
  lightbox.classList.add('show');
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightbox.classList.remove('show');
  document.body.style.overflow = '';
};

const showNextImage = () => {
  currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
  lightboxImage.src = galleryImages[currentLightboxIndex];
};

const showPrevImage = () => {
  currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImage.src = galleryImages[currentLightboxIndex];
};

const initFAQ = () => {
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      item.classList.toggle('active');
    });
  });
};

const initBackToTop = () => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 320) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

const initSearch = () => {
  if (!searchInput || !searchBtn) return;
  searchBtn.addEventListener('click', () => {
    searchInput.focus();
  });
};

const initLightboxControls = () => {
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('show')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowRight') showNextImage();
    if (event.key === 'ArrowLeft') showPrevImage();
  });
};

const initAnimations = () => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'none';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.benefit-card, .review-card, .gallery-item, .faq-item, .contact-card').forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(28px)';
    element.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(element);
  });
};

const init = () => {
  initGallery();
  initFAQ();
  initBackToTop();
  initSearch();
  initLightboxControls();
  initAnimations();
};

window.addEventListener('DOMContentLoaded', init);
