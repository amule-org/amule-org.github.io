---
id: import-export
title: Import/Export Files
---

If you are switching to aMule from another [eD2k](../../p2p-networks/ed2k/index.md) client and the two clients use incompatible temporary file formats, you cannot simply copy the [`.part`](../configuration/config-files/index.md#temporary-download-files) files from one client's temp directory to the other. This guide describes a universal method to transfer in-progress downloads between any two eD2k clients using a local connection.

:::note
This issue primarily affects migrations from [**mlDonkey**](../../p2p-networks/ed2k/clients.md#mldonkey-2001present), [**eDonkey2000**](../../p2p-networks/ed2k/clients.md#edonkey2000-20002005), and certain [**xMule**](../../p2p-networks/ed2k/clients.md#xmule-20032009) versions. eMule's format is directly compatible with aMule; see [Migrate from eMule](./migrate-from-emule.md) instead.

For eDonkey2000 specifically, aMule also includes a built-in import tool — see [Import](./import.md).
:::

## When This Is Needed

You need this procedure when:

- You are moving from a client whose temporary file format is not compatible with aMule's.
- Direct file format conversion tools are not available for your specific client combination.
- You want a universal solution that works regardless of which two eD2k clients are involved.

## Procedure

The method uses the eD2k protocol itself to transfer the data: you set up a local peer-to-peer session between the old client (source) and aMule (destination) on the same machine or local network. Because both use the same eD2k protocol, the transfer is format-agnostic.

### Step 1 — Set Up a Testing Field

First, set up a local eD2k network environment (see the [Testing Field guide](../../developer/testing.md)) so both clients can connect without touching the real public network.

### Step 2 — Transfer the Downloads

With both clients running on the local network, use one of these approaches:

**Option A — Search and re-add:**

1. In aMule, perform a [**local search**](../interfaces/gui/searches.md) for each file you were downloading in the old client.
2. Add each result to the aMule [download queue](../interfaces/gui/downloads.md#download-queue).
3. aMule connects to the old client (which has partial data) and downloads from it at LAN speed.

**Option B — Copy ed2k links:**

1. In the old client, copy the [`ed2k://` link](../../p2p-networks/ed2k/links.md) for each file in the download queue.
2. Paste each link into aMule's [**ED2K-Link Handler**](../interfaces/gui/searches.md) or write it into the [`ED2KLinks`](../configuration/config-files/index.md#ed2klinks) file (located in aMule's configuration directory, e.g. `~/.aMule/ED2KLinks` on Linux).
3. aMule adds them to its queue and downloads from the old client.

Because both clients are on the same machine or LAN, the transfer happens at disk/LAN speed rather than internet speed.

### Step 3 — Remove the Old Client

Once all files have been fully downloaded to aMule, remove the old client from your system.

## Advantages

- **Universal**: works between any two eD2k clients, since they all speak the same protocol.
- **Fast**: transfers happen at LAN or disk speed rather than internet bandwidth.

## Disadvantages

- **Chunk boundary losses**: the eD2k protocol shares data in whole parts (a *part*, or chunk, is 9.28 MB), and a peer only offers a part to others once that part is fully complete. Any partially completed part must therefore be re-downloaded. For large files this means losing at most one part (~9.28 MB), which is typically 5% or less of the already-downloaded data.
- **Worst case for small files**: if you have many files smaller than ~9.28 MB (one eD2k part), an incomplete part can represent most of the file's data — up to 100% if the file's single part was never completed. In such cases it may be faster to finish downloading those specific files in the old client before switching to aMule.
- **Temporary disk space**: you need free disk space for both the original temporary files and the new aMule temporary files simultaneously. To minimise this, import one file at a time and delete the old temporary file after each successful import.

## Alternative: aMule's Import Tool

aMule includes an optimised **Import** tool that can directly read some clients' temporary file formats without a peer-to-peer transfer. See [Import](./import.md) for details.

## Alternative: mlDonkey Importer Script

aMule ships with a Perl script for importing mlDonkey temporary files:

```
src/utils/scripts/mldonkey_importer.pl <mldonkey_config_folder> <amule_temp_folder>
```

It reads mlDonkey's download metadata from the given config folder (e.g. `~/.mldonkey`) and writes the converted [`.part` and `.part.met`](../configuration/config-files/index.md#temporary-download-files) files into the specified aMule temp folder. This script is available in the aMule source tree and provides a direct format conversion for mlDonkey files without needing the network-transfer approach.
