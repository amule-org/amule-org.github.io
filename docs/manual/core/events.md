---
id: events
title: Events
---

Events are actions aMule can take automatically when certain things happen. They are configured on the **Events** tab of the [Preferences](../interfaces/gui/preferences.md) dialog, or — when running `amuled` — in the `[UserEvents]` section of `amule.conf`.

![Events preferences tab — event list](/img/docs/configuration/Events1.png)

![Events preferences tab — command configuration](/img/docs/configuration/Events2.png)

## Event types

Four events are supported:

| Event | Trigger |
|---|---|
| **Download completed** | A file finishes downloading. |
| **New chat session** | Another user initiates a chat session with you. |
| **Out of space** | aMule runs out of disk space on the partition used for temporary files. |
| **Error on completion** | aMule cannot move a completed file from the temporary directory to the incoming directory (typically caused by insufficient disk space). |

## Command types

For each event you can specify two independent commands:

| Type | Executed by |
|---|---|
| **Core command** | Any aMule flavour that has a core: `amuled` or the monolithic `amule`. |
| **GUI command** | Any aMule flavour that has a GUI: `amulegui` or the monolithic `amule`. |

When running monolithic `amule`, both commands are executed if both are specified.

## Variables

Each event exposes a set of variables that are substituted in the command string before execution:

### Download completed

| Variable | Value |
|---|---|
| `%FILE` | Full path and filename of the downloaded file. |
| `%NAME` | Filename only (without path). |
| `%HASH` | eD2k hash of the downloaded file. |
| `%SIZE` | Size in bytes. |
| `%DLACTIVETIME` | Total time the download was active. |

### New chat session

| Variable | Value |
|---|---|
| `%SENDER` | Username of the person initiating the chat. |

### Out of space

| Variable | Value |
|---|---|
| `%PARTITION` | Partition that is full. |

### Error on completion

| Variable | Value |
|---|---|
| `%FILE` | Full path and filename of the file that could not be moved. |

## Command syntax

A command can be a single shell command, a compound shell command, or the path to a shell script followed by optional parameters:

```sh
MyScript.sh %NAME %FILE %HASH %SIZE "%DLACTIVETIME"
```

If a variable value may contain spaces (e.g. `%NAME`, `%FILE`, `%DLACTIVETIME`), enclose the variable in quotes:

```sh
MyScript.sh "%NAME" "%FILE" %HASH %SIZE "%DLACTIVETIME"
```

Inside a shell script, the variables are received as positional parameters `$1`, `$2`, `$3`, etc. The script must be in `$PATH` or specified with a full pathname.

