---
id: file-details
title: File Details
---

The File Details window provides a comprehensive view of a file's current state, its download progress, ICH corruption-handling statistics, known alternative file names, and controls to rename the file before it completes.

![File Details window](/img/docs/usage/window_file1.jpg)

Open it by right-clicking a file in the [Downloads](./downloads.md) window and selecting **File Details** (or via the [shortcut](./shortcuts.md)).

## View Details

### General

![General section](/img/docs/usage/window_file2.jpg)

| Field | Description |
|---|---|
| **Full Name** | The name the file will have when it completes (or its current name if already complete) |
| **met-File** | Path to the file's [`part.met`](../../configuration/config-files/index.md#temporary-download-files) metadata file; for completed files this equals the Full Name path |
| **Hash** | The file's [eD2k hash](../../../p2p-networks/concepts.md#md4-hash-ed2k-hash) |
| **Filesize** | The file's total size when complete (or current size if complete) |
| **Partfilestatus** | The file's current status (see table below) |
| **Last seen complete** | The last time a source with the complete file was seen on the network |

**Partfilestatus** values:

| Status | Description |
|---|---|
| **Complete** | The file has been successfully downloaded |
| **Completing** | The download has finished and the file is being finalized (moved into place) |
| **Hashing** | The file's hash is being computed or it is waiting to be hashed |
| **Allocating** | Disk space for the file is being allocated |
| **Downloading** | The file is actively being downloaded (at least one source is uploading to you) |
| **Waiting** | The file is waiting for a source to upload to you (no source is currently uploading) |
| **Paused** | The file has been paused |
| **Stopped** | The file has been stopped |
| **Insufficient disk space** | There is not enough free disk space to continue |
| **Erroneous** | An error occurred reading or creating the file |

:::note
**Stopped** is not a separate internal state: it is shown whenever the file is stopped (and not yet complete), overriding the **Downloading**/**Waiting** text.
:::

### Transfer

The Transfer section shows statistics and progress details for the download:

![Transfer section](/img/docs/usage/window_file3.jpg)

| Field | Description |
|---|---|
| **Found Sources** | Number of sources currently known for the file |
| **Transferring Sources** | Number of sources currently uploading to you |
| **Filepart-Count** | Total number of [chunks](../../../p2p-networks/concepts.md#chunk) the file is divided into; in brackets, the number of chunk hashes known |
| **Available** | Number of chunks known to be available from sources, and in brackets the percentage of total chunks |
| **Datarate** | Current download speed for this file (more precise than the Downloads window; shows up to two decimal places) |
| **Download Active Time** | Total time the file has spent actively downloading, shown as hours and minutes |
| **Transferred** | Total data received for this file (includes any corrupted data that was later discarded) |
| **Completed Size** | Amount of verified data completed, followed by the percentage of the total file size shown in brackets, e.g. `12.3 MB / (45.6% done)` (more accurate than the percentage shown in the Downloads window) |

:::note
When a file is complete, some Transfer values may reset to zero.
:::

### Intelligent Corruption Handling

This section shows statistics from the [ICH](../../../p2p-networks/ed2k/aich.md#ich--intelligent-corruption-handling) (Intelligent Corruption Handling) subsystem:

![ICH section](/img/docs/usage/window_file4.jpg)

| Field | Description |
|---|---|
| **Lost to corruption** | Amount of downloaded data that was discarded after being identified as [corrupt](../../../p2p-networks/concepts.md#corrupt) |
| **Gained by compression** | Data saved thanks to the eD2k protocol's zlib compression — less is transferred over the network than the verified data written to disk. For a completed file this equals `Completed Size − Transferred` |
| **Packages saved by I.C.H.** | Number of packets rescued from corrupt chunks by ICH, avoiding a full re-download |

### File Names

This is a list of names that other clients have reported for the same file (identified by its hash):

![File names section](/img/docs/usage/window_file5.jpg)

| Column | Description |
|---|---|
| **File Name** | The name as reported by a source |
| **Sources** | Number of sources that reported this name |

The list is sorted by source count (most-reported names first) and is useful for [detecting fakes](../../troubleshooting/fake-files-and-servers.md#how-do-i-detect-fake-files) — if many sources report a different name from what you downloaded, the file may not be what it claims to be.

:::note
Not all sources report a filename. The list is rebuilt from the file's current sources on each refresh, so it empties once the file completes and its sources are released.
:::

## Rename

You can change the name the file will receive when it completes. Type the new name in the text field and click **Apply** to rename without closing the window, or **Ok** to rename and close it at once:

![Rename text field](/img/docs/usage/window_file6.jpg)

To use one of the names from the File Names list, select it and click **Takeover** (or double-click the name) to copy it into the text field, then click **Apply**:

![Take over a filename from the list](/img/docs/usage/window_file7.jpg)

### Cleanup Function

Click **Cleanup** to automatically clean up the filename currently in the text field before renaming:

![Cleanup button](/img/docs/usage/window_file8.jpg)

The cleanup function performs the following steps in order:

1. Makes the extension lowercase and does not touch it further (the dot before the extension is also preserved throughout).
2. Replaces dots (`.`), underscores (`_`), and HTML space codes (`%20`) with single spaces.
3. Removes the literal scene tag `hYPNOTiC` (matched with that exact mixed-case spelling, before the name is lowercased).
4. Makes the entire filename lowercase.
5. Uppercases the substring `xxx` to `XXX`.
6. Removes known release-group and site tags:
   - `www pornreactor com`
   - `sharereactor`
   - `found via www filedonkey com`
   - `deviance`
   - `adunanza`
   - `-ftv`
   - `flt`
   - `[]`
   - `()`
7. Uppercases the following acronyms: `CD`, `VCD`, `DVD`, `ISO`, `PC`. `CD`, `VCD`, and `DVD` are also uppercased when directly followed by a digit (e.g. `cd1` → `CD1`), while `ISO` and `PC` are only matched as standalone words.
8. Capitalises the first letter of every word.
9. Removes duplicate spaces.
10. Removes dots after space characters.
11. Removes trailing spaces.
12. Replaces `By` with `by`.

:::note
Completed files cannot be renamed from the File Details window. Use the **Rename** option in the [Shared Files](./shared-files.md#renaming-a-file) window instead.
:::

## Other

Click **Show all comments** to open the [Comments](./comments.md) window for this file:

![Show all comments button](/img/docs/usage/window_file9.jpg)

This is especially useful on macOS with a single-button mouse, where the Downloads window right-click menu is not accessible.

When you open File Details with several downloads selected, the arrow buttons at the bottom let you step through them — moving to the previous or next file in the selection without closing the window.

Click **Cancel** to close the window. Any unapplied rename changes are discarded:

![Cancel button](/img/docs/usage/window_file11.jpg)
