// ============================================================
// MENÚ HAMBURGUESA PARA MÓVIL
// ============================================================
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const hamburgerIcon = hamburgerBtn.querySelector('i');

function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerIcon.className = 'fa-solid fa-bars';
}

hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    hamburgerIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
});

document.getElementById('mobileNavLinks').querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Si el usuario amplía la ventana y deja de ser vista móvil, cerramos el panel
window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 768) closeMobileMenu();
}, 150));

// ============================================================
//    DETECCIÓN DE IMAGEN DE FONDO DEL HERO
//
//    Comprueba si la ruta definida en --hero-bg-image carga de
//    verdad. Si existe, añade la clase .has-image al hero para
//    activar el oscurecido y el degradado inferior. Si no existe
//    (como pasa mientras no hayas subido tu foto), no hace nada
//    y el hero se queda transparente mostrando los mismos blobs
//    que el resto de la página, sin ningún corte visible.
// ============================================================
function extractUrlFromCssValue(value) {
    const match = value && value.match(/url\((['"]?)(.*?)\1\)/);
    return match ? match[2] : null;
}

function detectHeroImage() {
    const heroEl = document.querySelector('.hero');
    if (!heroEl) return;
    const raw = getComputedStyle(document.documentElement).getPropertyValue('--hero-bg-image').trim();
    const url = extractUrlFromCssValue(raw);
    if (!url) {
    heroEl.classList.remove('has-image');
    return;
    }
    const testImg = new Image();
    testImg.onload = () => heroEl.classList.add('has-image');
    testImg.onerror = () => heroEl.classList.remove('has-image');
    testImg.src = url;
}

// ============================================================
// ANIMACIÓN SCROLL
// ============================================================
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('visible');
    }
    });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// ============================================================
// DEGRADADO DEL HERO EN SCROLL
// ============================================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
      // Si el usuario hace scroll más de 50px hacia abajo, añade la clase
      if (window.scrollY > 15) {
        hero.classList.add('scrolled');
      } else {
        hero.classList.remove('scrolled');
      }
    }
  });