---
id: migrate-from-emule
title: Migrate from eMule
---

This guide covers the migration of configuration files and in-progress downloads from eMule to aMule.

:::note
The temporary file format is compatible between eMule and aMule, so your downloads can be resumed. Configuration files, however, require manual work.
:::

## Brief History

eDonkey2000 was the original eD2k client. Dissatisfied developers forked it into **eMule**, which became hugely popular. The Linux community then created **lMule**, which was later renamed to **xMule**, and eventually evolved into **aMule** — the standard eD2k client for Linux. aMule shares the same network and a compatible file format with eMule, making migration straightforward for downloads while requiring manual effort for configuration.

## Configuration Files

eMule stores its configuration under its `config/` directory. aMule stores its configuration in:

| Platform | Path |
|---|---|
| Windows | `C:\Documents and Settings\<username>\Application Data\aMule\` |
| macOS | `~/Library/Application Support/aMule/` |
| Linux / BSD | `~/.aMule/` |

The first step is to copy the relevant files from eMule's configuration directory into aMule's configuration directory.

### Files Automatically Imported

The following eMule files are read and correctly imported by aMule without any manual intervention:

| File | Contents |
|---|---|
| `clients.met` | Other clients' credit information |
| `known.met` | Details about downloaded files (shown in green when searched again) |
| `known2.met` | AICH hashes of shared files |
| `server.met` | Saved server list |
| `staticservers.dat` | Static servers |
| `ipfilter.dat` | IP filter rules |
| `ipfilter_static.dat` | Static IP filter rules |
| `emfriends.met` | Friends list |
| `addresses.dat` | URLs for downloading `server.met` updates |
| `cryptkey.dat` | Client identity key (preserves credits with other clients) |
| `preferences.dat` | Client identity data (preserves credits with other clients) |
| `key_index.dat` | Kademlia key index |
| `load_index.dat` | Kademlia load index |
| `nodes.dat` | Kademlia bootstrap nodes |
| `preferencesKad.dat` | Kademlia configuration |
| `src_index.dat` | Kademlia source index |
| `shareddir.dat` | Shared directory paths (compatible only when running aMule on Windows) |

### Files NOT Automatically Imported

The following files require manual handling:

| eMule file | aMule equivalent | Issue |
|---|---|---|
| `preferences.ini` | `amule.conf` | Different format; must be reconfigured manually or by carefully copying specific keys |
| `Category.ini` | `amule.conf` (`[Cat\#N]` sections) | Categories use a different format; see [Importing Categories](#importing-categories) |
| `shareddir.dat` | `~/.aMule/shareddir.dat` | Path format is incompatible on non-Windows systems; aMule regenerates this when you set shared directories via Preferences |

Files from eMule that are **not used by aMule** and can be ignored:
`AC_BootstrapIPs.dat`, `AC_IPFilterUpdateURLs.dat`, `AC_SearchStrings.dat`, `AC_ServerMetURLs.dat`, `fileinfo.ini`, `k_index.dat`, `preferencesK.dat`, `s_index.dat`, `statistics.ini`, `webservices.dat`

## Importing Missing Configurations

### Importing Categories

eMule stores download categories in `Category.ini`. aMule stores them inside `amule.conf` as `[Cat\#N]` sections.

Use the following shell command to extract the categories from eMule's `Category.ini` and format them for aMule (run as a single line):

```bash
grep -E "^\[Cat|^Title|^Incoming|^Comment|^Color|^a4afPriority" Category.ini \
  | sed '1,6d' \
  | sed 's/#/\\#/g' \
  | sed 's/&/\\&/g' \
  | sed 's/a4afPriority/Priority/g'
```

This command:
- Extracts the category sections and their key fields.
- Deletes the first 6 lines (which correspond to eMule's built-in "all files" category — aMule does not need this entry, as it has its own "all" tab).
- Escapes `#` and `&` characters, which have special meaning in some ini parsers.
- Renames `a4afPriority` to `Priority`.

Paste the output into `amule.conf`.

You also need to set the **category count** in `amule.conf` under `[General]`. Run this command to calculate the correct value (total categories minus the first dummy one):

```bash
echo "$(grep -c "^\[Cat" Category.ini) - 1" | bc
```

Set the resulting number as the value of `Count` under `[General]` in `amule.conf`:

```ini
[General]
Count=<number from command above>
```

The final structure in `amule.conf` should look like:

```ini
[General]
Count=3

[Cat\#1]
Title=Movies
Incoming=/home/user/Downloads/Movies
Comment=
Color=0
Priority=0

[Cat\#2]
Title=Music
Incoming=/home/user/Downloads/Music
Comment=
Color=0
Priority=0
```

:::note
If you import categories before importing temporary files, the downloads will be classified into categories as they were in eMule.
:::

### Importing Statistics

eMule stores statistics in two files: `preferences.ini` and `statistics.ini`. The values in `statistics.ini` are more complete.

In `statistics.ini`, all statistics are under the `[Statistics]` tag. aMule uses the same tag in `amule.conf`. Copy the statistics entries from `statistics.ini` into `amule.conf`, being careful **not to delete** the two keys that already exist in aMule's `amule.conf`:

- `MaxClientVersions`
- `DesktopMode`

:::note
In practice, only a small subset of statistics values successfully import (mainly downloaded and uploaded byte counts). Most statistics will need to accumulate again as you use aMule.
:::

### Other Configuration

Settings such as TCP/UDP ports, incoming and temp directories, and bandwidth limits are client-specific and important for correct operation. The recommended approach is to reconfigure them from scratch using **Preferences** in aMule.

If you want to try importing settings directly, you can copy specific keys from eMule's `preferences.ini` to the corresponding keys in aMule's `amule.conf`. This is not guaranteed to work and may cause unexpected behaviour.

## Temporary and Sharing Files

### Temporary Files (Downloads in Progress)

eMule and aMule use a **compatible temporary file format**. To resume your eMule downloads in aMule:

1. Set aMule's **Temp directory** (in **Preferences → Directories**) to the same directory where eMule stores its temporary files.
2. Restart aMule. It will detect and re-hash the existing files, and they will appear in the download queue ready to continue.

### Shared / Completed Files

Completed files from eMule do not need to be moved. Simply:

1. Add the directory containing your completed eMule downloads as a **shared directory** in aMule (**Preferences → Directories**).
2. aMule will hash the files and start sharing them.

## Summary

| Task | Method |
|---|---|
| Copy compatible config files | Copy directly from eMule's `config/` to `~/.aMule/` |
| Resume in-progress downloads | Set aMule's Temp dir to eMule's temp dir |
| Share completed files | Add eMule's Incoming dir to aMule's shared directories |
| Import categories | Use the shell script above, paste into `amule.conf` |
| Import statistics | Copy `[Statistics]` block from `statistics.ini` to `amule.conf` |
| Ports, speed limits, directories | Reconfigure manually in Preferences |
