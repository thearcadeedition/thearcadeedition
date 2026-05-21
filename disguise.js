// ── TAB DISGUISE ─────────────────────────────────────────────
// Saved to localStorage so it persists across every page navigation.

const DISGUISE_KEY = 'mgv_disguise';

function getDisguise() {
    try { return JSON.parse(localStorage.getItem(DISGUISE_KEY)); }
    catch { return null; }
}

function applyDisguise(emoji, name) {
    const data = { emoji, name };
    try { localStorage.setItem(DISGUISE_KEY, JSON.stringify(data)); }
    catch {}
    _applyToDOM(emoji, name);
}

function clearDisguise() {
    try { localStorage.removeItem(DISGUISE_KEY); }
    catch {}
    // Restore defaults (each page sets its own real title via page-title id)
    const realTitle = document.getElementById('page-title')?.getAttribute('data-real') || document.title;
    document.title = realTitle;
    const favicon = document.getElementById('favicon-link');
    if (favicon) favicon.href = '../favicon.png'.replace('../', window.location.pathname.includes('gamefiles') ? '../' : '');
}

function _applyToDOM(emoji, name) {
    document.title = `${emoji} ${name}`;
    // Update favicon to an emoji canvas favicon
    try {
        const canvas = document.createElement('canvas');
        canvas.width = 32; canvas.height = 32;
        const ctx = canvas.getContext('2d');
        ctx.font = '28px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(emoji, 16, 18);
        const favicon = document.getElementById('favicon-link');
        if (favicon) favicon.href = canvas.toDataURL('image/png');
    } catch(e) {}
}

// Auto-apply saved disguise on every page load
(function() {
    const saved = getDisguise();
    if (saved && saved.emoji && saved.name) {
        _applyToDOM(saved.emoji, saved.name);
    }
})();
