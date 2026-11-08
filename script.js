/* ===== PRELOADER ===== */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('loaded');
      setTimeout(() => preloader.remove(), 600);
    }, 400);
  }
});

/* ===== HEADER SCROLL + BACK TO TOP ===== */
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  if (backToTop) {
    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===== MOBILE HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

/* ===== ACTIVE NAV LINK DETECTION ===== */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const linkPage = link.getAttribute('href');
  if (linkPage === currentPage) {
    link.classList.add('active');
  }
});

/* ===== SMOOTH ANCHOR SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

/* ===== SCROLL REVEAL ANIMATIONS ===== */
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('active');
        }, index * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));
}
/* ===== ANIMATED COUNTER (EXTRA SENSITIVE) ===== */
const counters = document.querySelectorAll('.counter');

if (counters.length > 0) {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        // This looks for the number inside data-target="..."
        const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
        
        let count = 0;
        const updateCount = () => {
          const increment = target / 50; // How fast it counts
          if (count < target) {
            count += increment;
            counter.innerText = Math.ceil(count).toLocaleString();
            setTimeout(updateCount, 30);
          } else {
            counter.innerText = target.toLocaleString();
          }
        };

        updateCount();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.1 }); // Starts when only 10% of the bar is visible

  counters.forEach(counter => {
    counter.innerText = '0';
    counterObserver.observe(counter);
  });
}
/* ===== ANIMATED SKILL BARS ===== */
const skillBars = document.querySelectorAll('.skill-bar-fill');

if (skillBars.length > 0) {
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const percent = bar.getAttribute('data-percent') || '0';
        bar.style.width = percent + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => skillObserver.observe(bar));
}

/* ===== PORTFOLIO FILTER ===== */
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-card');

if (filterButtons.length > 0) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
          setTimeout(() => item.classList.add('active'), 50);
        } else {
          item.classList.remove('active');
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ===== FAQ ACCORDION ===== */
const faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length > 0) {
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ===== HERO PARALLAX ON MOUSE MOVE ===== */
const heroCard = document.querySelector('.hero-card');

if (heroCard) {
  document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 40;
    const y = (window.innerHeight / 2 - e.pageY) / 40;
    heroCard.style.transform = `translate(${x}px, ${y}px)`;
  });
}

/* ===== FORMSPREE CONTACT FORM AJAX SUBMISSION ===== */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');
    const originalBtnText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    formStatus.className = 'form-status';
    formStatus.innerText = '';

    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
      .then(response => {
        if (response.ok) {
          formStatus.classList.add('success');
          formStatus.innerText = "Thank you! Your message has been sent. I'll get back to you within 24–48 hours.";
          contactForm.reset();
        } else {
          response.json().then(data => {
            formStatus.classList.add('error');
            if (data.errors) {
              formStatus.innerText = data.errors.map(err => err.message).join(', ');
            } else {
              formStatus.innerText = 'Oops! Something went wrong. Please try again or email me directly.';
            }
          });
        }
      })
      .catch(() => {
        formStatus.classList.add('error');
        formStatus.innerText = 'Oops! Something went wrong. Please check your connection and try again.';
      })
      .finally(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      });
  });
}

/* ===== NEWSLETTER FORMS (FAKE SUBMIT) ===== */
const newsletterForms = document.querySelectorAll('.newsletter-form, .newsletter-form-lg');

newsletterForms.forEach(form => {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const button = form.querySelector('button');
    const originalHTML = button.innerHTML;

    if (input.value) {
      button.innerHTML = '<i class="fa-solid fa-check"></i>';
      input.value = '';
      setTimeout(() => {
        button.innerHTML = originalHTML;
      }, 2000);
    }
  });
});