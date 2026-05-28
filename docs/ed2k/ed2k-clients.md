---
id: ed2k-clients
title: eD2k Clients
---

The **eD2k network** has been supported by several client applications over the years. aMule is the primary open-source, cross-platform client actively maintained today.

## History of eD2k Clients

### eDonkey2000 (2000–2005)

[**eDonkey2000**](https://en.wikipedia.org/wiki/EDonkey2000) was the pioneering application that created and defined the eD2k protocol. Released on September 6, 2000 by MetaMachine, Inc., it was proprietary software that displayed advertisements to users; disabling ads required purchasing a license.

In September 2005, MetaMachine received a cease-and-desist letter from the RIAA, prompted by the June 2005 US Supreme Court ruling in *MGM Studios, Inc. v. Grokster, Ltd.*, which established that software makers who facilitate copyright infringement can be held liable. The eDonkey2000 website was shut down that same month. On September 12, 2006, MetaMachine settled with the RIAA for **$30 million** and agreed not to distribute the software again. The software received no further updates and is no longer in use. The eD2k protocol it defined, however, lives on in the open-source clients described below.

![eDonkey2000 user interface screenshot](/img/docs/ed2k_clients/EDonkey2000.png)

*eDonkey2000 main interface*

### mlDonkey (2001–present)

[**mlDonkey**](https://en.wikipedia.org/wiki/MLDonkey) was the first (partially) open-source replacement for eDonkey2000, primarily targeting Unix-like operating systems. Development began in late 2001 by Fabrice Le Fessant at INRIA. The core network code was originally kept closed-source at the request of MetaMachine, the official eDonkey2000 publisher; this changed after eMule arrived as a fully open-source client.

Unlike the \*Mule clients, mlDonkey was designed as a server/client system from the outset: it runs as a daemon, without requiring a GUI, though many separate GUIs are available. This architecture initially made it the client of choice for running on routers and similar embedded hardware — until aMule introduced its own daemon mode (`amuled`), making aMule a solid alternative for headless operation.

mlDonkey is written in OCaml and supports multiple P2P protocols simultaneously:

- Overnet and Kad
- BitTorrent (with Mainline DHT)
- DirectConnect
- FastTrack
- HTTP, FTP, and SSH via FileTP
- Gnutella and Gnutella2 *(unmaintained; no longer compiled by default since v2.9.0)*

As with any multi-protocol application, the quality of support varies significantly across these networks, from good to poor.

Since mlDonkey 2.5.30-x, a feature known as **swarming** is supported, making it possible to download a single file simultaneously from the FastTrack, BitTorrent, and eD2k networks at the same time.

mlDonkey is actively maintained on [GitHub](https://github.com/ygrek/mldonkey), where its latest release is available. Note that the original mldonkey.sourceforge.net website was shut down on August 21, 2023.

![mlDonkey user interface screenshot](/img/docs/ed2k_clients/MLDonkey.png)

*mlDonkey main interface*

### eMule (2002–present)

[**eMule**](https://en.wikipedia.org/wiki/EMule) is the most widely known Windows-only open-source eD2k client. Founded on May 13, 2002 by Hendrik Breitkreuz (alias "Merkur"), with its first binary release on August 4, 2002, it introduced several important protocol extensions that aMule also implements: the credits system, the AICH hash tree, Secure User Identification (SUI), and Kademlia support. eMule has a large ecosystem of mods and plugins.

The original development team released version 0.50a on April 7, 2010, after which official development became inactive. The project was later reactivated by the community — the latest community release is **0.70b**. The official website is [emule-project.net](https://www.emule-project.net/); the community-maintained source code is on [GitHub](https://github.com/irwir/eMule).

aMule is protocol-compatible with eMule and can exchange files with eMule clients on both eD2k and Kademlia networks.

![eMule user interface screenshot](/img/docs/ed2k_clients/Emule.png)

*eMule main interface*

### JMule (2002–2011)

[**JMule**](https://en.wikipedia.org/wiki/JMule) is an open-source eD2k client written in Java, released under the GNU General Public License. Development began on September 21, 2002. It requires Java SE 6.0 or later and provides both Swing and SWT user interfaces.

The source code is hosted in [SourceForge](https://sourceforge.net/projects/jmule/). The last stable release was **0.5.8** (January 13, 2010), followed by a final beta **0.5.8 B9** (September 15, 2011). Development has been abandoned since then and the project is likely incompatible with modern Java versions.

![JMule user interface screenshot](/img/docs/ed2k_clients/Jmule.png)

*JMule main interface*

### lMule (2003)

[**lMule**](https://sourceforge.net/projects/lmule/) was a Linux port of the eMule client using the wxWidgets (formerly known as wxWindows) class library. It was created in January 2003 and is the original program, based on eMule, from which xMule subsequently forked in June 2003 — after internal developer conflicts and the hijacking of lMule's official website by one of its contributors.

The lMule project is no longer maintained or supported.

![lMule user interface screenshot](/img/docs/ed2k_clients/Lmule.jpg)

*lMule main interface*

### xMule (2003–2006)

[**xMule**](https://en.wikipedia.org/wiki/XMule) was a Linux-native fork of lMule, created in June 2003 following internal conflicts in the lMule project. aMule was subsequently forked from xMule on August 18, 2003. The last release was **1.13.7 RC1** (September 11, 2006). The xMule project was officially discontinued on January 18, 2009, after aMule had long become the established cross-platform alternative. Its source code remains archived on [SourceForge](https://sourceforge.net/projects/xmule/).

![xMule user interface screenshot](/img/docs/ed2k_clients/Xmule.jpg)

*xMule main interface*

### aMule (2003–present)

**[aMule](../user-guide/amule-components/amule.md)** (*all-platform Mule*) is the cross-platform, open-source eD2k and Kademlia client, available for Windows, macOS, Linux, FreeBSD, and other Unix-like systems. It was originally forked from xMule on August 18, 2003, and shares protocol compatibility with eMule.

Key features that distinguish aMule (see the [full feature list](../index.md#features)):
- Full eD2k + Kademlia dual-network support.
- Daemon mode ([`amuled`](../user-guide/amule-components/amuled.md)) for headless/server operation.
- Web interface ([`amuleweb`](../user-guide/amule-components/amuleweb.md)), remote GUI ([`amulegui`](../user-guide/amule-components/amulegui.md)), and command-line interface ([`amulecmd`](../user-guide/amule-components/amulecmd.md)).
- Cross-platform: Windows (via MinGW), macOS, Linux, FreeBSD.

### Lphant (~2005–2009)

[**Lphant**](https://en.wikipedia.org/wiki/Lphant) was an eD2k client written in C# using the .NET framework. Its original design separated the protocol kernel from the user interface: the kernel was implemented as a standalone .NET DLL object, allowing the interface and core to be developed independently. This architecture was intended to enable remote control, running as a service, custom user interfaces, and third-party integration — allowing any developer to build an eD2k client using any .NET-supported language without re-implementing the protocol.

The last legitimate release was **version 3.51** on March 3, 2009. Just days later, on March 9, 2009, Discordia Ltd (affiliated with iMesh) acquired the lphant.com domain. The application then prompted users to "upgrade" to a replacement that removed all networking capabilities and bundled **adware and spyware**. The project was discontinued in 2009. Notably, Discordia Ltd is the same company that hijacked the shareaza.com domain.

> **Warning:** lphant is not recommended. Its closed-source nature and known adware/spyware bundling make it unsafe to use.

![Lphant user interface screenshot](/img/docs/ed2k_clients/Lphant.jpg)

*Lphant main interface*

### Shareaza (2002–2017)

[**Shareaza**](https://en.wikipedia.org/wiki/Shareaza) is a multi-protocol peer-to-peer file sharing application for Windows, founded in mid-2002 by Michael Stokes. It supports up to four simultaneous P2P networks: eDonkey2000, Gnutella, BitTorrent, and Gnutella2 (G2), the last of which is Shareaza's native network. The source code was released under the GNU GPL on June 1, 2004.

As with any multi-protocol client, none of the supported networks are handled as well as a dedicated single-protocol client. In particular, Shareaza's eD2k support is notably poor.

> **Warning:** The shareaza.com domain was hijacked on December 19, 2007 by Discordia Ltd (the same company behind lphant's adware rebranding), and has since been used to distribute fake "Shareaza" versions unrelated to the legitimate project. Do not download from shareaza.com. The legitimate project is available on [SourceForge](https://sourceforge.net/projects/shareaza/).

The legitimate Shareaza is maintained by volunteers. The latest release is **2.7.10.2** (September 18, 2017).

![Shareaza user interface screenshot](/img/docs/ed2k_clients/Shareaza.jpg)

*Shareaza main interface*

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
| [eDonkey2000](https://en.wikipedia.org/wiki/EDonkey2000) | Windows | No | eD2k | Discontinued (2005) |
| [mlDonkey](https://en.wikipedia.org/wiki/MLDonkey) | Linux, macOS, Windows | Yes (GPL) | eD2k, Kademlia, BitTorrent, + | Active |
| [eMule](https://en.wikipedia.org/wiki/EMule) | Windows | Yes (GPL) | eD2k, Kademlia | Community-maintained |
| [JMule](https://en.wikipedia.org/wiki/JMule) | Linux, macOS, Windows | Yes (GPL) | eD2k, Kademlia | Abandoned (2011) |
| lMule | Linux | Yes (GPL) | eD2k | Discontinued (2003) |
| [xMule](https://en.wikipedia.org/wiki/XMule) | Linux | Yes (GPL) | eD2k | Discontinued (2006) |
| [aMule](../user-guide/amule-components/amule.md) | Windows, macOS, Linux, BSD | Yes (GPL) | eD2k, Kademlia | Active |
| [Lphant](https://en.wikipedia.org/wiki/Lphant) | Windows | Closed (adware) | eD2k | Discontinued (2009) |
| [Shareaza](https://en.wikipedia.org/wiki/Shareaza) | Windows | Yes (GPL) | eD2k, Gnutella, BitTorrent, G2 | Abandoned (2017) |
