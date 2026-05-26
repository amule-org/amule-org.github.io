---
id: other-networks
title: Other P2P Networks
---

aMule exclusively supports two peer-to-peer networks: **eD2k** and **[Kademlia](kademlia.md)**. This page describes other P2P protocols and networks that coexisted with the eD2k ecosystem, most of which are either defunct or only supported by third-party multi-network clients.

## Peer-to-Peer Networking

**Peer-to-Peer** (also known as P2P or Peer-2-Peer) refers to any network that does not have fixed clients and servers, but a number of peer nodes that function as both clients and servers to the other nodes on the network. This model of network arrangement is contrasted with the client-server model. Any node is able to initiate or complete any supported transaction. Peer nodes may differ in local configuration, processing speed, network bandwidth, and storage quantity. Popular examples of P2P are file-sharing networks.

## Overnet

**Overnet** was a file-sharing program that did not have servers at all. It was a complete peer-to-peer network where all clients connected directly to each other. Just like the eD2k network, Overnet knew when files were different even if they had the same file size and name, ensuring that unique files were properly presented and that when several identical files were found it could download from those independent sources at the same time. This also allowed you to create links to files.

However, Overnet was a **closed protocol** — its specifications were unknown and its designers were not willing to publish them.

The Overnet website was shut down in 2006 after a RIAA lawsuit and has shown a RIAA banner since then. There have been no further updates and Overnet is no longer in use.

### Overnet vs. Kademlia

Both Overnet and aMule's [Kademlia](kademlia.md) network are serverless networks based on the same Kademlia DHT algorithm, but they are **incompatible**:

- **Overnet** was the serverless evolution of the original eDonkey2000 software. Its development ended and the network is no longer operational.
- **Kademlia** in aMule/eMule is an independent, fully open-source implementation, still actively used.

Same philosophy (XOR-metric distributed hash table), different wire protocol.

## BitTorrent

**BitTorrent** is a peer-to-peer file-sharing protocol. More information about the BitTorrent protocol can be found at the [official BitTorrent website](https://www.bittorrent.org/).

## FastTrack

**FastTrack** is a decentralized peer-to-peer network. It uses **super-peers** to create temporary servers: any client may become a super-peer if its connection and computer are powerful enough to provide a comfortable server speed. This hybrid architecture allows the network to scale without requiring dedicated infrastructure.

### Kazaa

**Kazaa** was a file-sharing program that used the FastTrack protocol, allowing users to search and download audio, video, images, documents, and software files.

Kazaa had persistent security and privacy concerns:

- **Kazaa Media Desktop** bundled various spyware software that could turn the user's computer into a remotely controlled node.
- **Kazaa Plus** was a paid alternative (approximately $30) that may also have included spyware.
- **Kazaa Lite** was an unofficial spyware-free variant that was declared illegal by Sharman Networks, the Kazaa developers.

Kazaa Media Desktop was only available for Windows 9x/Me/2000/XP platforms. The official homepage was located at `http://www.kazaa.com/`.

## Gnutella

**Gnutella** is a peer-to-peer file-sharing protocol. More information about the Gnutella protocol can be found at the [Gnutella Developer Forum](https://rfc-gnutella.sourceforge.net/).

### Gnutella2 (G2)

**Gnutella2** (also known as G2) is an evolution of the Gnutella protocol. More information about the Gnutella2 protocol can be found at the [Gnutella2 protocol specification](https://www.shareaza.com/mediawiki/index.php?title=Gnutella2).

## DirectConnect

**DirectConnect**, developed by Neo Modus, is one of the oldest file-sharing protocols that was still active at the time of the original aMule wiki. It is a **centralized** network.

Key technical limitations of the DirectConnect protocol compared to eD2k:

- No multi-source swarming (cannot download a single file from multiple peers simultaneously)
- No hashing system for file integrity verification
- No inter-server connectivity
- Closed protocol

## Napster

**Napster** was developed in May 1999 by Shawn Fanning to allow people to share music files over his university's network. The program became a cultural phenomenon and helped establish MP3 as a standard digital music format.

Napster came under legal pressure when its central server was shut down by court order due to copyrighted material being shared on its network. The program was subsequently purchased by Bertelsmann AG (BMG) and underwent a new commercial strategy.

Napster's concept inspired a whole generation of file-sharing applications.

### OpenNapster

**OpenNapster** (also known as **OpenNap**) is an open-source effort to create an open and free version of the proprietary Napster server. OpenNapster extends the Napster protocol to allow sharing of any kind of files (not only music files) and adds the ability to link servers together.

## AudioGalaxy

**AudioGalaxy** was a file-sharing system that indexed MP3 files. Founded by Michael Merhej, it featured a web-based search engine, always-on searching for requested files, auto-resume, and low system impact. Although AudioGalaxy's primary purpose was to facilitate sharing of music, a broader community grew around it. AudioGalaxy was notable for its strong community features, including chat-enabled groups and per-artist message boards.

AudioGalaxy's client only supported 32-bit Windows platforms and its protocol was closed. AudioGalaxy was sued by the recording industry and had to cease its service.

## SoulSeek

**SoulSeek** is an advertisement-free, spyware-free file-sharing application primarily focused on music.

Key characteristics:

- No advertisements or spyware
- Available only for 32-bit Windows platforms
- Both the protocol and source code are closed

## Network Overview

The following table summarises the P2P networks described on this page:

| Network | Architecture | Protocol | Status |
|---|---|---|---|
| Overnet | Serverless DHT (XOR metric) | Closed | Defunct (2006) |
| BitTorrent | Tracker-based / DHT hybrid | Open | Active |
| FastTrack | Hybrid (super-peers) | Closed | Defunct |
| Gnutella | Fully decentralised | Open | Active |
| Gnutella2 (G2) | Hybrid decentralised | Open | Active |
| DirectConnect | Centralised (hub-based) | Closed | Active (DC++) |
| Napster | Centralised (server index) | Closed | Defunct (2001) |
| OpenNapster | Centralised (open server) | Open | Inactive |
| AudioGalaxy | Centralised | Closed | Defunct (~2002) |
| SoulSeek | Centralised | Closed | Active |
