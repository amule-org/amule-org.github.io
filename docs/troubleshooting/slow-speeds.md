---
id: slow-speeds
title: Slow Download Speeds
---

# Slow Download Speeds

This page covers two related problems: aMule downloading too slowly, and aMule consuming so much bandwidth that all other applications on your computer slow down.

---

## aMule Is Slow

Slow download speeds in aMule fall into two categories: **your own configuration**, and **factors inherent to the network**.

---

### Configuration Issues

Work through this checklist before concluding the problem is network-related.

#### Upload limit too low

The eD2k protocol enforces a hard relationship between upload and download speed to prevent freeloading:

| Upload limit | Maximum download limit |
|---|---|
| 0–3.99 KBps | Upload × 3 KBps |
| 4–9.99 KBps | Upload × 4 KBps |
| **≥ 10 KBps** | **No restriction** |

Set your upload limit to at least **10 KBps** for unrestricted downloads. Go to **Preferences → Connection → Bandwidth Limits → Upload**.

#### Upload limit too high

Paradoxically, setting your upload limit **too close to your line's actual maximum** also causes slow downloads. A saturated uplink delays outgoing TCP ACK packets for your downloads, causing the remote sender to slow down its transmission rate (the ACK bottleneck — see [Network FAQ](/docs/faq/network#ack-bottleneck) for a detailed explanation).

As a general rule: **never use more than 75–80% of your upload capacity** for aMule. Leave headroom for ACKs and other traffic.

#### Max Connections too low

**Preferences → Connection → Max Connections**: if this is set too low, aMule cannot establish enough connections to find sources efficiently. Increase it.

#### Max Connections too high

If Max Connections is set very high, aMule's connection overhead consumes significant bandwidth, congesting your line and reducing effective throughput. Reduce it until you find a balance.

#### Max New Connections per 5 seconds too low

**Preferences → Core Tweaks → Max New Connections**: if too low, aMule takes a very long time to acquire sources for a new download. Increase it.

#### Max New Connections per 5 seconds too high

Each new TCP connection produces overhead (SYN, SYN-ACK, ACK packets plus IP headers). A high value here can congest your line with connection-establishment overhead alone. Reduce it if your line or router shows signs of congestion.

#### Low ID

Having a Low ID significantly limits download speed because:
- Two Low ID clients cannot connect to each other directly.
- Some servers refuse Low ID clients.

