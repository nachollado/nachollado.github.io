// ============================================================
// UTILIDAD: debounce
// ============================================================
function debounce(fn, wait) {
    let t;
    return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
    };
}