---
id: import
title: Import
---

The Import tool integrates eDonkey2000 part files into aMule so you can continue downloads that were in progress in eDonkey2000 without starting over. aMule detects the part files, converts them to its own format, and adds them to the download queue.

![Import window](/img/docs/usage/window_import1.jpg)

Open the Import tool by clicking the **Import** button in the [toolbar](../interfaces/gui/toolbar.md).

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

**Remove a file** from the list (cancels import if in progress) by selecting it and clicking **Remove selected**:

![Remove selected button](/img/docs/usage/window_import6.jpg)

**Retry a failed file** by selecting it and clicking **Retry selected**:

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
| `Fetching status...` | Reading configuration and initialising |
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
| **Filename** | Path to the directory being imported, or the filename of the specific file |
| **State** | Current import status (see table below) |
| **Size** | Original file size, and in brackets the disk space needed for the converted file |
| **Filehash** | The resulting eD2k hash of the converted file |

### State Values

| State | Meaning |
|---|---|
| **Completed** | File has been successfully converted and added to the queue |
| **In progress** | File is currently being converted |
| **Error: Out of diskspace** | Not enough free disk space to complete the conversion |
| **Error: Partmet not found** | No `.part.met` metadata file was found for this file |
| **Error: IO error!** | Read or write error during conversion (possible permissions issue) |
| **Error: Failed!** | General conversion error |
| **Queued** | File is waiting to be converted |
| **Already downloading** | This file is already in the aMule download queue; conversion skipped |
| **Unknown or bad tempfile format** | The file format is not recognised or is invalid |

## Closing the Import Window

When all files have been imported, click **Close** to exit the import tool:

![Close button](/img/docs/usage/window_import12.jpg)

:::note
The import list is not sortable. Column widths can be resized but are not saved between sessions.
:::

## Quick Reference

### Import Window

![Import window quick reference](/img/docs/usage/window_import13.jpg)

| # | Description |
|---|---|
| 1 | Path to the file or directory currently being imported |
| 2 | Import progress percentage |
| 3 | Import progress bar |
| 4 | Import list |
| 5 | Add a directory to import |
| 6 | Retry importing the selected file (if it failed) |
| 7 | Import status messages |
| 8 | Remove selected file from the list |
| 9 | Close the import window |

### Directory Browser

![Directory browser quick reference](/img/docs/usage/window_import14.jpg)

| # | Description |
|---|---|
| 1 | Create a new directory |
| 2 | Go to home directory |
| 3 | File system browser |
| 4 | Show/hide hidden directories |
| 5 | Path input for the directory to import |
| 6 | Accept and begin importing |
| 7 | Close without importing |
