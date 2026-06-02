---
id: index
title: FAQ
---

# FAQ

Frequently asked questions about aMule, organized by topic.

| Section | Contents |
|---|---|
| [General FAQ](./general.md) | User interface, file management, credits, settings, statistics, UPnP |
| [Network & Connectivity FAQ](./network.md) | eD2k protocol, Kademlia, ports, IDs, protocol overhead, browser ed2k:// setup |
| [Remote Access FAQ](./remote-access.md) | `amuled` overview and service setup, `amulecmd` scripting and scheduling, `amulegui`, `amuleweb` setup |

## Quick answers to the most common questions

**Where are my downloaded files?**
→ See [Directories](../configuration/directories.md#incoming-directory) for the default paths on each platform.

**Why do I have a Low ID?**
→ TCP port 4662 is not reachable from the internet. See [Network Connectivity](../configuration/network-connectivity.md) and [Test Your Ports](../configuration/network-connectivity.md#testing-your-port-status).

**Downloads are very slow**
→ Work through the [Slow Download Speeds checklist](../troubleshooting/slow-speeds.md#configuration-issues). The most common cause is an upload limit below 10 KBps.

**Which ports does aMule use?**
TCP 4662 (file transfers), UDP 4665 (global searches), UDP 4672 (Kademlia / queue rating), TCP 4711 (`amuleweb`), TCP 4712 (External Connections). See [eD2k Network → Ports](../../p2p-networks/ed2k/index.md#ports).

**How do I run aMule without a GUI?**
Use `amuled` (the daemon) and control it with `amulecmd`, `amuleweb`, or `amulegui`. See [Remote Access FAQ](./remote-access.md).

**How do I switch from eMule without losing credits?**
Copy [`cryptkey.dat`](../configuration/config-files/index.md#cryptkeydat), [`clients.met`](../configuration/config-files/index.md#clientsmet), [`preferences.dat`](../configuration/config-files/index.md#preferencesdat), [`preferencesKad.dat`](../configuration/config-files/index.md#preferenceskaddat), `key_index.dat`, `load_index.dat`, and `src_index.dat` from eMule's config directory into `~/.aMule`. See [General FAQ → Switching from eMule](./general.md#how-can-i-switch-from-emule-to-amule-without-losing-my-credits).
