---
id: index
title: Troubleshooting
---

# Troubleshooting

Solutions to the most common problems encountered when running aMule.

| Section | Contents |
|---|---|
| [Common Problems](./common-problems.md) | CPU usage, Low ID, lost downloads, permissions, file descriptors, crashes, and more |
| [Slow Download Speeds](./slow-speeds.md) | Configuration checklist, ADSL congestion fixes, network-inherent limitations, aMule slowing other apps |
| [Fake Files and Servers](./fake-files-and-servers.md) | Detecting fake content, identifying and avoiding malicious servers, port testing |
| [Remote Access Troubleshooting](./remote-access.md) | `amulecmd` connection errors, `amuleweb` connection and authentication issues |

## Quick diagnostics

**I have a Low ID**
→ TCP port 4662 is not reachable from the internet. See [Network Connectivity](../configuration/network-connectivity.md) and [Test Your Ports](../configuration/network-connectivity.md#testing-your-port-status).

**Downloads are very slow**
→ Work through the [Slow Download Speeds checklist](./slow-speeds.md#configuration-issues). The most common cause is an upload limit below 10 KBps.

**aMule slows down everything on my computer**
→ Your upload limit or connection count is too high. See [aMule Makes Everything Else Slow](./slow-speeds.md#amule-makes-everything-else-slow).

**I can't find my downloaded files**
→ See [Directories](../configuration/directories.md#incoming-directory) for the default Incoming path on your platform.

**Kademlia says "firewalled" even though I have a High ID**
→ Your router is remapping UDP port 4672. See [Network Connectivity — Kademlia connectivity](../configuration/network-connectivity.md#kademlia-connectivity-open-vs-firewalled) and [Network FAQ → Kademlia firewalled](../faq/network.md#why-does-kademlia-still-say-it-is-firewalled).

**Search results contain many suspicious files**
→ You may be connected to a fake server. See [Fake Servers](./fake-files-and-servers.md#fake-servers).

**amuled won't let amulecmd connect**
→ External Connections are not enabled or the EC password is not set. See [Remote Access Troubleshooting → amulecmd](./remote-access.md#i-cannot-connect-to-amuled--it-doesnt-seem-to-be-listening-whats-wrong).
