// Filtrado de galería interactivo
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Actualizar botones activos
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filtrar galerías
      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-filter') === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Efecto de scroll suave para navegación
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Efecto de paralaje suave en hero
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    });
  }

  // Animación de fade-in para elementos al scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
  });

  // Zoom interactivo en imágenes de galería
  const galleryImages = document.querySelectorAll('.gallery-image-wrapper img, .featured-image');
  galleryImages.forEach(img => {
    img.addEventListener('click', function() {
      openImageViewer(this.src, this.alt);
    });
  });
});

// Visor de imágenes ampliado
function openImageViewer(src, alt) {
  const modal = document.createElement('div');
  modal.className = 'image-viewer-modal';
  modal.innerHTML = `
    <div class="image-viewer-content">
      <button class="image-viewer-close">&times;</button>
      <img src="${src}" alt="${alt}" class="image-viewer-image">
      <p class="image-viewer-caption">${alt}</p>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  modal.addEventListener('click', function(e) {
    if (e.target === modal || e.target.classList.contains('image-viewer-close')) {
      modal.remove();
    }
  });

  // Cerrar con Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.querySelector('.image-viewer-modal')) {
      document.querySelector('.image-viewer-modal').remove();
    }
  });
}

// Efecto de tipografía animada en títulos
document.addEventListener('DOMContentLoaded', function() {
  const titles = document.querySelectorAll('h2, h3, .hero-title');
  titles.forEach((title, index) => {
    title.style.animationDelay = `${index * 0.1}s`;
  });
});
