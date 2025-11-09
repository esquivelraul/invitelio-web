// Menú hamburguesa
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Cerrar menú móvil si está abierto
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animación de aparición
const fadeElements = document.querySelectorAll('.fade-in');

const appearOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    appearOnScroll.observe(element);
}
// En tu main.js - Lazy Loading
document.addEventListener("DOMContentLoaded", function() {
  const images = document.querySelectorAll("img[data-src]");
  
  const imgOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px 50px 0px"
  };
  
  const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
      observer.unobserve(img);
    });
  }, imgOptions);

  images.forEach(image => imgObserver.observe(image));
});
);