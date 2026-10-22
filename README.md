# Neon Surge

A fast neon arena-survival shooter for phones (landscape). The whole game is one file, `index.html`. It uses Canvas 2D and Web Audio and loads no external libraries or assets.

## Deploy on Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**, then pick this repository.
2. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
   - **Production branch:** `master`
3. **Save and Deploy**. Each push to `master` redeploys automatically.

Alternatively, drag the repository folder into **Pages → Upload assets** (Direct Upload).

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The game (all HTML, CSS and JS) |
| `manifest.webmanifest`, `icon*.png`, `icon.svg`, `apple-touch-icon.png` | "Add to Home Screen" app: fullscreen, landscape, icon |
| `sw.js` | Service worker, so the game opens offline after the first visit |
| `_headers` | Cloudflare Pages response headers (no-cache for `sw.js`, manifest type) |
| `_redirects` | Old `/neon-surge.html` link → `/` |

After you change `index.html`, the next visit loads the cached copy and fetches the new version in the background; the update appears on the launch after that. To force everyone onto a new version immediately, bump `CACHE` in `sw.js` (e.g. `neon-surge-v2`).

## How a run works

- Each **round** has 3–5 **waves**. Enemies arrive in groups. Kill all of them to clear the wave.
- Level-ups bank **upgrade picks**, which you spend between waves.
- Every round ends with a **boss** (Spiral Core → Ring Warden → The Summoner, then they come back tougher).
- After each boss: 20% HP repaired, a **boss reward** (strong epic upgrade, some with a cost), a bonus pick, and +1 reroll.

## Play

- Phone: open the site, turn the phone sideways, and tap *Tap to start*. For a full-screen app, use **Add to Home Screen**: Share menu → Add to Home Screen in Safari, or ⋮ → Install app in Chrome.
- Left thumb: move · double-tap left: dash · right thumb: aim & auto-fire.
- Laptop: WASD to move, mouse to aim, hold click to fire, Space to dash, P to pause.
- Add `#fps` to the URL to show an fps counter.

## Tweaking balance

All balance numbers are in the `CONFIG` object at the top of the script in `index.html`:
`CONFIG.rounds` (wave plans, group timing, scaling, heal, rerolls), `CONFIG.enemies` (each enemy's stats), `CONFIG.bosses`, `CONFIG.xp`, `CONFIG.caps`.
Upgrade effects are in `UPGRADES` (normal) and `EPICS` (boss rewards).
