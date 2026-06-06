---
id: searches
title: Searches
---

The Searches window lets you search for files across the [eD2k](../../../p2p-networks/ed2k/index.md) and [Kademlia](../../../p2p-networks/kademlia.md) networks and add results directly to your [download queue](./downloads.md).

## Overview

![Search window overview](/img/docs/usage/window_search1.jpg)

The window is divided into two main areas. The **upper area** (highlighted in red) contains the search controls:

![Search controls area](/img/docs/usage/window_search2.jpg)

The **lower area** displays search results:

![Search results area](/img/docs/usage/window_search3.jpg)

## Basic Searching

### Starting a Search

Type what you want to find in the **Name** field and click **Start**:

![Name field and Start button](/img/docs/usage/window_search4.jpg)

Search queries are matched against file names. For example:
- `amule` — finds files whose name contains "amule"
- `debian iso` — finds files whose name contains both "debian" and "iso"

### Search Logic (Boolean Operators)

aMule supports Boolean search expressions using the `AND`, `OR`, and `NOT` operators, and expressions can be grouped with parentheses. Listing several words separated by spaces is treated as an implicit `AND`. For example:

```
(knoppix AND V5.1.1) OR (knoppix AND V6.0)
```

### Getting Results

Once a search starts, a results tab appears:

![Results tab](/img/docs/usage/window_search5.jpg)

The results list shows, for each file: **filename**, **size**, **sources** (total sources, followed by the sources holding the complete file in parentheses, and an optional client count in square brackets), **type**, **file ID** (hash), **status** (download status) and **directories** (only populated for results obtained from a "view [shared files](./shared-files.md)" request):

![Results list with columns](/img/docs/usage/window_search6.jpg)

When no files are found for the query, the results tab is empty.

For **global searches**, a progress bar appears showing how far the search has progressed:

![Global search progress bar](/img/docs/usage/window_search35.jpg)

### Stopping a Search

Click the **Stop** button to halt an active search:

![Stop button](/img/docs/usage/window_search18.jpg)

