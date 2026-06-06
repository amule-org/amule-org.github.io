---
id: amulecmd
title: amulecmd — Command-Line Interface
---

`amulecmd` is an interactive command-line client for controlling a running [`amuled`](amuled.md) (or [`amule`](gui/amule.md)) instance. It is useful for scripting, cron jobs, and environments where a [graphical](gui/index.md) or [browser-based](amuleweb.md) interface is not available.

## Overview

`amulecmd` connects to aMule through the External Connections (EC) protocol (TCP, default port 4712; see the [EC Protocol](../../developer/ec-protocol.md) reference). It provides a subset of aMule functionality:

- Search for files on [eD2k](../../p2p-networks/ed2k/index.md) and [Kademlia](../../p2p-networks/kademlia.md).
- Start, pause, resume, and cancel downloads, and change their priority.
- View the download and upload queue.
- View and reset the log.
- Display status information and statistics.
- Change bandwidth limits, IP filtering, and other settings at runtime.

`amulecmd` can be used interactively (a `aMulecmd$` prompt) or in one-shot mode with the `-c` flag for use in shell scripts and cron jobs.

## Installation

See [Installation](../installation/index.md) for pre-built packages, or [Compilation](../../developer/compilation/index.md) to build `amulecmd` from source.

## Configuration

### Enabling External Connections in aMule

Before using `amulecmd`, you must enable EC in aMule's [Preferences → Remote Controls](gui/preferences.md#remote-controls) (or in [`amule.conf`](../configuration/config-files/amule-conf.md)):

1. Open **Preferences → Remote Controls**.
2. Check **Accept External Connections**.
3. Enter a password in the **EC Password** field.
4. Optionally change the default EC port (4712); restart aMule for port changes to take effect.

Alternatively, edit [`~/.aMule/amule.conf`](../configuration/config-files/amule-conf.md) directly:

```ini
[ExternalConnect]
AcceptExternalConnections=1
ECPassword=56f491c56340a6fa5c158863c6bfb39f
ECPort=4712
```

Generate the MD5 hash for `ECPassword`:

```bash
echo -n yourpassword | md5sum | cut -d ' ' -f 1
```

### Generating [`remote.conf`](../configuration/config-files/remote-conf.md)

`amulecmd` stores its connection settings in [`~/.aMule/remote.conf`](../configuration/config-files/remote-conf.md). Generate it from the running aMule configuration:

```bash
amulecmd --create-config-from=/home/username/.aMule/amule.conf
```

This reads `ECPassword` and `ECPort` from [`amule.conf`](../configuration/config-files/amule-conf.md) and writes them to [`remote.conf`](../configuration/config-files/remote-conf.md).

**For a remote system** (where you cannot access `amule.conf` directly):

```bash
amulecmd -h hostname -p 4712 -P yourpassword -w
```

The `-w` flag writes the connection details to `remote.conf` without starting an interactive session.

You can also copy [`remote.conf`](../configuration/config-files/remote-conf.md) from the host machine and change the `Host=` line accordingly.

