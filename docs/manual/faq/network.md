---
id: network
title: Network & Connectivity FAQ
---

# Network & Connectivity FAQ

Frequently asked questions about the eD2k and Kademlia networks, ports, connection quality, protocol overhead, and browser configuration for `ed2k://` links.

## eD2k and Kademlia

For a complete overview of both networks and their architecture, see:

- [eD2k Network](../../p2p-networks/ed2k/index.md) — architecture, High ID / Low ID, ports, limitations, credits and scoring
- [Kademlia Network](../../p2p-networks/kademlia.md) — serverless DHT, bootstrapping, firewalled status
- [Concepts & Glossary](../../p2p-networks/concepts.md) — definitions of all technical terms (chunk, hash, credits, slots, queue…)

### Why do the same files appear as different files in search results, even with the same name?

Because file identity is determined by the **hash and size, not the name**. Two files with identical names but different content have different hashes and appear as separate files. Two files with different names but identical content and size are treated as the same file. See [eD2k Links — Why the filename is irrelevant](../../p2p-networks/ed2k/links.md#why-the-filename-is-irrelevant-to-identity).

## Ports

For a complete description of all ports used by aMule, see [eD2k Network — Ports](../../p2p-networks/ed2k/index.md#ports).

aMule works even without any ports open, but you will receive a [Low ID](../../p2p-networks/high-id-low-id.md). For optimal operation ([High ID](../../p2p-networks/high-id-low-id.md)), open the following ports for **incoming** connections:

| Port | Protocol | Purpose |
|---|---|---|
| `4662` | TCP | Client-to-client transfers (required for High ID). Configurable in Preferences → Connection. |
| `4665` | UDP | Global server searches and source queries. Always `TCP_PORT + 3`. |
| `4672` | UDP | Extended eMule protocol, queue rating, Kademlia. |

### Why does Kademlia still say it is "firewalled"?

See [Kademlia — Resolving Firewalled Status](../../p2p-networks/kademlia.md#resolving-firewalled-status).

## Searching and Sources

### In the search window, what filter corresponds to which file type?

The filters are based on **filename extensions**, not actual file content:

| Filter | Extensions |
|---|---|
| Archive | `.ace` `.arj` `.rar` `.tar.bz2` `.tar.gz` `.zip` `.Z` |
| Audio | `.aac` `.ape` `.au` `.mp2` `.mp3` `.mp4` `.mpc` `.ogg` `.wav` `.wma` |
| CDImage | `.bin` `.ccd` `.cue` `.img` `.iso` `.nrg` `.sub` |
| Picture | `.bmp` `.gif` `.jpeg` `.jpg` `.png` `.tif` |
| Program | `.com` `.exe` |
| Video | `.avi` `.divx` `.mov` `.mpeg` `.mpg` `.ogg` `.ram` `.rm` `.vivo` `.vob` |

Note: a file named `Birthday.zip` will appear under Archive, not Video — regardless of actual content.

### What is a source?

A **source** is a client sharing a chunk of a file you have in your download queue that you have not yet completed. The more sources, the more download opportunities exist.

When you have a [Low ID](../../p2p-networks/high-id-low-id.md):
- **Sources**: all clients sharing a chunk or file you still need.
- **Available sources**: only [High ID](../../p2p-networks/high-id-low-id.md) clients you can actually connect to.

## Credits, Ratings, and Scoring

For a full explanation of the upload queue priority system, see [eD2k Network — Credits and Scoring](../../p2p-networks/ed2k/index.md#credits-and-scoring) and [Concepts & Glossary — Credits](../../p2p-networks/concepts.md#credits).

## Network Speed and Protocol Overhead

### Network speed: what you should know before asking questions

This section explains the technical factors behind network speed while aMule is running. For simpler troubleshooting advice, see [aMule Is Slow](/docs/manual/troubleshooting/slow-speeds).

### How fast is my network, really?

Network speed is measured in **bits per second (bps)**. To convert: `bytes/s = bps / 8`. A provider offering "ADSL 256/128" means 256,000/128,000 bps, which is **32,000/16,000 bytes per second**.

Networking uses **decimal** prefixes, not binary ones:

| Prefix | In computers (binary) | In networking (decimal) | Error |
|---|---|---|---|
| k (kilo) | 2¹⁰ = 1,024 | 10³ = 1,000 | ~2% |
| M (mega) | 2²⁰ = 1,048,576 | 10⁶ = 1,000,000 | ~5% |
| G (giga) | 2³⁰ = 1,073,741,824 | 10⁹ = 1,000,000,000 | ~7% |
| T (tera) | 2⁴⁰ = 1,099,511,627,776 | 10¹² = 1,000,000,000,000 | ~9% |

Your ISP quotes speeds in decimal units. This alone accounts for a ~5% difference between the advertised speed and what applications report.

### Protocol overhead

Every piece of control data aMule sends — source requests, search queries, queue negotiations — is **overhead**: data transmitted but not directly part of your downloads. aMule's reported overhead only counts data sent to the OS network stack; the OS adds TCP/IP headers on top.

For IPv4 TCP/IP: each packet carries a minimum of 20 bytes IPv4 header + 20 bytes TCP header. TCP connection establishment (SYN / SYN+ACK / ACK) requires at least 3 packets per connection. aMule opens approximately 100 new TCP connections every 5 seconds (configurable in Preferences → Advanced → Max new connections / 5 secs).

### ACK bottleneck

TCP requires the receiver to send **ACK** packets back for every segment received. If aMule saturates your uplink with uploads and connection overhead, outgoing ACKs for your **downloads** may be delayed or dropped — causing the remote sender to slow down, which directly reduces your download speed.

**Never use more than 80% of your upload capacity for aMule.** Set realistic rate limits in **Preferences → Connection → Bandwidth Limits**.

For ADSL: never run uplink or downlink at 100%. A good target is 90–95%, accounting for all overhead. See [aMule Is Slow](/docs/manual/troubleshooting/slow-speeds) for specific values.

### Router / SOHO devices under P2P load

Cheap SOHO routers can struggle with the large number of simultaneous TCP connections and UDP flows generated by P2P traffic. NAT state tables may fill up, causing dropped connections or router instability.

**Recommendations:**
- Choose a router rated for P2P/heavy-NAT workloads (routers with VPN, built-in downloader, or USB storage typically have stronger CPUs and more RAM).
- Always configure port forwarding for ports 4662 (TCP), 4665 (UDP), 4672 (UDP), or enable UPnP.
- Prefer ISP connections that assign IP via DHCP over plain Ethernet rather than PPPoE/PPTP.

### Multiple internet connections

**Link redundancy:** aMule must be restarted when links switch so it binds to the new IP and receives a new eD2k ID — unless the switchover is handled transparently at the NAT router.

**Load balancing:** aMule binds to all interfaces (`0.0.0.0`) but can only advertise one IP as its eD2k ID. Running across two simultaneously active ISP links is unreliable; the only reliable solution is to pin aMule's traffic to one interface.

## Browser Configuration for ed2k:// Links

See [eD2k Links — Browser Configuration](../../p2p-networks/ed2k/links.md#browser-configuration) for instructions on configuring Firefox, Opera, Konqueror, and other browsers to handle `ed2k://` URIs.
