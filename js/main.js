// ============================================================
// INICIALIZACIÓN
// ============================================================
async function init() {
  document.getElementById("current-year").textContent = new Date().getFullYear(); // Obtener año actual para el footer

  try {
    const response = await fetch('data/translations.json');
    translations = await response.json();
  } catch (error) {
    console.error("Error while loading language translations", error);
  }
  
  applyTranslations(currentLang);
  reserveFixedWidths();
  reserveFixedHeights();
  detectHeroImage();
}

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(init);
} else {
  init();
}