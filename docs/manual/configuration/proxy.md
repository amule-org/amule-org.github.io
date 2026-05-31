---
id: proxy
title: Proxy
---

A proxy is an intermediate node in the network through which other nodes route their connections to reach a given destination. In most cases, it is a server that clients connect to in order to gain internet access: the proxy forwards requests to the internet and returns the responses to the client. In some cases it serves data from its cache or modifies packets in transit.

A proxy connection requires a specific protocol supported by both the proxy server and the connecting client. The most commonly used proxy protocols are **SOCKS4** and **SOCKS5**. SOCKS5 also supports username/password authentication.

## What aMule routes through the proxy

When a proxy is configured, aMule routes the following connections through it:

- Connections to eD2k servers
- Connections to other eD2k clients (downloads and uploads)
- Connections to the Kademlia network (where the proxy protocol supports UDP)

:::note
The option **Automatic server connect without proxy** exists in the Preferences dialog but is currently ignored by aMule.
:::

## Configuring the proxy in aMule

Open **Preferences → Proxy**.

![Proxy preferences tab](/img/docs/gui/preferences_proxy.png)

### General

| Setting | Description |
|---|---|
| **Enable Proxy** | Enable or disable proxy support. When disabled, all connections are made directly. |
| **Proxy type** | Protocol to use: `SOCKS4`, `SOCKS5`, or `HTTP`. |
| **Proxy host** | Hostname or IP address of the proxy server. |
| **Proxy port** | Port number of the proxy server. |

### Authentication

Available only for SOCKS5 proxies.

| Setting | Description |
|---|---|
| **Enable authentication** | Enable username/password login. If disabled, anonymous login is used. |
| **Username** | Username to log into the proxy. |
| **Password** | Password to log into the proxy. |

## Configuration in amule.conf

When running `amuled` or editing the configuration file directly, proxy settings are stored in the `[Proxy]` section of [`amule.conf`](./config-files/amule-conf.md):

| Key | Default | Description |
|---|---|---|
| `ProxyEnable` | `0` | `1` = enable proxy. |
| `ProxyType` | `0` | `0` = SOCKS5, `1` = SOCKS4, `2` = HTTP. |
| `ProxyName` | _(empty)_ | Proxy hostname or IP. |
| `ProxyPort` | `1080` | Proxy port. |
| `ProxyEnablePassword` | `0` | `1` = enable authentication (SOCKS5 only). |
| `ProxyUser` | _(empty)_ | Proxy username. |
| `ProxyPassword` | _(empty)_ | Proxy password. |