Ensure TCP port 4662 (or your configured TCP port) is open in your firewall and forwarded in your router. See [eD2k Network → High ID and Low ID](/docs/ed2k/ed2k-network#high-id-and-low-id).

#### ISP blocking or throttling eD2k ports

Some ISPs block or rate-limit traffic on the standard eD2k TCP port 4662:

- Try changing the TCP port in **Preferences → Connection → Standard client TCP port** to a non-standard value.
- Enable **traffic obfuscation** for outgoing connections in **Preferences → Connection → Use obfuscation for outgoing connections**.
- In severe cases, enable **Accept only obfuscated connections** if your ISP completely blocks unobfuscated eD2k traffic.

#### Firewall blocking aMule ports

Verify that ports TCP 4662, UDP 4665, and UDP 4672 are open in your local firewall (not just the router). See [eD2k Network → Ports](/docs/ed2k/ed2k-network#ports).

---

### ADSL-Specific: Congested Uplink / Downlink

Many ADSL providers configure their network with large packet buffers, which causes a well-known problem: **a congested uplink can severely reduce downlink speed**, even though they are physically separate channels. This effect is explained in the WonderShaper documentation.

**Key rule for ADSL**: never use more than **90–95%** of either the uplink or the downlink capacity (after accounting for protocol overhead, since a 576 Kib/s link cannot actually transfer that amount of user data).

**Recommended limits for common ADSL lines:**

| Line (down / up) | Max aMule download | Max aMule upload |
|---|---|---|
| 576 Kbps / 288 Kbps (72/36 KB/s) | ~52 KB/s | ~26 KB/s |

If aMule is the only significant user of your bandwidth, set its limits slightly below those values (e.g., 42 KB/s down, 21 KB/s up).

**Traffic shaping tools for Linux:**
- [WonderShaper](https://github.com/magnific0/wondershaper) — a ready-made traffic shaping script for ADSL.
- **sabishape** — another traffic shaper for similar scenarios.

**Upload slot count**: with a 21 KB/s upload limit, having more than 5–7 upload connections is counterproductive. Each connection gets too little bandwidth to be useful. Set the per-slot bandwidth to at least 3 KB/s.

---

### Network-Related Causes

Not all slowness is due to misconfiguration. The following are inherent characteristics of the eD2k network.

#### The eD2k network is optimized for availability, not speed

eD2k is one of the largest P2P networks in existence, with millions of files unavailable on any other network. Its primary design goal is **file availability over years** rather than download speed. Other networks (BitTorrent, etc.) are faster for popular recent content but have far fewer files.

#### No credits = slow starts

Credits accumulate over time as you upload to other clients. A **brand-new installation** with no credits (or one where `~/.aMule` was deleted) will have slow download speeds for days or weeks until credits build up. The more you upload, the faster credits accumulate, and the higher your priority in other clients' upload queues.

#### Large queues

eMule and its derivatives (including aMule) use upload queues of up to **5,000 clients** by default. This prevents clients from cutting in line by repeatedly re-asking for a slot — an exploit common in the early days of eDonkey. As a new client with no credits, you may need to wait days or even **weeks** before reaching the top of a queue for a file with very few sources.

#### Rare and old files

Files with only one or two sources can take weeks or months to complete, regardless of configuration. A file is only downloaded as fast as the sources upload it, and sources can go offline at any time.

#### Sharing too many popular completed files

If your shared folders contain many popular completed files, aMule tends to spend most of your upload bandwidth on those files rather than on files you are currently downloading. This means you accumulate fewer credits on clients that have files you actually need.

**Recommendation:**
- Lower the upload priority of overpopular completed files (right-click → Priority → Very Low).
- Raise the upload priority of files currently being downloaded (right-click → Priority → High or Release).
- If share ratios of completed files are well above 1.0 and you want to optimize for your current downloads, consider temporarily removing the most popular completed files from your shared folders. Do **not** remove rare files — keeping rare files shared benefits the network.

#### What actually determines download speed

The single most important factor is **upload bandwidth**. Without good upload speed, no configuration change will significantly improve download speed over the long term. Credits are the mechanism — and credits require uploading.

---

## aMule Makes Everything Else Slow

When aMule is running and all other applications using the internet become slow or unusable, the problem is almost always aMule misconfiguration. Work through the following settings.

### Upload limit too high

**Preferences → Connection → Bandwidth Limits → Upload**

If this value exceeds approximately **75% of your actual upload bandwidth**, download speeds for all applications — including aMule itself — will suffer. Nearly all internet traffic uses TCP, which requires the receiver to send ACK packets back to the sender. If your uplink is saturated by aMule uploads, those ACK packets cannot get out in time, causing TCP senders everywhere to throttle down.

**Example**: if your uplink is 500 Kbps (62.5 KB/s), do not set aMule's upload limit above ~47 KB/s.

### Max Sources per File too high

**Preferences → Connection → Max Sources per File → Hard Limit**

Each source requires periodic connection attempts. If you are downloading F files simultaneously with a Hard Limit of X sources each, aMule may maintain up to `X × F` connections. Reduce the Hard Limit if you notice excessive connection activity.

### Max Connections too high

**Preferences → Connection → Connection Limits → Max Connections**

Each open connection consumes bandwidth (at minimum, keepalive and ACK traffic). High values cause connection overhead to consume a visible fraction of your bandwidth and can overwhelm routers with NAT state table limits.

### Max New Connections per 5 seconds too high

**Preferences → Core Tweaks → Max New Connections / 5 secs**

Some routers (especially cheap SOHO devices) cannot handle a large number of new connections being opened in a short period. They may slow down, freeze, or reboot. Reduce this setting if your router shows symptoms under P2P load.

### Verbose log on old wxWidgets (< 2.5.4)

**Preferences → Core Tweaks → Verbose log**

On wxWidgets versions prior to 2.5.4, enabling verbose log caused the server log window to fill rapidly, which caused high CPU usage. Disable verbose log if you are running an old wxWidgets version.

### Files with auto-priority causing excessive disk I/O

If **disk I/O** (not network) is the bottleneck — disk activity LED constantly on, application responsiveness suffers — check whether files set to **auto-priority** are causing frequent priority recalculations. Set their priority explicitly (High, Normal, Low) rather than leaving them on auto.

---

### Finding the right values for your connection

The optimal settings depend on:
- Your connection type (ISDN, DSL, Cable, T1, etc.)
- Your ISP's actual provisioned speed
- Bandwidth needed by other applications on the same machine or network
- Number of files being downloaded simultaneously
- CPU speed (on older machines)

Since these factors are highly personal, there is no universal formula. Use this iterative approach:

1. **Start conservative**: set upload limit to 50% of your actual uplink, Max Connections to 200, Max New Connections to 20.
2. **Test**: use the internet normally while aMule runs. Check whether other applications are usable.
3. **If other apps are fine**: gradually increase Max Connections and/or New Connections to improve download speed.
4. **If other apps suffer**: lower whichever values cause the most congestion (usually upload limit first, then Max Connections).
5. Repeat until you find values that give good download speeds without degrading other traffic.