If you cannot connect to a remote host, see [Remote Access Troubleshooting](../troubleshooting/remote-access.md) and the [Remote Access FAQ](../faq.md#remote-access).

## Interactive Usage

Start `amulecmd`:

```bash
amulecmd
```

The prompt `aMulecmd$` appears. Type commands at the prompt. For help on any command:

```
aMulecmd$ help <command>
```

## Commands Reference

Commands are case-insensitive. Where a command takes a `<hash | number>`, the `<number>` is the index shown next to each entry by the relevant `show` command (or, for `download`, by `results`).

| Command | Description |
|---|---|
| `add <ed2k-link \| magnet-link>` | Add a link to the core: an [eD2k file link](../../p2p-networks/ed2k/links.md) (queued for download), an eD2k [server](../../p2p-networks/ed2k/servers.md) or serverlist link (added to the server list), or a magnet link (must contain the eD2k hash and file length) |
| `cancel <hash \| number>` | Cancel and remove a download (also accepts `all` or a filename) |
| `connect` | Connect to all networks enabled in Preferences |
| `connect ed2k` | Connect to the eD2k network only |
| `connect kad` | Connect to the Kademlia network only |
| `connect <IP:Port>` | Connect to a single eD2k server (IPv4 address or DNS name) |
| `disconnect` | Disconnect from all networks |
| `disconnect ed2k` | Disconnect from eD2k only |
| `disconnect kad` | Disconnect from Kademlia only |
| `download <number>` | Start downloading file `<number>` from the last search results |
| `pause <hash \| number>` | Pause a download (also accepts `all` or a filename) |
| `resume <hash \| number>` | Resume a paused download (also accepts `all` or a filename) |
| `priority <low\|normal\|high\|auto> <hash \| number>` | Set the [priority](gui/priority.md) of a download |
| `search global <term>` | Search all servers (global search) |
| `search local <term>` | Search the currently connected server (local search) |
| `search kad <term>` | Search the Kademlia network |
| `results` | Show the results of the last search |
| `progress` | Show the progress of an on-going search |
| `set bwlimit up <kB/s>` | Set upload bandwidth limit in kB/s (0 = unlimited) |
| `set bwlimit down <kB/s>` | Set download bandwidth limit in kB/s (0 = unlimited) |
| `set ipfilter on \| off` | Enable/disable [IP filtering](gui/preferences.md#ip-filtering) for both clients and servers |
| `set ipfilter clients on \| off` | Enable/disable IP filtering for clients |
| `set ipfilter servers on \| off` | Enable/disable IP filtering for servers |
| `set ipfilter level <0-255>` | Set the IP filtering level (default 127) |
| `get bwlimits` | Show the current bandwidth limits |
| `get ipfilter` | Show IP filtering state and level (subcommands: `get ipfilter state [clients\|servers]`, `get ipfilter level`) |
| `show dl` | Show the download queue |
| `show ul` | Show the upload queue |
| `show log` | Show the aMule log |
| `show servers` | Show the server list |
| `show shared` | Show shared files |
| `reload shared` | Reload the shared files list from disk |
| `reload ipfilter` | Reload the IP filter table (use `reload ipfilter net [URL]` to update it from a URL) |
| `reset` | Reset (clear) the log |
| `statistics [number]` | Show the statistics tree; the optional `number` (0-255) limits how many client versions are shown per type (0 = unlimited) |
| `status` | Show connection status, current up/download speeds, etc. |
| `shutdown` | Shut down the connected `amuled` (or `amule`) instance; this also exits `amulecmd` |
| `help [command]` | Show the list of commands, or detailed help for one command |
| `exit` | Exit `amulecmd` (does not stop `amuled`) |
| `quit` | Alias for `exit` |

For the full and current list, run `help` from within `amulecmd`.

### Search Filters

`search` accepts optional filters that can be placed before, after, or interleaved with the search keyword(s):

| Filter | Description |
|---|---|
| `--type <Audio\|Video\|Image\|Doc\|Pro\|Arc\|Iso>` | Restrict results to the given file type |
| `--extension <ext>` (alias `--ext`) | Restrict results to a file extension (e.g. `iso`, `mp3`) |
| `--avail <N>` (alias `--availability`) | Minimum number of sources a result must report |
| `--min-size <N[KMG]>` | Smallest file size to return |
| `--max-size <N[KMG]>` | Largest file size to return |

Size suffixes use binary multipliers (`K` = 1024, `M` = K×1024, `G` = M×1024); no suffix means bytes. For example, `search global linux iso --type Iso --min-size 100M` returns results for "linux iso" of file type Iso at least 100 MiB.

## One-liner Mode

Pass a command directly without entering the interactive prompt:

```bash
amulecmd -c "status"
amulecmd -c "show dl"
amulecmd -c "set bwlimit up 30"
```

Command-line flags:

| Flag | Description |
|---|---|
| `-h, --host <hostname>` | Host running `amuled` (default: 127.0.0.1); may be an IP address or DNS name |
| `-p, --port <port>` | EC port (default: 4712) |
| `-P, --password <password>` | EC password (plaintext; converted to an MD5 hash internally) |
| `-f, --config-file <path>` | Use the given configuration file (default: `~/.aMule/remote.conf`) |
| `-q, --quiet` | Do not print any output to stdout |
| `-v, --verbose` | Be verbose — also show debug messages |
| `-l, --locale <lang>` | Set the program locale (language) |
| `-c, --command "<command>"` | Execute a single command and exit |
| `-w, --write-config` | Write the connection settings to `remote.conf` and exit |
| `--create-config-from=<path>` | Create `remote.conf` from a valid aMule config file and exit |
| `--force-zlib` | Force ZLIB compression even when the core resolves to a local/LAN IP; useful over a VPN tunnel that resolves to a LAN IP. Sets [`/EC/ForceZLIB`](../configuration/config-files/remote-conf.md#ec-section) |
| `--version` | Print the program version |
| `--help` | Show the usage description |

A plain filename (no directory part) given to `-f`/`--config-file` is taken relative to the aMule configuration directory (`~/.aMule`).

## Scheduling with Cron

Use `amulecmd -c` with `crontab` to schedule bandwidth changes or other actions:

```bash
crontab -e
```

Example — reduce upload speed at 06:00 and restore it at 22:00:

```
00 06 * * *  amulecmd -c "set bwlimit up 30"
00 22 * * *  amulecmd -c "set bwlimit up 0"
```

`0` means unlimited. See `crontab(5)` for cron syntax.

## Useful Scripts

### Show Downloads in a Formatted List

```bash
#!/bin/sh

amulecmd -c "show dl" | \
    grep '.' | \
    sed "1,/Succeeded/d" | \
    sed -n "N;s/^ > .*[0-9A-F]\{32\} \(.*\)\n >.*\[\(.*%\)\].*]\(.*\)/\2 \1\3/p" | \
    sort -n
```

### Simple amulecmd Wrapper (amc)

Save this as `amc` and make it executable (`chmod +x amc`):

```bash
#!/bin/sh

amulecmd -c "$*"
```

Then call `amulecmd` commands without quoting:

```bash
./amc show log
./amc show log | grep completed
./amc set bwlimit up 50
```

### Email Daily Download Summary

Create the script, verify it works, then add it to cron (many cron daemons automatically email the output to the local user):

```bash
#!/bin/sh

echo "=== aMule download summary: $(date) ==="
amulecmd -c "show dl"
echo ""
amulecmd -c "status"
```

### Search Until No More Results

This script searches Kademlia and polls until the result count stabilizes:

```bash
#!/bin/sh

echo "Searching for $1"
amulecmd -c "search kad $1" > /dev/null
prevres=-1
matchcount=0
for c in $(seq 1 10); do
    sleep 5
    res=$(amulecmd -c "results" | grep "results:" | sed "s/.*results: \(.*\)$/\1/")
    if [ "$res" = "$prevres" ]; then
        matchcount=$((matchcount + 1))
        if [ $matchcount -gt 1 ]; then
            matchcount=0
            break
        fi
    else
        matchcount=0
        prevres=$res
    fi
done
amulecmd -c "results"
```

## Color Log Display Script

This script uses `amulecmd show log` to display a colored summary of recent activity.

Failed downloads are shown in red, completed downloads in green, and in-progress downloads in yellow.

```bash
#!/bin/sh

domule() {
    amulecmd -c "$@" | grep "^ >"
}

domule "show log" | sed "
    /: Failed to / {s/: \(.*\)/: $(tput setaf 1)\1$(tput sgr0)/;}
    /: Finished downloading/ {s/: \(.*\)/: $(tput setaf 2)\1$(tput sgr0)/;}
    /: Downloading / {s/: \(.*\)/: $(tput setaf 3)\1$(tput sgr0)/;}
"
echo ""
domule "status" | sed "
    /Download:/ {s/\(Download:\)\(.*\)/\1$(tput setaf 3)\2$(tput sgr0)/;}
    /Upload:/ {s/\(Upload:\)\(.*\)/\1$(tput setaf 2)\2$(tput sgr0)/;}
"
domule "reset" > /dev/null
```

Save the script to a file and make it executable (`chmod u+x yourscript.sh`). Run it from a terminal with color support.

`tput setaf <n>` color codes: `1` = red, `2` = green, `3` = yellow. See `man tput` for others.

### Without Colors

```bash
#!/bin/sh

domule() {
    amulecmd -c "$@" | grep "^ >"
}

domule "show log"
echo ""
domule "status"
domule "reset" > /dev/null
```

### Show Only Completed Downloads

```bash
#!/bin/sh

domule() {
    amulecmd -c "$@" | grep "^ >"
}

domule "show log" | grep ": Finished downloading" || echo " > No finished downloads"
echo ""
domule "status"
domule "reset" > /dev/null
```
