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

The page is network-first: when online you always get the newest `index.html`; offline the cached copy is used. Bump `CACHE` in `sw.js` only when icons or the manifest change.

## How a run works

- Each **round** has 3–5 **waves**. Enemies arrive in groups. Kill all of them to clear the wave.
- Level-ups bank **upgrade picks** (shown as `+N UP` next to the XP bar). You spend them all at the end of the round, so fights are never interrupted.
- Every round ends with a **boss** (Spiral Core → Ring Warden → The Summoner, then they come back tougher).
- After each boss: 25% HP repaired, a **boss reward** (strong epic upgrade, some with a cost), a bonus pick, and +1 reroll.

## Play

- Phone: open the site, turn the phone sideways, and tap *Tap to start*. For a full-screen app, use **Add to Home Screen**: Share menu → Add to Home Screen in Safari, or ⋮ → Install app in Chrome.
- Left thumb: move · double-tap left: dash · right thumb: aim & auto-fire.
- Laptop: WASD to move, mouse to aim, hold click to fire, Space to dash, P to pause.
- Add `#fps` to the URL to show an fps counter.

## Tweaking balance

All balance numbers are in the `CONFIG` object at the top of the script in `index.html`:
`CONFIG.rounds` (wave plans, group timing, scaling, heal, rerolls), `CONFIG.enemies` (each enemy's stats), `CONFIG.bosses`, `CONFIG.xp`, `CONFIG.caps`.
Upgrade strength is in `CONFIG.upgrades` (stacks add up, they don't multiply) and caps in `CONFIG.caps`.
Upgrade cards are in `UPGRADES` (normal) and `EPICS` (boss rewards).

Enemies adapt to your build: their HP scales with the round **and** with your firepower raised to
`CONFIG.rounds.powerExponent` (0 = upgrades are pure gain, 1 = fully cancelled; default 0.5).
Raise it to make strong builds less dominant, lower it to make upgrades feel stronger.
