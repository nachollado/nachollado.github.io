// ============================================================
// TEMA CLARO / OSCURO
// ============================================================
const root = document.documentElement;

function setThemeIcon(isLight) {
    document.querySelectorAll('[data-theme-toggle] i').forEach(icon => {
    icon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    });
}

const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    root.setAttribute('data-theme', 'light');
}
setThemeIcon(savedTheme === 'light');

document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight) {
        root.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        setThemeIcon(false);
    } else {
        root.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        setThemeIcon(true);
    }
    });
});