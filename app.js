// ── HISTORY ─────────────────────────────────────────────────
const HISTORY_KEY = 'mgv_history';

function getHistory() {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); }
    catch { return []; }
}

function recordPlay(file, title) {
    const history = getHistory();
    const idx = history.findIndex(g => g.file === file);
    if (idx !== -1) history.splice(idx, 1);
    history.unshift({ file, title });
    if (history.length > 60) history.length = 60;
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); }
    catch {}
}

// ── SUGGESTIONS ─────────────────────────────────────────────
function getSuggestions() {
    const history = getHistory();
    if (history.length < 2) return [];

    // Tally tags from recent plays
    const tagCounts = {};
    history.slice(0, 20).forEach(g => {
        const match = GAMES.find(x => x.file === g.file);
        if (!match) return;
        (match.tags || []).forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + 1; });
    });

    const played = new Set(history.map(g => g.file));
    return GAMES
        .filter(g => !played.has(g.file))
        .map(g => ({
            ...g,
            score: (g.tags || []).reduce((n, t) => n + (tagCounts[t] || 0), 0),
        }))
        .filter(g => g.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8);
}

// ── CARD BUILDER ─────────────────────────────────────────────
function buildCard(game) {
    const a = document.createElement('a');
    a.className = 'game-link';
    a.href = `gamefiles/${game.file}`;

    const img = document.createElement('img');
    img.src = `gameimages/${game.img}`;
    img.alt = `${game.title} cover`;
    img.loading = 'lazy';

    // Fallback image if cover missing
    img.onerror = () => { img.src = 'favicon.png'; };

    const label = document.createElement('div');
    label.textContent = game.title;

    a.appendChild(img);
    a.appendChild(label);
    a.addEventListener('click', () => recordPlay(game.file, game.title));
    return a;
}

// ── DOM REFS ─────────────────────────────────────────────────
const grid           = document.getElementById('game-grid');
const searchEl       = document.getElementById('search');
const tagFiltersEl   = document.getElementById('tag-filters');
const noResults      = document.getElementById('no-results');
const forYouSection  = document.getElementById('for-you');
const suggestionsRow = document.getElementById('suggestions-row');

// ── SORT & RENDER ALL GAMES ───────────────────────────────────
const sorted = [...GAMES].sort((a, b) =>
    a.title.localeCompare(b.title, undefined, { numeric: true })
);

searchEl.placeholder = `search ${sorted.length} games…`;

const frag = document.createDocumentFragment();
sorted.forEach(g => frag.appendChild(buildCard(g)));
grid.appendChild(frag);

// ── FILTERING ─────────────────────────────────────────────────
let activeTag   = 'all';
let searchQuery = '';

function filterGames() {
    const q = searchQuery.trim().toLowerCase();
    let visible = 0;

    grid.querySelectorAll('.game-link').forEach(a => {
        const title  = (a.querySelector('div')?.textContent || '').toLowerCase();
        const file   = a.getAttribute('href')?.replace('gamefiles/', '') || '';
        const game   = GAMES.find(g => g.file === file);
        const gameTags = game?.tags || [];

        const titleOk = !q || title.includes(q);
        const tagOk   = activeTag === 'all' || gameTags.includes(activeTag);
        const show    = titleOk && tagOk;

        a.style.display = show ? '' : 'none';
        if (show) visible++;
    });

    noResults.style.display = visible === 0 ? 'block' : 'none';
}

// ── SEARCH ────────────────────────────────────────────────────
searchEl.addEventListener('input', () => {
    searchQuery = searchEl.value;
    filterGames();
});

searchEl.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        searchEl.value = '';
        searchQuery = '';
        filterGames();
    }
});

// ── TAG FILTERS ───────────────────────────────────────────────
tagFiltersEl.addEventListener('click', e => {
    const btn = e.target.closest('.tag-btn');
    if (!btn) return;
    document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeTag = btn.dataset.tag;
    filterGames();
});

// ── FOR YOU SHELF ─────────────────────────────────────────────
const suggestions = getSuggestions();
if (suggestions.length >= 3) {
    suggestions.forEach(g => suggestionsRow.appendChild(buildCard(g)));
    forYouSection.style.display = 'block';
}

// ── HISTORY BADGE IN FOOTER ───────────────────────────────────
const played = getHistory().length;
if (played > 0) {
    const fp = document.querySelector('.site-footer p');
    if (fp) {
        const badge = document.createElement('span');
        badge.style.color = 'var(--text-muted)';
        badge.textContent = ` — ${played} game${played !== 1 ? 's' : ''} played`;
        fp.appendChild(badge);
    }
}

// ── EASTER EGGS ───────────────────────────────────────────────
(function quirks() {
    // Konami code → rainbow mode
    const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let pos = 0;
    document.addEventListener('keydown', e => {
        pos = e.key === seq[pos] ? pos + 1 : (e.key === seq[0] ? 1 : 0);
        if (pos === seq.length) {
            pos = 0;
            grid.classList.add('rainbow-mode');
            setTimeout(() => grid.classList.remove('rainbow-mode'), 5000);
        }
    });

    // Triple-click logo → spin
    const logoImg = document.querySelector('.wordmark img');
    if (logoImg) {
        let taps = [];
        logoImg.addEventListener('click', e => {
            e.preventDefault();
            const now = Date.now();
            taps = taps.filter(t => now - t < 700);
            taps.push(now);
            if (taps.length >= 3) {
                taps = [];
                logoImg.classList.add('spinning');
                logoImg.addEventListener('animationend', () => logoImg.classList.remove('spinning'), { once: true });
            }
        });
    }

    // Late-night tooltip
    const hour = new Date().getHours();
    if (hour >= 1 && hour <= 4) {
        const wm = document.querySelector('.wordmark');
        if (wm) wm.setAttribute('title', 'go to sleep');
    }
}());