If a command fails to execute for any reason, the failure is logged in [aMule's log file](./files/index.md).

## Examples

### Linux — simple email on disk full

A minimal one-liner that sends an email when a partition runs out of space:

```sh
echo "aMule error: %PARTITION is full." | mail -s Warning mymail@domain.tld
```

### Linux — email notification on download completed (using `mail`)

Script by **Ezeltje** from the aMule Forum. Enter your email address and save the script somewhere in `$PATH`, then set the Core command for *Download completed* to:

```sh
doneDL.sh "%NAME" "%FILE" %HASH %SIZE "%DLACTIVETIME"
```

```bash
#!/bin/bash
#
# doneDL.sh - sends an email upon completion of an aMule download
# Used in conjunction with aMule's Event feature
#
# Call like this: doneDL.sh "%NAME" "%FILE" %HASH %SIZE "%DLACTIVETIME"
#
# Enter your email address here:
eMail=

NameShort=$1
NameLong=$2
Hash=$3
Size=$4
DLtime=$5

{
    echo aMule completed this download:
    echo ------------------------------
    echo
    echo File: "$NameLong"
    echo Hash: $Hash
    echo -n "Time: "
    date | awk '{print $4 " " $5}'
    echo -n Size: $Size bytes
    if [ $Size -gt 102400 ]; then
        echo " ("$(($(($Size / 1024)) / 1024)) "Mb)"
    fi
    if [ ! -z "$DLtime" ]; then
        echo "Active download time: $DLtime"
    fi
    echo
    echo --------------------------------------------------------------------
    echo -n "Resident memory: "
    echo $(ps u -C amule --no-headers | awk '{print $6}') kB
    echo -n "Virtual memory: "
    echo $(ps u -C amule --no-headers | awk '{print $5}') kB
    echo --------------------------------------------------------------------
} | mail -s "$NameShort" $eMail
```

### Linux — HTML email via sendmail

Script by **raffe**, based on Ezeltje's script. Sends an HTML email with extended system information using `sendmail`. Set the Core command to:

```sh
aMuleMail.sh "%NAME" "%FILE" %HASH %SIZE "%DLACTIVETIME"
```

```bash
#!/bin/bash
#
# aMuleMail.sh - sends an email upon completion of an aMule download
# Used in conjunction with aMule's Event feature
#
# Original script by Ezeltje; extended by raffe
# Version 1.1
#
# Call like this: aMuleMail.sh "%NAME" "%FILE" %HASH %SIZE "%DLACTIVETIME"

# Wait 1 second before proceeding
sleep 1

NameShort=$1
NameLong=$2
Hash=$3
Size=$4
DLtime=$5

{
    # If you need a From address, uncomment:
    # echo From: aMule@myurl.com

    # ====> Enter your email address here: ====>
    echo To: youremail@address.com
    echo Subject: "$NameShort"
    echo " "
    echo "MIME-Version: 1.0"
    echo "Content-Type: text/html"
    echo "Content-Disposition: inline"
    echo "<html><body>"
    echo "<pre style='font: monospace'>"

    echo aMule completed this download:
    echo ------------------------------
    echo " "
    echo File: "$NameShort"
    echo Location: "$NameLong"
    echo Hash: $Hash
    echo -n "Date & time: "; date
    echo -n Size: $Size bytes
    if [ $Size -gt 102400 ]; then
        echo " ("$(($(($Size / 1024)) / 1024)) "Mb)"
    fi
    if [ ! -z "$DLtime" ]; then
        echo "Active download time: $DLtime"
    fi
    echo " "
    echo "=== Uptime:"; uptime
    echo " "
    echo "=== User status:"; who -a
    echo " "
    echo "=== Disk usage:"; df -h
    echo " "
    echo "=== aMule processes:"; ps | grep 'PID\|aMule'
    echo " "
    echo "=== Top processes:"; top -n 1 -b
    echo " "
    echo "=== Memory:"; free
    echo " "
    echo "=== Route:"; route
    echo " "
    echo "=== IP numbers"
    echo "$(ifconfig | grep inet | sed -r 's/^.{10}//')"
    echo " "
    echo "=== Default gateways"; route | grep default
    echo " "
    echo "=== DNS servers"; cat /etc/resolv.conf
    echo " "
    echo "=== Iptables:"; iptables -S
    echo " "
    echo --------------------------------------------------------------------

    echo "</pre></body></html>"
} | sendmail -t
```

### Linux — HTML email via ssmtp

Similar to the above but uses `ssmtp`. Set the Core command to:

```sh
doneDL.sh "%NAME" "%FILE" %HASH %SIZE "%DLACTIVETIME"
```

```bash
#!/bin/bash
#
# doneDL.sh - sends an email upon completion of an aMule download
# Uses ssmtp for delivery
#
# Call like this: doneDL.sh "%NAME" "%FILE" %HASH %SIZE "%DLACTIVETIME"

# Enter your email log file and address here:
EMAILFILE="/media/data/log/aMule-mail.log"
EMAIL="youremail@address.com"

NameShort=$1
NameLong=$2
Hash=$3
Size=$4
DLtime=$5

echo To: $EMAIL > $EMAILFILE
echo Subject: "$NameShort" >> $EMAILFILE
echo " " >> $EMAILFILE
echo "MIME-Version: 1.0" >> $EMAILFILE
echo "Content-Type: text/html" >> $EMAILFILE
echo "Content-Disposition: inline" >> $EMAILFILE
echo "<html><body>" >> $EMAILFILE
echo "<pre style='font: monospace'>" >> $EMAILFILE

echo aMule completed this download: >> $EMAILFILE
echo ------------------------------ >> $EMAILFILE
echo " " >> $EMAILFILE
echo File: "$NameShort" >> $EMAILFILE
echo Location: "$NameLong" >> $EMAILFILE
echo Hash: $Hash >> $EMAILFILE
echo -n "Date & time: " >> $EMAILFILE; date >> $EMAILFILE
echo -n Size: $Size bytes >> $EMAILFILE
if [ $Size -gt 102400 ]; then
    echo " ("$(($(($Size / 1024)) / 1024)) "Mb)" >> $EMAILFILE
fi
if [ ! -z "$DLtime" ]; then
    echo "Active download time: $DLtime" >> $EMAILFILE
fi
echo " " >> $EMAILFILE
echo "=== Uptime:" >> $EMAILFILE; uptime >> $EMAILFILE
echo " " >> $EMAILFILE
echo "=== All users:" >> $EMAILFILE; who -a >> $EMAILFILE
echo " " >> $EMAILFILE
echo "=== Disk usage:" >> $EMAILFILE; df -h >> $EMAILFILE
echo " " >> $EMAILFILE
echo "=== Memory:" >> $EMAILFILE; free >> $EMAILFILE
echo " " >> $EMAILFILE
echo "=== Route:" >> $EMAILFILE; route >> $EMAILFILE
echo " " >> $EMAILFILE
echo "=== IP numbers" >> $EMAILFILE; ifconfig >> $EMAILFILE
echo " " >> $EMAILFILE
echo "=== Default gateways" >> $EMAILFILE; route | grep default >> $EMAILFILE
echo " " >> $EMAILFILE
echo "=== DNS servers" >> $EMAILFILE; cat /etc/resolv.conf >> $EMAILFILE
echo " " >> $EMAILFILE
echo "=== Iptables:" >> $EMAILFILE; iptables -S >> $EMAILFILE
echo " " >> $EMAILFILE
echo "=== Top processes:" >> $EMAILFILE; top -n 1 -b >> $EMAILFILE
echo " " >> $EMAILFILE
echo --------------------------------------------------------------------  >> $EMAILFILE

echo "</pre></body></html>" >> $EMAILFILE

# Send the email
cat $EMAILFILE | ssmtp -vvv $EMAIL
```

### Linux — desktop notification via NotifyOSD + sound

Four scripts by **Shuttle**, based on Ezeltje's script. They use `libnotify-bin` for desktop notifications and `sox` for audio alerts. Install both packages first:

```sh
apt-get install libnotify-bin sox
```

Set the Core commands for each event to:

```sh
# Download completed:
doneDL.sh "%NAME" "%FILE" %HASH %SIZE "%DLACTIVETIME"

# New chat session:
newMsg.sh "%SENDER"

# Out of space:
noDiskSpace.sh "%PARTITION"

# Error on completion:
errorDL.sh "%FILE"
```

**`doneDL.sh`** — called when aMule finishes a download:

```bash
#!/bin/bash
#
# doneDL.sh — desktop notification on download complete
# Call like this: doneDL.sh "%NAME" "%FILE" %HASH %SIZE "%DLACTIVETIME"
#
# Enter your sound path here:
soundPath="/usr/share/sounds/gnome/default/alerts/sonar.ogg"

nameShort=$1
nameLong=$2
hash=$3
size=$4
dlTime=$5

/usr/bin/notify-send -i amule "Download completed!" \
    "The download of the file \"$nameShort\" has been completed.
     Complete path: $nameLong
     Size: $size bytes
     Hash: $hash
     Active download time: $dlTime
     Resident memory: $(ps u -C amule --no-headers | awk '{print $6}') kB
     Virtual memory: $(ps u -C amule --no-headers | awk '{print $5}') kB." \
    && /usr/bin/play "$soundPath"
```

**`errorDL.sh`** — called when aMule fails to complete a download:

```bash
#!/bin/bash
#
# errorDL.sh — desktop notification on download error
# Call like this: errorDL.sh "%FILE"
#
# Enter your sound path here:
soundPath="/usr/share/sounds/gnome/default/alerts/sonar.ogg"

/usr/bin/notify-send -i amule "Ooops…" \
    "We were unable to complete the download of the file $1." \
    && /usr/bin/play "$soundPath"
```

**`newMsg.sh`** — called when a user sends you a message:

```bash
#!/bin/bash
#
# newMsg.sh — desktop notification on new chat message
# Call like this: newMsg.sh "%SENDER"
#
# Enter your sound path here:
soundPath="/usr/share/sounds/gnome/default/alerts/sonar.ogg"

/usr/bin/notify-send -i amule "New message!" \
    "The user $1 sent you a message." \
    && /usr/bin/play "$soundPath"
```

**`noDiskSpace.sh`** — called when a download stops due to no disk space:

```bash
#!/bin/bash
#
# noDiskSpace.sh — desktop notification on disk full
# Call like this: noDiskSpace.sh "%PARTITION"
#
# Enter your sound path here:
soundPath="/usr/share/sounds/gnome/default/alerts/sonar.ogg"

/usr/bin/notify-send -i amule "No disk space available!" \
    "The partition $1 does not have enough space to continue downloading.
     You must free some space to resume." \
    && /usr/bin/play "$soundPath"
```

### Windows — LAN popup notification

On a Windows LAN, use the built-in Windows Messenger service to send a popup to any computer on the network.

In **Preferences → Events → Download completed**, enable **Enable command execution on GUI** and set the command to:

```
net send ComputerName %NAME has finished downloading.
```

Replace `ComputerName` with the name of the computer you want to receive the message (it can be the same computer running aMule).

**Enable the Windows Messenger service on each computer** that should receive messages:

1. Open **Control Panel → Administrative Tools → Services**.
2. Find **Alerter** and set it to **Automatic**, then click **Start**.
3. Find **Messenger** and set it to **Automatic**, then click **Start**.
4. Repeat on every computer in the LAN that should receive messages.

When a download completes, a popup will appear with the filename and an OK button.

**Optional — voice announcement:** Install a screen reader such as [Thunder](http://www.screenreader.net/) (free). When the popup appears, the screen reader will read it aloud using the installed voice (e.g. Microsoft Sam, or NeoSpeech Kate/Paul).
