---
id: index
title: Troubleshooting
---

Solutions to the most common problems encountered when running aMule.

| Section | Contents |
|---|---|
| [Common Problems](./common-problems.md) | High CPU at startup, Low ID, lost/paused downloads, disk space, server list issues, permissions, file descriptors, crashes, and more |
| [Slow Download Speeds](./slow-speeds.md) | Configuration checklist, upload-saturation (ACK bottleneck) fixes, network-inherent limitations, aMule slowing other apps |
| [Fake Files and Servers](./fake-files-and-servers.md) | Detecting fake content, identifying and avoiding malicious servers, IP filtering, maintaining a safe server list |
| [Remote Access Troubleshooting](./remote-access.md) | `amulecmd` connection errors, `amuleweb` connection and authentication issues |

## Quick diagnostics

**aMule uses a lot of CPU at startup**
→ aMule hashes new or modified shared files on launch — this is normal. If it happens on every startup with no new files, `known.met` may be corrupted. See [Why is aMule taking so much CPU at startup?](./common-problems.md#why-is-amule-taking-so-much-cpu-at-startup).

**I have a Low ID**
→ TCP port 4662 is not reachable from the internet. See [Network Connectivity](../configuration/network-connectivity.md) and [Test Your Ports](../configuration/network-connectivity.md#testing-your-port-status).

**Downloads are very slow**
→ Work through the [Slow Download Speeds checklist](./slow-speeds.md#configuration-issues). The most common cause is an upload limit below 10 KBps.

**aMule slows down everything on my computer**
→ Your upload limit or connection count is too high. See [aMule Makes Everything Else Slow](./slow-speeds.md#amule-makes-everything-else-slow).

**I can't find my downloaded files**
→ See [Directories](../configuration/directories.md#incoming-directory) for the default Incoming path on your platform.

**All my downloads paused and won't resume**
→ You are probably low on free disk space. aMule pauses downloads to avoid corruption. See [All my downloads suddenly paused](./common-problems.md#all-my-downloads-suddenly-paused-and-i-cant-resume-them-whats-going-on) and [Disk Space Protection](../configuration/directories.md#disk-space-protection).

**I lost a download — can I recover it?**
→ Depends on which `*.part` / `*.part.met` files survive. See [I lost a download — can I recover it?](./common-problems.md#i-lost-a-download--can-i-recover-it).

**Kademlia says "firewalled" even though I have a High ID**
→ Your router is remapping UDP port 4672. See [Network Connectivity — Kademlia connectivity](../configuration/network-connectivity.md#kademlia-connectivity-open-vs-firewalled) and [Network FAQ → Kademlia firewalled](../faq.md#why-does-kademlia-still-say-it-is-firewalled).

**Search results contain many suspicious files**
→ You may be connected to a fake server. See [Fake Servers](./fake-files-and-servers.md#fake-servers).

**amulecmd or amuleweb can't connect to amuled**
→ External Connections are not enabled or the EC password is not set. See [Remote Access Troubleshooting](./remote-access.md#i-cannot-connect-to-amuled--it-doesnt-seem-to-be-listening-whats-wrong); for amuleweb-specific failures see [Why is amuleweb failing to connect?](./remote-access.md#why-is-amuleweb-failing-to-connect).
