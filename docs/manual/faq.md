---
id: faq
title: FAQ
---

Frequently asked questions about aMule, covering general usage, the eD2k and Kademlia networks, and running aMule remotely. Use the table of contents to jump to a topic.

## General

### About aMule

#### What is aMule?

aMule is a multi-platform client for the [eD2k file sharing network](../p2p-networks/ed2k/index.md) (it also supports the [Kademlia network](../p2p-networks/kademlia.md)), based on the Windows client eMule. aMule started in August 2003 as a fork of xMule, which is itself a fork of lMule. aMule supports Windows, macOS, Linux, FreeBSD, and OpenBSD on both 32-bit and 64-bit computers.

aMule is designed to be as user-friendly and feature-rich as eMule, and to remain faithful to the look and feel of eMule so that users familiar with either client can switch between the two easily. Since aMule is based on the eMule codebase, new features in eMule tend to find their way into aMule shortly after their inclusion in eMule. If you have just installed it, start with the [Quick Start guide](../quickstart-guide.md).

#### Which distribution or OS is recommended for running aMule?

aMule runs on Windows, macOS, Linux, FreeBSD, and OpenBSD. Any modern Linux distribution with up-to-date packages works well. The best choice is whichever OS you are already comfortable maintaining. See [Installation](installation/index.md) for the available packages and methods on each platform.

### Getting started

#### I just installed aMule for the first time. How do I set it up?

