---
id: amulecmd
title: amulecmd — Command-Line Interface
---

`amulecmd` is an interactive command-line client for controlling a running `amuled` (or `amule`) instance. It is useful for scripting, cron jobs, and environments where a graphical or browser-based interface is not available.

## Overview

`amulecmd` connects to aMule through the External Connections (EC) protocol (TCP, default port 4712). It provides a subset of aMule functionality:

- Search for files on eD2k and Kademlia.
- Start, pause, resume, and cancel downloads.
- View the download and upload queue.
- View and reset the log.
- Display status information.
- Change bandwidth limits and other settings at runtime.

`amulecmd` can be used interactively (a `aMulecmd$` prompt) or in one-shot mode with the `-c` flag for use in shell scripts and cron jobs.

## Installation

Most distributions include `amulecmd` in their aMule packages. Install via your package manager:

```bash
# Debian/Ubuntu:
apt install amule-utils

# Fedora/RHEL:
dnf install amule

# Arch:
pacman -S amule
```

## Compilation

If you are building aMule from source, enable `amulecmd` with the `BUILD_AMULECMD` CMake option:

```sh
git clone https://github.com/amule-org/amule.git
cd amule

cmake -B build -DBUILD_AMULECMD=YES

cmake --build build -j"$(nproc)"
sudo cmake --install build
```

For dependency installation and all available CMake options see [Compilation](../../developer/compilation/index.md).

## Configuration

### Enabling External Connections in aMule

Before using `amulecmd`, you must enable EC in aMule's Preferences (or in [`amule.conf`](../configuration/files/amule-conf.md)):

1. Open **Preferences → Remote Controls**.
2. Check **Accept External Connections**.
3. Enter a password in the **EC Password** field.
4. Optionally change the default EC port (4712); restart aMule for port changes to take effect.

Alternatively, edit [`~/.aMule/amule.conf`](../configuration/files/amule-conf.md) directly:

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

### Generating [`remote.conf`](../configuration/files/remote-conf.md)

`amulecmd` stores its connection settings in [`~/.aMule/remote.conf`](../configuration/files/remote-conf.md). Generate it from the running aMule configuration:

```bash
amulecmd --create-config-from=/home/username/.aMule/amule.conf
```

This reads `ECPassword` and `ECPort` from [`amule.conf`](../configuration/files/amule-conf.md) and writes them to [`remote.conf`](../configuration/files/remote-conf.md).

**For a remote system** (where you cannot access `amule.conf` directly):

```bash
amulecmd -h hostname -p 4712 -P yourpassword -w
```

The `-w` flag writes the connection details to `remote.conf` without starting an interactive session.

You can also copy [`remote.conf`](../configuration/files/remote-conf.md) from the host machine and change the `Host=` line accordingly.

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

| Command | Description |
|---|---|
| `add <ed2k-link>` | Add an ed2k link to the download queue |
| `cancel <hash>` | Cancel and remove a download by its hash |
| `connect` | Connect to the eD2k network and Kademlia |
| `connect ed2k` | Connect to the eD2k network only |
| `connect kad` | Connect to the Kademlia network only |
| `disconnect` | Disconnect from all networks |
| `disconnect ed2k` | Disconnect from eD2k only |
| `disconnect kad` | Disconnect from Kademlia only |
| `download <hash>` | Start downloading a file from search results by hash |
| `exit` | Exit `amulecmd` (does not stop `amuled`) |
| `get <option>` | Get the value of a setting |
| `help [command]` | Show help for all commands, or detailed help for one command |
| `pause <hash>` | Pause a download |
| `quit` | Alias for `exit` |
| `reload shared` | Reload the shared files list from disk |
| `reload ipfilter` | Reload the IP filter from disk |
| `results` | Show results from the last search |
| `resume <hash>` | Resume a paused download |
| `set bwlimit up <kB/s>` | Set upload bandwidth limit (0 = unlimited) |
| `set bwlimit down <kB/s>` | Set download bandwidth limit (0 = unlimited) |
| `show dl` | Show the download queue |
| `show ul` | Show the upload queue |
| `show log` | Show the aMule log |
| `show servers` | Show the server list |
| `show shared` | Show shared files |
| `shutdown` | Shut down the connected `amuled` instance |
| `statistics` | Show detailed statistics |
| `status` | Show current connection status, speeds, and queue sizes |
| `reset` | Reset (clear) the log |
| `search ed2k <term>` | Search the eD2k network |
| `search kad <term>` | Search the Kademlia network |
| `search global <term>` | Search all servers globally |

For the full and current list, run `help` from within `amulecmd`.

## One-liner Mode

Pass a command directly without entering the interactive prompt:

```bash
amulecmd -c "status"
amulecmd -c "show dl"
amulecmd -c "set bwlimit up 30"
```

Common flags for one-liner mode:

| Flag | Description |
|---|---|
| `-h <hostname>` | Host running `amuled` (default: localhost) |
| `-p <port>` | EC port (default: 4712) |
| `-P <password>` | EC password (plaintext) |
| `-c "<command>"` | Run a single command and exit |
| `-w` | Write configuration to `remote.conf` and exit |

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

This script uses `amulecmd show log` to display a colored summary of recent activity. Requires `amulecmd` version 2.1.2 or later (which introduced the `show log` command).

Failed downloads are shown in red, completed downloads in green, and in-progress downloads in yellow.

```bash
#!/bin/sh
# Version 20060330

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
