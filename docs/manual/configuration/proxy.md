---
id: proxy
title: Proxy
---

:::warning
For privacy, prefer a **VPN** over aMule's built-in proxy. The proxy is easy to misconfigure, and some traffic can leak around it: only **SOCKS5** can tunnel UDP, so when SOCKS4, SOCKS4a, or HTTP is used the Kademlia (UDP) traffic still goes out directly, exposing your real IP address. A properly configured VPN routes *all* traffic and avoids these leaks.
:::

A proxy is an intermediate node in the network through which other nodes route their connections to reach a given destination. In most cases, it is a server that clients connect to in order to gain internet access: the proxy forwards requests to the internet and returns the responses to the client. In some cases it serves data from its cache or modifies packets in transit.

A proxy connection requires a specific protocol supported by both the proxy server and the connecting client. aMule supports four proxy protocols: **SOCKS5**, **SOCKS4**, **SOCKS4a**, and **HTTP**. Of these, only SOCKS5 can tunnel UDP traffic, and SOCKS5 is also the only protocol that supports full username/password authentication.

## What aMule routes through the proxy

When a proxy is enabled, aMule sends its **outgoing** connections through it:

| Connection | Routed through the proxy? |
|---|---|
| TCP connection to [eD2k servers](../../p2p-networks/ed2k/servers.md) | Yes (any proxy type). |
| UDP to eD2k servers | Yes, only with **SOCKS5** (UDP requires `UDP ASSOCIATE`); otherwise direct. |
| TCP to other eD2k clients (your outgoing downloads and uploads) | Yes (any proxy type). |
| UDP for the extended eD2k protocol and the [Kademlia network](../../p2p-networks/kademlia.md) | Yes, only with **SOCKS5**; otherwise direct. |
| Auxiliary HTTP downloads (version check, `server.met`, IP filter, `nodes.dat`, GeoIP database) | Yes, only with an **HTTP** proxy; with a SOCKS proxy these requests are made directly. |

The following are **not** routed through the proxy and remain direct:

- **Incoming** connections from other clients. The proxy only handles outgoing connections; incoming connections still rely on your real address and port forwarding, so the proxy does not hide you from peers that connect to you.
- Any **UDP** traffic when the proxy is not SOCKS5 (SOCKS4, SOCKS4a, and HTTP cannot tunnel UDP).
- Auxiliary HTTP downloads when the proxy is not an HTTP proxy.

:::note
The option **Automatic server connect without proxy** exists in the Preferences dialog but is currently ignored by aMule.
:::

## Configuring the proxy in aMule

Open [**Preferences → Proxy**](../interfaces/gui/preferences.md#proxy).

### General

| Setting | Description |
|---|---|
| **Enable Proxy** | Enable or disable proxy support. When disabled, all connections are made directly. |
| **Proxy type** | Protocol to use: `SOCKS5`, `SOCKS4`, `HTTP`, or `SOCKS4a`. |
| **Proxy host** | Hostname or IP address of the proxy server. |
| **Proxy port** | Port number of the proxy server. |

### Authentication

| Setting | Description |
|---|---|
| **Enable authentication** | Enable login with credentials. If disabled, anonymous login is used. |
| **Username** | Username to log into the proxy. |
| **Password** | Password to log into the proxy. |

How the credentials are used depends on the proxy type:

- **SOCKS5** — full username and password authentication.
- **SOCKS4** / **SOCKS4a** — the username is sent as the SOCKS user ID; the password is not used (the protocol has no password field).
- **HTTP** — username and password are sent as HTTP Basic authentication (`username:password`).

## Configuration in amule.conf

When running [`amuled`](../interfaces/amuled.md) or editing the configuration file directly, proxy settings are stored in the [`[Proxy]` section of `amule.conf`](./config-files/amule-conf.md#proxy-section):

| Key | Default | Description |
|---|---|---|
| `ProxyEnableProxy` | `0` | `1` = enable proxy. |
| `ProxyType` | `0` | `0` = SOCKS5, `1` = SOCKS4, `2` = HTTP, `3` = SOCKS4a. |
| `ProxyName` | _(empty)_ | Proxy hostname or IP. |
| `ProxyPort` | `1080` | Proxy port. |
| `ProxyEnablePassword` | `0` | `1` = enable authentication. |
| `ProxyUser` | _(empty)_ | Proxy username. |
| `ProxyPassword` | _(empty)_ | Proxy password. Stored in plain text. |
