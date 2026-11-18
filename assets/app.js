/**
 * FORGE FITNESS CLUB — Vanilla JavaScript Interactions
 * GrowthSathi Package 01: Essential Presence
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Mobile Navigation Drawer (Hamburger Toggle, Escape, Nav Click Close)
     ------------------------------------------------------------------------ */
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileDrawer = document.querySelector('[data-mobile-drawer]');
  const mobileBackdrop = document.querySelector('[data-mobile-backdrop]');
  const drawerClose = document.querySelector('[data-menu-close]');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (!mobileDrawer || !menuToggle) return;
    mobileDrawer.classList.add('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    if (mobileBackdrop) {
      mobileBackdrop.classList.add('is-open');
    }
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    if (drawerClose) {
      drawerClose.focus();
    }
  }

  function closeMobileMenu(restoreFocus) {
    if (!mobileDrawer || !menuToggle) return;
    if (!mobileDrawer.classList.contains('is-open')) return;

    mobileDrawer.classList.remove('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    if (mobileBackdrop) {
      mobileBackdrop.classList.remove('is-open');
    }
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    if (restoreFocus) {
      menuToggle.focus();
    }
  }

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mobileDrawer.classList.contains('is-open');
      if (isOpen) {
        closeMobileMenu(true);
      } else {
        openMobileMenu();
      }
    });
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', function () {
      closeMobileMenu(true);
    });
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', function () {
      closeMobileMenu(true);
    });
  }

  mobileNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMobileMenu(false);
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 900) {
      closeMobileMenu(false);
    }
  });

  /* ------------------------------------------------------------------------
     2. Image Broken-Fallback Guard
     ------------------------------------------------------------------------ */
  const mediaImages = document.querySelectorAll('.media-frame img');
  mediaImages.forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) {
      img.closest('.media-frame')?.classList.add('is-broken');
    }
    img.addEventListener('error', function () {
      img.closest('.media-frame')?.classList.add('is-broken');
    });
  });

  /* ------------------------------------------------------------------------
     3. Gallery Category Filter & Lightbox (gallery.html)
     ------------------------------------------------------------------------ */
  const filterButtons = document.querySelectorAll('[data-gallery-filter]');
  const galleryItems = document.querySelectorAll('[data-gallery-category]');

  if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const selected = button.getAttribute('data-gallery-filter');

        filterButtons.forEach(function (btn) {
          btn.setAttribute('aria-pressed', btn === button ? 'true' : 'false');
        });

        galleryItems.forEach(function (item) {
          const category = item.getAttribute('data-gallery-category');
          const matches = selected === 'all' || category === selected;
          if (matches) {
            item.removeAttribute('hidden');
          } else {
            item.setAttribute('hidden', '');
          }
        });
      });
    });
  }

  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImg = document.querySelector('[data-lightbox-img]');
  const lightboxTitle = document.querySelector('[data-lightbox-title]');
  const lightboxMeta = document.querySelector('[data-lightbox-meta]');
  const lightboxClose = document.querySelector('[data-lightbox-close]');
  const lightboxPrev = document.querySelector('[data-lightbox-prev]');
  const lightboxNext = document.querySelector('[data-lightbox-next]');
  const galleryTriggers = Array.from(document.querySelectorAll('[data-gallery-trigger]'));

  let activeLightboxIndex = -1;
  let lastFocusedTrigger = null;

  function getVisibleTriggers() {
    return galleryTriggers.filter(function (trigger) {
      const parentItem = trigger.closest('[data-gallery-category]');
      return !parentItem || !parentItem.hasAttribute('hidden');
    });
  }

  function showLightboxAt(index) {
    const visible = getVisibleTriggers();
    if (visible.length === 0 || !lightbox || !lightboxImg) return;

    const normalizedIndex = ((index % visible.length) + visible.length) % visible.length;
    activeLightboxIndex = normalizedIndex;

    const trigger = visible[normalizedIndex];
    const src = trigger.getAttribute('data-src') || '';
    const alt = trigger.getAttribute('data-alt') || '';
    const title = trigger.getAttribute('data-title') || '';
    const meta = trigger.getAttribute('data-meta') || '';

    lightboxImg.setAttribute('src', src);
    lightboxImg.setAttribute('alt', alt);
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxMeta) lightboxMeta.textContent = meta;

    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox || !lightbox.classList.contains('is-open')) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedTrigger) {
      lastFocusedTrigger.focus();
      lastFocusedTrigger = null;
    }
  }

  if (lightbox && galleryTriggers.length > 0) {
    galleryTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        lastFocusedTrigger = trigger;
        const visible = getVisibleTriggers();
        const idx = visible.indexOf(trigger);
        showLightboxAt(idx >= 0 ? idx : 0);
        if (lightboxClose) {
          lightboxClose.focus();
        }
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', function () {
        showLightboxAt(activeLightboxIndex - 1);
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', function () {
        showLightboxAt(activeLightboxIndex + 1);
      });
    }

    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  /* Keep keyboard focus inside the active drawer or lightbox. */
  function trapModalFocus(container, event) {
    const focusableElements = Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter(function (element) {
      return element.getAttribute('aria-hidden') !== 'true' && element.offsetParent !== null;
    });

    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && (document.activeElement === firstElement || !container.contains(document.activeElement))) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && (document.activeElement === lastElement || !container.contains(document.activeElement))) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  /* Global Escape, modal focus management & lightbox keyboard navigation. */
  document.addEventListener('keydown', function (event) {
    const mobileMenuIsOpen = mobileDrawer && mobileDrawer.classList.contains('is-open');
    const lightboxIsOpen = lightbox && lightbox.classList.contains('is-open');

    if (event.key === 'Escape') {
      if (lightboxIsOpen) {
        closeLightbox();
      } else if (mobileMenuIsOpen) {
        closeMobileMenu(true);
      }
      return;
    }

    if (event.key === 'Tab' && mobileMenuIsOpen) {
      trapModalFocus(mobileDrawer, event);
      return;
    }

    if (event.key === 'Tab' && lightboxIsOpen) {
      trapModalFocus(lightbox, event);
      return;
    }

    if (lightboxIsOpen && event.key === 'ArrowLeft') {
      showLightboxAt(activeLightboxIndex - 1);
    } else if (lightboxIsOpen && event.key === 'ArrowRight') {
      showLightboxAt(activeLightboxIndex + 1);
    }
  });

  /* ------------------------------------------------------------------------
     4. Copy Demo Phone Number Utility (contact.html)
     ------------------------------------------------------------------------ */
  const copyPhoneButton = document.querySelector('[data-copy-phone]');
  const copyFeedback = document.querySelector('[data-copy-feedback]');

  if (copyPhoneButton) {
    copyPhoneButton.addEventListener('click', function () {
      const numberToCopy = copyPhoneButton.getAttribute('data-copy-phone') || '+91 00000 00000';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(numberToCopy)
          .then(function () {
            if (copyFeedback) {
              copyFeedback.textContent = 'Demo phone number copied (' + numberToCopy + ').';
            }
          })
          .catch(function () {
            if (copyFeedback) {
              copyFeedback.textContent = 'Demo number: ' + numberToCopy;
            }
          });
      } else if (copyFeedback) {
        copyFeedback.textContent = 'Demo number: ' + numberToCopy;
      }
    });
  }

  /* ------------------------------------------------------------------------
     5. Subtle Reduced-Motion-Safe Scroll Reveal
     ------------------------------------------------------------------------ */
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = document.querySelectorAll('[data-reveal]');

  if (!prefersReducedMotion && 'IntersectionObserver' in window && revealTargets.length > 0) {
    document.documentElement.classList.add('reveal-ready');
    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
