---
id: download-folders
title: Download Folders
---

aMule uses two separate directories to manage downloads: a **Temporary directory** for in-progress downloads and an **Incoming directory** for completed files. A separate set of **Shared directories** controls which files are offered to the network for upload.

All three are configured in **Preferences → Directories**.

## Incoming Directory

Completed files are moved here when the download finishes and all chunks have been hash-verified. This is the folder you open to find your downloaded files.

### Default Locations

| Platform | Default Incoming Directory |
|---|---|
| Windows XP | `C:\Documents and Settings\<user>\My Documents\aMule Downloads` |
| Windows Vista+ | `C:\Users\<user>\Documents\aMule Downloads` |
| macOS | `~/Documents/aMule Downloads` |
| Linux / BSD | `~/.aMule/Incoming` |

### Changing the Incoming Directory

Open **Preferences → Directories** and change the path in the **Incoming Directory** field.

:::note
On Linux, `.aMule` is a hidden directory. Enable *Show hidden files* in your file manager to see it.
:::

## Temporary Directory

While a file is downloading, aMule stores its data here as a set of temporary files. Once a download completes, the finished file is moved to the Incoming directory and the temporary files are deleted.

### Default Locations

| Platform | Default Temporary Directory |
|---|---|
| Windows XP | `C:\Documents and Settings\<user>\Application Data\aMule\Temp` |
| Windows Vista+ | `C:\Users\<user>\AppData\Roaming\aMule\Temp` |
| macOS | `~/Library/Application Support/aMule/Temp` |
| Linux / BSD | `~/.aMule/Temp` |

### Changing the Temporary Directory

Open **Preferences → Directories** and change the path in the **Temporary Directory** field.

### Temporary Files

Each in-progress download is represented by a group of files in the Temp directory. For full details on the file format, see [Temporary download files (*.part, *.part.met)](../../developer/file-formats/part-met.md).

| File | Purpose |
|---|---|
| `<hash>.part` | The actual download data, pre-allocated to the full file size. Downloaded chunks overwrite the zero-filled placeholders. |
| `<hash>.part.met` | Metadata: filename, size, hash, which chunks have been verified. Required to resume the download. |
| `<hash>.part.met.bak` | Periodic backup of the `.part.met` file. Rename to `.part.met` to recover from a crash. |
| `<hash>.part.met.seeds` | Up to 10 known source addresses for the file. Only created when *Save sources for rare files* is enabled. |

:::tip
If you have in-progress downloads from eMule, copy their `.part` and `.part.met` files into aMule's Temp directory. aMule will re-hash them and resume the downloads automatically on the next start. See [Migrate from eMule](../migration/migrate-from-emule.md) for the full migration guide.
:::

## Per-Category Incoming Folders

Each [download category](../interfaces/gui/transfers.md#categories) can have its own incoming directory. When a completed file belongs to a category that has a folder configured, it is saved there instead of the default Incoming directory.

To set a category folder, right-click a category tab in the Transfers window and select **Edit category**, or create a new one with **Add category**.

## Shared Directories

aMule shares files with the eD2k and Kademlia networks from the following sources:

- Any directory explicitly marked as a **shared directory**.
- The **Incoming directory** — completed downloads are automatically shared.
- **Partially downloaded files** — only the verified chunks are shared while the download is in progress.

### Configuring Shared Directories

Go to **Preferences → Directories**. In the **Shared Directories** panel, check the box next to each directory you want to share.

- **Normal font** — directory is not shared.
- **Bold font** — directory is shared.
- **Yellow folder icon** — no subdirectories marked as shared.
- **Red folder icon** — subdirectories are also marked as shared.

To share a directory **recursively** (including all its subdirectories), double-click the folder icon next to the directory name.

To include hidden files from shared directories, enable **Share hidden files**.

:::warning
Be careful which directories you share. Sharing your home directory, documents folder, or any directory containing passwords, address books, or sensitive personal data will make that data available to every client on the network.
:::

### Managing Shared Files

The [Shared Files](../interfaces/gui/shared-files.md) window shows all files currently being shared, including per-file upload statistics, upload priority settings, and options to copy eD2k links. Use the **Reload** button after adding, moving, or deleting files outside aMule to refresh the list.

### Configuring via shareddir.dat

Shared directories can also be configured by editing `shareddir.dat` directly — one full directory path per line. The file is located in the aMule configuration directory (`~/.aMule/`).

:::warning
Stop aMule before editing `shareddir.dat`. Any changes made while aMule is running will be overwritten when aMule exits.
:::

### Disk Space Protection

To prevent downloads from filling the disk, open **Preferences → Files** and enable **Check Disk Space**, then set a minimum free-space threshold in **Min Disk Space**. When free space falls below the limit, aMule pauses downloads automatically with the *Insufficient disk space* status.
