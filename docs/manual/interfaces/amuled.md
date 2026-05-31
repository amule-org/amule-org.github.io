---
id: amuled
title: amuled — Headless Daemon
---

`amuled` is the headless version of aMule. It runs without any graphical interface and is designed for servers, NAS devices, or any machine where a GUI is unavailable or undesirable.

## Overview

`amuled` is a fully featured aMule client with the GUI stripped out. Without the graphical layer it has significantly reduced memory and CPU requirements and can run without an X server entirely. It is controlled exclusively through remote interfaces:

- [`amulegui`](./gui/amulegui.md) — graphical remote GUI (same interface as `amule`)
- [`amuleweb`](./amuleweb.md) — browser-based HTTP interface
- [`amulecmd`](./amulecmd.md) — command-line interface

All remote interfaces communicate with `amuled` through the **External Connections (EC)** protocol on TCP port 4712 (configurable).

:::note
Do not set `MaxConnections` above **1024** in [`amule.conf`](../configuration/files/amule-conf.md). The wxBase library that `amuled` uses cannot handle more simultaneous connections than that.
:::

## Compilation

aMule uses CMake as its build system. To build `amuled` together with the most common remote interfaces:

```sh
git clone https://github.com/amule-org/amule.git
cd amule

cmake -B build \
    -DBUILD_DAEMON=YES \
    -DBUILD_AMULECMD=YES \
    -DBUILD_WEBSERVER=YES

cmake --build build -j"$(nproc)"
sudo cmake --install build
```

This installs `amuled`, `amulecmd`, and `amuleweb` to `/usr/local/bin/`. To also build `amulegui` add `-DBUILD_REMOTEGUI=YES`.

For dependency installation, available CMake options, custom install prefixes, and platform-specific notes see [Compilation](../../developer/compilation/index.md).

## Configuration

### First Run

Start `amuled` once with the `--ec-config` flag to configure External Connections interactively:

```bash
amuled --ec-config
```

Alternatively, run `amuled` once normally — it will create [`~/.aMule/amule.conf`](../configuration/files/amule-conf.md) with defaults — then quit and edit the file manually.

### Key [`amule.conf`](../configuration/files/amule-conf.md) Settings

The relevant section is `[ExternalConnect]`:

```ini
[ExternalConnect]
AcceptExternalConnections=1
ECPassword=56f491c56340a6fa5c158863c6bfb39f
ECPort=4712
```

**Generating the ECPassword hash:**

```bash
echo -n yourpassword | md5sum | cut -d ' ' -f 1
```

Copy the output (without trailing whitespace) into `ECPassword`.

To restrict connections to the local machine only, also set:

```ini
ECAddress=127.0.0.1
```

## Starting amuled

Run in the foreground (logs go to stdout):

```bash
amuled -f
```

Run in the background (default when `-f` is omitted):

```bash
amuled
```

The process writes its PID to `~/.aMule/muleLock`.

## Running as a System Service

### systemd (modern Linux)

Create `/etc/systemd/system/amuled.service`:

```ini
[Unit]
Description=aMule Daemon
After=network.target

[Service]
Type=simple
User=amule
ExecStart=/usr/bin/amuled -f
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
systemctl enable amuled
systemctl start amuled
```

Replace `User=amule` with the name of a user that has already run `amule` or `amuled` once to generate a configuration.

### Generic Debian/Ubuntu (init.d)

Save the following as `/etc/init.d/amuled` and make it executable (`chmod 755 /etc/init.d/amuled`).

Edit the `USER=` line to match your username (as reported by `whoami`).

```bash
#!/bin/bash
NAME=$(basename "$0")
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
DAEMON=/usr/bin/amuled
DESC=amuled
USER=yourusername   # A user who has run amule once to configure it.

test -x "$DAEMON" || exit 0

case "$1" in
  start)
    echo -n "Starting $DESC: "
    su "$USER" -c "$(printf "%q -f" "$DAEMON")"
    echo "$NAME."
    ;;
  stop)
    echo -n "Stopping $DESC: "
    killall --quiet "$DAEMON"
    echo "$NAME."
    ;;
  restart|force-reload)
    echo -n "Restarting $DESC: "
    killall --quiet "$DAEMON"
    sleep 1
    su "$USER" -c "$(printf "%q -f" "$DAEMON")"
    ;;
  *)
    printf "Usage: %q {start|stop|restart|force-reload}\n" "$0" >&2
    exit 1
    ;;
esac
exit 0
```

Register the service:

```bash
# On Debian/Ubuntu:
update-rc.d amuled defaults

# On a generic system (manual symlinks):
ln -s /etc/init.d/amuled /etc/rc0.d/K20amuled
ln -s /etc/init.d/amuled /etc/rc1.d/K20amuled
ln -s /etc/init.d/amuled /etc/rc6.d/K20amuled
ln -s /etc/init.d/amuled /etc/rc4.d/S20amuled
ln -s /etc/init.d/amuled /etc/rc5.d/S20amuled
```

**Ubuntu note:** Ubuntu ships `/etc/init.d/amule-daemon` already. Set the user by editing `/etc/default/amule-daemon`; `amuled` will then start automatically as that user.

### Red Hat / Fedora / RHEL / CentOS / SME7 (init.d)

Save the following as `/etc/init.d/amuled`, make it executable, then register it with `chkconfig`:

```bash
#!/bin/sh
# aMule daemon startup script
# description: amule p2p download service
# chkconfig: 345 97 03

# Source function library.
. /etc/rc.d/init.d/functions

USER=yourusername   # A user who has run amule once to configure it.
RETVAL=0

case "$1" in
  start)
    echo -n "Starting amule daemon: "
    daemon --user=$USER amuled -f
    RETVAL=$?
    echo
    [ $RETVAL -eq 0 ] && touch /var/lock/subsys/amule
    ;;
  stop)
    echo -n "Stopping amule daemon: "
    killproc amuled
    RETVAL=$?
    rm -f /var/lock/subsys/amule && rm -f /var/lock/amule
    echo
    ;;
  status)
    status amuled
    RETVAL=$?
    ;;
  restart|force-reload)
    $0 stop
    $0 start
    RETVAL=$?
    ;;
  *)
    printf "Usage: %q {start|stop|status|restart|force-reload}\n" "$0" >&2
    exit 1
    ;;
esac
exit $RETVAL
```

Register the service:

```bash
chkconfig --add amuled
```

### Gentoo (OpenRC)

Save the following as `/etc/init.d/amuled`:

```bash
#!/sbin/runscript
# Copyright 1999-2008 Gentoo Foundation
# Distributed under the terms of the GNU General Public License v2

NAME=$(basename "$0")
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
DAEMON=/usr/bin/amuled
DESC=amuled
USER=yourusername

depend() {
    need net
}

start() {
    ebegin "Starting $DESC"
    su "$USER" -c "$(printf "%q -f" "$DAEMON")"
    eend $?
}

stop() {
    ebegin "Stopping $DESC"
    killall --quiet "$DAEMON"
    eend $?
}

restart() {
    svc_stop
    svc_start
}
```

### SUSE / openSUSE (init.d with LSB headers)

Save the following as `/etc/init.d/amuled`:

```bash
#!/bin/bash
### BEGIN INIT INFO
# Provides:          amuled
# Required-Start:    $ALL
# Should-Start:      $ALL
# Required-Stop:     $ALL
# Should-Stop:       $ALL
# Default-Start:     3 5
# Default-Stop:      0 1 2 6
# Short-Description: aMule Daemon
# Description:       Start aMuled, Daemon for aMule
### END INIT INFO

NAME=$(basename "$0")
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
DAEMON=/usr/local/bin/amuled
DESC=amuled
USER=yourusername   # A user who has run amule once to configure it.

test -x "$DAEMON" || exit 0

case "$1" in
  start)
    echo -n "Starting $DESC: "
    su "$USER" -c "$(printf "%q -f" "$DAEMON")"
    echo "$NAME."
    ;;
  stop)
    echo -n "Stopping $DESC: "
    killall --quiet "$DAEMON"
    echo "$NAME."
    ;;
  restart|force-reload)
    echo -n "Restarting $DESC: "
    killall --quiet "$DAEMON"
    sleep 1
    su "$USER" -c "$(printf "%q -f" "$DAEMON")"
    ;;
  *)
    printf "Usage: %q {start|stop|restart|force-reload}\n" "$0" >&2
    exit 1
    ;;
esac
exit 0
```

Insert into the startup list:

```bash
chmod 755 /etc/init.d/amuled
insserv /etc/init.d/amuled
```

## Connecting Remotely

Once `amuled` is running with EC enabled, connect to it using any of the remote interfaces:

| Interface | Command / URL |
|---|---|
| GUI | `amulegui` |
| Web | `http://hostname:4711` (after starting `amuleweb`) |
| CLI | `amulecmd -h hostname -p 4712 -P yourpassword` |

See the individual pages for [amulegui](./gui/amulegui.md), [amuleweb](./amuleweb.md), and [amulecmd](./amulecmd.md) for full setup instructions.
