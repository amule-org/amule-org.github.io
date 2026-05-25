---
id: cas-wxcas
title: cas / wxcas — Statistics Tools
---

wxCAS and CAS are external statistics tools that read aMule's online signature file (`~/.aMule/amulesig.dat`) and produce status output in various formats. They are shipped with aMule and serve users who want to embed aMule statistics in a website, forum signature, or terminal dashboard.

| Binary | Interface | Output |
|---|---|---|
| `cas` | Command-line | Console text, PNG image, HTML page |
| `wxcas` | Graphical (wxWidgets) | Graphical display of the same data |

## Prerequisites

Both tools read `~/.aMule/amulesig.dat`, which aMule only generates when **Online Signature** is enabled:

1. Open aMule → **Preferences → Online Signature**.
2. Check **Enable Online Signature**.
3. Restart aMule (or wait for the next update cycle).

`amulesig.dat` is updated periodically while aMule runs. The file must exist for `cas` or `wxcas` to produce any output.

For the full format specification of `amulesig.dat`, see [amulesig.dat](../amule-files/amulesig-dat.md).

## CAS — C aMule Statistics

`cas` reads `amulesig.dat` and can produce:

- A formatted text summary on the console.
- A PNG image with statistics overlaid on a background template.
- An HTML page with all statistics.

### Console Output Example

Running `cas` with no arguments prints a status line similar to:

```
aMule CVS has been running for 1 D 00 h
fALSO is on Max[PT] Sado [81.84.97.64:4661] with HighID
Total Download: 171.36 GB, Upload 188.96 GB
Session Download: 475.42 MB, Upload 832.46 MB
Download : 2.3 kB/s, Upload : 10.0 kB/s
Sharing : 98 file(s), Clients on queue: 237
```

### Image Generation

When run with the `-o` flag, `cas` generates a PNG image ([`~/.aMule/aMule-online-sign.png`](../amule-files/cas.md)) by writing statistics text onto a configurable background image.

Configuration is stored in [`~/.aMule/casrc`](../amule-files/cas.md).

### [`casrc`](../amule-files/cas.md) Configuration File

`casrc` uses a key-value format. Example with all recognized options:

```
# cas config file

# font - full path to a TrueType font file
font /usr/share/fonts/corefonts/times.ttf

# font_size - font size in points
font_size 10.5

# source_image - background image to overlay text on
source_image /usr/share/pixmaps/stat.png

# *_line - x,y,enabled (1=enabled, 0=disabled)
# Each line corresponds to one line of statistics text.
first_line  23,19,1
second_line 23,36,1
third_line  23,54,1
fourth_line 23,72,1
fifth_line  23,89,1
sixth_line  23,106,1
```

**Default system paths** that `cas` searches:

| Resource | Default path |
|---|---|
| Font | `/usr/share/fonts/corefonts/times.ttf` |
| Background image | `/usr/share/pixmaps/stat.png` |
| HTML template | `/usr/share/pixmaps/tmp.html` |

### HTML Statistics Page

Run `cas` with the HTML flag to generate [`~/.aMule/aMule-online-sign.html`](../amule-files/cas.md), a full statistics page.

### Known Issues

- The uptime string in the console output is internationalized by aMule (it reflects aMule's configured language). There is no workaround at the time of writing.

## WxCAS — Graphical Statistics

`wxcas` provides a graphical window displaying the same statistics as `cas`. It is aimed at desktop users who want to monitor aMule status without a terminal.

Launch with:

```bash
wxcas
```

`wxcas` polls `amulesig.dat` periodically and refreshes the display automatically.

**Default output path:** `~/aMule-online-sign.png` (or `.jpg`/`.bmp` depending on configuration). This is distinct from the `cas` default of `~/.aMule/aMule-online-sign.png`.

## Troubleshooting

### `can't open file '/home/user/.aMule/amulesig.dat'`

aMule has not generated the signature file. Fix:

1. In aMule: **Preferences → Online Signature → Enable Online Signature**.
2. Ensure aMule is actually running and connected (the file is only written while aMule is active).
3. If the file still does not appear, check that `~/.aMule/` is writable.
