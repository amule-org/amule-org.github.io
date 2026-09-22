---
id: amuleapi-conf
title: amuleapi.conf
---

`amuleapi.conf` is the configuration file for the [`amuleapi`](../../interfaces/amuleapi/index.md) daemon (REST API and Web UI). It is the **only** configuration file `amuleapi` reads — it does **not** use [`remote.conf`](./remote-conf.md). It uses standard INI syntax and is read once at startup.

`amuleapi` creates the file from defaults on first run, so in most setups it needs no manual editing: the HTTP bind address and port, the EC connection, and the Web UI login passwords can all be set from [Preferences → Remote Controls](../../interfaces/gui/preferences.md#remote-controls) or with the `amuleapi` command-line options. Edit this file directly to tune the settings that have no GUI field (the `[Auth]` and `[Streaming]` knobs).

:::warning
`amuleapi.conf` is created with permissions `0600` (owner read/write only), and `amuleapi` re-enforces `0600` on every load — on POSIX systems it **refuses to start** if the file is group- or world-readable. Keep these permissions if you edit the file.
:::

## Location and file name

**Location:**

| Platform | Path |
|---|---|
| Windows | `%APPDATA%\aMule\amuleapi.conf` |
| macOS | `~/Library/Application Support/aMule/amuleapi.conf` |
| Linux / Unix / BSD | `~/.aMule/amuleapi.conf` |

`amuleapi` looks for the file in the aMule configuration directory (the same directory as [`amule.conf`](./amule-conf.md)). Use the `--config-dir=<path>` command-line option to point it at a different directory.

## Format

`amuleapi.conf` uses standard Windows INI format:

- Configuration options are `key=value` pairs, one per line.
- Keys are grouped into **sections** identified by `[SectionName]` headers.
- Internally, keys are referenced using a path-like notation: `/SectionName/KeyName`. For example, the key `Port` in the section `[Server]` is referenced as `/Server/Port`.
- Boolean keys use `0` (false / disabled) and `1` (true / enabled).
- Missing keys fall back to the built-in defaults listed below; a missing file is created with every key at its default.

## `[Server]` section

The HTTP server that serves the REST API and the Web UI.

| Key | Default | CLI override | Description |
|---|---|---|---|
| `BindAddress` | `127.0.0.1` | `--bind=<address>` | Address the HTTP server listens on. `127.0.0.1` = loopback only. |
| `Port` | `4713` | `--http-port=<port>` | TCP port for the REST API and Web UI. Must be in the range 1–65535. |
| `AllowCORS` | `0` | _(none)_ | Enable Cross-Origin Resource Sharing (CORS) response headers. |
| `CorsOriginAllowlist` | _(empty)_ | _(none)_ | Comma-separated list of allowed origins, used only when `AllowCORS=1`. |
| `StaticRoot` | _(empty)_ | _(none)_ | Filesystem directory of the Web UI assets. Empty (the default) = auto-discover the installed [`amuleapi-static/`](./index.md#amuleapi-static) folder; when nothing is found the daemon runs API-only and non-`/api/` paths return `404`. Set a path to serve a specific asset directory. |

## `[EC]` section

How `amuleapi` reaches the aMule core over [External Connections (EC)](../../../developer/ec-protocol.md).

| Key | Default | CLI override | Description |
|---|---|---|---|
| `Host` | `127.0.0.1` | `-h` / `--host` | Hostname or IP address of the machine running [`amule`](../../interfaces/gui/amule.md) or [`amuled`](../../interfaces/amuled.md). |
| `Port` | `4712` | `-p` / `--port` | The core's EC port (matches `ECPort` in [`amule.conf`](./amule-conf.md)). |
| `Password` | _(empty)_ | _(none)_ | Plain-text EC password. Must match the core's `ECPassword`. Needed only for a hand-started `amuleapi`; an auto-started one uses a one-off token instead (see [Auto-Start](../../interfaces/amuleapi/index.md#auto-start)). There is deliberately no `--password` flag. |
| `Encryption` | `1` | `--disable-ec-encryption` | Use authenticated EC encryption (`0` = off, `1` = on). The `--disable-ec-encryption` flag turns it off for a single run. |

## `[Auth]` section

Per-IP rate limiting for login attempts and rejected tokens. These are **config-only** — there is no GUI field. They mirror, but are separate from, the EC auth-throttle keys in [`amule.conf`](./amule-conf.md)'s `[ExternalConnect]` section. Exceeding a threshold returns `429 Too Many Requests` with a `Retry-After` header.

| Key | Default | Description |
|---|---|---|
| `LoginFailureWindowSeconds` | `60` | Sliding window, in seconds, over which failed logins are counted per IP. |
| `LoginFailureThreshold` | `5` | Failed logins allowed within the window before the IP is locked out. |
| `LoginLockoutSeconds` | `300` | Lockout duration, in seconds, after too many failed logins. |
| `TokenFailureWindowSeconds` | `60` | Sliding window, in seconds, over which rejected tokens (`401`s on authenticated routes) are counted per IP. |
| `TokenFailureThreshold` | `30` | Rejected tokens allowed within the window before the IP is locked out. |
| `TokenLockoutSeconds` | `300` | Lockout duration, in seconds, after too many rejected tokens. |

## `[Streaming]` section

Tuning for the Server-Sent Events (SSE) stream and browser file downloads. **Config-only** — no GUI field.

| Key | Default | Description |
|---|---|---|
| `EventBusRingCapacity` | `16384` | Number of past SSE events retained for `Last-Event-ID` replay on reconnect. Any positive value is accepted; the daemon clamps it up to an internal minimum. Memory is roughly capacity × ~1 KB. |
| `MaxConcurrentFileResponses` | `6` | Maximum number of file downloads served to browsers at once (`GET /shared/{hash}/content`). Accepted range 1–256; requests over the limit get `503` with `Retry-After`. This is a global budget, not per-user. |

## Complete example

The following is a representative `amuleapi.conf` with the default values:

```ini
[Server]
BindAddress=127.0.0.1
Port=4713
AllowCORS=0
CorsOriginAllowlist=
StaticRoot=

[EC]
Host=127.0.0.1
Port=4712
Password=
Encryption=1

[Auth]
LoginFailureWindowSeconds=60
LoginFailureThreshold=5
LoginLockoutSeconds=300
TokenFailureWindowSeconds=60
TokenFailureThreshold=30
TokenLockoutSeconds=300

[Streaming]
EventBusRingCapacity=16384
MaxConcurrentFileResponses=6
```

See the [`amuleapi` documentation](../../interfaces/amuleapi/index.md) for the daemon itself, and the [Configuration Files catalogue](./index.md#amuleapi-files) for its companion files ([`amuleapi-passwords`](./index.md#amuleapi-passwords), [`amuleapi-jwt-secret`](./index.md#amuleapi-jwt-secret), and [`amuleapi-ec-token`](./index.md#amuleapi-ec-token)).
