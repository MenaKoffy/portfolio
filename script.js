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
/* =========================================================
   CYBERPUNK COMIC — INTERACTIVE UPGRADE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) return;

  const hero = document.querySelector(".hero");
  const heroArt = document.querySelector(".hero-art");
  const heroCopy = document.querySelector(".hero-copy");
  const heroHud = document.querySelector(".hero-hud");
  const panels = document.querySelectorAll(".hero .side-panel");
  const stamp = document.querySelector(".hero .stamp");

  /* =========================
     1. HERO MOUSE PARALLAX
     ========================= */

  if (hero) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();

      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    });

    hero.addEventListener("mouseleave", () => {
      mouseX = 0;
      mouseY = 0;
    });

    const animateParallax = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      if (heroArt) {
        heroArt.style.transform =
          `translate3d(${currentX * -14}px, ${currentY * -10}px, 0) scale(1.025)`;
      }

      if (heroCopy) {
        heroCopy.style.transform =
          `translate3d(${currentX * 18}px, ${currentY * 12}px, 0)`;
      }

      if (heroHud) {
        heroHud.style.transform =
          `translate3d(${currentX * -24}px, ${currentY * -16}px, 0)`;
      }

      if (panels.length) {
        panels.forEach((panel, index) => {
          const speed = 10 + index * 7;

          panel.style.transform =
            `translate3d(${currentX * speed}px, ${currentY * speed}px, 0)`;
        });
      }

      if (stamp) {
        stamp.style.transform =
          `translate3d(${currentX * -30}px, ${currentY * -20}px, 0) rotate(-8deg)`;
      }

      requestAnimationFrame(animateParallax);
    };

    animateParallax();
  }


  /* =========================
     2. PROJECT / SKILL TILT
     ========================= */

  const tiltElements = document.querySelectorAll(
    ".skill-card, .project-card, .reel-frame, .contact-panel"
  );

  tiltElements.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();

      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateX = (0.5 - y) * 6;
      const rotateY = (x - 0.5) * 6;

      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });


  /* =========================
     3. MAGNETIC PORTFOLIO BUTTON
     ========================= */

  const buttons = document.querySelectorAll(".comic-button");

  buttons.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();

      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      button.style.transform =
        `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });


  /* =========================
     4. RANDOM GLITCH EFFECT
     ========================= */

  const title = document.querySelector(".hero-copy h1");

  if (title) {
    setInterval(() => {
      title.classList.add("glitch-active");

      setTimeout(() => {
        title.classList.remove("glitch-active");
      }, 180);
    }, 3200);
  }


  /* =========================
     5. SCROLL REVEAL
     ========================= */

  const revealItems = document.querySelectorAll(
    ".skill-card, .project-card, .reel-frame, .contact-panel"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealItems.forEach((item) => {
    item.classList.add("reveal-item");
    revealObserver.observe(item);
  });


  /* =========================
     6. ACTIVE NAVIGATION
     ========================= */

  const navLinks = document.querySelectorAll(".nav a");
  const sections = document.querySelectorAll("main section[id]");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px"
    }
  );

  sections.forEach((section) => navObserver.observe(section));


  /* =========================
     7. NEON HOVER SOUNDLESS PULSE
     ========================= */

  const neonItems = document.querySelectorAll(
    ".brand, .comic-button, .skill-card, .project-card, .hero-hud"
  );

  neonItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.classList.add("neon-hover");
    });

    item.addEventListener("mouseleave", () => {
      item.classList.remove("neon-hover");
    });
  });

});


/* =========================================================
   GLOBAL IMAGE LIGHTBOX — ALL PORTFOLIO PAGES
   ========================================================= */
(function initGlobalLightbox(){
  function setup(){
    const images=[...document.querySelectorAll('img')].filter(img=>{
      if(!img.src) return false;
      if(img.closest('.lightbox-overlay')) return false;
      if(img.closest('.brand')) return false;
      img.dataset.lightbox='true';
      return true;
    });
    if(!images.length) return;

    const overlay=document.createElement('div');
    overlay.className='lightbox-overlay';
    overlay.innerHTML=
      '<button class="lightbox-close" aria-label="Close image">×</button>'+
      '<button class="lightbox-prev" aria-label="Previous image">‹</button>'+
      '<div class="lightbox-image-wrap"><img class="lightbox-image" alt=""></div>'+
      '<button class="lightbox-next" aria-label="Next image">›</button>'+
      '<div class="lightbox-counter"></div>';
    document.body.appendChild(overlay);

    const viewer=overlay.querySelector('.lightbox-image');
    const counter=overlay.querySelector('.lightbox-counter');
    let current=0;

    function open(index){
      current=(index+images.length)%images.length;
      const source=images[current];
      viewer.src=source.currentSrc||source.src;
      viewer.alt=source.alt||'Portfolio image';
      counter.textContent=String(current+1).padStart(2,'0')+' / '+String(images.length).padStart(2,'0');
      overlay.classList.add('is-open');
      document.body.classList.add('lightbox-open');
    }
    function close(){
      overlay.classList.remove('is-open');
      document.body.classList.remove('lightbox-open');
    }
    function move(step){open(current+step)}

    images.forEach((img,index)=>img.addEventListener('click',event=>{
      event.preventDefault();
      event.stopPropagation();
      open(index);
    }));
    overlay.querySelector('.lightbox-close').addEventListener('click',close);
    overlay.querySelector('.lightbox-prev').addEventListener('click',()=>move(-1));
    overlay.querySelector('.lightbox-next').addEventListener('click',()=>move(1));
    overlay.addEventListener('click',event=>{if(event.target===overlay) close()});
    document.addEventListener('keydown',event=>{
      if(!overlay.classList.contains('is-open')) return;
      if(event.key==='Escape') close();
      if(event.key==='ArrowLeft') move(-1);
      if(event.key==='ArrowRight') move(1);
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',setup);
  else setup();
})();
