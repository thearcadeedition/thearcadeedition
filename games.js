// =============================================================
//  HOW TO ADD A GAME
//  1. Add a cover image to /gameimages/  (any format: png, jpg, webp)
//  2. Add an HTML file to /gamefiles/   (see template at bottom of this file)
//  3. Add one entry to the GAMES array below
//
//  Each entry has:
//    title   – display name
//    file    – filename inside /gamefiles/ (no path needed)
//    img     – filename inside /gameimages/ (no path needed)
//    tags    – array of categories from:
//              action | puzzle | racing | sports | horror | idle
//              platformer | rpg | sandbox | multiplayer | io
// =============================================================

const GAMES = [

    // ── ACTION ───────────────────────────────────────────────
    {
        title: "Doom 1",
        file:  "doom1.html",
        img:   "doom1.png",
        tags:  ["action"]
    },
    {
        title: "Doom 2",
        file:  "doom2.html",
        img:   "doom2.webp",
        tags:  ["action"]
    },
    {
        title: "Half-Life",
        file:  "halflife.html",
        img:   "halflife.png",
        tags:  ["action"]
    },
    {
        title: "Counter-Strike 1.6",
        file:  "counterstrike1.6.html",
        img:   "counterstrike1.6.jpg",
        tags:  ["action", "multiplayer"]
    },
    {
        title: "Hotline Miami",
        file:  "hotlinemiami.html",
        img:   "hotlinemiami.png",
        tags:  ["action"]
    },
    {
        title: "Ultrakill",
        file:  "ultrakillgame.html",
        img:   "ultrakill.jpg",
        tags:  ["action"]
    },

    // ── PUZZLE ───────────────────────────────────────────────
    {
        title: "2048",
        file:  "2048game.html",
        img:   "2048.png",
        tags:  ["puzzle"]
    },
    {
        title: "Tetris",
        file:  "tetrisgame.html",
        img:   "tetris.png",
        tags:  ["puzzle"]
    },
    {
        title: "Cut the Rope",
        file:  "cuttherope.html",
        img:   "cuttherope.png",
        tags:  ["puzzle"]
    },
    {
        title: "Bloxorz",
        file:  "bloxorzgame.html",
        img:   "bloxorz.png",
        tags:  ["puzzle"]
    },
    {
        title: "Little Alchemy",
        file:  "littlealchemy.html",
        img:   "littlealchemy.png",
        tags:  ["puzzle"]
    },
    {
        title: "Little Alchemy 2",
        file:  "littlealchemy2.html",
        img:   "littlealchemy2.png",
        tags:  ["puzzle"]
    },

    // ── PLATFORMER ───────────────────────────────────────────
    {
        title: "Geometry Dash",
        file:  "geometrydash.html",
        img:   "geometrydash.png",
        tags:  ["platformer"]
    },
    {
        title: "Celeste",
        file:  "celestegame.html",
        img:   "celeste.png",
        tags:  ["platformer"]
    },
    {
        title: "Super Mario Bros",
        file:  "supermariobros.html",
        img:   "supermariobros.png",
        tags:  ["platformer"]
    },
    {
        title: "Hollow Knight",
        file:  "hollowknight.html",
        img:   "hollowknight.png",
        tags:  ["platformer", "rpg"]
    },
    {
        title: "Pizza Tower",
        file:  "pizzatower.html",
        img:   "pizzatower.png",
        tags:  ["platformer"]
    },
    {
        title: "Getting Over It",
        file:  "gettingoverit.html",
        img:   "gettingoverit.jpg",
        tags:  ["platformer"]
    },

    // ── RACING ───────────────────────────────────────────────
    {
        title: "Drift Hunters",
        file:  "drifthunters.html",
        img:   "drifthunters.png",
        tags:  ["racing"]
    },
    {
        title: "Moto X3M",
        file:  "motox3m.html",
        img:   "motox3m.png",
        tags:  ["racing"]
    },
    {
        title: "Moto X3M 2",
        file:  "motox3m2.html",
        img:   "motox3m2.png",
        tags:  ["racing"]
    },
    {
        title: "Polytrack",
        file:  "polytrack.html",
        img:   "polytrack.png",
        tags:  ["racing"]
    },

    // ── SANDBOX ──────────────────────────────────────────────
    {
        title: "Minecraft 1.21.4",
        file:  "minecraft1.21.4.html",
        img:   "minecraft.webp",
        tags:  ["sandbox", "multiplayer"]
    },
    {
        title: "Minecraft 1.12.2",
        file:  "minecraft1.12.2.html",
        img:   "minecraft.webp",
        tags:  ["sandbox"]
    },
    {
        title: "Terraria",
        file:  "terrariagame.html",
        img:   "terraria.png",
        tags:  ["sandbox", "rpg"]
    },
    {
        title: "People Playground",
        file:  "peopleplayground.html",
        img:   "peopleplayground.jpg",
        tags:  ["sandbox"]
    },

    // ── RPG ──────────────────────────────────────────────────
    {
        title: "Undertale",
        file:  "undertalegame.html",
        img:   "undertale.png",
        tags:  ["rpg"]
    },
    {
        title: "Omori",
        file:  "omorigame.html",
        img:   "omori.png",
        tags:  ["rpg"]
    },
    {
        title: "Deltarune",
        file:  "deltarunegame.html",
        img:   "deltarune.png",
        tags:  ["rpg"]
    },
    {
        title: "Pokemon Emerald",
        file:  "pokemonemerald.html",
        img:   "pokemonemerald.jpg",
        tags:  ["rpg"]
    },
    {
        title: "Pokemon Fire Red",
        file:  "pokemonfirered.html",
        img:   "pokemonfirered.jpg",
        tags:  ["rpg"]
    },

    // ── HORROR ───────────────────────────────────────────────
    {
        title: "Five Nights at Freddy's",
        file:  "fnaf.html",
        img:   "fnaf.jpg",
        tags:  ["horror"]
    },
    {
        title: "Five Nights at Freddy's 2",
        file:  "fnaf2.html",
        img:   "fnaf2.webp",
        tags:  ["horror"]
    },
    {
        title: "Buckshot Roulette",
        file:  "buckshotroulette.html",
        img:   "buckshotroulette.jpg",
        tags:  ["horror", "action"]
    },
    {
        title: "Slender: The Eight Pages",
        file:  "slender.html",
        img:   "slender.webp",
        tags:  ["horror"]
    },

    // ── IDLE / CLICKER ────────────────────────────────────────
    {
        title: "Cookie Clicker",
        file:  "cookieclicker.html",
        img:   "cookieclicker.png",
        tags:  ["idle"]
    },
    {
        title: "Vampire Survivors",
        file:  "vampiresurvivors.html",
        img:   "vampiresurvivors.png",
        tags:  ["idle", "action"]
    },
    {
        title: "Adventure Capitalist",
        file:  "adventurecapitalist.html",
        img:   "adventurecapitalist.png",
        tags:  ["idle"]
    },

    // ── IO ────────────────────────────────────────────────────
    {
        title: "Agar.io",
        file:  "agario.html",
        img:   "agario.jpg",
        tags:  ["io", "multiplayer"]
    },
    {
        title: "Slither.io",
        file:  "slitherio.html",
        img:   "slitherio.jpg",
        tags:  ["io", "multiplayer"]
    },
    {
        title: "Paper.io 2",
        file:  "paper.io2.html",
        img:   "paper.io2.jpg",
        tags:  ["io", "multiplayer"]
    },
    {
        title: "1v1.lol",
        file:  "1v1lol.html",
        img:   "1v1lol.webp",
        tags:  ["io", "multiplayer", "action"]
    },

    // ── SPORTS ───────────────────────────────────────────────
    {
        title: "Basketball Stars",
        file:  "basketballstars.html",
        img:   "basketballstars.jpg",
        tags:  ["sports"]
    },
    {
        title: "Soccer Random",
        file:  "soccerrandom.html",
        img:   "soccerrandom.jpg",
        tags:  ["sports", "multiplayer"]
    },
    {
        title: "Retro Bowl",
        file:  "retrobowl.html",
        img:   "retrobowl.png",
        tags:  ["sports"]
    },

    // ── MULTIPLAYER ───────────────────────────────────────────
    {
        title: "Among Us",
        file:  "amongus.html",
        img:   "amongus.png",
        tags:  ["multiplayer"]
    },
    {
        title: "Friday Night Funkin",
        file:  "fnf.html",
        img:   "fnf.webp",
        tags:  ["multiplayer"]
    },

    // ADD MORE GAMES BELOW THIS LINE ──────────────────────────
    // {
    //     title: "My New Game",
    //     file:  "mynewgame.html",
    //     img:   "mynewgame.png",
    //     tags:  ["action"]
    // },

];


// =============================================================
//  GAME PAGE TEMPLATE
//  Save as /gamefiles/GAMENAME.html
//  Replace the src URL with your actual game embed URL.
// =============================================================
//
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>GAME TITLE</title>
//     <style>
//         * { margin: 0; padding: 0; box-sizing: border-box; }
//         body { background: #000; display: flex; flex-direction: column; height: 100vh; font-family: sans-serif; }
//         header { background: #111; color: #fff; padding: 8px 16px; display: flex; align-items: center; gap: 12px; }
//         header a { color: #f5a623; text-decoration: none; font-size: 13px; }
//         iframe { flex: 1; border: none; width: 100%; }
//     </style>
// </head>
// <body>
//     <header>
//         <a href="/">← Back</a>
//         <span>GAME TITLE</span>
//     </header>
//     <iframe src="PASTE_GAME_URL_HERE" allowfullscreen></iframe>
// </body>
// </html>
