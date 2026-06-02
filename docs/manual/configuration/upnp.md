---
id: upnp
title: UPnP (Universal Plug and Play)
---

**Universal Plug and Play (UPnP)** lets aMule configure port forwarding on your router automatically, provided the router supports UPnP. It is the easiest way to achieve the reachable ports described in [Network Connectivity](./network-connectivity.md): when UPnP is available and working, you do not need to manually forward ports as described in [Firewall and Router Configuration](./firewall.md).

## Enabling UPnP in aMule

:::note
UPnP is an optional build feature. aMule must have been **compiled with UPnP support** for these options to work; otherwise the UPnP controls are disabled in the [Connection preferences](../interfaces/gui/preferences.md#connection). See the [Compilation](../../developer/compilation/index.md) guide.
:::

aMule exposes **three independent UPnP toggles**, each forwarding a different port (or set of ports). All are disabled by default.

| Setting | GUI location | `amule.conf` key | Default | What it forwards |
|---|---|---|---|---|
| Enable UPnP for router port forwarding | [**Preferences → Connection**](../interfaces/gui/preferences.md#connection) | [`UPnPEnabled`](./config-files/amule-conf.md#connection) | off | The eD2k TCP and UDP ports (see below) |
| Enable UPnP port forwarding on the EC port | [**Preferences → Remote Controls**](../interfaces/gui/preferences.md#remote-controls) | [`UPnPECEnabled`](./config-files/amule-conf.md#externalconnect-section) | off | The External Connections (EC) port |
| Enable UPnP port forwarding of the web server port | [**Preferences → Remote Controls**](../interfaces/gui/preferences.md#remote-controls) | [`UPnPWebServerEnabled`](./config-files/amule-conf.md#webserver-section) | off | The `amuleweb` web server port |

The main toggle (**Connection** tab) is the master switch: the EC mapping is only added when both `UPnPEnabled` and `UPnPECEnabled` are on. The web server mapping is handled separately by the web server.

When UPnP succeeds, aMule registers the port mappings on your router automatically. You can verify connectivity by [testing your port status](./network-connectivity.md#testing-your-port-status).

For the full list of UPnP-related keys and their defaults, see the [`amule.conf` reference](./config-files/amule-conf.md).

### Ports forwarded

With the main UPnP toggle enabled, aMule maps the following ports on the router (the actual service ports, not the UPnP control port — see [Network Connectivity → Ports used by aMule](./network-connectivity.md#ports-used-by-amule) for what each one does):

- **TCP** — the standard eD2k listen port (default `4662`).
- **UDP** — the server-request UDP port (TCP+3, default `4665`).
- **UDP** — the extended eMule / Kademlia UDP port (default `4672`).
- **TCP** — the External Connections (EC) port, only if the EC toggle is also enabled.

### The "UPnP TCP Port" setting

The **UPnP TCP Port** field on the Connection tab (`UPnPTCPPort`, default `50000`) is **not** a port that gets forwarded. It is the local port the UPnP stack uses to communicate with the router (SSDP / control point). The ports actually opened on the router are the service ports listed above.

## UPnP and personal firewalls

If your computer runs a software firewall (e.g. iptables), UPnP also requires opening two extra ports on the local firewall: the local UPnP control port (`UPnPTCPPort`, default TCP 50000) and the SSDP advertisements from your router (UDP 1900). See the [Firewall — UPnP through the firewall section](./firewall.md#kademlia-and-upnp) for the exact rules.

## Known issues

- UPnP requires the router to support and enable the UPnP protocol. Not all routers support it, and some require UPnP to be enabled explicitly in the router's settings.
- Some routers remap the source UDP port on outgoing packets even with UPnP active. If Kademlia still shows "firewalled" after enabling UPnP, see the [Firewall](./firewall.md#kademlia-and-upnp) page for the `no nat` pf rule (OpenBSD) or the equivalent for your router.
- If UPnP does not work for your setup, fall back to manual port forwarding as described in [Firewall and Router Configuration](./firewall.md).

## Related Pages

- [Network Connectivity](./network-connectivity.md) — start here: ports, High ID / open status, and how to test your connectivity
- [Firewall and Router Configuration](./firewall.md) — manual per-OS and per-router port setup
- [Compilation](../../developer/compilation/index.md) — the `ENABLE_UPNP` build option
