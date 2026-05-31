---
id: other-networks
title: Other P2P Networks
---

aMule exclusively supports two peer-to-peer networks: **[eD2k](ed2k/index.md)** and **[Kademlia](kademlia.md)**. This page describes other P2P protocols and networks that coexisted with the eD2k ecosystem, most of which are either defunct or only supported by third-party multi-network clients.

## Peer-to-Peer Networking

**[Peer-to-Peer](https://en.wikipedia.org/wiki/Peer-to-peer_file_sharing)** (also known as P2P or Peer-2-Peer) refers to any network that does not have fixed clients and servers, but a number of peer nodes that function as both clients and servers to the other nodes on the network. This model of network arrangement is contrasted with the client-server model. Any node is able to initiate or complete any supported transaction. Peer nodes may differ in local configuration, processing speed, network bandwidth, and storage quantity. Popular examples of P2P are file-sharing networks.

## Overnet

**[Overnet](https://en.wikipedia.org/wiki/Overnet)** was a file-sharing program developed by **MetaMachine** — the same company behind eDonkey2000. It had no servers at all: a complete peer-to-peer network where all clients connected directly to each other. Just like the eD2k network, Overnet knew when files were different even if they had the same file size and name, ensuring that unique files were properly presented and that when several identical files were found it could download from those independent sources at the same time. This also allowed you to create links to files.

However, Overnet was a **closed protocol** — its specifications were unknown and its designers were not willing to publish them.

In 2004, MetaMachine announced they would stop Overnet development to focus on eDonkey2000. The Overnet service was shut down on **September 28, 2005**, following a cease-and-desist notice from the RIAA. There have been no further updates and Overnet is no longer in use.

### Overnet vs. Kademlia

Both Overnet and aMule's [Kademlia](kademlia.md) network are serverless networks based on the same Kademlia DHT algorithm, but they are **incompatible**:

- **Overnet** was the serverless evolution of the original eDonkey2000 software. Its development ended and the network is no longer operational.
- **Kademlia** in aMule/eMule is an independent, fully open-source implementation, still actively used.

Same philosophy (XOR-metric distributed hash table), different wire protocol.

## BitTorrent

**[BitTorrent](https://en.wikipedia.org/wiki/BitTorrent)** is a peer-to-peer file-sharing protocol created by **Bram Cohen** and first released on July 2, 2001. Files are split into pieces, and peers simultaneously upload and download those pieces from each other, distributing the transfer load across all participants.

Key milestones in its evolution:

- **2005**: Distributed Hash Table (DHT) support added, enabling trackerless operation.
- **2006**: Peer exchange (PEX) introduced.
- **2017**: BitTorrent v2 specification released, replacing SHA-1 with SHA-256 and introducing Merkle tree hashing for per-file integrity verification.

BitTorrent remains one of the most widely used file-sharing protocols; as of 2019 it accounted for approximately 27% of upstream internet traffic worldwide.

## FastTrack

**[FastTrack](https://en.wikipedia.org/wiki/FastTrack_(protocol))** was a decentralized peer-to-peer network. Launched in March 2001, it used **super-peers** (supernodes) to create temporary servers: any client powerful enough could become a supernode, handling search indexing for regular peers. This hybrid architecture allowed the network to scale without requiring dedicated infrastructure.

FastTrack was used by several file-sharing applications, including **Kazaa**, **Grokster**, **iMesh**, and **Morpheus**. At its peak in 2003 it had approximately 2.4 million concurrent users. The network is now **defunct**.

### Kazaa

**[Kazaa](https://en.wikipedia.org/wiki/Kazaa)** was a file-sharing program that used the FastTrack protocol, allowing users to search and download audio, video, images, documents, and software files.

Kazaa had persistent security and privacy concerns:

- **Kazaa Media Desktop** bundled various adware and spyware that could turn the user's computer into a remotely controlled node.
- **Kazaa Plus** was a paid alternative (approximately $30) that may also have included spyware.
- **Kazaa Lite** was an unofficial spyware-free variant that was declared illegal by Sharman Networks, the Kazaa developers.

Kazaa Media Desktop was available for **Windows** only. The last official release was version 3.2.7 on November 26, 2006, and the service ceased operations by August 2012.

## Gnutella

**[Gnutella](https://en.wikipedia.org/wiki/Gnutella)** is a peer-to-peer file-sharing protocol created by **Nullsoft** and released on March 14, 2000. AOL (Nullsoft's owner at the time) pulled it within hours of release due to legal concerns, but the community had already reverse-engineered the protocol and continued its development independently.

Gnutella peaked at about 40% of the file-sharing market in late 2007, but contracted sharply after the LimeWire shutdown in 2010. The network is diminished but still active; [gtk-gnutella](https://www.gtk-gnutella.nl/) continues to receive updates. More information about the protocol can be found at the [Gnutella Developer Forum](https://rfc-gnutella.sourceforge.net/).

### Gnutella2 (G2)

**[Gnutella2](https://en.wikipedia.org/wiki/Gnutella2)** (also known as G2) is an evolution of the Gnutella protocol introduced in November 2002 by **Michael Stokes**. It redesigned the network topology using a two-tier Leaf/Hub model and replaced query flooding with a random-walk search mechanism to improve scalability. Shareaza remains the dominant G2 client, holding approximately 93% of the network share.

## DirectConnect

**[DirectConnect](https://en.wikipedia.org/wiki/Direct_Connect_(protocol))** was created by **Jon Hess**, who founded NeoModus in November 1999 while still in high school. It is a **centralized**, hub-based network.

The original NeoModus Direct Connect (NMDC) protocol was never officially published, but the community fully reverse-engineered it. The modern successor, **ADC** (Advanced Direct Connect), is an openly documented protocol. **[DC++](https://en.wikipedia.org/wiki/DC%2B%2B)**, the dominant open-source client, holds approximately 90% of the DC community's market share.

Key technical limitations of the original DirectConnect (NMDC) protocol compared to eD2k:

- No multi-source swarming (cannot download a single file from multiple peers simultaneously)
- No inter-hub connectivity (each hub is an isolated island)
- Closed original protocol (NMDC), though ADC is open

## Napster

**[Napster](https://en.wikipedia.org/wiki/Napster)** was developed by **Shawn Fanning** and **Sean Parker** and launched on June 1, 1999, originally to allow people to share music files over university networks. The program became a cultural phenomenon and helped establish MP3 as a standard digital music format. At its peak in February 2001 it had approximately 80 million registered users.

Napster's central server was shut down by court order in July 2001 due to copyrighted material being shared on its network. The company filed for Chapter 11 bankruptcy in June 2002. After that, the brand changed hands multiple times.

Napster's concept inspired a whole generation of file-sharing applications.

### OpenNapster

**[OpenNap](https://en.wikipedia.org/wiki/OpenNap)** (also known as **OpenNapster**) is an open-source effort, developed by **Drscholl**, to create an open and free version of the proprietary Napster server. OpenNap extends the Napster protocol to allow sharing of any kind of files (not only music files) and adds the ability to link servers together. Its last stable release was 0.44 Beta (2001). The network peaked at around 250,000 users in February 2002, then declined rapidly after RIAA cease-and-desist notices; it is largely defunct today, with WinMX being the last known active client.

## AudioGalaxy

**[AudioGalaxy](https://en.wikipedia.org/wiki/Audiogalaxy)** was a file-sharing system that indexed MP3 files. Founded by **Michael Merhej** in 1998, it featured a web-based search engine, always-on searching for requested files, auto-resume, and low system impact. Although AudioGalaxy's primary purpose was to facilitate sharing of music, a broader community grew around it, including chat-enabled groups and per-artist message boards.

AudioGalaxy went through three distinct phases:

1. **P2P music sharing (1998–2002)**: The original service; sued by the RIAA, it settled by filtering copyrighted content and eventually shut down the P2P system entirely.
2. **Music promotion for Rhapsody (2002–2010)**: Operated as a promotional channel for Rhapsody subscriptions.
3. **Personal music placeshifting (2010–2012)**: Allowed users to stream their own music library remotely.

AudioGalaxy's client originally supported only 32-bit Windows platforms and its protocol was closed. AudioGalaxy was acquired by **Dropbox** in 2012 and officially closed on **January 31, 2013**.

## SoulSeek

**[SoulSeek](https://en.wikipedia.org/wiki/Soulseek)** is a file-sharing network primarily focused on music, developed by **Nir Arbel** and launched on April 8, 2001. It is advertisement-free, spyware-free, and funded entirely by donations. Both the protocol and the official client source code are closed.

The official client history has two generations:

- **SoulSeek v.157** (legacy): Windows-only client; development ceased in 2008.
- **SoulseekQt**: The current official client, rewritten in Qt. Supports **Windows, macOS, and Linux**. Latest build: 2024.02.01.

**[Nicotine+](https://nicotine-plus.org/)** is a separate, actively maintained open-source client for the SoulSeek network, supporting Linux, BSD, Solaris, Windows, and macOS.

## Network Overview

The following table summarises the P2P networks described on this page:

| Network | Architecture | Protocol | Status |
|---|---|---|---|
| [Overnet](https://en.wikipedia.org/wiki/Overnet) | Serverless DHT (XOR metric) | Closed | Defunct (2005) |
| [BitTorrent](https://en.wikipedia.org/wiki/BitTorrent) | Tracker-based / DHT hybrid | Open | Active |
| [FastTrack](https://en.wikipedia.org/wiki/FastTrack_(protocol)) | Hybrid (super-peers) | Closed | Defunct (~2012) |
| [Gnutella](https://en.wikipedia.org/wiki/Gnutella) | Fully decentralised | Open | Diminished, active |
| [Gnutella2 (G2)](https://en.wikipedia.org/wiki/Gnutella2) | Hybrid decentralised | Open | Active |
| [DirectConnect](https://en.wikipedia.org/wiki/Direct_Connect_(protocol)) | Centralised (hub-based) | Closed (NMDC) / Open (ADC) | Active (DC++) |
| [Napster](https://en.wikipedia.org/wiki/Napster) | Centralised (server index) | Closed | Defunct (2001→2026) |
| [OpenNap](https://en.wikipedia.org/wiki/OpenNap) | Centralised (open server) | Open | Inactive |
| [AudioGalaxy](https://en.wikipedia.org/wiki/Audiogalaxy) | Centralised | Closed | Defunct (2013) |
| [SoulSeek](https://en.wikipedia.org/wiki/Soulseek) | Centralised | Closed | Active (cross-platform) |
