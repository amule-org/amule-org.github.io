---
id: upnp
title: UPnP (Universal Plug and Play)
---

**Universal Plug and Play (UPnP)** allows aMule to automatically configure port forwarding on your router, provided the router supports UPnP. When UPnP is available and working, you do not need to manually forward ports as described in [Firewall and Router Configuration](./firewall.md).

UPnP support was introduced in aMule CVS around December 2006 and is available in all releases from 2.2.x onwards.

## Requirements

UPnP in aMule requires the external **libupnp** library.

| aMule version | Required libupnp version |
|---|---|
| Up to 2.2.0 | 1.4.1 (recommended) |
| 2.2.1 and later | 1.6.x |

### Installing libupnp

**From source:** Download the source tarball from the [libupnp project page on SourceForge](https://sourceforge.net/projects/pupnp/).

**From distribution packages:**

| Distribution | Method |
|---|---|
| Ubuntu | Included in official repositories (`apt-get install libupnp-dev`) |
| Fedora Core 4, 5, 6 | Included in Fedora Extras |
| OpenSUSE 10.2 | Available via the Gerd78 repository |
| Slackware 12.x | Available at [slacky.eu](http://www.slacky.eu/) |

## Enabling UPnP in aMule

UPnP is enabled and configured through **Preferences → Connection**. When libupnp is installed and aMule is compiled with UPnP support, the UPnP option appears in the Connection preferences tab.

If UPnP succeeds, aMule will automatically register port mappings for the TCP and UDP ports on your router. You can verify connectivity with the [Test Port](https://www.amule.org/testport.php) page.

## UPnP and personal firewalls

If your computer runs a software firewall (e.g. iptables), UPnP also requires opening ports on the local firewall. See the [Firewall — UPnP section](./firewall.md#kademlia-and-upnp) for the required iptables rules:

- Incoming TCP on the UPnP port (default 50000, configurable)
- Incoming UDP from your router's port 1900 (SSDP advertisements)

## Known issues

- UPnP requires the router to support and enable the UPnP protocol. Not all routers support it, and some require UPnP to be enabled in the router's settings.
- Some routers remap the source UDP port on outgoing packets even with UPnP active. If Kademlia still shows "firewalled" after enabling UPnP, see the [Firewall](./firewall.md#kademlia-and-upnp) page for the `no nat` pf rule (OpenBSD) or equivalent for your router.
- UPnP functionality was still being tested at the time of the original wiki article. If you experience issues, fall back to manual port forwarding as described in [Firewall and Router Configuration](./firewall.md).
