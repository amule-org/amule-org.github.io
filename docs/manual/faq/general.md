---
id: general
title: General FAQ
---

# General FAQ

Frequently asked questions about aMule in general: user interface, file management, settings, credits, and day-to-day usage.

## What is aMule?

aMule is a multi-platform client for the ED2K file sharing network, based on the Windows client eMule. aMule started in August 2003 as a fork of xMule, which is itself a fork of lMule. aMule supports Windows, macOS, Linux, FreeBSD, OpenBSD, and Xbox on both 32-bit and 64-bit computers.

aMule is designed to be as user-friendly and feature-rich as eMule, and to remain faithful to the look and feel of eMule so that users familiar with either client can switch between the two easily. Since aMule is based on the eMule codebase, new features in eMule tend to find their way into aMule shortly after their inclusion in eMule.

## How do I view a client's credits?

Right-click on the client's nickname and select **Show Details**. No specific credit value is shown directly, but you can see:

- The total amount of data that client has sent you.
- The **Credits Modifier** (also called **DL/UL Modifier**).

If the client is currently in your upload queue, the dialog also shows that client's **rate** and **score** as calculated by your aMule.

## I see messages about credits being lost in the log. Should I be worried?

No. Credits for a client are automatically deleted after approximately **150 days** (~5 months) of not encountering that client. Additionally, credits may be removed for misbehaving clients. These are informational debug messages, not errors.

## What do those colors in the progress bar mean?

### Downloading transfers list

| Color | Meaning |
|---|---|
| Red | No sources for this chunk in the current session |
| Blue (lighter → darker) | At least one source available; darker = more sources |
| Yellow | Currently being downloaded |
| Black | Already downloaded and verified |
| Green (full bar) | Download complete and verified; file is in your Incoming folder |

### Expanded transfers list (double-click a transfer)

| Color | Meaning |
|---|---|
| Black | A chunk that source has and you don't |
| White | A chunk that source doesn't have |
| Green | A chunk both you and that source have |
| Yellow | A chunk that source is currently uploading to you |

### Uploading transfers list

| Color | Meaning |
|---|---|
| Black | Chunks that client has completed and verified |
| Grey | Chunks that client doesn't have |

Note: not all clients report which parts they have completed, so some may show no bar at all.

### Search results window

| Color | Meaning |
|---|---|
| Black | Only one client has this file |
| Blue (lighter → darker) | Two or more clients; darker = more clients |
| Red | File is already in your download queue |
| Green | You already have this file completely downloaded and shared |

## What are all these icons?

See the "Icons and what they signify" section in the [Getting Started guide](../../quickstart-guide.md).

## What do those numbers in brackets in the sources column of the search window mean?

Those are the clients known to have the **complete file**. Even if the number in brackets is 0, it does not mean that no one has the complete file — it only means that no client has marked the shared file as "completed" (many clients do not do so). It is a rough indicator, not a definitive count.

## What do all those numbers in the sources column in the Transfers window mean?

The format is `XX/YY + ZZ (WW)` where:

| Value | Meaning |
|---|---|
| `XX` | Number of **available** sources (sources you can currently download from) |
| `YY` | Total number of sources found |
| `ZZ` | Number of "Asked For Another File" (A4AF) sources |
| `WW` | Number of sources from which you are currently downloading a chunk |

## What do all those numbers in the priority column in the extended transfers window mean?

That is the **queue position** you have on that specific source for that file. Not all clients provide this information.

The number in brackets is how many positions you have **moved** in that client's upload queue:

- **Negative (blue)**: positions you have gained since being added.
- **Positive (red)**: positions you have lost since being added.

## Why are there two transfer rates in the uploading transfer list?

When you are uploading a file to a client, the rate is shown as a single value in KBps. However, if **that same client is also uploading to you** simultaneously, the format changes to `XX/YY`:

| Value | Meaning |
|---|---|
| `XX` | Speed at which you are uploading **to** that client |
| `YY` | Speed at which that client is uploading **to** you |

This is especially useful for rare files: if you see a client uploading one of your rare files to you, you can assign that client a **friend slot** to upload to them faster, accumulate more credits on them, and consequently download faster from them.