The [Quick Start guide](../quickstart-guide.md) walks through first-run setup step by step: nickname and language, bandwidth limits, Temp/Incoming directories, choosing what to share, and connecting and searching. For optimal download speeds, also read [What are the best settings for a nice download rate?](#what-are-the-best-settings-i-can-set-to-have-a-nice-download-rate)

For more help, ask on [GitHub Discussions](https://github.com/amule-org/amule/discussions) — the project's community forum and the best place to get answers. The legacy [aMule forums](https://forum.amule.org) and the `#amule` channel on `irc.libera.chat` are still around, but most activity has moved to GitHub.

### Interface: colors, icons and numbers

#### What do those colors in the progress bar mean?

These colours follow the eMule convention. See also [GUI → File Details](interfaces/gui/file-details.md) for the transfer view, and [Searches → Result Row Colours](interfaces/gui/searches.md#result-row-colours) for the search-results colours.

##### Downloading transfers list

| Color | Meaning |
|---|---|
| Red | No sources for this chunk in the current session |
| Blue (lighter → darker) | At least one source available; darker = more sources |
| Yellow | Currently being downloaded |
| Black | Already downloaded and verified |
| Green (full bar) | Download complete and verified; file is in your Incoming folder |

##### Expanded transfers list (double-click a transfer)

| Color | Meaning |
|---|---|
| Black | A chunk that source has and you don't |
| White | A chunk that source doesn't have |
| Green | A chunk both you and that source have |
| Yellow | A chunk that source is currently uploading to you |

##### Uploading transfers list

| Color | Meaning |
|---|---|
| Black | Chunks that client has completed and verified |
| Grey | Chunks that client doesn't have |

Note: not all clients report which parts they have completed, so some may show no bar at all.

##### Search results window

| Color | Meaning |
|---|---|
| Black | Only one client has this file |
| Blue (lighter → darker) | Two or more clients; darker = more clients |
| Red | File is already in your download queue |
| Green | You already have this file completely downloaded and shared |

#### What are all these icons?

See the "Icons and what they signify" section in the [Getting Started guide](../quickstart-guide.md).

#### What do those numbers in brackets in the sources column of the search window mean?

Those are the clients known to have the **complete file**. Even if the number in brackets is 0, it does not mean that no one has the complete file — it only means that no client has marked the shared file as "completed" (many clients do not do so). It is a rough indicator, not a definitive count. See [Searches](interfaces/gui/searches.md) and [What is a source?](#what-is-a-source).

#### What do all those numbers in the sources column in the Downloads window mean?

The format is `XX/YY + ZZ (WW)` where:

| Value | Meaning |
|---|---|
| `XX` | Number of **available** sources (sources you can currently download from) |
| `YY` | Total number of sources found |
| `ZZ` | Number of "Asked For Another File" (A4AF) sources |
| `WW` | Number of sources from which you are currently downloading a chunk |

See [What is A4AF?](#what-is-a4af) for the meaning of A4AF sources, and [GUI → File Details](interfaces/gui/file-details.md) for the full transfer view.

#### What do all those numbers in the priority column in the extended transfers window mean?

That is the **queue position** you have on that specific source for that file. Not all clients provide this information.

The number in brackets is how many positions you have **moved** in that client's upload queue:

- **Negative (blue)**: positions you have gained since being added.
- **Positive (red)**: positions you have lost since being added.

See [What do the "QR: xxxx" numbers mean?](#what-do-the-qr-xxxx-numbers-mean-that-i-see-when-i-look-at-my-sources) and [Concepts & Glossary — Queue Rank](../p2p-networks/concepts.md#queue-rank-qr).

#### Why are there two transfer rates in the uploading transfer list?

When you are uploading a file to a client, the rate is shown as a single value in KBps. However, if **that same client is also uploading to you** simultaneously, the format changes to `XX/YY`:

| Value | Meaning |
|---|---|
| `XX` | Speed at which you are uploading **to** that client |
| `YY` | Speed at which that client is uploading **to** you |

This is especially useful for rare files: if you see a client uploading one of your rare files to you, you can assign that client a [**friend slot**](#what-is-a-friend-slot) to upload to them faster, accumulate more credits on them, and consequently download faster from them.

#### What do the "QR: xxxx" numbers mean that I see when I look at my sources?

**QR** stands for **Queue Rank** — your current position in that source's upload queue. A lower value is better. If a source is an eMule client and there is no QR number, its queue is likely full and cannot accept more clients.

See [Concepts & Glossary — Queue Rank](../p2p-networks/concepts.md#queue-rank-qr) and [What is a source?](#what-is-a-source).

### Downloads and transfers

#### What is A4AF?

**A4AF** stands for **Asked For Another File**. It is a source-optimization mechanism.

When you download a file, aMule finds a list of clients sharing it. Some of those clients may also be sharing another file you are downloading, placing them in two separate download queues simultaneously. Since you cannot download two chunks from the same client at the same time, A4AF avoids this waste:

- Setting A4AF on a download tells aMule to find any source in that file's queue that is also in another file's queue and remove it from the other queue, concentrating sources on the current download.
- You can also set A4AF in reverse — donating sources from the current download to another — which is useful for lower-priority files in a series.

A source is only moved to another file when that other file is **active** — not stopped or paused, still missing parts the source can provide, and ready to download. A source that was just swapped is also held for a short period before it can be swapped again, to avoid bouncing it back and forth between files.

See [What is a source?](#what-is-a-source) and [eD2k Network — Credits and Scoring](../p2p-networks/ed2k/index.md#credits-and-scoring).

#### What is the difference between Transferred and Completed in the Downloads window?

- **Transferred**: the total amount of raw data received for the file. Data arrives in compressed form.
- **Completed**: the amount of useful, decompressed file data extracted from the received data — i.e., actual file content excluding protocol headers and compression overhead.

It is normal and expected for Transferred to be **smaller** than Completed. See [GUI → File Details → Transfer](interfaces/gui/file-details.md#transfer) for where these values are shown.

#### What is the difference between pausing and stopping a transfer?

| Action | Effect |
|---|---|
| **Pause** | All connections for that transfer are dropped, but the source list is kept. When resumed, aMule reconnects to those known sources. |
| **Stop** | The entire source list is discarded. When resumed, aMule starts searching for sources from scratch. |

See [What is a source?](#what-is-a-source) for what the source list contains.

#### Why can't I preview a file?

aMule allows preview of **video and audio files only**. Two conditions must be met:

1. The file has a recognized video or audio extension (video: `.avi`, `.mpg`, `.mpeg`, `.divx`, `.mov`, `.mkv`, …; audio: `.mp3`, `.ogg`, `.flac`, `.wav`, …). See [Searches → File Type](interfaces/gui/searches.md#file-type) for the full list of recognized extensions.
2. At least the **first 256 KB** of the file has been downloaded.

If aMule refuses to preview a file that you believe is previewable, navigate to your [Temp directory](configuration/directories.md#temporary-directory) manually and open the `NNN.part` file with a media player directly.

#### aMule slows down my computer whenever a download completes. Is this normal?

Yes. When a download completes, aMule performs a **full file hash verification**: it hashes all downloaded chunks and verifies them against the expected values. Even though chunk integrity is checked incrementally while downloading, this final pass ensures no chunk was corrupted by the user or an external application after it was written. This is CPU-intensive for large files and is expected behavior. See [Concepts & Glossary — Chunks and Data Integrity](../p2p-networks/concepts.md#chunks-and-data-integrity) and the [part.met file format](../developer/file-formats/part-met.md) for how chunk hashing works.

#### Is there a way to open a text file and load all the ed2k links from it?

Yes. Create a plain text file with one `ed2k://` link per line, name it `ED2KLinks`, and place it in `~/.aMule`. aMule will automatically detect it, add all links to the download queue, and delete the file.

See [ED2KLinks file](configuration/config-files/index.md) for more information.

### Sharing and files

#### Is there a way to recursively select a whole directory and its contents in Preferences?

Yes. In **Preferences → Directories**, **right-click** the directory in the Shared Directories tree to share it recursively, including all its subdirectories (**double-click** shares only that single directory). The full reference — the directory tree and its font/icon states, the rescan options, and the editable `shareddir-explicit.dat` / `shareddir-recursive.dat` files — is in [Directories → Shared Directories](configuration/directories.md#shared-directories).

#### What are all those files aMule creates the first time it is run?

Most of them are identical to eMule's. Detailed information about each file — and a complete list — can be found in [aMule Files](configuration/config-files/index.md).

#### Where are my downloaded files?

See [Directories](configuration/directories.md#incoming-directory) for the default paths on each platform.

#### Can I use eMule's files and settings, and vice versa?

Most files can be shared between the two clients. The only files you **cannot** share are the program configuration files:

- eMule uses `preferences.ini`
- aMule uses `~/.aMule/amule.conf`

All ED2K network-related files can be successfully shared by copying them between the two applications' directories. However, some files in `~/.aMule` are aMule-specific (such as `amulesig.dat` or `aMule.tmpl`), so it is best to only move files that exist in both the aMule and eMule directories.

**Moving half-downloaded files** is straightforward: copy them from eMule's Temp directory (configurable in eMule's preferences; by default inside eMule's own folder on Windows) into aMule's Temp directory (see [Directories](configuration/directories.md#temporary-directory) for the path on your platform), and vice versa.

#### What is all that stuff in amulesig.dat and onlinesig.dat?

These files contain the current **online signature** — the current aMule status, if the signature feature is enabled. They are used by external statistics tools (CAS, wxCAS) to display your aMule activity.

- [`amulesig.dat`](/docs/manual/configuration/config-files/#amulesigdat) — aMule's own signature format.
- [`onlinesig.dat`](/docs/manual/configuration/config-files/#onlinesigdat) — compatibility with eMule's signature format.

#### How can I switch from eMule to aMule without losing my credits?

Credits are stored in a handful of `.dat` and `.met` files (starting with [`cryptkey.dat`](configuration/config-files/index.md#cryptkeydat)). Copying them from eMule's config directory into `~/.aMule` preserves your credits. The [Migrate from eMule to aMule](migration/migrate-from-emule.md) guide lists every file and walks through the full process.

### Credits, bandwidth and upload

#### How do I view a client's credits?

Right-click on the client's nickname and select **Show Details**. No specific credit value is shown directly, but you can see:

- The total amount of data that client has sent you (and that you have sent it).
- The **Credits Modifier** (shown as **DL/UP Modifier** in the dialog).

If the client is currently in your upload queue, the dialog also shows that client's **rate** and **score** as calculated by your aMule. See [eD2k Network — Credits and Scoring](../p2p-networks/ed2k/index.md#credits-and-scoring) for how the modifier is calculated.

#### I see messages about credits being lost in the log. Should I be worried?

No. Credits for a client are automatically deleted after approximately **150 days** (~5 months) of not encountering that client. Additionally, credits may be removed for misbehaving clients. These are informational debug messages, not errors. See [Concepts & Glossary — Credits](../p2p-networks/concepts.md#credits) for how the credit system works.

#### What are the best settings I can set to have a nice download rate?

The single most important factor is your **upload limit**: the eD2k protocol caps your download speed as a multiple of your upload speed until you reach **10 KBps**, above which the cap is lifted. Set your upload limit to at least 10 KBps if your ISP allows it, and as high as you can afford. The more you upload, the more credits you accumulate, and the faster you download from other clients.

For the exact ratio table and a full configuration checklist, see [Slow Download Speeds → Upload limit too low](/docs/manual/troubleshooting/slow-speeds#upload-limit-too-low).

**Tip for rare files**: when you see a source uploading a chunk of that rare file to you, assign that client a **friend slot** so they get highest priority in your upload queue, building up credits faster.

#### Why can't I set aMule's download limit to more than X?

The ED2K protocol enforces a hardcoded upload/download ratio to prevent freeloading: your download limit is capped as a multiple of your upload limit until the upload reaches 10 KBps, above which there is no restriction. See [Slow Download Speeds → Upload limit too low](/docs/manual/troubleshooting/slow-speeds#upload-limit-too-low) for the exact table.

#### I set Upload Limit to 0 KBps, but aMule is still transferring. What did I do wrong?

**0 KBps means unlimited**, not zero. There is no way to completely stop aMule from uploading — this is by design and identical behavior to all eD2k clients (eMule, eDonkey, etc.). Allowing users to completely disable uploads would destroy the eD2k network.

Even if you share no directories, aMule always shares the **files you are currently downloading**: every partial download is automatically shared so that its already completed [chunks](../p2p-networks/ed2k/index.md#chunks) are available to other clients downloading the same file. (The Temp directory itself cannot be added as a shared directory — it is the part files inside it that are shared.) See [Shared Files — What Files Are Shared](interfaces/gui/shared-files.md#what-files-are-shared).

#### What is slot allocation?

Each active upload connection is one **slot**. Slot allocation defines how much bandwidth is assigned to each slot.

Example: if your upload limit is 20 KBps and you set slot allocation to 2 KBps, up to 10 clients can download from you simultaneously, each at a maximum of 2 KBps.

See [Why is aMule ignoring the bandwidth I set per slot?](/docs/manual/troubleshooting/common-problems#why-is-amule-ignoring-the-bandwidth-i-set-per-slot) for important caveats.

#### What is a friend slot?

A **friend slot** is a dedicated upload slot permanently reserved for a client in your Friends list. Only one friend can hold a slot at a time. When that friend (with the friend slot enabled) tries to download a file from you, they are given the highest priority in the upload queue and are always served from that dedicated slot.

While the friend is not downloading, the reserved slot reverts to the client with the highest score in your regular upload queue. See [eD2k Network — Credits and Scoring](../p2p-networks/ed2k/index.md#credits-and-scoring) for how upload priority and score are determined.

#### What is the real point of the download and upload graph scales in Preferences?

aMule only uses **Bandwidth Limits** (in the **Connection** tab) to control actual network usage. The **Download graph scale** and **Upload graph scale** (in the **Statistics** tab, formerly called **Line Capacities**) exist purely to give the **Statistics graphs** a meaningful scale.

Example: if you have a 100 KBps connection but your downloads never exceed 5 KBps (rare Indonesian free music), setting the graph scale to 100 KBps makes the graph show an almost flat line with no visual information. Setting it to 5–10 KBps makes the graph readable and useful.

See [GUI → Statistics → Graphs](interfaces/gui/statistics.md#graphs) and [Preferences → Statistics](interfaces/gui/preferences.md#statistics).

### Running aMule

#### Can I manage aMule remotely from a terminal?

Yes. Start an `ssh` session with the host running aMule, then use `amulecmd` to control it. To start new downloads, use the `ed2k` command. Remember that [`amulecmd` must be configured](/docs/manual/interfaces/amulecmd) with the EC password first.

Other options:
- `cas` — shows basic aMule statistics on the command line.
- [`amuleweb`](/docs/manual/interfaces/amuleweb) — full web interface, if you can use a browser on the remote machine.

#### Is there any way to start aMule with no graphical interface?

Yes. Use `amuled`, the aMule daemon, which runs without any GUI and can run on a headless server. Control it with [`amuleweb`](/docs/manual/interfaces/amuleweb), [`amulecmd`](/docs/manual/interfaces/amulecmd), or [`amulegui`](/docs/manual/interfaces/gui/amulegui). See [Remote Access](#remote-access) below for an overview.

#### Can I run two aMule instances at the same time?

Yes, though it is not recommended. aMule only checks if the **current user** is running another aMule instance. You can run additional instances as different user accounts:

```bash
xhost +
su - otheruser
amule &
```

**Warning**: aMule cannot detect instances running on a different X display for the **same user**. Running two instances of the same user account on different X displays will likely result in corrupted configuration and lost chunks.

For a clean way to run an additional headless instance, see [amuled](interfaces/amuled.md).

#### How can I get those nice aMule statistics some people post on IRC channels?

Use **CAS** (`cas`) or its graphical counterpart **wxCAS** (`wxcas`). Run `cas` in a terminal to get a text summary of your aMule status, or launch `wxcas` for a graphical display. See [cas / wxcas](/docs/manual/utilities/wxcas-cas) for details.

#### Does aMule support Universal Plug and Play (UPnP)?

Yes, when compiled with UPnP support (via `libupnp`). UPnP lets aMule request port forwarding from your router automatically. It is enabled by default on every platform where `libupnp` is available — Windows, macOS, and Linux. See [UPnP](configuration/upnp.md) for configuration.

#### Can I have aMule receive data from standard input (for GDB or Valgrind)?

Yes, via the `-i` (`--enable-stdin`) parameter, which keeps standard input open instead of disabling it on startup. See [Developer → Debugging](../developer/debugging.md).

## Network and connectivity

### eD2k and Kademlia

For a complete overview of both networks and their architecture, see:

- [eD2k Network](../p2p-networks/ed2k/index.md) — architecture, High ID / Low ID, ports, limitations, credits and scoring
- [Kademlia Network](../p2p-networks/kademlia.md) — serverless DHT, bootstrapping, firewalled status
- [Concepts & Glossary](../p2p-networks/concepts.md) — definitions of all technical terms (chunk, hash, credits, slots, queue…)

#### Why do the same files appear as different files in search results, even with the same name?

Because file identity is determined by the **hash and size, not the name**. Two files with identical names but different content have different hashes and appear as separate files. Two files with different names but identical content and size are treated as the same file. See [eD2k Links — Why the filename is irrelevant](../p2p-networks/ed2k/links.md#why-the-filename-is-irrelevant-to-identity).

### Ports

aMule works even without any ports open, but you will receive a [Low ID](configuration/network-connectivity.md). For optimal operation ([High ID](configuration/network-connectivity.md)) you must open the relevant ports for **incoming** connections — see [Network Connectivity — Ports](configuration/network-connectivity.md#ports-used-by-amule) for the complete list and what each port is used for.

#### Why does Kademlia still say it is "firewalled"?

See [Network Connectivity — Kademlia connectivity](configuration/network-connectivity.md#kademlia-connectivity-open-vs-firewalled).

### Searching and sources

#### In the search window, what filter corresponds to which file type?

The **File Type** filter classifies results by their **filename extension**, not by actual content — so a file named `Birthday.zip` appears under *Archives*, never under *Videos*, regardless of what it really contains. The complete extension-to-category mapping (Archives, Audio, CD-Images, Pictures, Programs, Texts, Videos) is documented in [Searches → File Type](interfaces/gui/searches.md#file-type).

#### What is a source?

A **source** is a client sharing a chunk of a file you have in your download queue that you have not yet completed. The more sources, the more download opportunities exist.

When you have a [Low ID](configuration/network-connectivity.md):
- **Sources**: all clients sharing a chunk or file you still need.
- **Available sources**: only [High ID](configuration/network-connectivity.md) clients you can actually connect to.

### Credits, ratings and scoring

For a full explanation of the upload queue priority system, see [eD2k Network — Credits and Scoring](../p2p-networks/ed2k/index.md#credits-and-scoring) and [Concepts & Glossary — Credits](../p2p-networks/concepts.md#credits).

### Network speed and protocol overhead

#### What should I know about network speed?

This section explains the technical factors behind network speed while aMule is running. For simpler troubleshooting advice, see [aMule Is Slow](/docs/manual/troubleshooting/slow-speeds).

#### How fast is my network, really?

Network speed is measured in **bits per second (bps)**. To convert: `bytes/s = bps / 8`. A provider offering a "600/100 Mbps" fiber plan means 600,000,000/100,000,000 bps, which is **75/12.5 megabytes per second**.

Networking uses **decimal** prefixes, not binary ones:

| Prefix | In computers (binary) | In networking (decimal) | Error |
|---|---|---|---|
| k (kilo) | 2¹⁰ = 1,024 | 10³ = 1,000 | ~2% |
| M (mega) | 2²⁰ = 1,048,576 | 10⁶ = 1,000,000 | ~5% |
| G (giga) | 2³⁰ = 1,073,741,824 | 10⁹ = 1,000,000,000 | ~7% |
| T (tera) | 2⁴⁰ = 1,099,511,627,776 | 10¹² = 1,000,000,000,000 | ~9% |

Your ISP quotes speeds in decimal units. This alone accounts for a ~5% difference between the advertised speed and what applications report. See [aMule Is Slow](/docs/manual/troubleshooting/slow-speeds) for practical limit values.

#### What is protocol overhead?

Every piece of control data aMule sends — source requests, search queries, queue negotiations — is **overhead**: data transmitted but not directly part of your downloads. aMule's reported overhead only counts data sent to the OS network stack; the OS adds TCP/IP headers on top.

For IPv4 TCP/IP: each packet carries a minimum of 20 bytes IPv4 header + 20 bytes TCP header. TCP connection establishment (SYN / SYN+ACK / ACK) requires at least 3 packets per connection. aMule opens new TCP connections in bursts — by default up to **20** every 5 seconds (configurable in Preferences → Advanced → Max new connections / 5 secs; see [Slow Download Speeds](/docs/manual/troubleshooting/slow-speeds)).

#### What is the ACK bottleneck?

TCP requires the receiver to send **ACK** packets back for every segment received. If aMule saturates your uplink with uploads and connection overhead, outgoing ACKs for your **downloads** may be delayed or dropped — causing the remote sender to slow down, which directly reduces your download speed.

**Never use more than 80% of your upload capacity for aMule.** Set realistic rate limits in **Preferences → Connection → Bandwidth Limits**.

For ADSL: never run uplink or downlink at 100%. A good target is 90–95%, accounting for all overhead. See [aMule Is Slow](/docs/manual/troubleshooting/slow-speeds) for specific values.

#### How do routers and SOHO devices cope with P2P load?

Cheap SOHO routers can struggle with the large number of simultaneous TCP connections and UDP flows generated by P2P traffic. NAT state tables may fill up, causing dropped connections or router instability.

**Recommendations:**
- Choose a router rated for P2P/heavy-NAT workloads (routers with VPN, built-in downloader, or USB storage typically have stronger CPUs and more RAM).
- Always configure port forwarding for ports 4662 (TCP), 4665 (UDP), 4672 (UDP) — see [Network Connectivity — Ports](configuration/network-connectivity.md#ports-used-by-amule) — or enable [UPnP](configuration/upnp.md).
- Prefer ISP connections that assign IP via DHCP over plain Ethernet rather than PPPoE/PPTP.

#### Can I use multiple internet connections?

**Link redundancy:** aMule must be restarted when links switch so it binds to the new IP and receives a new eD2k ID — unless the switchover is handled transparently at the NAT router.

**Load balancing:** aMule binds to all interfaces (`0.0.0.0`) but can only advertise one IP as its eD2k ID. Running across two simultaneously active ISP links is unreliable; the only reliable solution is to pin aMule's traffic to one interface.

See [Network Connectivity](configuration/network-connectivity.md) for binding and connectivity details.

### Browser configuration for ed2k:// links

See [ed2k — Browser Configuration](utilities/ed2k.md#browser-configuration--local-handling) for instructions on configuring Firefox, Chrome, Edge, Safari, and other browsers to handle `ed2k://` URIs.

## Remote access

Running aMule without a graphical interface and controlling it remotely via `amuled`, `amulecmd`, `amulegui`, and `amuleweb`.

### aMule daemon (`amuled`)

#### What is `amuled`?

`amuled` is a full-featured aMule that runs without any user interface. It has reduced memory and CPU requirements and can run on a headless server with no X display. It is controlled remotely via [`amuleweb`](/docs/manual/interfaces/amuleweb), [`amulecmd`](/docs/manual/interfaces/amulecmd), or [`amulegui`](/docs/manual/interfaces/gui/amulegui) over the External Connections (EC) protocol.

:::caution
Do not set **Max Connections** excessively high when using `amuled`. The default is around **500**, and `amuled` adapts the recommended maximum to your operating system's limits; setting it far higher wastes resources and can degrade performance. See [amuled — Configuration](/docs/manual/interfaces/amuled#configuration).
:::

See the [amuled documentation](/docs/manual/interfaces/amuled) for setup, configuration, and service installation details.

#### How do I set up `amuled` as a system service?

See [Running as a System Service](/docs/manual/interfaces/amuled#running-as-a-system-service) in the amuled documentation for init scripts covering systemd, Debian/Ubuntu, Red Hat/Fedora, Gentoo, and SUSE/openSUSE.

### `amulecmd`

#### How do I schedule actions or write scripts with `amulecmd`?

See [Scheduling with Cron](/docs/manual/interfaces/amulecmd#scheduling-with-cron) and [Useful Scripts](/docs/manual/interfaces/amulecmd#useful-scripts) in the `amulecmd` documentation.

### `amulegui`

#### Is there a remote graphical client for `amuled`?

Yes. `amulegui` provides the same interface as the monolithic `amule` client and connects to `amuled` over the EC protocol.

See the [`amulegui` documentation](/docs/manual/interfaces/gui/amulegui) for compilation, setup, and connection instructions.

### `amuleweb`

#### What is `amuleweb`?

`amuleweb` is a built-in web server that provides a browser-based interface for controlling aMule or amuled remotely. It listens for HTTP connections on port 4711 (default) and communicates with aMule over the EC protocol on port 4712.

See the [`amuleweb` documentation](/docs/manual/interfaces/amuleweb) for detailed setup instructions.

#### What should I see when `amuleweb` is running correctly?

After launching `amuleweb` in a terminal, you should see output like:

```
Web Server: Started
WSThread: Thread started
WSThread: created service
WSThread: created socket listening on :4711
amuleweb$
```

Then open a browser and navigate to `http://localhost:4711` (or the remote host's address). For full setup, see the [`amuleweb` documentation](/docs/manual/interfaces/amuleweb).

#### Can I run `amuleweb` as a daemon (background process)?

Yes. `amuleweb` supports the `--quiet` (`-q`) flag, which suppresses the interactive prompt and allows easy backgrounding:

```bash
amuleweb --quiet &
```

See the [`amuleweb` documentation](/docs/manual/interfaces/amuleweb) for the complete list of command-line options.
