---
id: remote-conf
title: remote.conf
---

`remote.conf` is the shared configuration file for all aMule remote tools: [`amulecmd`](../../interfaces/amulecmd), [`amuleweb`](../../interfaces/amuleweb), and the [`amulegui`](../../interfaces/gui/amulegui). It uses standard INI syntax and is read by each tool at startup.

## Location and file name

**Default location:** `~/.aMule/remote.conf`

Unlike all other aMule configuration files, the name and path of `remote.conf` can be changed with the `-f` / `--config-file` command-line parameter.

:::note
Command-line parameters (`-f`, `-h`, `-p`, etc.) apply to `amulecmd` and `amuleweb` only. The [`amulegui`](../../interfaces/gui/amulegui) does not yet implement them.
:::

## Format

`remote.conf` uses Windows INI file syntax:

- Configuration options are `key=value` pairs, one per line.
- Keys are organized into **groups** (sections) and optionally **subgroups**.
- Group headers are written as `[GroupName]`.
- Any line beginning with `;` (semicolon) is a comment and is ignored.
- Empty lines are ignored.
- Keys are referenced using a path-like notation: `/GroupName/KeyName`. For example, the key `Password` in the group `EC` is referenced as `/EC/Password`.

### Boolean values

For keys that enable or disable a feature: `0` = false / disabled, `1` = true / enabled.

### MD5 hash values

For keys that accept an MD5 hash: the value is **always case-insensitive**.

## Common keys

These keys apply to all remote tools.

### `/Locale`

Selects the language that the remote tool should use.

- **Accepted values:** Language codes such as `de`, `en_GB`; or English language names such as `french`.
- **Default:** empty string (use the system default language).
- **CLI override:** `-l` / `--locale`

### `/EC/Host`

Hostname or IP address of the machine running `aMule` or `amuled`.

- **Default:** `localhost`
- **CLI override:** `-h` / `--host`

### `/EC/Port`

Port number where the core listens for [External Connections](../../../developer/ec-protocol) (EC protocol).

- **Default:** `4712`
- **CLI override:** `-p` / `--port`

### `/EC/Password`

MD5 hash of the password used to authenticate the EC connection.

- **Default:** empty (no password — connection will be rejected unless the core also has no password set)
- **CLI override:** `-P` / `--password` (**accepts plain-text password, not MD5**)

### `/EC/ZLIB`

Enable zlib compression on the EC connection. Reduces bandwidth at the cost of CPU.

- **Default:** `1` (enabled)
- **No CLI override** (always enabled when connecting to a core that supports it)

## Keys specific to amulecmd

`amulecmd` has no keys of its own beyond the common keys above.

## Keys specific to amuleweb

### `/Webserver/Port`

Port number on which `amuleweb` listens for incoming browser connections.

- **Default:** `-1` — `amuleweb` queries this value from the remote core at startup. If the query fails, it falls back to `4711`, but the web interface will most likely be unusable.
- **CLI override:** `-s` / `--server-port`

### `/Webserver/Template`

Name of the web template (skin) to use. Templates are stored in `~/.aMule/webserver/`.

- **Default:** `default`
- **Available built-in templates:** `default`, `chicane`
- **CLI override:** `-t` / `--template`

### `/Webserver/UseGzip`

Enables gzip compression of HTML pages served to the browser.

- **Default:** `0` (disabled)
- **CLI override:** `-z` / `--enable-gzip` to enable; `-Z` / `--disable-gzip` to disable

### `/Webserver/AllowGuest`

Enables guest-mode logins to the web interface. When enabled, users can log in with the guest password and get a read-only view.

- **Default:** `0` (disabled)
- **CLI override:** `-a` / `--allow-guest` to enable; `-d` / `--deny-guest` to disable

### `/Webserver/AdminPassword`

MD5 hash of the administrator password for the web interface.

- **Default:** empty
- **CLI override:** `-A` / `--admin-pass` (**accepts plain-text password, not MD5**)

### `/Webserver/GuestPassword`

MD5 hash of the guest password. Only relevant when `/Webserver/AllowGuest` is `1`.

- **Default:** empty
- **CLI override:** `-G` / `--guest-pass` (**accepts plain-text password, not MD5**)

### `/Webserver/PageRefreshTime`

Interval in seconds between automatic page reloads in the browser. Set to `0` to disable automatic refresh.

- **Default:** `120` (2 minutes)

### `/Webserver/UPnPWebServerEnabled`

Enable UPnP to automatically open the web server port on the router.

- **Default:** `0` (disabled)

### `/Webserver/UPnPTCPPort`

Internal UPnP TCP port used for web server UPnP communication.

- **Default:** `50001`

### `/Webserver/GraphHeight`

Height in pixels of the statistics graphs.

- **Default:** `149`

### `/Webserver/GraphWidth`

Width in pixels of the statistics graphs.

- **Default:** `500`

### `/Webserver/GraphScale`

Scaling of the statistics graphs. Each pixel in the horizontal axis represents this many seconds.

- **Default:** `3` (3 seconds per pixel)

## Keys specific to Remote GUI

The [`amulegui`](../../interfaces/gui/amulegui) currently does not have a stable, documented set of keys in `remote.conf`. It reads and writes several keys that are not formally specified, and some important keys are not saved correctly. This section will be updated once the Remote GUI's configuration handling is stabilised.

## Complete example

The following is a default `remote.conf` with the EC password set to `hello` (MD5: `5D41402ABC4B2A76B9719D911017C592`):

```ini
Locale=

[EC]
Host=localhost
Port=4712
Password=5D41402ABC4B2A76B9719D911017C592
ZLIB=1

[Webserver]
Port=-1
Template=default
UseGzip=0
AllowGuest=0
AdminPassword=
GuestPassword=
PageRefreshTime=120
UPnPWebServerEnabled=0
UPnPTCPPort=50001
GraphHeight=149
GraphWidth=500
GraphScale=3
```
