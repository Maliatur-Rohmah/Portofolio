const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('i');
const yearEl = document.getElementById('year');
const contactForm = document.getElementById('contactForm');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.setAttribute('data-theme', 'dark');
  if (themeIcon) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', 'true');
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';

    if (isDark) {
      body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      if (themeIcon) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
      themeToggle.setAttribute('aria-pressed', 'false');
      return;
    }

    body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    if (themeIcon) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
    themeToggle.setAttribute('aria-pressed', 'true');
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const revealTargets = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealTargets.forEach((element) => revealObserver.observe(element));

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = contactForm.querySelector('button[type="submit"]');

    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Message Sent!';
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        contactForm.reset();
      }, 2000);
    }
  });
}
