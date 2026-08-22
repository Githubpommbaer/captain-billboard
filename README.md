# Captain Billboard

Marketing site for Dave — Captain Billboard. He rents 40×25 cm on chest and back. He does not endorse products. He just wears paid space.

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
| `css/styles.css` | Orange / cream / black slab system |
| `js/main.js` | Reveals, counters, mailto body, image fallbacks, reduced-motion |
| `assets/fonts/` | Self-hosted Anton, Barlow, JetBrains Mono (no Google Fonts) |
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
- House speed is five days from approved art.
- Legal pages are German placeholders. Fill the `[brackets]` before a public launch.
