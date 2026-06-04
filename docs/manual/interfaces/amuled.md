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

All remote interfaces communicate with `amuled` through the **[External Connections (EC)](../../developer/ec-protocol.md)** protocol on TCP port 4712 (configurable).

## Command-Line Options

`amuled` accepts the following options:

| Short | Long | Description |
|---|---|---|
| `-v` | `--version` | Display the current version number and exit. |
| `-h` | `--help` | Display the list of options and exit. |
| `-c <dir>` | `--config-dir=<dir>` | Read the configuration from `<dir>` instead of the default `~/.aMule/`. |
| `-o` | `--log-stdout` | Print log messages to stdout (ignored when the daemon forks to background). |
| `-r` | `--reset-config` | Reset the configuration to default values (the old config is backed up with a `.backup` suffix). |
| `-e` | `--ec-config` | Configure [External Connections (EC)](../../developer/ec-protocol.md) interactively. |
| `-f` | `--full-daemon` | Fork to background (daemonize). Without this flag `amuled` stays in the foreground. |
| `-p <file>` | `--pid-file=<file>` | After forking, write the daemon's PID to `<file>` so a service manager can track it. |
| `-w <path>` | `--use-amuleweb=<path>` | Specify the location of the `amuleweb` binary. |
| `-i` | `--enable-stdin` | Do not close stdin (closed by default). |
| `-d` | `--disable-fatal` | Don't catch fatal exceptions or block exit on assertions (useful under systemd / watchdog scripts). |
| `-t <n>` | `--category=<n>` | Set the category for passed eD2k links. |
| | `--configure-autostart=on\|off` | Enable or disable starting `amuled` on user login, then exit. |

One or more eD2k links may be passed as positional arguments to add them to the download queue.

:::note
Do not set an excessively high `MaxConnections` value in [`amule.conf`](../configuration/config-files/amule-conf.md). The default is around **500** and `amuled` adapts the recommended maximum to your operating system's capabilities. Setting it far too high wastes resources and can degrade performance.
:::

## Installation

See [Installation](../installation/index.md) for pre-built packages, or [Compilation](../../developer/compilation/index.md) to build `amuled` from source.

## Configuration

### First Run

Start `amuled` once with the `--ec-config` flag to configure External Connections interactively:

```bash
amuled --ec-config
```

Alternatively, run `amuled` once normally — it will create [`~/.aMule/amule.conf`](../configuration/config-files/amule-conf.md) with defaults — then quit and edit the file manually.

### Key [`amule.conf`](../configuration/config-files/amule-conf.md) Settings

The relevant section is [`[ExternalConnect]`](../configuration/config-files/amule-conf.md#externalconnect-section):

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

By default `amuled` runs in the **foreground**. Add `-o` to print log messages to stdout:

```bash
amuled -o
```

Use `-f` to **fork to the background** (daemonize). When it forks, `amuled` detaches from the controlling terminal and closes stdin/stdout/stderr, so logging to stdout is disabled automatically. Combine it with `-p` to write a PID file that a service manager can track:

```bash
amuled -f -p /run/amuled/amuled.pid
```

:::note
aMule creates a single-instance lock at `~/.aMule/muleLock` to prevent a second instance from starting with the same configuration. This is **not** a manageable PID file — use `-p` if you need one.
:::

## Running as a System Service

On modern Linux distributions the init system is **systemd**, so that is the recommended way to run `amuled` unattended; Gentoo uses **OpenRC** instead.

:::tip
Many distributions package `amuled` with a ready-made service (for example Debian/Ubuntu's `amule-daemon` package). If you installed aMule through your package manager, use that service instead of writing your own.
:::

### systemd (modern Linux)

Create `/etc/systemd/system/amuled.service`:

```ini
[Unit]
Description=aMule Daemon
After=network.target

[Service]
Type=simple
User=amule
ExecStart=/usr/bin/amuled -o -d
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

:::note
Do **not** pass `-f` here. With `Type=simple`, systemd expects `amuled` to stay in the foreground; forking to background would make systemd lose track of the process. Run it in the foreground with `-o` so log messages go to the journal, and `-d` so it behaves well under the service manager. (If you prefer the classic forking style, use `Type=forking`, `ExecStart=/usr/bin/amuled -f -p /run/amuled/amuled.pid` and `PIDFile=/run/amuled/amuled.pid` instead.)
:::

Enable and start:

```bash
systemctl enable amuled
systemctl start amuled
```

Replace `User=amule` with the name of a user that has already run `amule` or `amuled` once to generate a configuration.

### Gentoo (OpenRC)

Save the following as `/etc/init.d/amuled` and make it executable (`chmod 755 /etc/init.d/amuled`):

```bash
#!/sbin/openrc-run

name="amuled"
description="aMule Daemon"
command="/usr/bin/amuled"
command_args="-o -d"
command_user="amule"        # A user that has run amule once to configure it.
command_background="yes"
pidfile="/run/amuled.pid"

depend() {
    need net
}
```

OpenRC runs `amuled` in the foreground (`-o -d`) and handles backgrounding and the PID file itself (`command_background`). Enable and start it with:

```bash
rc-update add amuled default
rc-service amuled start
```

## Connecting Remotely

Once `amuled` is running with EC enabled, connect to it using any of the remote interfaces:

| Interface | Command / URL |
|---|---|
| GUI | `amulegui` |
| Web | `http://hostname:4711` (after starting `amuleweb`) |
| CLI | `amulecmd -h hostname -p 4712 -P yourpassword` |

See the individual pages for [amulegui](./gui/amulegui.md), [amuleweb](./amuleweb.md), and [amulecmd](./amulecmd.md) for full setup instructions.

To connect from another machine, make sure the EC port (and the `amuleweb` HTTP port, if used) is reachable: see [Network Connectivity](../configuration/network-connectivity.md) for the full list of ports and [Firewall](../configuration/firewall.md) for how to open them.
