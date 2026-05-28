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
→ See [Download Folders](../user-guide/configuration/download-folders.md) for the default paths on each platform.

**Why do I have a Low ID?**
→ TCP port 4662 is not reachable from the internet. See [High ID and Low ID](../ed2k/high-id-low-id.md) and [Test Your Ports](../troubleshooting/fake-files-and-servers.md#testing-your-ports).

**Downloads are very slow**
→ Work through the [Slow Download Speeds checklist](../troubleshooting/slow-speeds.md#configuration-issues). The most common cause is an upload limit below 10 KBps.

**Which ports does aMule use?**
TCP 4662 (file transfers), UDP 4665 (global searches), UDP 4672 (Kademlia / queue rating), TCP 4711 (`amuleweb`), TCP 4712 (External Connections). See [eD2k Network → Ports](../ed2k/ed2k-network.md#ports).

**How do I run aMule without a GUI?**
Use `amuled` (the daemon) and control it with `amulecmd`, `amuleweb`, or `amulegui`. See [Remote Access FAQ](./remote-access.md).

**How do I switch from eMule without losing credits?**
Copy `cryptkey.dat`, `clients.met`, `preferences.dat`, `preferencesKad.dat`, `key_index.dat`, `load_index.dat`, and `src_index.dat` from eMule's config directory into `~/.aMule`. See [General FAQ → Switching from eMule](./general.md#how-can-i-switch-from-emule-to-amule-without-losing-my-credits).
