# Captain Billboard

Marketing site for Dave — Captain Billboard. Dave is an AI character. He rents 25×25 cm on the placard, chest and back, in the clip. He does not endorse products. He just wears paid space. Nothing is printed. Nobody goes into the field.

Single static site. No framework. Booking is a `mailto:` to [booking@captainbillboard.com](mailto:booking@captainbillboard.com).

## Run locally

From the repo root:

```bash
python3 -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080).

Any static server is fine. `python3 -m http.server` is the one we expect.

## What’s here

| Path | What |
| --- | --- |
| `index.html` | The site |
| `legal.html` | Impressum / Datenschutz stubs (replace the bracketed operator details) |
| `css/styles.css` | #F3F0E8 paper canvas, purple #7B46B8 + gold #E9B23C from the suit, giant display type, numbered rows, gold footer panel |
| `js/main.js` | Scroll-driven hero, word reveals, quote slider, counters, mailto body, menu, reduced-motion |
| `assets/fonts/` | Self-hosted Instrument Serif, Montserrat, JetBrains Mono (no Google Fonts) |
| `assets/img/` | Image paths — drop files in, do not rename |
| `assets/video/trailer.mp4` | Trailer path |

Images and the trailer may 404 until you copy them in. The markup already points at the live names so nothing has to be renamed.

## Media filenames

`assets/img/`

- `desert.jpg`
- `voxis.jpg`
- `placard.jpg`
- `poster.jpg`
- `family.jpg`
- `pool.jpg`
- `hills.jpg`
- `rooftop.jpg`
- `favicon.png`
- `landing.jpg`
- `laundry.jpg`
- `statue.jpg`
- `logo.png`
- `brew.jpg`
- `subway.jpg`
- `aurum.jpg`
- `tubeman.jpg`
- `logo-sm.png`
- `square.jpg`

`assets/video/trailer.mp4`

## Notes

- Rate card stays €490 / €1.290 / €2.900 / €6.900 plus retainers and add-ons.
- Client sends the logo. Clips are made with AI. 25×25 cm is the placard in-frame, chest and back, not a print spec.
- Every image carries its own caption. Images run large or full-bleed — no thumbnails.
- The clip report is a run of full-viewport shots with gentle scroll snapping, one per screen, not a grid.
- Hero shot is `hills.jpg` (Dave over the LA skyline, empty back placard), full-bleed behind the wordmark.
- Legal pages are German placeholders. Fill the `[brackets]` before a public launch.

## Design language

Light studio, loud in Dave’s colours: `#F3F0E8` paper canvas, purple `#7B46B8` / plum `#3A1568`
for type, gold `#E9B23C` for plates (marquee, spec square, pills, closing panel). Heavy Montserrat
for lockups and Instrument Serif italic for pulls. The hero is scroll-driven — the giant word rides
up while the LA overlook stays full-bleed. Everything degrades to a static, fully visible layout
under `prefers-reduced-motion`.
