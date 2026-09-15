document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = ['top', 'about', 'programs', 'why', 'gallery', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const navLinks = Array.from(mainNav.querySelectorAll('.nav-link'));

  const setActiveLink = () => {
    const scrollPos = window.scrollY + 120;
    let current = sections[0];

    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        current = section;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${current.id}`
      );
    });
  };

  window.addEventListener('scroll', setActiveLink, {
    passive: true
  });

  setActiveLink();


  /* ---------- Horizontal scroll strips ---------- */
  const stripCards = document.getElementById('stripCards');

  document.querySelector('.strip-prev')?.addEventListener('click', () => {
    stripCards.scrollBy({
      left: -240,
      behavior: 'smooth'
    });
  });

  document.querySelector('.strip-next')?.addEventListener('click', () => {
    stripCards.scrollBy({
      left: 240,
      behavior: 'smooth'
    });
  });


  /* ---------- Back to top button ---------- */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle(
      'visible',
      window.scrollY > 600
    );
  }, {
    passive: true
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });


  /* ---------- Enquiry form ---------- */
  const enquiryForm = document.getElementById('enquiryForm');
  const formNote = document.getElementById('formNote');

  enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(enquiryForm);
    const name = data.get('name');

    formNote.textContent =
      `Thanks, ${name}! An advisor will reach out shortly.`;

    enquiryForm.reset();
  });


  /* ---------- Cursor sparkle effect ---------- */
  let lastSparkleTime = 0;

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();

    // Create sparkles at a controlled rate
    if (now - lastSparkleTime < 45) return;

    lastSparkleTime = now;

    const sparkle = document.createElement('span');

    sparkle.className = 'cursor-sparkle';

    sparkle.style.left = `${e.clientX}px`;
    sparkle.style.top = `${e.clientY}px`;

    document.body.appendChild(sparkle);

    // Remove after animation
    setTimeout(() => {
      sparkle.remove();
    }, 650);
  });

});
