---
id: transfers
title: Transfers
---

The Transfers window is the central place to manage your downloads and uploads. It shows every file in your download queue, its progress and sources, and the clients uploading to and from you.

## Overview

![Transfer queue](/img/docs/transfers_queue.png)

The window is split into two areas by a movable divider:

- **Upper area** — the download queue: all files you have added for download.
- **Lower area** — the source list: the individual clients found for the currently selected file(s).

Above the download list, a row of **category tabs** lets you filter which files are shown. Drag the divider bar to resize either section. Click the toggle button on the left of the divider header to hide or show the lower pane.

## Download Queue

### Columns

| Column | Description |
|---|---|
| **Part** | The internal part-file number (e.g. `000`). Empty when the file is complete. |
| **File Name** | Name of the file. A smiley icon to the left indicates ratings or comments from other users. |
| **Size** | Total file size. The eD2k network supports files up to 4 GB. |
| **Transferred** | Total bytes received so far (including parts later found to be corrupt). |
| **Completed** | Bytes that have passed hash verification and are permanently stored. May be less than *Transferred* if corrupted data was received. |
| **Speed** | Current download speed for this file. Only shown while actively receiving data. |
| **Progress** | Visual progress bar (see [Progress Bar](#progress-bar) below). |
| **Sources** | Format: `Asked/All +A4AF (Transferring)`. *Asked* = sources already contacted; *All* = all known sources; *A4AF* = sources currently assigned to another file; *Transferring* = sources actively uploading to you. |
| **Priority** | Download priority: Low, Normal, High, or Auto. See [Priority](priority.md). |
| **Status** | Current state of the download (see [File Status](#file-status) below). |
| **Time Remaining** | Estimated time to completion and remaining bytes. Only shown when actively receiving data. |
| **Last Seen Complete** | Last time a source was known to have the complete file. |
| **Last Reception** | Last time any data was received for this file. |

### Progress Bar

The progress bar shows the chunk composition of a file at a glance. Each file is split into 9.28 MB chunks:

| Colour | Meaning |
|---|---|
| Black / dark grey | Chunk already downloaded and verified. |
| Blue (varying shades) | Chunk not yet downloaded; available from sources. Darker blue = fewer sources have it; lighter blue = more sources. |
| Yellow | Chunk currently being requested and downloaded. |
| Red | Chunk not available from any known source. Downloads stall on red segments — avoid files with many red chunks. |
| Green (thin bar on top) | Overall completion percentage. |

When **Show percentage** is enabled in preferences, the completion percentage is printed over the bar.

### File Status

| Status | Meaning |
|---|---|
| **Downloading** | aMule is actively receiving data for this file. |
| **Waiting** | aMule is looking for sources or waiting for a slot to open. |
| **Paused** | Download has been manually paused. |
| **Stopped** | Download has been manually stopped. Sources are no longer searched. |
| **Erroneous** | An error occurred (e.g. disk write error). |
| **Completing** | All data received; aMule is verifying the final hash. |
| **Hashing** | Part file is being hashed after a restart. |
| **Waiting for hash** | Hash verification is queued. |
| **Insufficient disk space** | Download paused automatically because the disk is full. |

### Controlling Downloads

Right-click a file (or a selection of files) to open the context menu:

| Option | Action |
|---|---|
| **Priority → Low / Normal / High / Auto** | Set the download priority. *Auto* lets aMule manage allocation automatically based on file rarity. |
| **Cancel** | Remove the file from the queue and delete the partial download. |
| **Stop** | Stop the download; sources are no longer searched. |
| **Pause** | Pause the download; can be resumed later. |
| **Resume** | Resume a paused, stopped, or errored download. |
| **Clear completed** | Remove all completed files from the list. |
| **Extended Options → Swap every A4AF to this file now** | Immediately move all sources assigned to other files (*Asked For Another File*) to this file. |
| **Extended Options → Swap every A4AF to this file (Auto)** | Automatically swap A4AF sources to this file whenever they become available. |
| **Extended Options → Swap every A4AF to any other file now** | Release all A4AF sources from this file so they can be used by other files. |
| **Preview** | Open the partial file in your configured media player for preview. For completed files, opens the file directly. |
| **Show file details** | Open the [File Details](file-details.md) dialog with hashes, names, and source breakdown. |
| **Show all comments** | View user ratings and comments for this file. |
| **Copy magnet URI to clipboard** | Copy a magnet link for the file. |
| **Copy eD2k link to clipboard** | Copy an `ed2k://` link for the file. |
| **Copy feedback to clipboard** | Copy formatted download feedback text. |
| **Assign to category** | Move the file to a specific category. Selecting *unassign* returns it to the default category. |

:::note
**Delete key** — with one or more files selected, pressing **Delete** triggers the Cancel action.
**F2 key** — renames the selected partial file.
:::

:::note
Right-click menus are not available on macOS with a single-button mouse. Use [Ctrl+Click](macos.md) instead.
:::

## Source List

Clicking a file in the download queue populates the source list below with all known clients for that file. Selecting multiple files shows the union of their sources.

### Columns

| Column | Description |
|---|---|
| **User Name** | Nickname of the remote client. The icon indicates client type and modifier overlays (see [Client Icons](#client-icons) below). |
| **Downloaded** | Bytes downloaded from this source in the current session. |
| **Speed** | Current transfer speed from this source. |
| **Uploaded** | Bytes uploaded to this source in the current session. |
| **Available Parts** | Bar showing which chunks of the file this source has available. |
| **Version** | Client software version string. |
| **Download Status** | Your position in this client's upload queue, or transfer state. |
| **Origin** | How this source was found (server list, Kad, source exchange, etc.). |
| **Local File Name** | The name the file has on your system. |
| **Remote File Name** | The name the file has on the remote client. |
| **Shares File List** | Whether this client shares its file list. |

### Client Icons

Each source row shows a small icon indicating the client software and connection state. The base icon shows the **client type**:

| Icon | Client |
|---|---|
| aMule icon | `amule` |
| eMule icon | eMule |
| eDonkey2000 icon | Original eDonkey2000 client |
| Friend icon | A client you have marked as a friend |
| lphant icon | lphant |
| mlDonkey icon | mlDonkey |
| Shareaza icon | Shareaza |
| xMule icon | xMule |
| Unknown icon | Unrecognised client |

Overlay badges on the base icon indicate additional attributes:

| Overlay | Meaning |
|---|---|
| eMule protocol | Client supports extended eMule protocol extensions (source sharing, etc.). |
| Good credit | Client has a good credit rating with you. |
| Normal credit | Client has a normal credit rating. |
| Secure ID (good) | Client identity has been securely verified. |
| Secure ID (bad) | Client has been flagged as a bad actor. |

The icon colour also reflects the **source status**:

| State | Meaning |
|---|---|
| Sending | Client is uploading data or a hashset to you right now. |
| Queued / Asking | You are in this client's upload queue, or you are currently requesting a file from it. |
| Connecting | A connection attempt to this client is in progress. |
| Unavailable | Client is asked for another file, has no needed parts, or cannot be reached (Low ID behind a firewall). |
| Unknown | State has not yet been determined. |

Double-clicking a source (or middle-clicking) opens the [Client Details](client-details.md) dialog.

## Categories

The row of tabs above the download list groups downloads into named categories. The first tab (**All** by default) always shows all files matching the current view filter.

### View Filter (All Tab)

Right-clicking the **All** tab opens a menu with a **Select view filter** submenu:

| Filter | Files shown |
|---|---|
| All | Every file in the queue |
| All others | Files not assigned to any user-defined category |
| Incomplete | Files not yet completed |
| Completed | Files that have finished downloading |
| Waiting | Files in *Waiting* status |
| Downloading | Files actively receiving data |
| Erroneous | Files in *Erroneous* status |
| Paused | Files in *Paused* status |
| Stopped | Files in *Stopped* status |
| Active | Files that are either downloading or waiting |
| Video | Files of video type |
| Audio | Files of audio type |
| Archive | Archive files |
| CD-Images | CD/DVD image files |
| Pictures | Image files |
| Text | Text and document files |

The selected filter persists between sessions. The tab label is updated to reflect the active filter.

### User-Defined Categories

Right-clicking any tab (including **All**) exposes additional category management options:

| Option | Action |
|---|---|
| **Add category** | Create a new category with a name, colour, and save folder. |
| **Edit category** | Change the name, colour, or save folder of the selected category. |
| **Remove category** | Delete the selected category; files in it revert to the default category. |
| **Cancel / Stop / Pause / Resume** | Apply the action to every file in the selected category at once. |

When **Show category tab info** is enabled in preferences, each tab label shows `(downloading/total)` file counts.

Up to 99 user-defined categories are supported.

### Assigning Files to Categories

- **From the right-click menu**: right-click a file → **Assign to category**.
- **At search time**: in the Searches window, right-click a result → **Download in category**.

Each category can have its own incoming directory. Completed files are saved to the category's folder instead of the default incoming folder.

## Where Are the Files?

While downloading, aMule stores incomplete data in a **Temporary directory**. Completed files are moved to the **Incoming directory**. Both paths depend on your platform and can be changed in **Preferences → Directories**. Per-category incoming folders override the default incoming directory for files assigned to that category.

See [Download Folders](../configuration/download-folders.md) for the default paths on each platform.

If you have incomplete downloads from eMule, copy their `.part` and `.part.met` files into aMule's Temp directory — aMule will resume them automatically on the next start.
