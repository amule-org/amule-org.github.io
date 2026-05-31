---
id: searches
title: Searches
---

The Searches window lets you search for files across the eD2k and Kademlia networks and add results directly to your download queue.

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

For details on how the search logic works (AND, OR, NOT), see [Search types](#search-type) below.

### Getting Results

Once a search starts, a results tab appears:

![Results tab](/img/docs/usage/window_search5.jpg)

The results list shows, for each file: **filename**, **size**, **sources** (total sources and, in brackets, sources with the complete file), **type**, and **file ID**:

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
Double-clicking or pressing Enter downloads only the file you double-clicked on, not all selected files. The selection is also cleared.
:::

### Right-Click Menu (Extended Options)

Right-click on one or more selected files and choose **Download** or **Download in category**:

![Right-click download menu](/img/docs/usage/window_search21.jpg)

Using **Download in category** lets you assign the file(s) to a specific download category at the moment of queuing:

![Download in category submenu](/img/docs/usage/window_search22.jpg)

:::note
This method is not available to macOS users with a single-button mouse (no right-click). Use [Ctrl+Click](./macos.md) as an alternative.
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

The brighter/more vivid the blue, the more sources the file has. Some search results may also display an **average rating** (when the server provides it). Comments are never shown in search results, only average ratings.

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
| **Local** | Search only against the server you are currently connected to; instant results |
| **Global** | Broadcast the query to all known servers; slower but broader results |
| **Kad** | Search across the Kademlia network; slower, results trickle in over time |
| **Web** | External web-based search (requires a configured web search service) |

### Extended Parameters

Click **Extended parameters** to reveal additional search filters:

![Extended parameters panel](/img/docs/usage/window_search24.jpg)

#### File Type

Restrict results to a specific media category (Video, Audio, Images, Documents, Archives, Programs, etc.):

![File type filter](/img/docs/usage/window_search29.jpg)

#### Category

Automatically assign queued downloads to a specific category instead of the default "Main" category:

![Category selector](/img/docs/usage/window_search30.jpg)

#### Extension

Show only files with a specific file extension (e.g., `avi`, `mp3`, `iso`):

![Extension filter](/img/docs/usage/window_search31.jpg)

#### Minimum Size

Discard results smaller than the specified size. Select the unit (Bytes, Kilobytes, Megabytes, Gigabytes):

![Minimum size filter](/img/docs/usage/window_search32.jpg)

#### Maximum Size

Discard results larger than the specified size. Select the unit (Bytes, Kilobytes, Megabytes, Gigabytes):

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

Click the **Reset** button to clear the search text and reset all extended parameters to their defaults:

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
| Get Razorback 2's stats for this file | Open a browser with Razorback 2 statistics for the file (last selected file if multiple are selected) |
| Copy ED2k link to clipboard | Copy the ed2k link(s) as plain text |
| Copy ED2k link to clipboard (HTML) | Copy the ed2k link(s) as an HTML anchor: `<a href="link">filename</a>` |

## Miscellaneous

The **Fast ED2K links handler** bar at the bottom of the search window is always visible in the Searches panel, regardless of whether it is enabled in **Preferences → Interface → Show "Fast eD2k Links Handler" in every window**. To hide it in the search window as well, click the **Search** button in the toolbar twice:

![Toolbar Search button](/img/docs/usage/window_toolbar4.jpg)

## Quick Reference

### Search Window

![Search window quick reference](/img/docs/usage/window_search36.jpg)

| # | Description |
|---|---|
| 1 | Toggle to Search window / Toggle ED2K links handler |
| 2 | Search parameters panel |
| 3 | Name text field |
| 4 | Search type selector |
| 5 | Show/hide extended parameters |
| 6 | Extended parameters panel |
| 7 | File type selector |
| 8 | Filtering controls panel |
| 9 | Filter text field |
| 10 | Apply filter button |
| 11 | Stop search |
| 12 | Start search |
| 13 | Search results list |
| 14 | Close tab (X) |
| 15 | Search text in tab label |
| 16 | File name column |
| 17 | File size column |
| 18 | Global search progress bar |
| 19 | Reset search parameters |
| 20 | Show/hide filtering controls |
| 21 | Extension field |
| 22 | Category selector |
| 23 | Minimum availability |
| 24 | Maximum size unit selector |
| 25 | Maximum size field |
| 26 | Hide downloading or completed files |
| 27 | Invert filter |
| 28 | Clear all tabs |
| 29 | Download selected file(s) |
| 30 | Results tab |
| 31 | Results count: filtered / total |
| 32 | Sources count |
| 33 | Complete-sources count |
| 34 | File type |
| 35 | File ID (hash) |

### Tab Right-Click Menu

![Tab right-click menu reference](/img/docs/usage/window_search46.jpg)

| # | Description |
|---|---|
| 1 | Close the selected tab |
| 2 | Close all tabs |
| 3 | Close all tabs except the selected one |

### File Right-Click Menu

![File right-click menu reference](/img/docs/usage/window_search47.jpg)

| # | Description |
|---|---|
| 1 | Download the selected file(s) |
| 2 | Download into the selected category |
| 3 | Get Razorback 2 statistics for the file |
| 4 | Copy ed2k link to clipboard |
| 5 | Copy ed2k link to clipboard as HTML anchor |
