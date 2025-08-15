// Mobile menu (optional future expansion)
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        document.querySelector(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Simple reveal on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Lightweight gallery lightbox
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.style.cssText = `
    position:fixed; inset:0; background:rgba(0,0,0,.85); display:none; align-items:center; justify-content:center; z-index:1000;
  `;
  const img = document.createElement('img');
  img.style.cssText = 'max-width:92vw; max-height:88vh; border-radius:12px; box-shadow:0 20px 60px rgba(0,0,0,.5);';
  lightbox.appendChild(img);
  document.body.appendChild(lightbox);
  lightbox.addEventListener('click', () => lightbox.style.display = 'none');

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', () => {
      img.src = el.getAttribute('src');
      lightbox.style.display = 'flex';
    });
  });
});

// Micro-animations
const style = document.createElement('style');
style.textContent = `
  .reveal{ opacity:0; transform: translateY(18px); transition: all .6s ease; }
  .reveal.in{ opacity:1; transform:none; }
`;
document.head.appendChild(style);