Alternatively, close the active tab (described in [Tabs](#tabs) below).

## Downloading from Results

Once results appear there are three ways to start a download.

### Download Button

Select one or more files in the results list and click the **Download** button:

![Download button](/img/docs/usage/window_search7.jpg)

This method supports downloading multiple files in a single click.

### Double-Click or Enter Key

Double-click a single file, or select it and press **Enter**:

![Double-click to download](/img/docs/usage/window_search8.jpg)

:::note
Double-clicking or pressing Enter downloads **all currently selected files** (the selection is not cleared), the same as the **Download** button. The only exception is a result with grouped variants (see below): double-clicking it expands or collapses its variants instead of downloading.
:::

### Right-Click Menu (Extended Options)

Right-click on one or more selected files and choose **Download** or **Download in category**:

![Right-click download menu](/img/docs/usage/window_search21.jpg)

Using **Download in category** lets you assign the file(s) to a specific download [category](./downloads.md#categories) at the moment of queuing:

![Download in category submenu](/img/docs/usage/window_search22.jpg)

:::note
This method is not available to macOS users with a single-button mouse (no right-click). Use [Ctrl+Click](../../configuration/macos.md) as an alternative.
:::

### Result Row Colours

Files in the results list are colour-coded:

| Colour | Meaning |
|---|---|
| ![Green](/img/docs/usage/window_search45.jpg) Green | Already downloaded or currently shared by you |
| ![Red](/img/docs/usage/window_search43.jpg) Red | Already in the download queue |
| Dark blue / black | Not downloaded and not in queue; fewer sources |
| ![Light blue](/img/docs/usage/window_search44.jpg) Light blue | Not downloaded and not in queue; more sources |
| Magenta | Previously queued for download but cancelled |

The brighter/more vivid the blue, the more sources the file has. Some search results may also display an **average rating** (when the server provides it). [Comments](./comments.md) are never shown in search results, only average ratings.

### Grouped Variants

When several results share the same file (identical hash) but differ in name, they are grouped under a single parent row. A grouped row can be expanded to reveal its variants and collapsed again. Double-clicking a grouped row expands or collapses it instead of starting a download. The **Directories** column shows the source directory for variants that come from a "view shared files" request.

## Tabs

Each search opens its own **results tab**:

![Single search tab](/img/docs/usage/window_search10.jpg)

Starting a new search creates an additional tab; previous tabs remain accessible in the background:

![Multiple search tabs](/img/docs/usage/window_search11.jpg)

The tab label shows the search text you entered:

![Tab label with search text](/img/docs/usage/window_search12.jpg)

Clicking any tab shows the results for that particular search, allowing you to compare multiple searches simultaneously:

![Switching between tabs](/img/docs/usage/window_search13.jpg)

The number in brackets next to the search text is the result count:

![Result count in tab](/img/docs/usage/window_search14.jpg)

When a **filter** is active (see [Filtering](#filtering) below), the count appears as `N/M`, where `M` is the total number of results received and `N` is the number currently passing through the filter:

![Filtered result count N/M](/img/docs/usage/window_search41.jpg)

### Closing a Tab

Click the **X** button on the left side of a tab to close it. Closing a tab also stops its search if it is still running:

![Close tab X button](/img/docs/usage/window_search15.jpg)

### Scrolling Tabs

When there are more tabs than fit in the window, scroll arrows appear on both ends of the tab bar:

![Tab scroll arrows](/img/docs/usage/window_search20.jpg)

### Tab Right-Click Menu

Right-clicking a tab reveals three options:

![Tab right-click menu](/img/docs/usage/window_search38.jpg)

| Option | Action |
|---|---|
| Close tab | Close the clicked tab |
| Close all tabs | Close every open tab |
| Close other tabs | Close all tabs except the clicked one |

## Advanced Searching

### Search Type

The **Type** dropdown selects the search method:

![Search type dropdown](/img/docs/usage/window_search23.jpg)

| Type | Description |
|---|---|
| **Local** | Search only against the [server](../../../p2p-networks/ed2k/servers.md) you are currently connected to; instant results |
| **Global** | Broadcast the query to all known [servers](../../../p2p-networks/ed2k/servers.md); slower but broader results |
| **Kad** | Search across the [Kademlia](../../../p2p-networks/kademlia.md) network; slower, results trickle in over time |

:::note
When the same file is reported more than once, aMule merges the source counts differently depending on the network: for **Kad** results it takes the **maximum** of the reported counts, whereas for **eD2k** it **sums** the counts reported by each server.
:::

### Extended Parameters

Click **Extended parameters** to reveal additional search filters:

![Extended parameters panel](/img/docs/usage/window_search24.jpg)

#### File Type

Restrict results to a specific media category (Any, Archives, Audio, CD-Images, Pictures, Programs, Texts, Videos):

![File type filter](/img/docs/usage/window_search29.jpg)

The category of a file is determined by its **filename extension**, not by its actual content — a file named `Birthday.zip` is classified as an Archive regardless of what it really contains. The complete extension-to-category mapping is:

| Category | Extensions |
|---|---|
| Archives | `.7z` `.ace` `.alz` `.arc` `.arj` `.bz2` `.cab` `.cbr` `.cbt` `.cbz` `.gz` `.hqx` `.lha` `.lzh` `.msi` `.pak` `.par` `.par2` `.rar` `.sea` `.sit` `.sitx` `.tar` `.tbz2` `.tgz` `.uc2` `.xpi` `.z` `.zip` `.zoo` |
| Audio | `.669` `.aac` `.ac3` `.aif` `.aifc` `.aiff` `.amf` `.amr` `.ams` `.ape` `.au` `.aud` `.audio` `.cda` `.dbm` `.dmf` `.dsm` `.dts` `.far` `.flac` `.it` `.m1a` `.m2a` `.m4a` `.mdl` `.med` `.mid` `.midi` `.mka` `.mod` `.mol` `.mp1` `.mp2` `.mp3` `.mpa` `.mpc` `.mpp` `.mtm` `.nst` `.ogg` `.okt` `.psm` `.ptm` `.ra` `.rmi` `.s3m` `.snd` `.stm` `.ult` `.umx` `.wav` `.wma` `.wow` `.xm` |
| CD-Images | `.bin` `.bwa` `.bwi` `.bws` `.bwt` `.ccd` `.cue` `.dmg` `.dmz` `.img` `.iso` `.mdf` `.mds` `.nrg` `.sub` `.toast` |
| Pictures | `.bmp` `.dcx` `.emf` `.gif` `.ico` `.jfif` `.jpe` `.jpeg` `.jpg` `.pct` `.pcx` `.pic` `.pict` `.png` `.psd` `.psp` `.tga` `.tif` `.tiff` `.wbmp` `.webp` `.wmf` `.wmp` `.xif` `.xpm` |
| Programs | `.bat` `.cmd` `.com` `.exe` `.hta` `.js` `.jse` `.msc` `.vbe` `.vbs` `.wsf` `.wsh` |
| Texts | `.azw` `.chm` `.css` `.diz` `.doc` `.dot` `.epub` `.hlp` `.htm` `.html` `.mobi` `.nfo` `.odp` `.ods` `.odt` `.otp` `.ott` `.ots` `.pdf` `.pps` `.ppt` `.ps` `.rtf` `.stc` `.sti` `.stw` `.sxc` `.sxi` `.sxw` `.text` `.txt` `.wri` `.xls` `.xlt` `.xml` |
| Videos | `.3g2` `.3gp` `.3gp2` `.3gpp` `.amv` `.asf` `.avi` `.bik` `.divx` `.dvr-ms` `.flc` `.fli` `.flic` `.flv` `.hdmov` `.ifo` `.m1v` `.m2t` `.m2ts` `.m2v` `.m4b` `.m4v` `.mkv` `.mov` `.movie` `.mp1v` `.mp2v` `.mp4` `.mpe` `.mpeg` `.mpg` `.mps` `.mpv` `.mpv1` `.mpv2` `.ogm` `.ogv` `.pva` `.qt` `.ram` `.ratdvd` `.rm` `.rmm` `.rmvb` `.rv` `.rv9` `.smil` `.smk` `.swf` `.tp` `.ts` `.vid` `.video` `.vivo` `.vob` `.vp6` `.webm` `.wm` `.wmv` `.xvid` |

#### Category

Automatically assign queued downloads to a specific [category](./downloads.md#categories) instead of the default "Main" category:

![Category selector](/img/docs/usage/window_search30.jpg)

#### Extension

Show only files with a specific file extension (e.g., `avi`, `mp3`, `iso`):

![Extension filter](/img/docs/usage/window_search31.jpg)

#### Minimum Size

Discard results smaller than the specified size. Select the unit (Bytes, KB, MB, GB):

![Minimum size filter](/img/docs/usage/window_search32.jpg)

#### Maximum Size

Discard results larger than the specified size. Select the unit (Bytes, KB, MB, GB):

![Maximum size filter](/img/docs/usage/window_search33.jpg)

#### Availability

Discard results with fewer sources than the specified minimum:

![Availability filter](/img/docs/usage/window_search34.jpg)

### Filtering

Click the **Filtering** checkbox to reveal post-search filtering controls. Filters apply to all open result tabs simultaneously:

![Filtering controls](/img/docs/usage/window_search25.jpg)

#### Filter

Type a [wxRegEx](https://docs.wxwidgets.org/stable/overview_resyntax.html) expression in the **Filter** box and click **Filter results**. Files whose name matches the expression are displayed; all others are hidden. The match is case-insensitive. A plain word (e.g. `linux`) matches any filename containing that word:

![Filter input and button](/img/docs/usage/window_search26.jpg)

#### Invert Result

Check **Invert result** to reverse the filter: only files whose name does *not* contain the filter string are displayed:

![Invert result checkbox](/img/docs/usage/window_search27.jpg)

#### Hide Known Files

Click **Hide known files** to remove from the results list any file that is already in your download queue or has already been completed:

![Hide known files button](/img/docs/usage/window_search28.jpg)

## Clearing Searches

### Clear Search Parameters

Click the **Reset Fields** button to clear the search text and reset all extended parameters to their defaults:

![Reset button](/img/docs/usage/window_search16.jpg)

### Clear All Tabs

Click the **Clear** button to close all open tabs at once:

![Clear button](/img/docs/usage/window_search17.jpg)

You can also right-click any tab and choose **Close all tabs**:

![Close all tabs via right-click](/img/docs/usage/window_search39.jpg)

## Results Right-Click Menu

Right-clicking on a result row opens this menu:

![Results right-click menu](/img/docs/usage/window_search37.jpg)

| Option | Action |
|---|---|
| Download | Add selected file(s) to the download queue |
| Download in category | Add selected file(s) to a specific category |
| Get *&lt;stats server&gt;* for this file | Open a browser with the configured statistics server for the file (last selected file if multiple are selected). The label shows the configured server name (default: "Shorty's ED2K stats"); this entry only appears when a statistics server is configured |
| Search related files (eD2k, local server) | Start a new search for files related to the selected file |
| Copy eD2k link to clipboard | Copy the [ed2k link(s)](../../../p2p-networks/ed2k/links.md) as plain text (single selection only) |

## Miscellaneous

The **Fast ED2K links handler** bar at the bottom of the search window lets you paste [ed2k links](../../../p2p-networks/ed2k/links.md) to add them directly to the download queue. It is always visible in the Searches panel, regardless of whether it is enabled in **[Preferences → Interface → Show "Fast eD2k Links Handler" in every window](./preferences.md#interface)**. To hide it in the search window as well, click the **[Search](./toolbar.md#window-buttons)** button in the toolbar twice.
