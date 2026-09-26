---
id: backup-restore
title: Backup and Restore
---

This guide explains how to keep your aMule data — settings, credits and downloads — when you reinstall aMule or move it to a new computer.

## What to Copy

Everything aMule needs is in its [configuration directory](../configuration/config-files/index.md#platform-paths). Back up the **whole folder**, not individual files:

| Platform | Configuration directory |
|---|---|
| Windows | `%APPDATA%\aMule\` (`C:\Users\<user>\AppData\Roaming\aMule\`) |
| macOS | `~/Library/Application Support/aMule/` |
| Linux / BSD | `~/.aMule/` (the Flatpak uses the same path) |

These folders are hidden by default. On Windows, type `%APPDATA%\aMule` in the File Explorer address bar; on macOS, use **Go → Go to Folder…** in Finder; on Linux and BSD, enable *Show hidden files* in your file manager.

Back up a different folder in these cases:

- **Portable configuration** — if a `config` folder containing `amule.conf` exists next to the aMule executable (in its working directory), aMule uses it instead; back up that `config` folder. See [Portable configuration](../configuration/config-files/index.md#portable-configuration-running-from-a-usb-drive). The Windows portable `.zip` build still uses `%APPDATA%\aMule\` unless you create this folder.
- **Custom directory** — if you start aMule or [`amuled`](../interfaces/amuled.md) with `--config-dir=<dir>`, back up `<dir>`.
- **System service** — if `amuled` [runs as a system service](../interfaces/amuled.md#running-as-a-system-service) under a dedicated user, back up the configuration directory in that user's home.

:::tip
On Windows, a plain reinstall or upgrade does not need a restore: the uninstaller keeps `%APPDATA%\aMule\` unless you tick **Remove user data** (see [Installation](../installation/index.md#installer)).
:::

## Back Up

1. Close aMule. If you use the daemon or the remote GUI, stop `amuled` and close [`amulegui`](../interfaces/gui/amulegui.md) as well. aMule keeps some data in memory and writes it only on exit or periodically (for example [`clients.met`](../configuration/config-files/index.md#clientsmet), every 13 minutes), so copying while it runs can leave an outdated or inconsistent backup, including a stale [`muleLock`](../configuration/config-files/index.md#mulelock).
2. Copy the configuration directory to your backup location.
3. If a download directory is outside the configuration directory, copy it too (see [Downloads](#downloads)).

## Restore

1. Install aMule on the new system (see [Installation](../installation/index.md)).
2. Do **not** start aMule yet. If you already started it, close it before continuing.
3. Copy the backed-up configuration directory to the same location (see [What to Copy](#what-to-copy)), replacing any folder the first start may have created.
4. If any directory path differs on the new system, fix it now (see [Downloads](#downloads)).
5. Start aMule.

:::warning
Once restored, do not run the old and the new installation at the same time: they share the same identity. Peers that see the same userhash from two IP addresses flag the client as a **Bad Guy** and set its queue score to 0 (see [Client Details](../interfaces/gui/client-details.md)).
:::

## Credits

Your credits are not stored on your computer: other clients keep them, and they recognise you by two files in the configuration directory:

- [`preferences.dat`](../configuration/config-files/index.md#preferencesdat) — your **user hash**.
- [`cryptkey.dat`](../configuration/config-files/index.md#cryptkeydat) — your **secure-identification key** (see [Secure User Identification](../../p2p-networks/ed2k/secure-user-identification.md)).

Restoring both files keeps the credits you have earned with other clients. If you lose `cryptkey.dat`, those credits are lost for good — see [What should I do if I lose my cryptkey.dat file?](../troubleshooting/common-problems.md#what-should-i-do-if-i-lose-my-cryptkeydat-file).

[`clients.met`](../configuration/config-files/index.md#clientsmet) holds the credits **you** have given to other clients. Restore it as well to keep rewarding the peers that uploaded to you.

## Downloads

The [download directories](../configuration/directories.md) may or may not be inside the configuration directory:

| Directory | Windows | macOS | Linux / BSD |
|---|---|---|---|
| Temporary (unfinished downloads) | Inside the configuration directory | Inside the configuration directory | Inside the configuration directory |
| Incoming (completed downloads) | `Documents\aMule Downloads` | `~/Documents/aMule Downloads` | Inside the configuration directory |

Any directory outside the configuration directory — the default Incoming directory on Windows and macOS, or a Temporary or Incoming directory you moved elsewhere — needs its own backup.

aMule stores these directories as absolute paths. If a path differs on the new system (a different user name or drive letter, or a move between operating systems), fix it before resuming:

- **Temporary and Incoming directories** — edit the `TempDir` / `IncomingDir` keys in [`amule.conf`](../configuration/config-files/amule-conf.md#directories) before the first start, or change them in [**Preferences → Directories**](../interfaces/gui/preferences.md#directories) and restart aMule (a Temporary directory change only takes effect after a restart). If the old Temporary path can still be created on the new system, aMule silently starts with an empty folder and your unfinished downloads seem to have vanished.
- **Shared directories** — select them again in **Preferences → Directories** (stored in the [`shareddir-*.dat` files](../configuration/config-files/index.md#shareddirdat)). See [Shared Directories](../configuration/directories.md#shared-directories).
- **Per-category incoming folders** — right-click the category tab and select **Edit category** (stored as `Incoming` in the `[Cat#N]` sections of `amule.conf`). See [Per-Category Incoming Folders](../configuration/directories.md#per-category-incoming-folders).
