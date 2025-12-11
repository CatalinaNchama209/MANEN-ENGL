// Hide loader + set year + start particles
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) loader.classList.add('hidden');
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
  initParticles();
});

// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.querySelectorAll('.nav .nav-link').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('open'));
  });
}

// Reveal on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Project modal data
const projects = {
  p1: {
    title: 'UniQAMS — Quality Assurance System',
    subtitle: 'Accreditation, assessments & auditing via a centralized web app.',
    img: 'assets/qapic2.jpg',
    body: '<p><strong>Goal:</strong> Replace manual QA workflows with a centralized, trackable platform.</p><ul class="bullets"><li>Information architecture</li><li>Responsive components</li><li>Feedback loops</li></ul>',
    link: 'assets/QA.pdf'
  },
  p2: {
    title: 'Color Replacement in Image',
    subtitle: 'Interactive Web Tool • Computer Vision',
    img: 'assets/colorpic.PNG',
    body: '<p><strong>Experience a smart image editing tool:</strong> Upload any image, select a color, and instantly transform it into the shade you want.</p>',
    link: 'https://ivdqey2ytnqdeg8rrvattq.streamlit.app'
  },
  p6: {
    title: 'PAWPAL – Dog Owner',
    subtitle: 'Pet Management App UI/UX',
    img: 'assets/dm.png',
    body: '<p>Una interfaz centrada en el usuario para dueños de perros. Incluye perfiles de mascotas, gestión de historiales de vacunación y más.</p>',
    link: 'https://www.figma.com'
  },
  p5: {
    title: 'MANEN Marketplace',
    subtitle: 'E-commerce Platform UI/UX',
    img: 'assets/Inicio.png',
    body: '<p>Un marketplace digital confiable para Guinea Ecuatorial con diseño responsive y flujo de compra/venta simplificado.</p>',
    link: 'https://www.figma.com'
  },
  // VA Projects (PDF links)
  va1: { title: 'VA Project — Scheduling & Calendar', subtitle: 'Workflow diagrams + requirements', img: 'assets/VA1.jpg', body: '<p>Automated scheduling, reminders, and task sync.</p>', link: 'assets/sal.pdf' },
  va2: { title: 'VA Project — Email & Task Automation', subtitle: 'Inbox management workflows', img: 'assets/VA2.jpg', body: '<p>Smart email automation and task delegation.</p>', link: 'assets/VA2.pdf' },
  va3: { title: 'VA Project — Customer Support', subtitle: 'Ticketing system + client satisfaction', img: 'assets/VA3.jpg', body: '<p>Reliable customer support system with VA integration.</p>', link: 'assets/ecomer.pdf' },
  va4: { title: 'VA Project — Data Entry Automation', subtitle: 'Automated data entry + workflow', img: 'assets/VA4.png', body: '<p>Reliable automation of repetitive workflows.</p>', link: 'assets/VA4.pdf' }
};

// Modal references
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalSubtitle = document.getElementById('modal-subtitle');
const modalImg = document.getElementById('modal-img');
const modalBody = document.getElementById('modal-body');
const modalLink = document.getElementById('modal-link');

// Open project function
function openProject(key) {
  const p = projects[key];
  if (!p) return;
  if (key.startsWith('va')) {
    window.open(p.link, '_blank');
    return;
  }
  modalTitle.textContent = p.title;
  modalSubtitle.textContent = p.subtitle;
  modalImg.src = p.img;
  modalImg.alt = p.title;
  modalBody.innerHTML = p.body;
  if (p.link && p.link !== '#') {
    modalLink.style.display = 'inline-block';
    modalLink.href = p.link;
    modalLink.textContent = '🚀 Try it Live';
    modalLink.target = '_blank';
  } else {
    modalLink.style.display = 'none';
  }
  modal.showModal();
}

// Close modal on button click
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.onclick = () => modal.close();
});

// Bind project-card click/keyboard handlers (works after HTML is parsed)
function bindProjectCardEvents() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openProject(card.dataset.project));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProject(card.dataset.project);
      }
    });
  });
}
bindProjectCardEvents();

// Close when clicking outside content
modal?.addEventListener('click', (e) => {
  if (e.target === modal) modal.close();
});

// Close with ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') modal.close();
});

// Background particles (igual que antes)
function initParticles() {
  const c = document.getElementById('bg');
  if (!c) return;
  const ctx = c.getContext('2d');
  const DPR = window.devicePixelRatio || 1;
  let w, h, particles = [];

  function resize() {
    w = c.width = innerWidth * DPR;
    h = c.height = innerHeight * DPR;
    c.style.width = innerWidth + 'px';
    c.style.height = innerHeight + 'px';
    particles = new Array(80).fill(0).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.2 * DPR,
      vy: (Math.random() - 0.5) * 0.2 * DPR
    }));
  }
  resize();
  window.addEventListener('resize', resize);

  function step() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(74,200,249,0.35)';
    const linkDist = 140 * DPR;
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.2 * DPR, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = 'rgba(3,108,150,0.18)';
    ctx.lineWidth = 1 * DPR;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.hypot(dx, dy);
        if (d < linkDist) {
          ctx.globalAlpha = 1 - d / linkDist;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(step);
  }
  step();
}

