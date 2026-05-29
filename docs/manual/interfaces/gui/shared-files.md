---
id: shared-files
title: Shared Files
---

The Shared Files window lets you view and manage the files you are currently sharing with the eD2k and Kademlia networks. It also shows per-file statistics on how often each file has been requested and how much data has been uploaded.

## What Files Are Shared

A file is considered shared by aMule if it matches any of the following conditions:

- It is located inside a directory you have configured as a **shared directory** (see [Shared Directories](#shared-directories) below).
- It has been **completed** and is still in the Incoming directory.
- It is **being downloaded** and at least one chunk has been completed — only the completed chunks are shared.

## Files List

The main panel lists all currently shared files. Each row represents one file and has the following columns:

| Column | Description |
|---|---|
| **Filename** | Name of the file |
| **Size** | Total file size |
| **Type** | Media type |
| **Priority** | Current upload priority for this file |
| **FileID** | The file's hash (ed2k hash) |
| **Requests** | Requests received this session / total ever. Click the column header once or twice to sort by session count or total count |
| **Accepted Requests** | Times parts were uploaded this session / total ever |
| **Transferred Data** | Bytes uploaded this session / total ever |
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

### Other Menu Options

| Option | Action |
|---|---|
| **Get Razorback2's stats for this file** | Opens a browser page with Razorback 2 statistics for the file |
| **Copy ED2k link to clipboard** | Copies the file's ed2k link as plain text |
| **Copy ED2k link to clipboard (Source)** | Copies the ed2k link with you added as a source, so other clients downloading via that link know to try downloading from you immediately |
| **Copy ED2k link to clipboard (Hostname)** | Same as the Source option but resolves your hostname instead of using your IP; may be unavailable if your hostname is not known |
| **Copy ED2k link to clipboard (AICH)** | Copies the ed2k link with the AICH Root Hash included |

## File Statistics

Selecting a file (or multiple files) updates the statistics panel at the bottom of the window. The panel is divided into three columns.

### Session Statistics (left column)

| Value | Description |
|---|---|
| **Requests** | Number of clients that have requested the file this session |
| **Active Uploads** | Number of clients to whom you are actively uploading the file this session |
| **Transferred** | Bytes of the file uploaded this session |

### Session Percentages (centre column)

These values show the selected file(s) as a **percentage** of your total activity this session:

| Value | Description |
|---|---|
| **Requests %** | Share of total file requests this session |
| **Active Uploads %** | Share of total active uploads this session |
| **Transferred %** | Share of total bytes transferred this session |

### Total Statistics (right column)

All-time totals since aMule was installed (or since the last configuration reset):

| Value | Description |
|---|---|
| **Requests (total)** | Total number of clients that have ever requested the file |
| **Accepted Uploads (total)** | Total number of times parts of the file have been uploaded |
| **Transferred (total)** | Total bytes ever uploaded for this file |

## Reloading the Shared Files List

Click the **Reload** button (showing two green arrows) in the toolbar area of the Shared Files window to rescan all shared directories and refresh the list. Use this after external changes such as files being added, moved, renamed, or deleted outside aMule.

## Shared Directories

aMule shares the **contents** of any directory you mark as shared. Subdirectories are **not** shared recursively by default.

### Configuring via Preferences

Go to **Preferences → Directories** and check the box next to each directory you want to share.

To share a directory **recursively** (including all its subdirectories), double-click the folder icon next to the directory name.

:::warning
Be careful which directories you share. Sharing your home directory, documents folder, or any directory containing passwords, address books, or sensitive personal data will make that data available to every client on the network.
:::

### Configuring via shareddir.dat

You can also edit the `shareddir.dat` file directly. The file is located in the aMule configuration directory (`~/.aMule/`). Each line contains the full path to one shared directory.

:::warning
Stop aMule before editing `shareddir.dat`. Any changes made while aMule is running will be overwritten when aMule exits.
:::

Example (Debian, editing as root with the daemon stopped):

```bash
sudo /etc/init.d/amule-daemon stop
sudo vi /home/amule/.aMule/shareddir.dat
sudo /etc/init.d/amule-daemon start
```
