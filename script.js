const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

const navLinks = [...document.querySelectorAll('.nav a')];
const sections = [...document.querySelectorAll('main section[id]')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => observer.observe(section));

// Small comic-style reveal effect as panels enter the viewport.
const reveals = document.querySelectorAll('.skill-card, .project-card, .story-copy, .portrait-panel, .reel-frame, .contact-panel');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.animate([
        { opacity: 0, transform: 'translateY(28px) rotate(-1deg)' },
        { opacity: 1, transform: getComputedStyle(entry.target).transform }
      ], { duration: 600, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' });
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
reveals.forEach(el => revealObserver.observe(el));

// Mobile navigation.
const menu = document.querySelector('.menu');
menu?.addEventListener('click', () => {
  document.querySelector('.nav')?.classList.toggle('mobile-open');
});
