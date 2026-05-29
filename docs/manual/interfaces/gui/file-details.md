---
id: file-details
title: File Details
---

The File Details window provides a comprehensive view of a file's current state, its download progress, ICH corruption-handling statistics, known alternative file names, and controls to rename the file before it completes.

![File Details window](/img/docs/usage/window_file1.jpg)

Open it by right-clicking a file in the Transfers window and selecting **File Details** (or via the [shortcut](./shortcuts.md)).

## View Details

### General

![General section](/img/docs/usage/window_file2.jpg)

| Field | Description |
|---|---|
| **Full Name** | The name the file will have when it completes (or its current name if already complete) |
| **met-File** | Path to the file's [`part.met`](../../../developer/file-formats/part-met.md) metadata file; for completed files this equals the Full Name path |
| **Hash** | The file's eD2k hash |
| **Filesize** | The file's total size when complete (or current size if complete) |
| **Partfilestatus** | The file's current status (see table below) |
| **Last seen complete** | The last time a source with the complete file was seen on the network |

**Partfilestatus** values:

| Status | Description |
|---|---|
| **Complete** | The file has been successfully downloaded |
| **Completing** | Download appears finished; hash verification is in progress |
| **Downloading** | The file is actively being downloaded |
| **Waiting** | The file is waiting for a source to upload to you |
| **Paused** | The file has been paused |
| **Stopped** | The file has been stopped |
| **Insufficient Diskspace** | There is not enough free disk space to continue |
| **Erroneous** | An error occurred reading or creating the file |

### Transfer

The Transfer section shows statistics and progress details for the download:

![Transfer section](/img/docs/usage/window_file3.jpg)

| Field | Description |
|---|---|
| **Found Sources** | Number of sources currently known for the file |
| **Transferring Sources** | Number of sources currently uploading to you |
| **Filepart-Count** | Total number of chunks the file is divided into; in brackets, the number of chunk hashes known |
| **Available** | Number of chunks known to be available from sources, and in brackets the percentage of total chunks |
| **Datarate** | Current download speed for this file (more precise than the Transfers window; shows up to two decimal places) |
| **Transferred** | Total data received for this file (includes any corrupted data that was later discarded) |
| **Completed** | Amount of verified data completed; in brackets, the percentage of the total file size (more accurate than the percentage shown in the Transfers window) |

:::note
When a file is complete, some Transfer values may reset to zero.
:::

### Intelligent Corruption Handling

This section shows statistics from the ICH subsystem:

![ICH section](/img/docs/usage/window_file4.jpg)

| Field | Description |
|---|---|
| **Lost to corruption** | Amount of downloaded data that was discarded after being identified as corrupt |
| **Packages saved by I.C.H.** | Number of packets rescued from corrupt chunks by ICH, avoiding a full re-download |
| **Gained by compression** | Data saved from re-downloading due to protocol compression: `Completed size − Transferred size` |

### File Names

This is a list of names that other clients have reported for the same file (identified by its hash):

![File names section](/img/docs/usage/window_file5.jpg)

| Column | Description |
|---|---|
| **File Name** | The name as reported by a source |
| **Source** | Number of sources that reported this name |

This list is useful for detecting fakes — if many sources report a different name from what you downloaded, the file may not be what it claims to be.

:::note
Not all sources report a filename. This list is cleared when the file completes.
:::

## Rename

You can change the name the file will receive when it completes. Type the new name in the text field and click **Rename**:

![Rename text field](/img/docs/usage/window_file6.jpg)

To use one of the names from the File Names list, click that name to copy it into the text field, then click **Rename**:

![Take over a filename from the list](/img/docs/usage/window_file7.jpg)

### Cleanup Function

Click **Cleanup** to automatically clean up the filename currently in the text field before renaming:

![Cleanup button](/img/docs/usage/window_file8.jpg)

The cleanup function performs the following steps in order:

1. Makes the extension lowercase and does not touch it further (the dot before the extension is also preserved throughout).
2. Replaces dots (`.`), underscores (`_`), and HTML space codes (`%20`) with single spaces.
3. Removes any "HYPNOTiC"-style mixed-case formatting (scene-style capitalization patterns).
4. Makes the entire filename lowercase.
5. Removes known release-group and site tags:
   - `www pornreactor com`
   - `sharereactor`
   - `found via www filedonkey com`
   - `deviance`
   - `adunanza`
   - `-ftv`
   - `flt`
   - `[]`
   - `()`
6. Uppercases the following acronyms: `CD`, `VCD`, `DVD`, `ISO`, `PC`.
7. Capitalises the first letter of every word.
8. Removes duplicate spaces.
9. Removes dots after space characters.
10. Removes trailing spaces.
11. Replaces `By` with `by`.

:::note
Completed files cannot be renamed from the File Details window. Use the **Rename** option in the [Shared Files](./shared-files.md#renaming-a-file) window instead.
:::

## Other

Click **Show all comments** to open the [Comments](./comments.md) window for this file:

![Show all comments button](/img/docs/usage/window_file9.jpg)

This is especially useful on macOS with a single-button mouse, where the Transfers window right-click menu is not accessible.

Click **Close** to close the window. Any unapplied rename changes are discarded:

![Close button](/img/docs/usage/window_file11.jpg)

## Quick Reference

![File Details quick reference](/img/docs/usage/window_file10.jpg)

| # | Description |
|---|---|
| 1 | File's complete name |
| 2 | Path to the part.met metadata file |
| 3 | File's eD2k hash |
| 4 | File's total size |
| 5 | Number of currently known sources |
| 6 | Chunk count and known part-hash count |
| 7 | Current download speed |
| 8 | Total data transferred (including discarded corrupt data) |
| 9 | Data lost to corruption |
| 10 | Packets saved by ICH |
| 11 | Take over selected filename from the names list |
| 12 | Rename target filename input |
| 13 | Close window (unapplied changes are discarded) |
| 14 | File status |
| 15 | Last time a complete source was seen |
| 16 | Number of sources currently uploading |
| 17 | Available chunks count and percentage |
| 18 | Completed data amount and percentage |
| 19 | Data saved by compression |
| 20 | Known alternative filenames list |
| 21 | Cleanup the filename in the input field |
| 22 | Rename file with the text in the input field |
| 23 | Open the Comments window for this file |
