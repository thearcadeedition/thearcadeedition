// ── HISTORY ──────────────────────────────────────────────────
const HISTORY_KEY = 'mgv_history';

function getHistory() {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); }
    catch { return []; }
}

function recordPlay(game) {
    const history = getHistory();
    const idx = history.findIndex(g => g.file === game.file);
    if (idx !== -1) history.splice(idx, 1);
    history.unshift({ file: game.file, title: game.title });
    if (history.length > 60) history.length = 60;
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); }
    catch {}
}

// ── CARD BUILDER ─────────────────────────────────────────────
// Detects if we're inside gamefiles/ and adjusts paths
const inGameDir = window.location.pathname.includes('/gamefiles/');
const base = inGameDir ? '../' : '';

function buildCard(game) {
    const a = document.createElement('a');
    a.className = 'game-link';
    a.href = `${base}gamefiles/${game.file}`;

    const img = document.createElement('img');
    img.src = `${base}gameimages/${game.img}`;
    img.alt = game.title;
    img.loading = 'lazy';
    img.onerror = () => { img.src = `${base}favicon.png`; };

    const label = document.createElement('div');
    label.className = 'card-title';
    label.textContent = game.title;

    a.appendChild(img);
    a.appendChild(label);
    a.addEventListener('click', () => recordPlay(game));
    return a;
}

// ── HEADER SEARCH ─────────────────────────────────────────────
(function initHeaderSearch() {
    const toggle   = document.getElementById('search-toggle');
    const dropdown = document.getElementById('search-dropdown');
    const input    = document.getElementById('header-search');
    const results  = document.getElementById('search-results');
    if (!toggle || !dropdown || !input) return;

    toggle.addEventListener('click', () => {
        const open = dropdown.style.display !== 'none';
        dropdown.style.display = open ? 'none' : 'block';
        if (!open) setTimeout(() => input.focus(), 50);
    });

    input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        results.innerHTML = '';
        if (!q || typeof GAMES === 'undefined') return;
        const hits = GAMES.filter(g => g.title.toLowerCase().includes(q)).slice(0, 12);
        hits.forEach(g => results.appendChild(buildCard(g)));
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') { dropdown.style.display = 'none'; }
    });
    document.addEventListener('click', e => {
        if (!e.target.closest('.search-dropdown') && !e.target.closest('#search-toggle')) {
            dropdown.style.display = 'none';
        }
    });
}());

// ── NETWORK CANVAS ANIMATION ──────────────────────────────────
function initNetwork() {
    const canvas = document.getElementById('network-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, nodes;

    function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }

    function makeNodes(n) {
        return Array.from({length: n}, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
        }));
    }

    resize();
    nodes = makeNodes(55);
    window.addEventListener('resize', () => { resize(); nodes = makeNodes(55); });

    // Pulls your updated brand color variables dynamically from app.css
    const styleTokens = getComputedStyle(document.documentElement);
    const accentColor = styleTokens.getPropertyValue('--accent').trim() || '#f5a623';

    const DOT_COLOR  = accentColor + '8C'; // Appends transparency hex
    const MAX_DIST   = 130;

    function draw() {
        ctx.clearRect(0, 0, W, H);
        nodes.forEach(n => {
            n.x += n.vx; n.y += n.vy;
            if (n.x < 0 || n.x > W) n.vx *= -1;
            if (n.y < 0 || n.y > H) n.vy *= -1;
        });
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < MAX_DIST) {
                    const alpha = (1 - dist / MAX_DIST) * 0.2;
                    ctx.strokeStyle = accentColor;
                    ctx.globalAlpha = alpha;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                    ctx.globalAlpha = 1.0; // Reset alpha map
                }
            }
        }
        nodes.forEach(n => {
            ctx.fillStyle = DOT_COLOR;
            ctx.beginPath();
            ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
}

// ── KONAMI ────────────────────────────────────────────────────
(function() {
    const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let pos = 0;
    document.addEventListener('keydown', e => {
        pos = e.key === seq[pos] ? pos + 1 : (e.key === seq[0] ? 1 : 0);
        if (pos === seq.length) {
            pos = 0;
            const grid = document.getElementById('game-grid');
            if (grid) { grid.classList.add('rainbow-mode'); setTimeout(() => grid.classList.remove('rainbow-mode'), 5000); }
        }
    });
}());
