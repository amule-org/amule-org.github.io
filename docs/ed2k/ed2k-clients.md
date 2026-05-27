---
id: ed2k-clients
title: eD2k Clients
---

The **eD2k network** has been supported by several client applications over the years. aMule is the primary open-source, cross-platform client actively maintained today.

## History of eD2k Clients

### eDonkey2000 (2000–2006)

**eDonkey2000** was the pioneering application that created and defined the eD2k protocol. Released around 2000, it was proprietary software that displayed advertisements to users; disabling ads required purchasing a license.

The eDonkey2000 website was shut down in 2006 following a RIAA lawsuit. The software received no further updates and is no longer in use. The eD2k protocol it defined, however, lives on in the open-source clients described below.

### lMule (~2002–2003)

**lMule** was a Linux port of the eMule client using the wxWidgets (formerly known as wxWindows) class library. It was the original program, based on eMule, from which xMule subsequently forked.

The lMule project is no longer maintained or supported.

> **Note:** aMule is a separate project and is not related to lMule in any way, apart from being originally a fork of it. aMule does share developers and history with the former lMule developers.

### mlDonkey (2002–present)

**mlDonkey** was the first (partially) open-source replacement for eDonkey2000, primarily targeting Unix-like operating systems. The core network code was originally kept closed-source at the request of MetaMachine, the official eDonkey2000 publisher; this changed after eMule arrived as a fully open-source client.

Unlike the \*Mule clients, mlDonkey was designed as a server/client system from the outset: it runs as a daemon, without requiring a GUI, though many separate GUIs are available. This architecture initially made it the client of choice for running on routers and similar embedded hardware — until aMule introduced its own daemon mode (`amuled`), making aMule a solid alternative for headless operation.

mlDonkey is written in OCaml and supports multiple P2P protocols simultaneously:

- Overnet
- DirectConnect (alpha)
- Gnutella and Gnutella2
- OpenNapster (alpha)
- SoulSeek (beta)
- BitTorrent
- FastTrack
- AudioGalaxy (defunct)
- HTTP, FTP, and SSH via FileTP

As with any multi-protocol application, the quality of support varies significantly across these networks, from good to poor.

Since mlDonkey 2.5.30-x, a feature known as **swarming** is supported, making it possible to download a single file simultaneously from the FastTrack, BitTorrent, and eD2k networks at the same time.

### eMule (2002–present)

**eMule** is the most widely known Windows-only open-source eD2k client. It introduced several important protocol extensions that aMule also implements: the credits system, the AICH hash tree, Secure User Identification (SUI), and Kademlia support. eMule has a large ecosystem of mods and plugins.

aMule is protocol-compatible with eMule and can exchange files with eMule clients on both eD2k and Kademlia networks.

### xMule (2003–2004)

**xMule** was an early Linux-native fork of eMule that predated aMule. The xMule project was discontinued after aMule became the established cross-platform alternative.

### aMule (2003–present)

**[aMule](../user-guide/amule-components/amule.md)** (*all-platform Mule*) is the cross-platform, open-source eD2k and Kademlia client, available for Windows, macOS, Linux, FreeBSD, and other Unix-like systems. It was originally forked from xMule and shares protocol compatibility with eMule.

Key features that distinguish aMule (see the [full feature list](../index.md#features)):
- Full eD2k + Kademlia dual-network support.
- Daemon mode ([`amuled`](../user-guide/amule-components/amuled.md)) for headless/server operation.
- Web interface ([`amuleweb`](../user-guide/amule-components/amuleweb.md)), remote GUI ([`amulegui`](../user-guide/amule-components/amulegui.md)), and command-line interface ([`amulecmd`](../user-guide/amule-components/amulecmd.md)).
- Cross-platform: Windows (via MinGW), macOS, Linux, FreeBSD.

### JMule (~2007)

**JMule** is an open-source eD2k client written in Java, released under the GNU General Public License. It requires Java SE 6.0 or later and provides both Swing and SWT user interfaces.

Development of JMule has been carried out primarily with open-source tools: Eclipse with the AspectJ plugin, running on Ubuntu Linux. The source code is hosted in a public CVS repository on SourceForge.net. The JMule team releases nightly builds, though not on a fixed schedule. Development has been focused on Kad network support and network infrastructure.

![JMule user interface screenshot](/img/docs/jmule_screen5.png)

*JMule main interface*

### Lphant (~2005)

**lphant** was an eD2k client written in C# using the .NET framework. Its original design separated the protocol kernel from the user interface: the kernel was implemented as a standalone .NET DLL object, allowing the interface and core to be developed independently. This architecture was intended to enable remote control, running as a service, custom user interfaces, and third-party integration — allowing any developer to build an eD2k client using any .NET-supported language without re-implementing the protocol.

After this initial phase, lphant underwent significant changes. It became a **closed-source** application and began bundling **adware and spyware**. Since the source is no longer available, there is no way to audit what it installs or does on the system.

> **Warning:** lphant is not recommended. Its closed-source nature and known adware/spyware bundling make it unsafe to use.

### Shareaza (~2002)

**Shareaza** is a multi-protocol peer-to-peer file sharing application for Windows. It supports up to four simultaneous P2P networks: eDonkey2000, Gnutella, BitTorrent, and Gnutella2 (G2), the last of which is Shareaza's native network.

As with any multi-protocol client, none of the supported networks are handled as well as a dedicated single-protocol client. In particular, Shareaza's eD2k support is notably poor.

Starting from version 2.0, Shareaza is released under the GNU GPL and is entirely free of advertisements, spyware, and unwanted third-party bundling.

Shareaza supports only 32-bit Windows platforms.

## Compatibility

All \*Mule clients (aMule, eMule, and their derivatives) are protocol-compatible at the file-transfer level:

- Same file identification: MD4 hash + file size.
- Same chunk size: 9,728,000 bytes.
- Same AICH hash tree structure.
- Same Secure User Identification protocol.
- Same Kademlia implementation.

This means sources from aMule and eMule clients appear together in search results and can upload to each other transparently.

## Client Comparison

| Client | Platform | Open Source | Networks | Status |
|---|---|---|---|---|
| eDonkey2000 | Windows | No | eD2k | Discontinued (2006) |
| lMule | Linux | Yes (GPL) | eD2k | Discontinued (~2003) |
| eMule | Windows | Yes (GPL) | eD2k, Kademlia | Active |
| [aMule](../user-guide/amule-components/amule.md) | Linux, macOS, BSD, Windows | Yes (GPL) | eD2k, Kademlia | Active |
| mlDonkey | Linux, macOS, Windows | Yes (GPL) | eD2k, Kademlia, BitTorrent, + | Active |
| xMule | Linux | Yes (GPL) | eD2k | Discontinued (2004) |
| JMule | Linux, macOS, Windows | Yes (GPL) | eD2k, Kademlia | Inactive |
| Lphant | Windows | Closed (adware) | eD2k | Discontinued |
| Shareaza | Windows (32-bit) | Yes (GPL) | eD2k, Gnutella, BitTorrent, G2 | Inactive |
