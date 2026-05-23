// ── TAB DISGUISE SYSTEM ─────────────────────────────────────────────
const DISGUISE_KEY = 'mgv_disguise';

function getDisguise() {
    try { 
        return JSON.parse(localStorage.getItem(DISGUISE_KEY)); 
    } catch { 
        return null; 
    }
}

function applyDisguise(icon, name) {
    const data = { icon, name };
    try { 
        localStorage.setItem(DISGUISE_KEY, JSON.stringify(data)); 
    } catch {}
    _applyToDOM(icon, name);
}

function clearDisguise() {
    try { 
        localStorage.removeItem(DISGUISE_KEY); 
    } catch {}
    
    // Fall back safely to the declared layout title id or string standard
    const realTitle = document.getElementById('page-title')?.textContent || 'My Game Vault';
    const base = window.location.pathname.includes('gamefiles') ? '../' : '';
    const defaultIcon = base + 'favicon.png';
    
    _applyToDOM(defaultIcon, realTitle);
}

function _applyToDOM(icon, name) {
    document.title = name;
    
    let favicon = document.getElementById('favicon-link') || document.querySelector("link[rel*='icon']");
    
    if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.id = 'favicon-link';
        document.head.appendChild(favicon);
    }
    
    // Node swapping technique to bypass aggressive browser tab caching loops
    const newFavicon = document.createElement('link');
    newFavicon.id = 'favicon-link';
    newFavicon.rel = 'icon';
    newFavicon.setAttribute('href', icon);
    
    if (icon.includes('.ico')) {
        newFavicon.setAttribute('type', 'image/x-icon');
    } else if (icon.includes('.webp')) {
        newFavicon.setAttribute('type', 'image/webp');
    } else {
        newFavicon.setAttribute('type', 'image/png');
    }
    
    if (favicon.parentNode) {
        favicon.parentNode.replaceChild(newFavicon, favicon);
    } else {
        document.head.appendChild(newFavicon);
    }
}

// SAFE EXECUTION ENGINE: Ensures execution fires safely during or after initial layout engine renders
function _initTabDisguise() {
    const saved = getDisguise();
    if (saved && saved.icon && saved.name) {
        _applyToDOM(saved.icon, saved.name);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _initTabDisguise);
} else {
    _initTabDisguise();
}
