---
id: common-problems
title: Common Problems
---

# Common Problems

Solutions to the most frequently encountered problems when running aMule.

---

## Why is aMule taking so much CPU at startup?

aMule hashes every new or modified file found in the Shared Directories at startup. This is expected behavior for new files.

:::tip
aMule 3.0.0 includes additional fixes for excessive CPU usage at startup. If you are still experiencing this issue, upgrading to the latest version is strongly recommended.
:::

If aMule is **always** consuming heavy CPU at startup even when no new files have been added or modified, there is a known issue:

- **Versions earlier than 2.0.0-rc3**: hashing always occurred when the Temp, Incoming, or any Shared Directory was on a FAT32 partition. This was fixed in 2.0.0-rc3.
- **Versions earlier than 2.0.0-rc4**: filesystems with UTF-8 encoding (observed with SuSE 9.1) caused problems when any file or directory in the Shared Directories path contained a special character.

  **Workaround for the UTF-8 issue**: after aMule finishes hashing (CPU usage drops), close aMule and re-encode `~/.aMule/known.met`:

  ```bash
  recode u8 ~/.aMule/known.met
  ```

  This must be repeated whenever a new file is added or modified. The recommended fix is to upgrade to the latest aMule version.

- **Corrupted `known.met`**: if none of the above applies, `known.met` may be corrupted (by an external program or user error). Delete it and restart aMule to force a full rehash:

  ```bash
  rm ~/.aMule/known.met
  ```

---

## "No valid servers to connect in serverlist found" — what does this mean?

This message appears when the option **"Auto connect to servers in the static list only"** is enabled but the static server list is empty.

**Solutions:**

1. **Disable the option**: Preferences → Servers → uncheck "Auto connect to servers in the static list only".
2. **Add a server to the static list**: in the Servers window, right-click a server and select "Add to static". Repeat for all servers you want to keep.

---

## Why does aMule suddenly have no servers in the server list?

This typically happens when both of these options are enabled simultaneously:

- **Preferences → Servers → "Remove dead server after X retries"**
- **Preferences → Connection → "Reconnect on loss"**

If your internet connection was lost briefly, aMule detected the disconnection, tried to reconnect to each server, and removed them one by one after X failed attempts until the list was empty.

**Solution**: disable **"Remove dead server after X retries"**. It is safe to leave "Reconnect on loss" enabled.

---

## aMule connects to a server but always gets a Low ID. Why?

Three possible causes:

