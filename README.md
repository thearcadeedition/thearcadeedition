# 🎮 The Arcade Edition

An unblocked games site that runs HTML5 games. Hosted on GitHub Pages.

---

## How to Add a Game

### Step 1 — Add a cover image
Drop an image into `/gameimages/`. Any format works: `.png`, `.jpg`, `.webp`, `.gif`.  
Recommended: square images (1:1 ratio), at least 200×200px.

### Step 2 — Create a game page
Copy `/gamefiles/_TEMPLATE.html`, rename it (e.g. `mygame.html`), and edit two things:
- Replace both instances of `GAME TITLE` with the real name
- Replace `PASTE_GAME_URL_HERE` with the game's embed URL

```html
<iframe
    src="https://example.com/game"
    allowfullscreen
    allow="autoplay; fullscreen; gamepad"
></iframe>
```

Common embed sources:
| Source | URL format |
|--------|-----------|
| itch.io | `https://itch.io/embed-upload/GAMEID?color=0b0b0d` |
| Direct HTML5 | `path/to/game/index.html` (put folder inside `/gamefiles/`) |
| External site | Full `https://` URL |

### Step 3 — Register the game in games.js
Open `games.js` and add an entry to the `GAMES` array:

```js
{
    title: "My New Game",
    file:  "mygame.html",         // filename in /gamefiles/
    img:   "mygame.png",          // filename in /gameimages/
    tags:  ["action", "puzzle"]   // pick from list below
},
```

Available tags: `action` | `puzzle` | `racing` | `sports` | `horror` | `idle` | `platformer` | `rpg` | `sandbox` | `multiplayer` | `io`

That's it! Commit and push — GitHub Pages deploys automatically.

---

## Project Structure

```
/
├── index.html          ← main page (don't need to edit usually)
├── games.js            ← ← ← EDIT THIS to add games
├── favicon.png         ← site icon
├── assets/
│   ├── app.css         ← styles
│   └── app.js          ← logic (filtering, history, suggestions)
├── gamefiles/
│   ├── _TEMPLATE.html  ← copy this for each new game
│   └── *.html          ← one file per game
└── gameimages/
    └── *.png/jpg/webp  ← cover art
```

## GitHub Pages Setup

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to **Deploy from branch → main → / (root)**
4. Your site will be live at `https://USERNAME.github.io/REPO-NAME/`

## Customization

- **Site name**: edit the `<title>` and `.wordmark` text in `index.html`
- **Accent color**: change `--accent: #f5a623;` in `assets/app.css`
- **Tags**: add new tag buttons in `index.html` and tag your games in `games.js`
