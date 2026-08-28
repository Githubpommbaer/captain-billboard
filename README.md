# Captain Billboard

Marketing site for Dave — Captain Billboard. Dave is an AI character. He rents 40×25 cm on the placard, in the clip. He does not endorse products. He just wears paid space. Nothing is printed. Nobody goes into the field.

Single static site. No framework. Booking is a `mailto:` to [book@captainbillboard.com](mailto:book@captainbillboard.com).

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
| `legal.html` | Impressum / Datenschutz stubs (replace bracketed Maresmedia details) |
| `css/styles.css` | #171718 canvas, #e6ff5a lime flood, giant display type, numbered rows, lime footer panel |
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
- Client sends the logo. Clips are made with AI. 40×25 cm is the placard in-frame, not a print spec.
- Legal pages are German placeholders. Fill the `[brackets]` before a public launch.

## Design language

Editorial studio, dark and loud: `#171718` canvas, `#e6ff5a` acid lime used as a flood (hero
wordmark, arrows, marquee band, featured rate card, whole closing panel), heavy Montserrat for
lockups and Instrument Serif italic for pulls. The hero is scroll-driven — the giant word rides up
while the oval portrait grows into a card. Everything degrades to a static, fully visible layout
under `prefers-reduced-motion`.
