<script>
  // NAV SCROLL
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // HAMBURGER
  document.getElementById('hamburger').addEventListener('click', function() {
    const links = document.querySelector('.nav-links');
    const isOpen = links.style.display === 'flex';
    links.style.cssText = isOpen ? '' :
      'display:flex;flex-direction:column;position:fixed;top:70px;left:0;right:0;background:rgba(10,10,18,0.98);padding:30px;gap:24px;border-bottom:1px solid rgba(201,168,76,0.15);z-index:999;';
  });

  // COUNTER ANIMATION
  function animateCounters() {
    document.querySelectorAll('[data-target]').forEach(el => {
      const target = parseInt(el.dataset.target);
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current).toLocaleString() + (target >= 1000 ? '+' : '');
        if (current >= target) clearInterval(timer);
      }, 24);
    });
  }
  // Intersection observer for stats
  const statsObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounters(); statsObs.disconnect(); }});
  }, { threshold: 0.4 });
  statsObs.observe(document.getElementById('stats'));

  // FORM SUBMIT
  function handleFormSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('joinForm');
    const success = document.getElementById('formSuccess');
    form.style.display = 'none';
    success.style.display = 'block';
    // Scroll into view
    document.getElementById('regForm').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // GALLERY MODAL
  function openGalleryModal(title) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('galleryModal').classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    document.getElementById('galleryModal').classList.remove('active');
    document.body.style.overflow = '';
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // SCROLL REVEAL
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.pillar-card, .video-card, .gallery-item, .stat-item, .join-benefit').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObs.observe(el);
  });
</script>