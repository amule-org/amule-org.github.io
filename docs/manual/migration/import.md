---
id: import
title: Import
---

The Import tool integrates [eDonkey2000](../../p2p-networks/ed2k/index.md) part files into aMule so you can continue downloads that were in progress in eDonkey2000 without starting over. aMule detects the part files, converts them to its own format, and adds them to the [download queue](../interfaces/gui/downloads.md#download-queue).

![Import window](/img/docs/usage/window_import1.jpg)

Open the Import tool by clicking the **Import** button in the [toolbar](../interfaces/gui/toolbar.md). The window that opens is titled **Import partfiles**.

:::note
If you are migrating from **eMule**, the temporary file format is directly compatible — no import needed. See [Migrate from eMule](./migrate-from-emule.md) for the full migration guide.

If you are migrating from a client other than eDonkey2000 (e.g., mlDonkey or xMule), see [Import/Export Files](./import-export.md) for an alternative approach.
:::

## Adding Files

Click **Add imports** to start selecting a directory to import from:

![Add imports button](/img/docs/usage/window_import2.jpg)

A directory browser appears. Navigate to the directory that contains your eDonkey2000 temporary files (or type the path directly in the text field), then click **OK**:

![Directory browser](/img/docs/usage/window_import3.jpg)

Directory browser controls:

![Directory browser controls](/img/docs/usage/window_import9.jpg)

| Control | Function |
|---|---|
| **Show hidden directories** checkbox | Check to display hidden directories; uncheck to hide them |
| House button | Jump directly to your home directory |
| New folder button | Create a new directory |

After selecting a directory, aMule asks whether you want to **delete the original files** once they are successfully imported:

![Delete originals prompt](/img/docs/usage/window_import4.jpg)

| Answer | Effect |
|---|---|
| **Yes** | Delete the original eDonkey2000 part files after successful import |
| **No** | Keep the original files intact |
| **Cancel** | Abort importing this directory |

If any eDonkey2000 part files are found, they are added to the import list:

![Files added to import list](/img/docs/usage/window_import5.jpg)

## Managing the Import List

Files in the import list are processed in sequence — as soon as one file finishes converting, the next begins. Only one file is imported at a time.

**Remove a file** from the list by selecting it and clicking **Remove selected**. The file currently being converted cannot be removed — the action is ignored for it:

![Remove selected button](/img/docs/usage/window_import6.jpg)

**Retry a file** (any file that is not completed and not currently in progress — typically a failed one) by selecting it and clicking **Retry selected**. The file is put back into the queue:

![Retry selected button](/img/docs/usage/window_import7.jpg)

:::note
The import list cannot be cleared manually — it is cleared automatically when aMule restarts.
:::

## Monitoring Progress

The title bar of the progress area shows the path of the directory currently being imported:

![Current directory being imported](/img/docs/usage/window_import8.jpg)

When no import is active, the title reads **Waiting…**

A **progress bar** and **percentage** display show how far along the current file's import is:

![Import progress bar](/img/docs/usage/window_import10.jpg)

Detailed status messages appear above the progress bar:

![Import status messages](/img/docs/usage/window_import11.jpg)

### Status Messages

| Message | Meaning |
|---|---|
| `Reading temp folder` | Searching for part files in the selected directory |
| `Retrieving basic information from download info file` | Reading metadata from the part file to begin conversion |
| `Creating destination file` | Allocating disk space for the converted file |
| `Loading data from old download file (N of M)` | Reading file N of M from the import list into memory for conversion |
| `Saving data block into new single download file (N of M)` | Writing the converted data for file N of M |
| `Copy` | Copying or moving the converted part file to its final location |
| `Retrieving source downloadfile information` | Conversion succeeded; extracting gap information and other metadata |
| `Adding download and saving new partfile` | The file has been fully converted and is being added to the download queue |

## Columns

| Column | Description |
|---|---|
| **File name** | Path to the directory being imported, or the filename of the specific file |
| **State** | Current import status (see table below) |
| **Size** | Original file size, followed by the disk space needed for the converted file in the form `(Disk: …)` |
| **Filehash** | The resulting [eD2k hash](../../p2p-networks/concepts.md#md4-hash-ed2k-hash) of the converted file |

### State Values

| State | Meaning |
|---|---|
| **Completed** | File has been successfully converted and added to the queue |
| **In progress** | File is currently being converted |
| **ERROR: Out of disk space** | Not enough free disk space to complete the conversion |
| **ERROR: Partmet not found** | No [`.part.met`](../configuration/config-files/index.md#temporary-download-files) metadata file was found for this file |
| **ERROR: IO error!** | Read or write error during conversion (possible permissions issue) |
| **ERROR: Failed!** | General conversion error |
| **Queued** | File is waiting to be converted |
| **Already downloading** | This file is already in the aMule download queue; conversion skipped |
| **Unknown or bad tempfile format.** | The file format is not recognised or is invalid |

## Closing the Import Window

When all files have been imported, click **Close** to exit the import tool:

![Close button](/img/docs/usage/window_import12.jpg)

:::note
The import list is not sortable. Column widths can be resized but are not saved between sessions.
:::