## What is A4AF?

**A4AF** stands for **Asked For Another File**. It is a source-optimization mechanism.

When you download a file, aMule finds a list of clients sharing it. Some of those clients may also be sharing another file you are downloading, placing them in two separate download queues simultaneously. Since you cannot download two chunks from the same client at the same time, A4AF avoids this waste:

- Setting A4AF on a download tells aMule to find any source in that file's queue that is also in another file's queue and remove it from the other queue, concentrating sources on the current download.
- You can also set A4AF in reverse — donating sources from the current download to another — which is useful for lower-priority files in a series.

**Important:** A source with a queue rank (QR) lower than 50 in the higher-priority download will **never** be swapped. This ensures the download can start from that source immediately.

## What do the "QR: xxxx" numbers mean that I see when I look at my sources?

**QR** stands for **Queue Rank** — your current position in that source's upload queue. A lower value is better. If a source is an eMule client and there is no QR number, its queue is likely full and cannot accept more clients.

## What is the difference between Transferred and Completed in the Transfers window?

- **Transferred**: the total amount of raw data received for the file. Data arrives in compressed form.
- **Completed**: the amount of useful, decompressed file data extracted from the received data — i.e., actual file content excluding protocol headers and compression overhead.

It is normal and expected for Transferred to be **smaller** than Completed (see [aMule problems: Why is Transferred a smaller number than Completed?](/docs/manual/troubleshooting/common-problems)).

## What is the difference between pausing and stopping a transfer?

| Action | Effect |
|---|---|
| **Pause** | All connections for that transfer are dropped, but the source list is kept. When resumed, aMule reconnects to those known sources. |
| **Stop** | The entire source list is discarded. When resumed, aMule starts searching for sources from scratch. |

## What are all those files aMule creates the first time it is run?

Most of them are identical to eMule's. Detailed information about each file — and a complete list — can be found in [aMule Files](../configuration/config-files/index.md).

## Where are my downloaded files?

See [Download Folders](../configuration/download-folders.md) for the default paths on each platform.

## Can I use eMule's files and settings, and vice versa?

Most files can be shared between the two clients. The only files you **cannot** share are the program configuration files:

- eMule uses `preferences.ini`
- aMule uses `~/.aMule/amule.conf`

All ED2K network-related files can be successfully shared by copying them between the two applications' directories. However, some files in `~/.aMule` are aMule-specific (such as `amulesig.dat` or `aMule.tmpl`), so it is best to only move files that exist in both the aMule and eMule directories.

**Moving half-downloaded files** is straightforward: copy them from eMule's Temp directory (usually `C:\Program Files\eMule\Temp` on Windows) into aMule's Temp directory (see [Download Folders](../configuration/download-folders.md) for the path on your platform), and vice versa.

## What is all that stuff in amulesig.dat and onlinesig.dat?

These files contain the current **online signature** — the current aMule status, if the signature feature is enabled. They are used by external statistics tools (CAS, wxCAS) to display your aMule activity.

