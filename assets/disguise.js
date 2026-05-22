// ── TAB DISGUISE SYSTEM ─────────────────────────────────────────────
// Saves properties to localStorage to cleanly persist assets across subdirectories

const DISGUISE_KEY = 'mgv_disguise';

function getDisguise() {
    try { return JSON.parse(localStorage.getItem(DISGUISE_KEY)); }
    catch { return null; }
}

function applyDisguise(icon, name) {
    const data = { icon, name };
    try { localStorage.setItem(DISGUISE_KEY, JSON.stringify(data)); }
    catch {}
    _applyToDOM(icon, name);
}

function clearDisguise() {
    try { localStorage.removeItem(DISGUISE_KEY); }
    catch {}
    
    // Restore clean default title patterns
    const realTitle = document.getElementById('page-title')?.textContent || 'My Game Vault';
    document.title = realTitle;
    
    const favicon = document.getElementById('favicon-link');
    if (favicon) {
        const base = window.location.pathname.includes('gamefiles') ? '../' : '';
        favicon.href = base + 'favicon.png';
    }
}

function _applyToDOM(icon, name) {
    // Sets window titles directly without prepended emoji characters
    document.title = name;
    
    // Maps the official image address straight onto the target element head links
    const favicon = document.getElementById('favicon-link');
    if (favicon) {
        favicon.href = icon;
    } else {
        // Fallback generator if head link configuration missing element ID
        let link = document.querySelector("link[rel*='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.id = 'favicon-link';
        link.href = icon;
    }
}

// Auto-execution hook logic on subpage load instances
(function() {
    const saved = getDisguise();
    if (saved && saved.icon && saved.name) {
        _applyToDOM(saved.icon, saved.name);
    }
})();
