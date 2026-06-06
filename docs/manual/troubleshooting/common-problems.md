---
id: common-problems
title: Common Problems
---

Solutions to the most frequently encountered problems when running aMule.

## Why is aMule taking so much CPU at startup?

aMule hashes every new or modified file found in the [Shared Directories](../configuration/directories.md#shared-directories) at startup. It recognizes already-hashed files by matching their name, size and modification time against [`known.met`](../configuration/config-files/index.md#knownmet), so only files not found there are hashed. This is expected behavior for new files.

If aMule is **always** consuming heavy CPU at startup even when no new files have been added or modified, `known.met` may be corrupted (by an external program or user error). Delete it and restart aMule to force a full rehash:

```bash
rm ~/.aMule/known.met
```

## "No valid servers to connect in serverlist found" — what does this mean?

This message appears when the option **"Auto connect to servers in the static list only"** is enabled but the static server list is empty. See [Static Servers](../../p2p-networks/ed2k/index.md#static-servers) for background and [`staticservers.dat`](../configuration/config-files/index.md#staticserversdat) for the file that stores this list.

**Solutions:**

1. **Disable the option**: Preferences → Servers → uncheck "Auto connect to servers in the static list only".
2. **Add a server to the static list**: in the Servers window, right-click a server and select "Add to static". Repeat for all servers you want to keep.

## Why does aMule suddenly have no servers in the server list?

This typically happens when both of these options are enabled simultaneously:

- **Preferences → Servers → "Remove dead server after X retries"**
- **Preferences → Connection → "Reconnect on loss"**

If your internet connection was lost briefly, aMule detected the disconnection, tried to reconnect to each server, and removed them one by one after X failed attempts until the list was empty.

**Solution**: disable **"Remove dead server after X retries"**. It is safe to leave "Reconnect on loss" enabled.

To repopulate the list, see [Server List](../../p2p-networks/ed2k/index.md#server-list). When re-adding servers, be careful with untrusted sources — see [Fake Servers](./fake-files-and-servers.md#fake-servers).

## Why does aMule always get a Low ID after connecting to a server?

A [Low ID](../configuration/network-connectivity.md) is assigned when the server cannot reach your client on the eD2k TCP port. Three possible causes:

1. **Port 4662 TCP is not open** in your firewall or not forwarded in your router. See [Network Connectivity](../configuration/network-connectivity.md) and [Test Your Ports](../configuration/network-connectivity.md#testing-your-port-status).

2. **The server is overloaded or misconfigured** and is issuing LowIDs even to clients with open ports. Try a different server.

3. **Your ISP blocks P2P traffic** on the standard eD2k port 4662. See [ISP blocking or throttling eD2k ports](./slow-speeds.md#isp-blocking-or-throttling-ed2k-ports).

## I lost a download — can I recover it?

All partial downloads live in the [Temporary directory](../configuration/directories.md#temporary-directory) as [`*.part` and `*.part.met` files](../configuration/config-files/index.md#temporary-download-files). Two scenarios:

### Scenario 1: `*.part` files are missing

The download data itself is gone. If [`*.part.met`](../configuration/config-files/index.md#temporary-download-files) files are still present, aMule will restart the downloads from scratch on next launch. There is no recovery of the partially downloaded data.

### Scenario 2: `*.part.met` files are missing but `*.part` files exist

First, check if `*.part.met.bak` backup files exist in the Temp directory:

```bash
ls ~/.aMule/Temp/*.part.met.bak
```

If they exist, restore them:

```bash
cd ~/.aMule/Temp
for file in *.part.met.bak; do
  mv -f "$file" "${file%.bak}"
done
```

### Scenario 3: Both `*.part.met` and `*.part.met.bak` are missing but `*.part` exists

Search aMule for the file you were downloading and start a new download of it. Then reassign the existing partial data:

1. Close aMule. The new download creates a new `NNN.part` file (e.g., `011.part`) with its own `011.part.met`.
2. Rename the new `.met` to match the old `.part` number (e.g., rename `011.part.met` to `008.part.met` if your old partial file was `008.part`).
3. Delete the new `.part` file (e.g., delete `011.part`).
4. Restart aMule — it will pick up the old `.part` file with the restored `.met`.

## Why does aMule become unresponsive to mouse clicks even though it hasn't crashed?

A dialog window is open somewhere on your desktop, possibly hidden behind other windows or on a different workspace. aMule is waiting for it to be dismissed. Check all workspaces for any aMule dialog (confirmation boxes, error dialogs, etc.) and click OK or Cancel.

If aMule has genuinely stopped responding instead of waiting on a dialog, see [aMule is crashing quite often](#amule-is-crashing-quite-often-can-i-set-it-to-restart-automatically) and, to report the problem, [Report a Bug](../../contributing/bug-report.md).

## Why are some files in my shared folders not shown in the Shared Files window?

If you added files after aMule was already running, click the **Reload** button in the Shared Files window. aMule will rescan and hash the new files (this takes CPU time proportional to the number of new files). See [Managing Shared Files](../configuration/directories.md#managing-shared-files) for details.

If files keep disappearing after a restart, [`known.met`](../configuration/config-files/index.md#knownmet) may be corrupted. Delete it:

```bash
rm ~/.aMule/known.met
```

On next startup, aMule will rehash all shared files from scratch.

## I always get a message about addresses.dat when I start aMule. What's wrong?

This happens when:
- The option **Preferences → Servers → "Auto-update serverlist at startup"** is enabled, **and**
- There are no server list URLs in [`~/.aMule/addresses.dat`](../configuration/config-files/index.md#addressesdat).

**Solutions:**
- Add server list URLs in **Preferences → Servers → "List"**.
- Or disable **"Auto-update serverlist at startup"** if you don't need automatic updates.

## What should I do if I lose my cryptkey.dat file?

Losing [`cryptkey.dat`](../configuration/config-files/index.md#cryptkeydat) means **all your credits are lost** — permanently. There is no recovery.

Since the lost `cryptkey.dat` means your old identity cannot be verified, you must also delete [`~/.aMule/preferences.dat`](../configuration/config-files/index.md#preferencesdat). Otherwise, clients that previously identified you (before the loss) will not be able to grant you credits again:

```bash
rm ~/.aMule/cryptkey.dat
rm ~/.aMule/preferences.dat
```

Start aMule fresh and begin rebuilding credits. For how credits work, see [FAQ → Credits, bandwidth and upload](/docs/manual/faq#credits-bandwidth-and-upload).

## Why is aMule ignoring the bandwidth I set per slot?

aMule does not give each slot exactly the value you configured. The number of upload slots is derived from your upload limit and the slot allocation:

```
slots = round(BandwidthLimit / SlotAllocation)
```

with a hard **minimum of 2 slots** that aMule always enforces, regardless of any other setting. When your **Bandwidth Limit** is very low (below 10 KBps) aMule also falls back to this 2-slot minimum.

This is why the per-slot value can appear to be ignored: if your upload limit is too low to honor the slot allocation, aMule still opens the minimum 2 slots, so each slot ends up with **less** bandwidth than you asked for.

Do not confuse **Bandwidth Limit** (actual maximum upload rate for aMule) with **Bandwidth Capacity** (your line's physical maximum, used only for the Statistics graph).

**Example:**
- Bandwidth Limit: 7 KBps
- Slot allocation: 2 KBps

aMule opens `round(7 / 2) = 4` slots, so each slot averages `7 / 4 = 1.75 KBps` — below the 2 KBps you set.

See also [FAQ → What is slot allocation?](/docs/manual/faq#what-is-slot-allocation).

## All my downloads suddenly paused and I can't resume them. What's going on?

Check disk space in the filesystem where your [Temporary directory](../configuration/directories.md#temporary-directory) is located. aMule requires a minimum of **9.28 MB** of free space to download a chunk. If free space drops below the threshold set in **Preferences → Files → "Min disk space"**, aMule pauses all downloads to avoid corruption. See [Disk Space Protection](../configuration/directories.md#disk-space-protection) for details.

Free up disk space and then resume downloads.

## I downloaded a file that got corrupted after completion. Can I avoid re-downloading the whole thing?

This works because aMule verifies each chunk against its expected hash, so it can keep the intact chunks of the renamed file and only re-fetch the corrupted ones. If you still have the `ed2k://` link:

1. Start the download again.
2. Wait until at least one full chunk (9.28 MB) has been downloaded into the [Temporary directory](../configuration/directories.md#temporary-directory) (the [`*.part` / `*.part.met` files](../configuration/config-files/index.md#temporary-download-files)).
3. Close aMule.
4. Rename the corrupted completed file to match the new partial download's `.part` filename (e.g., `002.part`).
5. Run `touch` on the renamed file:
   ```bash
   touch ~/.aMule/Temp/002.part*
   ```
6. Restart aMule. It will detect which chunks are intact (matching the expected hash) and which are corrupted, and will only re-download the corrupted chunks.

## What should I be aware of when using NFS mounts with aMule?

If any of your [Shared Directories](../configuration/directories.md#shared-directories) or [Temp/Incoming directories](../configuration/directories.md#incoming-directory) are on NFS mounts, make sure to **unmount those NFS shares from any computer being shut down** before the shutdown happens.

If an NFS mount becomes unavailable while aMule is running, aMule will hang indefinitely waiting for the mount to come back. Symptoms: the Statistics window shows flat non-zero lines for Download/Upload/Connections that drop to zero only after the NFS mounts are restored.

After unmounting NFS shares from any machine, also click **Reload** in the Shared Files window.

## Why don't downloaded files have the permissions I expect?

aMule has no in-application file-permission setting. It creates files in your [Incoming directory](../configuration/directories.md#incoming-directory) using the operating system's default mode, which is then masked by the process **umask**. The `umask` value defines which permission bits applications are **not** allowed to set.

Example: aMule requests mode `666` (read/write for everyone) when creating a file, but if your `umask` is `022`:

```
666 AND NOT 022 = 644
```

the file ends up with `644` (group and others lose write access).

Check your current umask:

```bash
umask
```

To change it, set `umask` in your shell profile or session before launching aMule. On systemd-based systems you can set `UMask=` in the service unit file.

## Why am I getting "Too many connections" or file descriptor errors?

Both symptoms have the same root cause: the number of connections aMule tries to open approaches or exceeds the operating system's per-process **open file descriptor** limit. Other applications on the same machine also consume descriptors, so aMule hits the OS limit and fails to open new connections or create files.

Check current limits:

```bash
ulimit -a
```

The relevant line is `open files`. Raise it for your session with:

```bash
ulimit -n <value>
```

On most Linux distributions, permanent limits can be set in `/etc/security/limits.conf` (changes take effect on the next login session). If you do not want to raise the OS limit, lower **Preferences → Connection → Max Connections** instead — see [Max simultaneous connections too high](./slow-speeds.md#max-simultaneous-connections-too-high) for guidance on choosing a value.

## aMule is crashing quite often. Can I set it to restart automatically?

aMule has no built-in restart mechanism, but shell scripts can handle this — some of which also catch hangs (not just crashes). See this community thread for example scripts:

- [Auto-restart scripts (forum thread)](https://forum.amule.org/index.php?topic=542.0)

If the crashes are reproducible, please [report the bug](../../contributing/bug-report.md) and attach the [`logfile`](../configuration/config-files/index.md#logfile).