- [`amulesig.dat`](/docs/manual/configuration/config-files/#amulesigdat) — aMule's own signature format.
- [`onlinesig.dat`](/docs/manual/configuration/config-files/#onlinesigdat) — compatibility with eMule's signature format.

## I just installed aMule for the first time. How do I set it up?

1. Open aMule and click the **Preferences** button.
2. In the **General** tab: set a nickname and your preferred language.
3. In the **Connection** tab:
   - Set **Bandwidth Limits** to the maximum bandwidth you want aMule to use.
4. In the **Directories** tab:
   - Set a directory for **temporary files** (files in progress).
   - Set a directory for **completed files** (Incoming).
   - Select the directories you want to share. It is not recommended to share too many files initially.
5. Click **OK** and then **Connect**.

For optimal download speeds, also read [What are the best settings for a nice download rate?](#what-are-the-best-settings-i-can-set-to-have-a-nice-download-rate)

## Will aMule handle my xMule and lMule files?

aMule automatically handles both lMule and xMule configuration files, but differently:

- **lMule**: Since lMule has been discontinued for years, aMule treats it as a replacement. It **renames** `~/.lMule` to `~/.aMule`. If you used `~/.lMule/Temp` and `~/.lMule/Incoming`, update the paths in Preferences to `~/.aMule/Temp` and `~/.aMule/Incoming`.
- **xMule**: If a `~/.xMule` directory is found, it is left unchanged and aMule **copies** the configuration files from it. Files being downloaded will remain in `~/.xMule` unless you manually move `~/.xMule/Temp` and `~/.xMule/Incoming` into `~/.aMule` and update the paths in Preferences.

## How do I start my aMule experience?

1. Click the **Connect** button.
2. You need at least one server in the Servers window. If none are listed, click the small button below the Connect button in the Servers window to fetch the default server list.
3. After a few moments, aMule will connect to a server (the "Not connected" message in the lower-right corner will disappear).
4. Switch to the **Search** window, search for the file you want, and double-click a result to start downloading.

For more help, join `#amule` on `irc.libera.chat` or visit the [aMule forums](http://forum.amule.org).

## What are the best settings I can set to have a nice download rate?

The most important factor is your **upload limit**:

- Upload limit `0–3.99` KBps: download limit is capped at `upload × 3` KBps.
- Upload limit `4–9.99` KBps: download limit is capped at `upload × 4` KBps.
- Upload limit `≥ 10` KBps: **no download limit** (only the Download limit preference applies).

The practical rule: set your upload limit to at least **10 KBps** if your ISP allows it, and as high as you can afford. The more you upload, the more credits you accumulate, and the faster you download from other clients.

**Tip for rare files**: when you see a source uploading a chunk of that rare file to you, assign that client a **friend slot** so they get highest priority in your upload queue, building up credits faster.

## Is there a way to open a text file and load all the ed2k links from it?

Yes. Create a plain text file with one `ed2k://` link per line, name it `ED2KLinks`, and place it in `~/.aMule`. aMule will automatically detect it, add all links to the download queue, and delete the file.

See [ED2KLinks file](../configuration/config-files/index.md) for more information.

## Can I manage aMule remotely through telnet the same way I do with eDonkey?

Yes, though not in exactly the same way as eDonkey. Start a normal `telnet` (or `ssh`) session with the host running aMule, then use `amulecmd` to control aMule. To start new downloads, use the `ed2k` command. Remember that [`amulecmd` must be configured](/docs/manual/interfaces/amulecmd) with the EC password first.

Other options:
- `cas` — shows basic aMule statistics on the command line.
- [`amuleweb`](/docs/manual/interfaces/amuleweb) — full web interface, if you can use a browser on the remote machine.

## Is there any way to start aMule with no graphical interface?

Yes. Since aMule 2.0.0-rc6, you can use `amuled`, which runs without any GUI. Control it with [`amuleweb`](/docs/manual/interfaces/amuleweb), [`amulecmd`](/docs/manual/interfaces/amulecmd), or [`amulegui`](/docs/manual/interfaces/gui/amulegui).

For older versions (or users who prefer the monolithic `amule` binary), two workarounds are available:

### Via Xvfb

```bash
# Start a virtual framebuffer
Xvfb :1 -screen 0 640x480x16 &

# Run aMule in it (only that shell is affected)
DISPLAY=:1 amule &
```

Once running, control aMule using `amulecmd` and `ed2k` as you would over SSH.

### Via VNC

```bash
vncserver :0 -geometry 1024x768
export DISPLAY=:0
fluxbox &
amule &
```

A VNC client can then connect and interact with the aMule window visually. Note: if aMule shows a startup dialog requiring user input, it will block until someone connects via VNC and dismisses it. This normally only happens once.

## Can I run two aMule instances at the same time?

Yes, though it is not recommended. aMule only checks if the **current user** is running another aMule instance. You can run additional instances as different user accounts:

```bash
xhost +
su - otheruser
amule &
```

**Warning**: aMule cannot detect instances running on a different X display for the **same user**. Running two instances of the same user account on different X displays will likely result in corrupted configuration and lost chunks.

## How can I get those nice aMule statistics some people post on IRC channels?

Use **CAS** (`cas`) or its graphical counterpart **wxCAS** (`wxcas`). Run `cas` in a terminal to get a text summary of your aMule status, or launch `wxcas` for a graphical display. See [cas / wxcas](/docs/manual/utilities/cas-wxcas) for details.

## What is slot allocation?

Each active upload connection is one **slot**. Slot allocation defines how much bandwidth is assigned to each slot.

Example: if your upload limit is 20 KBps and you set slot allocation to 2 KBps, up to 10 clients can download from you simultaneously, each at a maximum of 2 KBps.

See [Why is aMule ignoring the bandwidth I set per slot?](/docs/manual/troubleshooting/common-problems#why-is-amule-ignoring-the-bandwidth-i-set-per-slot) for important caveats.

## Why can't I set aMule's download limit to more than X?

The ED2K protocol enforces an upload/download ratio to prevent freeloading. The limits are hardcoded:

| Upload limit | Maximum download limit |
|---|---|
| 0–3 KBps | Upload × 3 KBps |
| 4–9 KBps | Upload × 4 KBps |
| ≥ 10 KBps | No restriction |

## I set Upload Limit to 0 KBps, but aMule is still transferring. What did I do wrong?

**0 KBps means unlimited**, not zero. There is no way to completely stop aMule from uploading — this is by design and identical behavior to all eD2k clients (eMule, eDonkey, etc.). Allowing users to completely disable uploads would destroy the eD2k network.

Even if you share no directories, aMule always shares the **Temp directory** so that partially downloaded files are available to other clients downloading the same file.

## What is a friend slot?

A **friend slot** is a dedicated upload slot permanently reserved for a client in your Friends list. Only one friend can hold a slot at a time. When that friend (with the friend slot enabled) tries to download a file from you, they are given the highest priority in the upload queue and are always served from that dedicated slot.

While the friend is not downloading, the reserved slot reverts to the client with the highest score in your regular upload queue.

## What is the real point of the download and upload graph scales in Preferences?

aMule only uses **Bandwidth Limits** (in the **Connection** tab) to control actual network usage. The **Download graph scale** and **Upload graph scale** (in the **Statistics** tab, formerly called **Line Capacities**) exist purely to give the **Statistics graphs** a meaningful scale.

Example: if you have a 100 KBps connection but your downloads never exceed 5 KBps (rare Indonesian free music), setting the graph scale to 100 KBps makes the graph show an almost flat line with no visual information. Setting it to 5–10 KBps makes the graph readable and useful.

## Can I have aMule receive data from standard input (for GDB or Valgrind)?

Yes. Since aMule 2.0.0-rc4, this is supported via the `-i` or `--enable-stdin` parameter.

Users on versions prior to 2.0.0-rc4 can use the `phoenix's aMule stdin patch`.

## How can I switch from eMule to aMule without losing my credits?

Credits are stored in specific files. Copy the following from eMule's config directory (typically `C:\Program Files\eMule\config\` on Windows) into `~/.aMule`:

- [`cryptkey.dat`](../configuration/config-files/index.md#cryptkeydat)
- [`clients.met`](../configuration/config-files/index.md#clientsmet)
- [`preferences.dat`](../configuration/config-files/index.md#preferencesdat)
- [`preferencesKad.dat`](../configuration/config-files/index.md#preferenceskaddat)
- [`key_index.dat`](../configuration/config-files/index.md#kad-index-files)
- [`load_index.dat`](../configuration/config-files/index.md#kad-index-files)
- `src_index.dat`

Start aMule and it will read those files. Your credits are preserved.

Also see the [Migrate from eMule to aMule](../migration/migrate-from-emule.md) guide for a complete walkthrough.

## Does aMule support Universal Plug and Play (UPnP)?

Yes. Since aMule 2.2.1, UPnP is supported on Linux and macOS. UPnP is **not** supported on Windows.

## Which distribution or OS is recommended for running aMule?

aMule runs on Windows, macOS, Linux, FreeBSD, and OpenBSD. Any modern Linux distribution with up-to-date packages works well. The best choice is whichever OS you are already comfortable maintaining.