1. **Port 4662 TCP is not open** in your firewall or not forwarded in your router. See [eD2k Network → Ports](/docs/ed2k/ed2k-network#ports) and [Test Your Ports](/docs/troubleshooting/fake-files-and-servers#testing-your-ports).

2. **The server is overloaded or misconfigured** and is issuing LowIDs even to clients with open ports. Try a different server.

3. **Your ISP blocks P2P traffic** on the standard eD2k port 4662. Configure aMule to use a different port:
   - Preferences → Connection → Standard client TCP port → change to a non-standard value (e.g., TCP port 25600 has been known to work on some ISPs).

---

## aMule was interrupted while completing a file and now it never completes (it shows 100% downloaded). How do I fix this?

This happens when aMule is killed mid-completion and the final hash-check pass was not finished. Fix:

1. Close aMule.
2. Go to your Temp directory (default: `~/.aMule/Temp`).
3. Run:
   ```bash
   touch ./*
   ```
4. Restart aMule. It will detect the pending completion and finish the process.

---

## I lost a download — can I recover it?

Two scenarios:

### Scenario 1: `*.part` files are missing

The download data itself is gone. If `*.part.met` files are still present, aMule will restart the downloads from scratch on next launch. There is no recovery of the partially downloaded data.

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

Two approaches:

- **MetFileRegenerator**: a Java tool that reconstructs `*.part.met` files from the existing `.part` data. Search for it in aMule forums.
- **Manual reassignment**:
  1. Search aMule for the file you were downloading and start a new download of it.
  2. Close aMule. The new download creates a new `NNN.part` file (e.g., `011.part`) with its own `011.part.met`.
  3. Rename the new `.met` to match the old `.part` number (e.g., rename `011.part.met` to `008.part.met` if your old partial file was `008.part`).
  4. Delete the new `.part` file (e.g., delete `011.part`).
  5. Restart aMule — it will pick up the old `.part` file with the restored `.met`.

---

## Why does aMule become unresponsive to mouse clicks even though it hasn't crashed?

A dialog window is open somewhere on your desktop, possibly hidden behind other windows or on a different workspace. aMule is waiting for it to be dismissed. Check all workspaces for any aMule dialog (confirmation boxes, error dialogs, etc.) and click OK or Cancel.

---

## Why are some files in my shared folders not shown in the Shared Files window?

If you added files after aMule was already running, click the **Reload** button in the Shared Files window. aMule will rescan and hash the new files (this takes CPU time proportional to the number of new files).

If files keep disappearing after a restart, `~/.aMule/known.met` may be corrupted. Delete it:

```bash
rm ~/.aMule/known.met
```

On next startup, aMule will rehash all shared files from scratch.

---

## I always get a message about addresses.met when I start aMule. What's wrong?

This happens when:
- The option **Preferences → Servers → "Auto-update serverlist at startup"** is enabled, **and**
- There are no server list URLs in `~/.aMule/addresses.dat`.

**Solutions:**
- Add server list URLs in **Preferences → Servers → "List"**.
- Or disable **"Auto-update serverlist at startup"** if you don't need automatic updates.

---

## What should I do if I lose my cryptkey.dat file?

Losing `cryptkey.dat` means **all your credits are lost** — permanently. There is no recovery.

Since the lost `cryptkey.dat` means your old identity cannot be verified, you must also delete `~/.aMule/preferences.dat`. Otherwise, clients that previously identified you (before the loss) will not be able to grant you credits again:

```bash
rm ~/.aMule/cryptkey.dat
rm ~/.aMule/preferences.dat
```

Start aMule fresh and begin rebuilding credits.

---

## Why does the Upload/Download limit reset to 0 after every restart?

This occurred in aMule versions **earlier than 2.0.0-rc4** when you set a Bandwidth Limit higher than the corresponding Bandwidth Capacity value. The fix was applied in 2.0.0-rc4. If you are on a current version and still see this, verify that your Download/Upload limits do not exceed the corresponding Capacity values in Preferences → Connection.

---

## Why is aMule ignoring the bandwidth I set per slot?

The per-slot bandwidth setting is enforced only if it allows **at least 3 simultaneous upload slots**. The effective maximum speed per slot is:

```
max_slot_speed = BandwidthLimit / 3
```

Do not confuse **Bandwidth Limit** (actual maximum upload rate for aMule) with **Bandwidth Capacity** (your line's physical maximum, used only for the Statistics graph).

Additionally, if after allocating slots there is remaining bandwidth before hitting the Limit, aMule will open an extra slot and redistribute the bandwidth evenly across all slots.

**Example:**
- Bandwidth Limit: 7 KBps
- Slot allocation: 2 KBps

After 3 slots (6 KBps used), 1 KBps remains. aMule opens a 4th slot and gives all 4 slots `7 / 4 = 1.75 KBps` each.

---

## Why am I getting "Too many connections" messages in the terminal?

You have set a very high value for **Preferences → Connection → Max Connections** that approaches or exceeds the operating system's per-process file descriptor limit. Other applications on the same machine also consume connections, which means aMule hits the OS limit and fails to open new ones.

**On Windows 9x/ME**: the limit is 100 TCP connections. To raise it, edit the Windows registry:

```
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\VxD\MSTCP\MaxConnections
```

Set it as a String value containing a 32-bit decimal number. (This key usually does not exist and must be created.)

**On Linux**: check limits with `ulimit -a` and adjust with `ulimit -n <value>`.

---

## My progress bars have lost their 3D effect and look flat. Can I restore them?

In most aMule versions: **Preferences → GUI Tweaks → Progress bar style → move slider to the rightmost position** for the best 3D effect.

Exception — versions 2.0.0-rc4 to 2.0.0-rc6: in those specific releases, the best 3D effect is achieved with the **middle** position. The rightmost gives a flat appearance; the leftmost gives a dark appearance.

---

## All my downloads suddenly paused and I can't resume them. What's going on?

Check disk space in the filesystem where your **Temp directory** is located. aMule requires a minimum of **9.28 MB** of free space to download a chunk. If free space drops below the threshold set in **Preferences → Files → "Min disk space"**, aMule pauses all downloads to avoid corruption.

Free up disk space and then resume downloads.

---

## Why can't I preview a file?

aMule allows preview of **video files only**. Two conditions must be met:

1. The file has a recognized video extension (`.avi`, `.mpg`, `.mpeg`, `.divx`, `.mov`, `.rm`, etc.).
2. At least the **first 256 KB** of the file has been downloaded.

If aMule refuses to preview a file that you believe is previewable, navigate to your Temp directory manually and open the `NNN.part` file with a video player directly.

---

## Why doesn't aMule's preview work with MPlayer?

Since aMule 2.0.0-rc4, the preview command does not run in the same terminal as aMule. MPlayer requires a terminal to display output and accept keyboard input.

Set aMule's preview command in Preferences to:

```bash
xterm -T "aMule preview" -iconic -e mplayer -idx "%PARTFILE"
```

If MPlayer hangs on incomplete AVI files, add `-demuxer lavf`:

```bash
xterm -T "aMule preview" -iconic -e mplayer -demuxer lavf "%PARTFILE"
```

---

## After closing MPlayer from a preview, my aMule stays locked

This bug existed in aMule **prior to 2.0.0-rc4**. The root cause: MPlayer kept its main process running in the background after the window was closed, and aMule was waiting for the preview process to exit.

**Workaround (aMule < 2.0.0-rc4)**: exit MPlayer by pressing the **Q** key (not by closing the window).

**Fix**: upgrade to a current aMule version.

---

## Why is Transferred a smaller number than Completed?

This seems counterintuitive but is correct. See [General FAQ → Transferred vs Completed](/docs/faq/general#what-is-the-difference-between-transferred-and-completed-in-the-transfers-window).

In summary: "Transferred" is raw compressed bytes received. "Completed" is the amount of actual useful file data extracted from those bytes after decompression and protocol header removal. Transferred will always be less than or equal to Completed.

---

## aMule always slows down my computer when it completes a download. Is this normal?

Yes. When a download completes, aMule performs a **full file hash verification**: it hashes all downloaded chunks and verifies them against the expected values. Even though chunk integrity is checked incrementally during downloading, this final pass ensures no chunk was corrupted by the user or an external application after it was written.

This is CPU-intensive for large files and is expected behavior.

---

## Is there a way to recursively select a whole directory and its contents in Preferences?

Yes:

- **aMule 2.0.0-rc4 or later**: right-click the directory icon you want to select recursively in the Shared Directories list.
- **aMule 1.x and up to 2.0.0-rc3**: click the directory while holding the **Ctrl** key.

aMule 3.0.0 introduced dedicated configuration files for shared directories: `shareddir-explicit.dat` (non-recursive shares) and `shareddir-recursive.dat` (recursive shares), replacing the single `shareddir.dat` file. See the [aMule Files Reference](/docs/user-guide/amule-files) for details.

---

## I downloaded a file that got corrupted after completion. Can I avoid re-downloading the whole thing?

If you still have the `ed2k://` link:

1. Start the download again.
2. Wait until at least one full chunk (9.28 MB) has been downloaded.
3. Close aMule.
4. Rename the corrupted completed file to match the new partial download's `.part` filename (e.g., `002.part`).
5. Run `touch` on the renamed file:
   ```bash
   touch ~/.aMule/Temp/002.part*
   ```
6. Restart aMule. It will detect which chunks are intact (matching the expected hash) and which are corrupted, and will only re-download the corrupted chunks.

---

## What should I be aware of when using NFS mounts with aMule?

If any of your Shared Directories or Temp/Incoming directories are on NFS mounts, make sure to **unmount those NFS shares from any computer being shut down** before the shutdown happens.

If an NFS mount becomes unavailable while aMule is running, aMule will hang indefinitely waiting for the mount to come back. Symptoms: the Statistics window shows flat non-zero lines for Download/Upload/Connections that drop to zero only after the NFS mounts are restored.

After unmounting NFS shares from any machine, also click **Reload** in the Shared Files window.

---

## Downloaded files don't get the permissions I set in Preferences. Why?

aMule respects the **umask** of the process. The `umask` value defines which permission bits applications are **not** allowed to set.

Example: if you configure file permissions as `664` in Preferences but `umask` is `022`:

```
664 AND NOT 022 = 644
```

aMule creates files with `644` instead of `664`.

Check your current umask:

```bash
umask
```

To change it, set `umask` in your shell profile or session before launching aMule. On systemd-based systems you can set `UMask=` in the service unit file.

---

## aMule fails to create files / shows file descriptor errors. What's going on?

This should never happen in normal operation. When it does, the most likely cause is that the **open file descriptor limit** is set too low for your user account.

Check current limits:

```bash
ulimit -a
```

The relevant line is `open files`. Read the manual for how to raise it:

```bash
man ulimit
```

On most Linux distributions, permanent limits can be set in `/etc/security/limits.conf`. Remember that changes take effect on the next login session (or system restart, depending on your configuration).

---

## aMule is crashing quite often. Can I set it to restart automatically?

aMule has no built-in restart mechanism, but shell scripts can handle this — some of which also catch hangs (not just crashes). Community scripts for this purpose:

- [Forum thread 1](http://forum.amule.org/index.php?topic=1232.0)
- [Forum thread 2](http://forum.amule.org/index.php?topic=542.0)
