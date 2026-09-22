---
id: remote-conf
title: remote.conf
---

`remote.conf` is the shared configuration file for all aMule remote tools: the [`amulegui`](../../interfaces/gui/amulegui.md), [`amuleapi`](../../interfaces/amuleapi/index.md), [`amulecmd`](../../interfaces/amulecmd.md), and [`amuleweb`](../../interfaces/amuleweb.md). It uses standard INI syntax and is read by each tool at startup.

## Location and file name

**Default location:** `~/.aMule/remote.conf`

Unlike all other aMule configuration files, the name and path of `remote.conf` can be changed with the `-f` / `--config-file` command-line parameter.

:::note
The connection-override parameters (`-f` / `--config-file`, `-h` / `--host`, `-p` / `--port`, `-P` / `--password`) apply to `amulecmd` and `amuleweb` only. The [`amulegui`](../../interfaces/gui/amulegui.md) uses a different command-line parser and does not implement them; it accepts `-c` / `--config-dir` (to choose the config directory) and `-s` / `--skip` (to skip the connection dialog) instead. See [Tool-specific behavior](#tool-specific-behavior) below.
:::

## Format

`remote.conf` uses standard Windows INI format:

- Configuration options are `key=value` pairs, one per line.
- Keys are organized into **sections** identified by `[SectionName]` headers, and optionally subgroups.
- Any line beginning with `;` (semicolon) is a comment and is ignored.
- Empty lines are ignored.
- Internally, keys are referenced using a path-like notation: `/SectionName/KeyName`. For example, the key `Password` in the section `[EC]` is referenced as `/EC/Password`.

### Boolean values

For keys that enable or disable a feature: `0` = false / disabled, `1` = true / enabled.

### MD5 hash values

For keys that accept an MD5 hash: the value is **always case-insensitive**.

## `Locale` (top-level key)

A single key written at the top of the file, before any section header. It selects the language the remote tool should use. It is read and written by [`amulecmd`](../../interfaces/amulecmd.md) and [`amuleweb`](../../interfaces/amuleweb.md) only — see the [`[eMule]` section](#emule-section) for how `amulegui` stores its language.

| Key | Default | CLI override | Description |
|---|---|---|---|
| `Locale` | _(empty)_ | `-l` / `--locale` | Language to use. Accepts language codes such as `de`, `en_GB`, or English language names such as `french`. Empty = system default language. |

## `[EC]` section

[External Connection](../../../developer/ec-protocol) settings — how the remote tool reaches the aMule core. These keys apply to all three remote tools.

| Key | Default | CLI override | Description |
|---|---|---|---|
| `Host` | `127.0.0.1` | `-h` / `--host` | Hostname or IP address of the machine running [`amule`](../../interfaces/gui/amule.md) or [`amuled`](../../interfaces/amuled.md). The literal loopback address `127.0.0.1` is used instead of `localhost` because `localhost` lookups can fail intermittently on Windows. |
| `Port` | `4712` | `-p` / `--port` | Port where the core listens for [External Connections](../../../developer/ec-protocol) (EC protocol). |
| `Password` | _(empty)_ | `-P` / `--password` | MD5 hash of the EC password. The connection is rejected unless this matches the core's `ECPassword` (or both are empty). The CLI flag **accepts a plain-text password, not an MD5 hash**; passing an empty value clears the stored hash. |
| `ZLIB` | `1` | _(none)_ | Enable zlib compression on the EC connection. Reduces bandwidth at the cost of CPU. |
| `ForceZLIB` | `0` | `--force-zlib` | Force ZLIB compression regardless of the locality of the destination IP. Useful when the core is reachable over a VPN tunnel that resolves to a LAN IP (compression is otherwise skipped for local addresses). |

## `[WebServer]` section

[`amuleweb`](../../interfaces/amuleweb.md) settings. This section is written by `amuleweb`; the other two tools ignore it.

| Key | Default | CLI override | Description |
|---|---|---|---|
| `Port` | `4711` | `-s` / `--server-port` | Port on which `amuleweb` listens for incoming browser connections. |
| `Template` | _(empty)_ | `-t` / `--template` | Name of the web template (skin) to use. Templates are stored in `~/.aMule/webserver/`. When the value is empty, `amuleweb` falls back to the built-in `default` template. |
| `UseGzip` | `0` | `-z` / `--enable-gzip`, `-Z` / `--disable-gzip` | Enable gzip compression of HTML pages served to the browser. |
| `AllowGuest` | `0` | `-a` / `--allow-guest`, `-d` / `--deny-guest` | Enable guest-mode logins. When enabled, users can log in with the guest password and get a read-only view. |
| `AdminPassword` | _(empty)_ | `-A` / `--admin-pass` | MD5 hash of the administrator password. The CLI flag **accepts a plain-text password, not an MD5 hash**; passing an empty value clears the stored hash. |
| `GuestPassword` | _(empty)_ | `-G` / `--guest-pass` | MD5 hash of the guest password. Only relevant when `AllowGuest` is `1`. The CLI flag **accepts a plain-text password, not an MD5 hash**; passing an empty value clears the stored hash. |
| `PageRefreshTime` | `120` | _(none)_ | Interval in seconds between automatic page reloads in the browser. `0` disables automatic refresh. |
| `UPnPWebServerEnabled` | `0` | `-u` / `--enable-upnp` | Enable UPnP to automatically open the web server port on the router. |
| `UPnPTCPPort` | `50001` | `-U` / `--upnp-port` | Internal UPnP TCP port used for web server UPnP communication. |

:::note
The canonical spelling of this section is `[WebServer]` (capital **S**), matching [`amule.conf`](amule-conf.md). Older builds of `amuleweb` wrote most keys under `[Webserver]` (lowercase **s**) and only `UPnPTCPPort` under `[WebServer]` (capital **S**) — a long-standing typo. Because `wxFileConfig` treats section names as case-insensitive, both spellings refer to the same section and keys written by older builds are still read correctly.
:::

## `[eMule]` section

When `amulegui` uses `remote.conf` as its configuration file, it stores preferences through the standard aMule preferences system, which writes them under `[eMule]` (and other sections, mirroring [`amule.conf`](amule-conf.md)). Most relevant here:

| Key | Default | Description |
|---|---|---|
| `Language` | _(empty)_ | UI language code used by `amulegui` (e.g. `de`, `en_GB`). This is `amulegui`'s language setting — it does **not** use the top-level `Locale` key. Empty = system default. |

## Tool-specific behavior

The main body above is organized by the file's INI sections. The notes below summarize which tool owns which keys and the extra command-line flags each tool accepts.

### amulecmd

Uses only the common keys: `Locale` and the `[EC]` section. Besides the connection flags listed above, it accepts `-w` / `--write-config` (write the current command-line options back to the config file), `--create-config-from` (generate `remote.conf` from an existing `amule.conf`), `--force-zlib` (force ZLIB compression — sets `/EC/ForceZLIB`), `-q` / `--quiet`, and `-v` / `--verbose`.

### amuleweb

Owns the `[WebServer]` section in addition to the common keys (including `--force-zlib`). It also accepts `-L` / `--load-settings`, which loads (and saves) the web server settings from/to the remote core instead of from the local file.

### amulegui (Remote GUI)

Reads and writes only the `[EC]` keys `Host`, `Port`, `Password`, and `ForceZLIB`, and only when the **"Remember those settings"** checkbox in the connection dialog is ticked. It reads `/EC/ZLIB` at startup but never writes it, and it stores its language under `[eMule] Language` rather than `Locale`. It uses a different command-line parser from the other two tools: it has no `--config-file`, `--host`, `--port`, or `--password` override (the config file name is fixed to `remote.conf`), and instead supports `-c` / `--config-dir` (config directory) and `-s` / `--skip` (skip the connection dialog and connect with the saved settings), alongside the standard `amule`/`amuled` flags.

## Complete example

The following is a representative `remote.conf` with the EC password set to `hello` (MD5: `5D41402ABC4B2A76B9719D911017C592`):

```ini
Locale=

[EC]
Host=127.0.0.1
Port=4712
Password=5D41402ABC4B2A76B9719D911017C592
ZLIB=1
ForceZLIB=0

[WebServer]
Port=4711
UPnPWebServerEnabled=0
UPnPTCPPort=50001
Template=default
UseGzip=0
AllowGuest=0
AdminPassword=
GuestPassword=
PageRefreshTime=120
```
