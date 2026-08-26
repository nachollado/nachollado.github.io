// ============================================================
// DICCIONARIO DE TRADUCCIONES
// ============================================================
let translations = {};

let currentLang = localStorage.getItem('lang') || 'en';

function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    document.documentElement.lang = lang === 'cat' ? 'ca' : lang;
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    localStorage.setItem('lang', lang);
    currentLang = lang;

    const cvButton = document.getElementById('btn-download-cv');
    if (cvButton) {
        // Idiomas con CV disponible
        const availableCVs = ['en']; 
        
        // Si no está el idioma, descarga "en" por defecto.
        const pdfLang = availableCVs.includes(lang) ? lang : 'en';
        
        cvButton.href = `assets/docs/cv_nacho_llado_2026-${pdfLang}.pdf`;
    }

    reserveFixedWidths();
    reserveFixedHeights();
}
// Delegación de eventos: funciona igual para los botones de idioma
// del nav de escritorio y los del menú móvil sin duplicar listeners
document.addEventListener('click', (e) => {
    const langBtn = e.target.closest('.lang-btn');
    if (langBtn) applyTranslations(langBtn.dataset.lang);
});

// ============================================================
// ESTABILIDAD DE POSICIONES AL CAMBIAR DE IDIOMA
// ============================================================
let measureCanvas = null;

function measureMaxTextWidth(el, key) {
    if (!measureCanvas) measureCanvas = document.createElement('canvas');
    const ctx = measureCanvas.getContext('2d');
    const style = getComputedStyle(el);
    ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    let max = 0;
    Object.keys(translations).forEach(lang => {
    const text = translations[lang][key] || '';
    const width = ctx.measureText(text).width;
    if (width > max) max = width;
    });
    return Math.ceil(max);
}

function reserveFixedWidths() {
    document.querySelectorAll('[data-i18n-fixed-width]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const maxWidth = measureMaxTextWidth(el, key);
    el.style.minWidth = (maxWidth + 2) + 'px';
    });
}

function measureMaxHeight(el, key) {
    const style = getComputedStyle(el);
    const probe = document.createElement('div');
    probe.style.position = 'absolute';
    probe.style.visibility = 'hidden';
    probe.style.pointerEvents = 'none';
    probe.style.left = '-9999px';
    probe.style.top = '0';
    probe.style.width = el.clientWidth + 'px';
    probe.style.boxSizing = style.boxSizing;
    probe.style.font = style.font;
    probe.style.lineHeight = style.lineHeight;
    probe.style.letterSpacing = style.letterSpacing;
    probe.style.padding = style.padding;
    probe.style.whiteSpace = 'normal';
    document.body.appendChild(probe);

    let max = 0;
    Object.keys(translations).forEach(lang => {
    probe.textContent = translations[lang][key] || '';
    if (probe.scrollHeight > max) max = probe.scrollHeight;
    });

    document.body.removeChild(probe);
    return max;
}

function reserveFixedHeights() {
    document.querySelectorAll('[data-i18n-fixed-height]').forEach(el => {
    el.style.minHeight = '';
    const key = el.getAttribute('data-i18n');
    const maxHeight = measureMaxHeight(el, key);
    el.style.minHeight = maxHeight + 'px';
    });
}

window.addEventListener('resize', debounce(() => {
    reserveFixedWidths();
    reserveFixedHeights();
}, 150));