// Lightbox for Certificates with Gallery Navigation (igual)
const certImages = document.querySelectorAll('.cert-img');
const lightbox = document.getElementById('lightbox');
const lightboxFrame = document.getElementById('lightbox-frame');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.lightbox .prev');
const nextBtn = document.querySelector('.lightbox .next');

let currentIndex = 0;
let certList = Array.from(certImages).map(img => img.getAttribute('data-pdf'));
const designImages = document.querySelectorAll('.design-img');
let designList = Array.from(designImages).map(img => img.src);

designImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    certList = designList;
    openLightbox(currentIndex);
  });
});

function openLightbox(index) {
  currentIndex = index;
  if (!lightbox || !lightboxFrame) return;
  lightboxFrame.src = certList[currentIndex];
  lightbox.style.display = 'block';
}
function closeLightbox() {
  if (!lightbox || !lightboxFrame) return;
  lightbox.style.display = 'none';
  lightboxFrame.src = '';
}
function showNext() {
  currentIndex = (currentIndex + 1) % certList.length;
  lightboxFrame.src = certList[currentIndex];
}
function showPrev() {
  currentIndex = (currentIndex - 1 + certList.length) % certList.length;
  lightboxFrame.src = certList[currentIndex];
}
certImages.forEach((img, index) => {
  img.addEventListener('click', () => openLightbox(index));
});
if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
if (nextBtn) nextBtn.addEventListener('click', showNext);
if (prevBtn) prevBtn.addEventListener('click', showPrev);
window.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
  if (lightbox && lightbox.style.display === 'block') {
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'Escape') closeLightbox();
  }
});

/* -------------------------
   Carousel: inicialización
   ------------------------- */
function initCarousels() {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const cards = Array.from(track.querySelectorAll('.project-card'));
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');

    if (!cards.length) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      return;
    }

    let index = 0;
    let autoplayTimer = null;

    function getGap() {
      // read gap from computed style (fallback 18)
      const style = getComputedStyle(track);
      return parseFloat(style.gap || style.columnGap || '18') || 18;
    }

    function calculate() {
      const gap = getGap();
      const cardRect = cards[0].getBoundingClientRect();
      const cardWidth = cardRect.width;
      const viewportWidth = carousel.clientWidth - 0; // padding already accounted visually
      const visibleCount = Math.max(1, Math.floor((viewportWidth + gap) / (cardWidth + gap)));
      const maxIndex = Math.max(0, cards.length - visibleCount);
      return { gap, cardWidth, visibleCount, maxIndex };
    }

    function update() {
      const { gap, cardWidth, visibleCount, maxIndex } = calculate();
      if (index > maxIndex) index = maxIndex;
      const translateX = index * (cardWidth + gap);
      track.style.transform = `translateX(-${translateX}px)`;
      // enable/disable buttons
      if (prevBtn) prevBtn.disabled = index === 0;
      if (nextBtn) nextBtn.disabled = index >= maxIndex;
      // hide buttons if everything fits
      if (cards.length <= visibleCount) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        stopAutoplay();
      } else {
        if (prevBtn) prevBtn.style.display = '';
        if (nextBtn) nextBtn.style.display = '';
      }
    }

    function prev() {
      index = Math.max(0, index - 1);
      update();
      resetAutoplay();
    }
    function next() {
      const { maxIndex } = calculate();
      index = Math.min(maxIndex, index + 1);
      update();
      resetAutoplay();
    }

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    function startAutoplay() {
      stopAutoplay();
      const { maxIndex } = calculate();
      if (maxIndex <= 0) return;
      autoplayTimer = setInterval(() => {
        const { maxIndex } = calculate();
        index = (index >= maxIndex) ? 0 : (index + 1);
        update();
      }, 4500);
    }
    function stopAutoplay() {
      if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
    }
    function resetAutoplay() { stopAutoplay(); startAutoplay(); }

    // allow swiping (basic)
    let startX = 0;
    let isDown = false;
    track.addEventListener('pointerdown', (e) => {
      isDown = true;
      startX = e.clientX;
      track.style.transition = 'none';
    });
    window.addEventListener('pointerup', (e) => {
      if (!isDown) return;
      isDown = false;
      track.style.transition = '';
      const dx = e.clientX - startX;
      const threshold = 40;
      if (dx > threshold) prev();
      else if (dx < -threshold) next();
    });

    // resize handler
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { update(); }, 120);
    });

    // init
    setTimeout(() => { update(); startAutoplay(); }, 120);
  });
}

// iniciar carrusel después de que el DOM esté listo
window.addEventListener('DOMContentLoaded', () => {
  initCarousels();
});

// --------------------------------------
// (Código restante ya incluido arriba)
// --------------------------------------

