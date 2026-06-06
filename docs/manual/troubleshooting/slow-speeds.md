---
id: slow-speeds
title: Slow Download Speeds
---

This page covers two related problems: aMule downloading too slowly, and aMule consuming so much bandwidth that all other applications on your computer slow down.

## aMule Is Slow

Slow download speeds in aMule fall into two categories: **your own configuration**, and **factors inherent to the network**.

### Configuration issues

Work through this checklist before concluding the problem is network-related. All the settings below live in the [Preferences](../interfaces/gui/preferences.md) dialog.

#### Upload limit too low

The eD2k network enforces a hard relationship between your upload limit and your maximum download rate to prevent freeloading: below 10 KB/s your download is capped at 3–4× your upload, and only an upload limit of **≥ 10 KB/s** removes the cap entirely. The exact formula is documented in [Upload/download ratio enforcement](../../p2p-networks/ed2k/index.md#uploaddownload-ratio-enforcement).

Set your upload limit to at least **10 KB/s** for unrestricted downloads, under [Preferences → Connection → Bandwidth limits](../interfaces/gui/preferences.md#bandwidth-limits).

#### Upload limit too high

Paradoxically, setting your upload limit **too close to your line's actual maximum** also causes slow downloads. A saturated uplink delays the outgoing TCP ACK packets for your downloads, causing the remote sender to slow down its transmission rate — the [ACK bottleneck](../faq.md#what-is-the-ack-bottleneck).

As a general rule: **never use more than 80% of your upload capacity** for aMule. Leave headroom for ACKs and other traffic. Adjust the value under [Preferences → Connection → Bandwidth limits](../interfaces/gui/preferences.md#bandwidth-limits).

#### Max simultaneous connections too low

If [Preferences → Connection → Limits → Max simultaneous connections](../interfaces/gui/preferences.md#limits) is set too low, aMule cannot establish enough connections to find sources efficiently. Increase it (the default is 500).

#### Max simultaneous connections too high

If [Max simultaneous connections](../interfaces/gui/preferences.md#limits) is set very high, aMule's connection overhead consumes significant bandwidth, congesting your line and reducing effective throughput. Reduce it until you find a balance.

#### Max new connections per 5 seconds too low

If [Preferences → Advanced → Max new connections / 5 secs](../interfaces/gui/preferences.md#advanced) is too low, aMule takes a very long time to acquire sources for a new download. Increase it (the default is 20).

#### Max new connections per 5 seconds too high

Each new TCP connection produces overhead (SYN, SYN-ACK, ACK packets plus IP headers). A high value in [Max new connections / 5 secs](../interfaces/gui/preferences.md#advanced) can congest your line with connection-establishment overhead alone. Reduce it if your line or router shows signs of congestion.

#### Low ID

Having a Low ID significantly limits download speed because two Low ID clients [cannot exchange data with each other](../configuration/network-connectivity.md#two-clients-both-with-low-id-cannot-transfer), and some servers refuse Low ID clients.

Ensure your TCP port (4662 by default) is open in your firewall and forwarded in your router. See [Network Connectivity](../configuration/network-connectivity.md) for how to obtain a [High ID](../configuration/network-connectivity.md).

#### ISP blocking or throttling eD2k ports

Some ISPs block or rate-limit traffic on the standard eD2k TCP port 4662:

- Try changing the TCP port under [Preferences → Connection → Ports → Standard TCP Port](../interfaces/gui/preferences.md#ports) to a non-standard value.
- Enable **Use obfuscation for outgoing connections** in [Preferences → Security → Protocol Obfuscation](../interfaces/gui/preferences.md#protocol-obfuscation) (on by default), which disguises aMule traffic so it is harder to detect and throttle.
- In severe cases, enable **Accept only obfuscated connections** in the same section if your ISP completely blocks unobfuscated eD2k traffic.

#### Firewall blocking aMule ports

Verify that the eD2k ports are open in your local firewall, not just the router. The full list of ports and their purpose is in [Network Connectivity → Ports](../configuration/network-connectivity.md#ports-used-by-amule); see [Firewall](../configuration/firewall.md) and [Network Connectivity](../configuration/network-connectivity.md) for how to open and forward them.

### Network-related causes

Not all slowness is due to misconfiguration. The following are inherent characteristics of the eD2k network.

#### The eD2k network is optimized for availability, not speed

[eD2k](../../p2p-networks/ed2k/index.md) is one of the largest P2P networks in existence, with millions of files unavailable on any other network. Its primary design goal is **file availability over years** rather than download speed. [Other networks](../../p2p-networks/other-networks.md) (BitTorrent, etc.) are faster for popular recent content but have far fewer files.

#### No credits = slow starts

[Credits](../../p2p-networks/ed2k/index.md#credits-and-scoring) accumulate over time as you upload to other clients. A **brand-new installation** with no credits (or one where `~/.aMule` was deleted) will have slow download speeds for days or weeks until credits build up. The more you upload, the faster credits accumulate, and the higher your priority in other clients' upload queues.

#### Large queues

eMule and its derivatives (including aMule) use upload queues of up to **5,000 clients** by default (configurable under [Preferences → Advanced → Upload Queue Size](../interfaces/gui/preferences.md#advanced)). This prevents clients from cutting in line by repeatedly re-asking for a slot — an exploit common in the early days of eDonkey. As a new client with no [credits](../../p2p-networks/ed2k/index.md#credits-and-scoring), you may need to wait days or even **weeks** before reaching the top of a queue for a file with very few sources. See [Concepts & Glossary](../../p2p-networks/concepts.md) for how queues, queue rank and slots work.

#### Rare and old files

Files with only one or two [sources](../../p2p-networks/concepts.md) can take weeks or months to complete, regardless of configuration. A file is only downloaded as fast as the sources upload it, and sources can go offline at any time.

#### Sharing too many popular completed files

If your shared folders contain many popular completed files, aMule tends to spend most of your upload bandwidth on those files rather than on files you are currently downloading. This means you accumulate fewer [credits](../../p2p-networks/ed2k/index.md#credits-and-scoring) on clients that have files you actually need.

**Recommendation** — adjust the per-file upload priority by right-clicking a file in the Shared Files list (priorities, from lowest to highest queue weight: Very Low, Low, Normal, High, Very High, Release; see [Credits and Scoring](../../p2p-networks/ed2k/index.md#credits-and-scoring)):

- Lower the upload priority of overpopular completed files (**Priority → Very Low**).
- Raise the upload priority of files currently being downloaded (**Priority → High** or **Release**).
- If share ratios of completed files are well above 1.0 and you want to optimize for your current downloads, consider temporarily removing the most popular completed files from your shared folders. Do **not** remove rare files — keeping rare files shared benefits the network.

#### What actually determines download speed?

The single most important factor is **upload bandwidth**. Without good upload speed, no configuration change will significantly improve download speed over the long term. [Credits](../../p2p-networks/ed2k/index.md#credits-and-scoring) are the mechanism — and credits require uploading.

## aMule Makes Everything Else Slow

When aMule is running and all other applications using the internet become slow or unusable, the problem is almost always aMule misconfiguration. Work through the following settings in the [Preferences](../interfaces/gui/preferences.md) dialog.

### Upload limit too high

If [Preferences → Connection → Bandwidth limits → Upload](../interfaces/gui/preferences.md#bandwidth-limits) exceeds approximately **80% of your actual upload bandwidth**, download speeds for all applications — including aMule itself — will suffer, because a saturated uplink delays the outgoing TCP ACK packets every download depends on (the [ACK bottleneck](../faq.md#what-is-the-ack-bottleneck)).

**Example**: if your uplink is 100 Mbps (12.5 MB/s), do not set aMule's upload limit above 9600 KB/s (~9.38 MB/s).

### Max sources per downloading file too high

Each source requires periodic connection attempts. If you are downloading F files simultaneously with a limit of X sources each, aMule may maintain up to `X × F` connections. Reduce [Preferences → Connection → Limits → Max sources per downloading file](../interfaces/gui/preferences.md#limits) (the default is 300) if you notice excessive connection activity.

### Max simultaneous connections too high

Each open connection consumes bandwidth (at minimum, keepalive and ACK traffic). High values in [Preferences → Connection → Limits → Max simultaneous connections](../interfaces/gui/preferences.md#limits) cause connection overhead to consume a visible fraction of your bandwidth and can overwhelm routers with NAT state table limits.

### Max new connections per 5 seconds too high

Some routers (especially cheap SOHO devices) cannot handle a large number of new connections being opened in a short period. They may slow down, freeze, or reboot. Reduce [Preferences → Advanced → Max new connections / 5 secs](../interfaces/gui/preferences.md#advanced) if your router shows symptoms under P2P load.

### Files with auto priority causing excessive disk I/O

If **disk I/O** (not network) is the bottleneck — disk activity LED constantly on, application responsiveness suffers — check whether files set to **auto priority** are causing frequent priority recalculations. Set their priority explicitly (High, Normal, Low) rather than leaving them on auto. See the auto-priority options under [Preferences → Files → Downloads](../interfaces/gui/preferences.md#downloads).

### Finding the right values for your connection

The optimal settings depend on:
- Your connection type (fiber/FTTH, cable, DSL, mobile/5G, etc.)
- Your ISP's actual provisioned speed
- Bandwidth needed by other applications on the same machine or network
- Number of files being downloaded simultaneously
- CPU speed (on older machines)

Since these factors are highly personal, there is no universal formula. Use this iterative approach, adjusting the values in [Preferences](../interfaces/gui/preferences.md) (and confirming your [connectivity status](../configuration/network-connectivity.md) along the way):

1. **Start conservative**: set the upload limit to 50% of your actual uplink, Max simultaneous connections to 200, Max new connections / 5 secs to 20.
2. **Test**: use the internet normally while aMule runs. Check whether other applications are usable.
3. **If other apps are fine**: gradually increase Max simultaneous connections and/or Max new connections to improve download speed.
4. **If other apps suffer**: lower whichever values cause the most congestion (usually the upload limit first, then Max simultaneous connections).
5. Repeat until you find values that give good download speeds without degrading other traffic.
