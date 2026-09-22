---
id: index
title: amuleapi — REST API & Web UI
---

`amuleapi` is a standalone daemon that connects to a running [`amuled`](../amuled.md) (or [`amule`](../gui/amule.md)) instance as an ordinary [External Connections (EC)](../../../developer/ec-protocol.md) client and exposes a modern control surface: a versioned REST API under `/api/v1/*`, a Server-Sent Events (SSE) stream for live updates, and the full browser-based [Web UI](./web-ui.md). It is the replacement for [`amuleweb`](../amuleweb.md).

:::note
This functionality is available from aMule 3.1.0 onwards.
:::

![The Downloads section of the Web UI](/img/docs/gui_amuleapi/amuleapi_web_ui_downloads.png)

## Overview

Where `amuleweb` renders HTML server-side from templates, `amuleapi` serves a clean HTTP API and a single-page Web UI that talks to it. Use `amuleapi` when you want to control aMule from a browser, script it over REST, or receive real-time updates without polling. It runs anywhere `amuled` runs, including headless servers and NAS devices.

`amuleapi` speaks **HTTP only, by design** — terminate TLS in a reverse proxy in front of it (see [Security Model](#security-model)).

## Command-Line Options

| Option | Description |
|---|---|
| `-h`, `--host=<host>` | Host where aMule is running, for the EC connection (default: `127.0.0.1`) |
| `-p`, `--port=<port>` | aMule's EC port (default: `4712`) |
| `--bind=<address>` | Address the HTTP server listens on (overrides `[Server] BindAddress`) |
| `--http-port=<port>` | HTTP port the browser and API clients connect to (default: `4713`) |
| `--config-dir=<path>` | Use the given configuration directory |
| `--set-admin-pass=<password>` | Store the admin password, then exit |
| `--set-guest-pass=<password>` | Store the guest password, then exit |
| `--foreground` | Stay in the foreground (the default; `amuleapi` never detaches — use systemd/launchd or `nohup` to run it as a service) |
| `--disable-ec-encryption` | Connect to aMule without EC encryption |
| `--log-file=<path>` | Write the log to the given file |
| `--no-log-file` | Do not write a log file |
| `--version` | Display the version number |
| `--help` | Print a short usage description |

There is deliberately **no `--password` flag**: an EC password passed on the command line would be visible to any local user via `ps`. An auto-started `amuleapi` uses a one-off token (see [Auto-Start](#auto-start)); a hand-started one reads `[EC] Password` from its config file. Use `--set-admin-pass` / `--set-guest-pass` (or [Preferences → Remote Controls](../gui/preferences.md#remote-controls) in the GUI) to set the Web UI login passwords.

## Configuration File

`amuleapi` reads `amuleapi.conf` from its configuration directory. The file is created on first run with mode `0600`, and every load re-enforces `0600` (it refuses to start otherwise). The keys and their defaults are:

### `[Server]`

| Key | Default | Description |
|---|---|---|
| `BindAddress` | `127.0.0.1` | Address the HTTP server listens on (loopback by default) |
| `Port` | `4713` | HTTP port for the API and Web UI |
| `AllowCORS` | `0` | Enable Cross-Origin Resource Sharing |
| `CorsOriginAllowlist` | *(empty)* | Comma-separated list of allowed origins when CORS is enabled |
| `StaticRoot` | *(empty)* | Directory of Web UI assets; empty means auto-discover (see [Web UI](./web-ui.md)) |

### `[EC]`

| Key | Default | Description |
|---|---|---|
| `Host` | `127.0.0.1` | aMule EC host |
| `Port` | `4712` | aMule EC port |
| `Password` | *(empty)* | EC password (only needed when `amuleapi` is started by hand; see [Auto-Start](#auto-start)) |
| `Encryption` | `1` | Use EC encryption |

### `[Auth]`

| Key | Default | Description |
|---|---|---|
| `LoginFailureWindowSeconds` | `60` | Sliding window for counting failed logins, per IP |
| `LoginFailureThreshold` | `5` | Failed logins allowed within the window before lockout |
| `LoginLockoutSeconds` | `300` | Lockout duration after too many failed logins |
| `TokenFailureWindowSeconds` | `60` | Sliding window for counting rejected tokens (401s), per IP |
| `TokenFailureThreshold` | `30` | Rejected tokens allowed within the window before lockout |
| `TokenLockoutSeconds` | `300` | Lockout duration after too many rejected tokens |

### `[Streaming]`

| Key | Default | Description |
|---|---|---|
| `EventBusRingCapacity` | `16384` | Number of past SSE events retained for `Last-Event-ID` replay |
| `MaxConcurrentFileResponses` | `6` | Maximum concurrent file downloads served to browsers |

## Auto-Start

When aMule (or `amuled`) has `amuleapi` enabled in [Preferences → Remote Controls](../gui/preferences.md#remote-controls), it launches `amuleapi` as a child process at startup and stops it on shutdown. In this mode aMule writes a one-off EC token to the file `amuleapi-ec-token` (mode `0600`, read once, then deleted) and passes only `--bind` and `--http-port` on the command line — so **no EC password is needed**. A hand-started `amuleapi` instead authenticates with the `[EC] Password` from its config file.

## Authentication

`amuleapi` issues an **HS256 JSON Web Token (JWT)** on login, valid for 24 hours. Present it on every request either as an `Authorization: Bearer <jwt>` header or via the `HttpOnly` cookie `amuleapi_token` (`SameSite=Strict; Path=/api/v1`). The cookie is deliberately **not** marked `Secure`, so a single login response works whether or not TLS is terminated in front of the daemon.

There are two roles:

- **admin** — full read/write access.
- **guest** — read-only, and available only when a guest password has been set.

Log in with a password, not a username; the password you enter selects the role. The signing secret is 32 random bytes generated on first run and stored in `amuleapi-jwt-secret` (mode `0600`). Login attempts and rejected tokens are **rate-limited per IP** using the `[Auth]` knobs above; exceeding a threshold returns `429 Too Many Requests` with a `Retry-After` header.

## Server-Sent Events

`GET /api/v1/events` returns a `text/event-stream` carrying incremental deltas — it does **not** send an initial snapshot. A client bootstraps by opening the stream, fetching current state from the REST endpoints, and then applying the deltas that arrive. Events are grouped into channels:

`downloads`, `shared`, `servers`, `clients`, `friends`, `status`, `logs`, `search`, `chats`, `comments`.

Subscribe to a subset with `?channels=<comma-separated>`; the `resync` control frame is always delivered. A `: keepalive` heartbeat comment is sent every 15 seconds. On reconnect, the client's `Last-Event-ID` header replays any missed events held in the ring buffer (see `[Streaming] EventBusRingCapacity`).

## REST API

All endpoints live under the base path `/api/v1`. The endpoint groups are:

- **System** — health, version, status.
- **Authentication** — login, logout.
- **Downloads** — the download queue, plus per-file comments, filenames, clients and clear-completed.
- **Clients** and **Known clients** — active peers and the credit-store history.
- **Shared files** — shared files, share directories, verify, media refresh.
- **Servers** — the eD2k server list, plus the server-list update (`servers_update`).
- **Friends**, **Categories**.
- **Preferences** — read (`GET`) and update (`PATCH`).
- **Network control** — networks and Kad control.
- **IP filter**, **GeoIP**.
- **Logs**, **Statistics**, **Search**, **Assets**, **Chat**.

## Security Model

- **HTTP only by design** — put a reverse proxy in front to terminate TLS.
- Listens on **loopback** (`127.0.0.1`) unless `BindAddress` is changed.
- The config file and the generated secret/token files are restricted to `0600`.

## Reference

The full, authoritative specification lives in the aMule source repository (do not treat this page as the contract):

- [`docs/QUICKSTART-AMULEAPI.md`](https://github.com/amule-org/amule/blob/master/docs/QUICKSTART-AMULEAPI.md) — first-run and reverse-proxy setup.
- [`docs/api/REFERENCE.md`](https://github.com/amule-org/amule/blob/master/docs/api/REFERENCE.md) — the complete per-endpoint REST contract.
- [`docs/api/EVENTS.md`](https://github.com/amule-org/amule/blob/master/docs/api/EVENTS.md) — the SSE contract.

See the [Web UI](./web-ui.md) page for the browser interface `amuleapi` serves.
