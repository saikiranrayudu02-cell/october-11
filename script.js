/**
 * Portfolio Interactive Logic
 * Simple, vanilla, modular, zero external dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initNavScrollSpy();
  initProjectFilters();
  initContactForm();
  initCopyEmail();
  initYear();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light) with LocalStorage
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;
  
  // Check persisted preference or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlEl.setAttribute('data-theme', nextTheme);
      localStorage.setItem('portfolio-theme', nextTheme);
      showToast(`Switched to ${nextTheme} mode`);
    });
  }
}

/* ==========================================================================
   2. Mobile Navigation Toggle
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  // Close mobile nav when clicking any link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      }
    });
  });

  // Close if clicked outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
      navMenu.classList.remove('open');
    }
  });
}

/* ==========================================================================
   3. Active Navigation on Scroll (ScrollSpy)
   ========================================================================== */
function initNavScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav);
  highlightNav();
}

/* ==========================================================================
   4. Project Filtering
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Interactive Contact Form with Validation
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successBanner = document.getElementById('form-success-banner');
  const resetBtn = document.getElementById('reset-form-btn');

  if (!form) return;

  const fields = [
    { input: document.getElementById('contact-name'), error: document.getElementById('name-error'), validate: val => val.trim().length >= 2 },
    { input: document.getElementById('contact-email'), error: document.getElementById('email-error'), validate: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) },
    { input: document.getElementById('contact-subject'), error: document.getElementById('subject-error'), validate: val => val.trim().length >= 3 },
    { input: document.getElementById('contact-message'), error: document.getElementById('message-error'), validate: val => val.trim().length >= 5 }
  ];

  fields.forEach(field => {
    if (field.input) {
      field.input.addEventListener('input', () => {
        field.input.closest('.form-group').classList.remove('has-error');
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    fields.forEach(field => {
      const parent = field.input.closest('.form-group');
      if (!field.validate(field.input.value)) {
        parent.classList.add('has-error');
        isValid = false;
      } else {
        parent.classList.remove('has-error');
      }
    });

    if (isValid) {
      const submitBtn = document.getElementById('form-submit-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';

      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.style.display = 'none';
        successBanner.style.display = 'block';
        showToast('Message sent successfully!');
      }, 700);
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.style.display = 'block';
      successBanner.style.display = 'none';
    });
  }
}

/* ==========================================================================
   6. Copy Email to Clipboard
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('email-text');

  if (!copyBtn || !emailText) return;

  copyBtn.addEventListener('click', () => {
    const email = emailText.innerText.trim();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard!');
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
        }, 2000);
      });
    } else {
      // Fallback
      const tempInput = document.createElement('input');
      tempInput.value = email;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      showToast('Email copied to clipboard!');
    }
  });
}

/* ==========================================================================
   7. Dynamic Copyright Year
   ========================================================================== */
function initYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   Toast Notification Utility
   ========================================================================== */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
