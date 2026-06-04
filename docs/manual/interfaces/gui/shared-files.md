---
id: shared-files
title: Shared Files
---

The Shared Files window lets you view and manage the files you are currently sharing with the [eD2k](../../../p2p-networks/ed2k/index.md) and [Kademlia](../../../p2p-networks/kademlia.md) networks. It also shows per-file statistics on how often each file has been requested and how much data has been uploaded.

## What Files Are Shared

A file is considered shared by aMule if it matches any of the following conditions:

- It is located inside a directory you have configured as a **shared directory** (see [Shared Directories](#shared-directories) below).
- It has been **completed** and is still in the [Incoming directory](../../configuration/directories.md#incoming-directory).
- It is **being downloaded** and at least one [chunk](../../../p2p-networks/ed2k/index.md#chunks) has been completed — only the completed chunks are shared.

## Files List

The main panel lists all currently shared files. Each row represents one file and has the following columns:

| Column | Description |
|---|---|
| **File Name** | Name of the file |
| **Size** | Total file size |
| **Type** | Media type |
| **Priority** | Current upload priority for this file |
| **FileID** | The file's hash ([ed2k hash](../../../p2p-networks/concepts.md#md4-hash-ed2k-hash)) |
| **Requests** | Requests received this session / total ever. Click the column header once or twice to sort by session count or total count |
| **Accepted Requests** | Times parts were uploaded this session / total ever |
| **Transferred Data** | Bytes uploaded this session / total ever |
| **Share Ratio** | All-time data uploaded for this file divided by the file size |
| **Obtained Parts** | Visual bar: parts known to be held by other clients shown in blue (darker = more clients have them); parts no client is known to have shown in red |
| **Complete Sources** | Estimated number of clients that have the complete file |
| **Directory Path** | Full path to the file on your system; shows `[PartFile]` for files still being downloaded |

## Managing Files

Select one or more files, then right-click (or **Option-click** on a Mac with a single-button mouse) to open the file management menu.

### Setting Priority

Use **Priority** to set the upload priority for the selected file(s). See [Priority](./priority.md) for a description of all priority levels.

### Adding a Comment or Rating

Select **Add Comment/Rating** to open the comment and rating window. The window contains:

- A **text field** for the comment — enter up to 50 characters of descriptive text that other clients downloading the same file will be able to read.
  - **Clear** — erases the comment text field.
- A **rate selector** drop-down to assign a quality rating to the file. For a description of available rating values, see [Comments](./comments.md).
- **Apply** (or press **Enter**) — saves the comment and/or rating.
- **Cancel** — discards all unsaved changes and closes the window.

When a file has a comment, a comment icon appears next to its name in the file list.

### Renaming a File

Select **Rename** to rename the file on your local storage. A dialog opens with a text field pre-filled with the current filename:

- Type the new name and click **OK** to confirm.
- Click **Cancel** to keep the existing name.

### Adding a Collection to the Transfer List

For files with the `.emulecollection` extension, the menu shows **Add files in collection to transfer list**, which queues every file listed in the collection for download.

### Other Menu Options

| Option | Action |
|---|---|
| **Copy magnet URI to clipboard** | Copies a magnet link for the file as plain text |
| **Copy ED2k link to clipboard** | Copies the file's [ed2k link](../../../p2p-networks/ed2k/links.md) as plain text |
| **Copy ED2k link to clipboard (Source)** | Copies the ed2k link with you added as a source, so other clients downloading via that link know to try downloading from you immediately |
| **Copy ED2k link to clipboard (Source) (With Crypt options)** | Same as the Source option but also embeds your [protocol-obfuscation](./preferences.md#protocol-obfuscation) (encryption) capabilities |
| **Copy ED2k link to clipboard (Hostname)** | Same as the Source option but resolves your hostname instead of using your IP; may be unavailable if your hostname is not known |
| **Copy ED2k link to clipboard (Hostname) (With Crypt options)** | Same as the Hostname option but also embeds your protocol-obfuscation (encryption) capabilities |
| **Copy ED2k link to clipboard (AICH info)** | Copies the ed2k link with the [AICH](../../../p2p-networks/ed2k/aich.md) Root Hash included; available only when a verified AICH hash exists for the file |
| **Copy ED2k link to clipboard (AICH info + Source)** | Copies the ed2k link with both the AICH Root Hash and you added as a source |
| **Copy feedback to clipboard** | Copies a plain-text report with your nick, aMule version, and the selected file(s) name, size, link and upload statistics — handy for posting feedback |

## File Statistics

Selecting a file (or multiple files) updates the statistics panel at the bottom of the window, titled **Statistics and queued clients for selected file(s) : Session / All time**.

### Counters

Each value is shown as **session / all-time** in a single field:

| Value | Description |
|---|---|
| **Requested** | Number of clients that have requested the file — this session / since aMule was installed (or last configuration reset) |
| **Active Uploads** | Number of times parts of the file have been uploaded (accepted requests) — this session / all time |
| **Transferred** | Bytes of the file uploaded — this session / all time |

### Percent of Total Files

Below the counters, a **Percent of total files** row shows three progress bars representing the selected file(s) as a share of all your shared files, for requests, accepted uploads, and transferred data respectively.

### Queued Clients

A toggle button next to the counters shows or hides the list of clients currently queued for the selected file(s), including their position and the part of the file they are requesting.

## Reloading the Shared Files List

Click the **Reload** button (showing two green arrows) in the toolbar area of the Shared Files window to rescan all shared directories and refresh the list. Use this after external changes such as files being added, moved, renamed, or deleted outside aMule.

By default you rarely need to do this: aMule watches your shared folders and reloads the list automatically when files are added or removed outside the application. This is controlled by the **Automatically rescan shared folders for changes** option in [**Preferences → Directories**](./preferences.md#directories). Disable it if the automatic watching is undesirable — for example on systems that hit a file-watch limit — and rely on the **Reload** button instead.

## Shared Directories

You manage which directories are shared from [**Preferences → Directories**](../../configuration/directories.md#configuring-shared-directories): **double-click** a directory to share that directory only, or **right-click** it to share it recursively (including all its subdirectories). The Incoming directory and the verified chunks of files still downloading are always shared.

For the full reference — the directory tree and its font/icon states, recursive shares, the rescan options, and the editable `shareddir-*.dat` configuration files — see [Shared Directories](../../configuration/directories.md#shared-directories).

:::warning
Be careful which directories you share. Sharing your home directory, documents folder, or any directory containing passwords, address books, or sensitive personal data will make that data available to every client on the network.
:::
