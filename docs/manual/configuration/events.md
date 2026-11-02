---
id: events
title: Events
---

Events are actions aMule can take automatically when certain things happen. They are configured on the **Events** tab of the [Preferences](../interfaces/gui/preferences.md) dialog, or — when running `amuled` — in the per-event `[UserEvents/<Event>]` sections of [`amule.conf`](./config-files/amule-conf.md#userevents-section).

![Events preferences tab](/img/docs/gui_preferences/preferences_events.png)

## Event types

Four events are supported:

| Event | Trigger |
|---|---|
| **Download completed** | A file finishes downloading. |
| **New chat session started** | Another user initiates a chat session with you. |
| **Out of space** | aMule runs out of disk space on the partition used for temporary files. |
| **Error on completion** | aMule cannot move a completed file from the temporary directory to the incoming directory (typically caused by insufficient disk space). The *Download completed* command is not run for that file. |

## Command types

For each event you can specify two independent commands:

| Type | Executed by |
|---|---|
| **Core command** | Any aMule flavour that has a core: `amuled` or the monolithic `amule`. |
| **GUI command** | Any aMule flavour that has a GUI: `amulegui` or the monolithic `amule`. |

When running monolithic `amule`, both commands are executed if both are specified.

In `amulegui`, the **Core command** controls are disabled: set Core commands in the daemon's [`amule.conf`](./config-files/amule-conf.md#userevents-section) and restart `amuled`. `amulegui` runs only two GUI commands:

- **New chat session started**.
- **Download completed**, for downloads that complete while it is connected. `%FILE` is empty, since the file is on the core's machine.

**Out of space** and **Error on completion** are raised only by the core.

## Variables

Each event exposes a set of variables that are substituted into the command's arguments before execution:

### Download completed

| Variable | Value |
|---|---|
| `%FILE` | Full path and filename of the downloaded file. |
| `%NAME` | Filename only (without path). |
| `%HASH` | eD2k hash of the downloaded file. |
| `%SIZE` | Size in bytes. |
| `%DLACTIVETIME` | Cumulative time the download was active, formatted as hours and minutes. |

### New chat session started

| Variable | Value |
|---|---|
| `%SENDER` | Username of the person initiating the chat. |

### Out of space

| Variable | Value |
|---|---|
| `%PARTITION` | The path of the temporary directory whose partition is low on space. |

### Error on completion

| Variable | Value |
|---|---|
| `%FILE` | Full path and filename of the file that could not be moved. |

## Command syntax

aMule does **not** run the command through a shell. The command string is split into an executable plus its arguments and executed directly, so shell features such as pipes (`|`), redirections (`>`) and operators (`&&`, `;`) are **not** interpreted. To use any of those, put them inside a shell script and call the script instead.

A command is therefore either a single program with optional parameters, or the path to a script followed by optional parameters:

```sh
MyScript.sh %NAME %FILE %HASH %SIZE %DLACTIVETIME
```

Variables are substituted **after** the command is split into arguments, and each value stays inside its argument as literal data. So variables never need quotes, and a value cannot add arguments or commands. Use quotes only around fixed text with spaces, or to combine text and variables in one argument:

```sh
notify-send "aMule" "Finished %NAME (%SIZE bytes)"
```

An older command that relied on one variable expanding into several arguments must list those arguments itself.

Inside a shell script, the variables are received as positional parameters `$1`, `$2`, `$3`, etc. Quote them in the script (`"$1"`). The script must be in `$PATH` or specified with a full pathname.

aMule refuses to run a command that would put an event value where it could be executed as code:

- A variable cannot be (part of) the executable name.
- A variable cannot be the code or script name of an interpreter (`sh`, `bash`, `python`, `perl`, `node`, …). For inline shell code, pass the values as arguments after it: `sh -c 'mv -- "$1" "/archive/$2"' _ %FILE %NAME`. `sh -c "mv %FILE /archive"` is refused.
- Launchers such as `powershell`, `env` or `busybox`, and interpreters with options before the script (`python -u script.py %FILE`), cannot receive variables; use a script instead.
- On Windows, a value containing `"`, `%`, `!` or a line break is refused for `.bat`/`.cmd` files and `cmd /c`; after `cmd /c`, name the program's extension (`.exe`, `.bat`, …) unless it is a built-in command. `.exe` programs receive any value.

If the program accepts `--`, put it before the variables so a value starting with `-` is not read as an option.

If a command is refused or fails to execute for any reason, the reason is logged in [aMule's log file](./config-files/index.md).

## Examples

The scripts below are minimal, self-contained starting points. Make each one executable (`chmod +x script.sh`) and place it somewhere in your `$PATH` (or call it with a full pathname).

### Linux — email on disk full

Sending an email needs a pipe, which aMule cannot run directly (see [Command syntax](#command-syntax) above). Put it in a small script and set the *Out of space* command to:

```sh
diskFull.sh %PARTITION
```

```bash
#!/bin/bash
#
# diskFull.sh - sends an email when aMule runs out of disk space
# Call like this: diskFull.sh %PARTITION

echo "aMule error: $1 is full." | mail -s "aMule: out of disk space" mymail@domain.tld
```

:::note Sending mail
`mail` (from `mailutils` or `bsd-mailx`) delivers through the local mail system. To send through an external SMTP server (Gmail, your provider, etc.) install **`msmtp`** and **`msmtp-mta`** and configure it as the system `sendmail` backend in `~/.msmtprc`. `msmtp` is the maintained replacement for the older `ssmtp`, which is unmaintained and has been removed from current distributions.
:::

### Linux — email notification on download completed

Set the Core command for *Download completed* to:

```sh
doneDL.sh %NAME %FILE %HASH %SIZE %DLACTIVETIME
```

```bash
#!/bin/bash
#
# doneDL.sh - sends an email when an aMule download completes
# Call like this: doneDL.sh %NAME %FILE %HASH %SIZE %DLACTIVETIME
#
# Enter your email address here:
EMAIL="youremail@address.com"

name=$1
path=$2
hash=$3
size=$4
dlTime=$5

{
    echo "aMule completed this download:"
    echo
    echo "File:  $name"
    echo "Path:  $path"
    echo "Hash:  $hash"
    echo "Size:  $size bytes ($(( size / 1024 / 1024 )) MiB)"
    echo "Time:  $dlTime"
} | mail -s "aMule: $name" "$EMAIL"
```

### Linux — desktop notification with sound

Show a desktop notification (and optionally play a sound) on the machine running aMule. These use `notify-send` (package `libnotify-bin`) and `play` (package `sox`). Install them first:

```sh
apt-get install libnotify-bin sox
```

Set the Core command for each event to its matching script:

```sh
# Download completed:
doneDL.sh %NAME %FILE %HASH %SIZE %DLACTIVETIME

# New chat session:
newMsg.sh %SENDER

# Out of space:
noDiskSpace.sh %PARTITION

# Error on completion:
errorDL.sh %FILE
```

**`doneDL.sh`** — download completed:

```bash
#!/bin/bash
#
# doneDL.sh — desktop notification on download complete
# Call like this: doneDL.sh %NAME %FILE %HASH %SIZE %DLACTIVETIME
#
# Sound file (the freedesktop sound theme is installed on most desktops):
soundPath="/usr/share/sounds/freedesktop/stereo/complete.oga"

notify-send -i amule "Download completed" \
    "File: $1
     Path: $2
     Size: $4 bytes
     Active download time: $5" \
    && play -q "$soundPath"
```

**`errorDL.sh`** — error on completion:

```bash
#!/bin/bash
#
# errorDL.sh — desktop notification on download error
# Call like this: errorDL.sh %FILE
#
soundPath="/usr/share/sounds/freedesktop/stereo/complete.oga"

notify-send -i amule "aMule error" \
    "Could not complete the download of: $1" \
    && play -q "$soundPath"
```

**`newMsg.sh`** — new chat session:

```bash
#!/bin/bash
#
# newMsg.sh — desktop notification on new chat message
# Call like this: newMsg.sh %SENDER
#
soundPath="/usr/share/sounds/freedesktop/stereo/complete.oga"

notify-send -i amule "New message" \
    "The user $1 sent you a message." \
    && play -q "$soundPath"
```

**`noDiskSpace.sh`** — out of space:

```bash
#!/bin/bash
#
# noDiskSpace.sh — desktop notification on disk full
# Call like this: noDiskSpace.sh %PARTITION
#
soundPath="/usr/share/sounds/freedesktop/stereo/complete.oga"

notify-send -i amule "No disk space available" \
    "The partition $1 does not have enough space to continue downloading.
     Free some space to resume." \
    && play -q "$soundPath"
```

:::tip
If you don't have `sox`, drop the `&& play …` part, or use `paplay` (PulseAudio/PipeWire) or `canberra-gtk-play -i complete` instead.
:::

### Windows — toast notification

Show a native Windows 10/11 toast notification when a download completes. The easiest way is the [BurntToast](https://github.com/Windos/BurntToast) PowerShell module. Install it once (in an elevated PowerShell):

```powershell
Install-Module BurntToast -Scope CurrentUser
```

Save this script as e.g. `C:\Scripts\notify.ps1`:

```powershell
param([string]$Name)
New-BurntToastNotification -Text "aMule", "Download completed: $Name"
```

aMule does not pass event values to `powershell.exe` directly, so call it from a batch file. Save this as `C:\Scripts\notify.cmd`, next to the script:

```bat
@echo off
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0notify.ps1" "%~1"
```

In **Preferences → Events → Download completed**, enable command execution and set the command to:

```
C:\Scripts\notify.cmd %NAME
```

File names containing `"`, `%` or `!` get no notification (see [Command syntax](#command-syntax)).

:::note
The old `net send` / Windows *Messenger* service approach no longer works: that service was removed from Windows starting with Windows Vista. Use toast notifications (as above) on modern Windows.
:::
