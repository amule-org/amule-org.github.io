---
id: ed2k-clients
title: eD2k Clients
---

The **eD2k network** has been supported by several client applications over the years. aMule is the primary open-source, cross-platform client actively maintained today.

## History of eD2k Clients

### eDonkey2000 (2000–2006)

**eDonkey2000** was the pioneering application that created and defined the eD2k protocol. Released around 2000, it was proprietary software that displayed advertisements to users; disabling ads required purchasing a license.

The eDonkey2000 website was shut down in 2006 following a RIAA lawsuit. The software received no further updates and is no longer in use. The eD2k protocol it defined, however, lives on in the open-source clients described below.

### mlDonkey (2002–present)

**mlDonkey** was the first open-source replacement for eDonkey2000, primarily targeting Unix-like operating systems. It is written in OCaml and supports multiple P2P protocols simultaneously (eD2k, Kademlia, BitTorrent, and others). It uses a daemon+client architecture similar to aMule.

### eMule (2002–present)

**eMule** is the most widely known Windows-only open-source eD2k client. It introduced several important protocol extensions that aMule also implements: the credits system, the AICH hash tree, Secure User Identification (SUI), and Kademlia support. eMule has a large ecosystem of mods and plugins.

aMule is protocol-compatible with eMule and can exchange files with eMule clients on both eD2k and Kademlia networks.

### xMule (2003–2004)

**xMule** was an early Linux-native fork of eMule that predated aMule. The xMule project was discontinued after aMule became the established cross-platform alternative.

### aMule (2003–present)

**aMule** (*all-platform Mule*) is the cross-platform, open-source eD2k and Kademlia client, available for Linux, macOS, FreeBSD, and other Unix-like systems. It was originally forked from xMule and shares protocol compatibility with eMule.

Key features that distinguish aMule:
- Full eD2k + Kademlia dual-network support.
- Daemon mode (`amuled`) for headless/server operation.
- Web interface (`AMuleWeb`), remote GUI (`AMuleGUI`), and command-line interface (`AMuleCMD`).
- Cross-platform: Linux, macOS, FreeBSD, Windows (via MinGW).

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
| eMule | Windows | Yes (GPL) | eD2k, Kademlia | Active |
| aMule | Linux, macOS, BSD, Windows | Yes (GPL) | eD2k, Kademlia | Active |
| mlDonkey | Linux, macOS, Windows | Yes (GPL) | eD2k, Kademlia, BitTorrent, + | Active |
| xMule | Linux | Yes (GPL) | eD2k | Discontinued (2004) |
