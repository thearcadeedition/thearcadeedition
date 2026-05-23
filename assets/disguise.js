// ── TAB DISGUISE SYSTEM ─────────────────────────────────────────────
// Saves properties to localStorage to cleanly persist assets across subdirectories

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
    
    // Restore clean default title patterns
    const realTitle = document.getElementById('page-title')?.textContent || 'My Game Vault';
    
    // Determine default icon path depending on if we are in a subdirectory folder
    const base = window.location.pathname.includes('gamefiles') ? '../' : '';
    const defaultIcon = base + 'favicon.png';
    
    _applyToDOM(defaultIcon, realTitle);
}

function _applyToDOM(icon, name) {
    // 1. Instantly update the document/tab text title
    document.title = name;
    
    // 2. Locate the existing favicon link or fallback icon tag
    let favicon = document.getElementById('favicon-link') || document.querySelector("link[rel*='icon']");
    
    // 3. Build the icon tag structure if it doesn't exist yet
    if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.id = 'favicon-link';
        document.head.appendChild(favicon);
    }
    
    // 4. Force browser redraw by cloning the element, altering attributes, and replacing it
    const newFavicon = favicon.cloneNode(true);
    newFavicon.setAttribute('href', icon);
    
    // Correctly apply explicit mime-types to guarantee cross-browser compatibility
    if (icon.includes('.ico')) {
        newFavicon.setAttribute('type', 'image/x-icon');
    } else if (icon.includes('.webp')) {
        newFavicon.setAttribute('type', 'image/webp');
    } else {
        newFavicon.setAttribute('type', 'image/png');
    }
    
    // Hot-swap the old element in the head block out for the freshly modified one
    favicon.parentNode.replaceChild(newFavicon, favicon);
}

// Auto-execution hook logic on subpage load instances
(function() {
    const saved = getDisguise();
    if (saved && saved.icon && saved.name) {
        _applyToDOM(saved.icon, saved.name);
    }
})();
