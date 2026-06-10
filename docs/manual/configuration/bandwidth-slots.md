---
id: bandwidth-slots
title: Bandwidth & Upload Slots
---

aMule divides your upload bandwidth among a limited number of **upload slots** — each slot is one remote client actively downloading from you. The **Slot Allocation** setting controls how that division is made: it is the **target upload speed per slot**, in kB/s, from which aMule derives how many slots to keep open. A single value thus tunes the trade-off between serving *many clients slowly* and serving *fewer clients fast*. This page explains what the setting does, how to change it, how aMule uses it internally, and which values make sense for your connection.

## What is slot allocation?

When clients reach the top of your [upload queue](../../p2p-networks/concepts.md#queue), aMule opens an [upload slot](../../p2p-networks/concepts.md#upload-slot) for each of them and starts sending data. The slot allocation is the speed you would like each of those slots to get. aMule does not enforce it per client — instead it uses it to decide **how many slots to open**: with an upload limit of 1,250 kB/s (a 10 Mbps line) and a slot allocation of 50 kB/s, aMule serves about 25 clients at a time, each averaging about 50 kB/s.

Two consequences follow from this design:

- Slot allocation is a **target, not a hard cap**. The total upload bandwidth is shared among all open slots, so the actual speed of a given slot can be higher (when other slots are idle or the remote client is the only fast one) or lower (see [the caveats below](#how-it-works-internally)) than the configured value.
- Changing the slot allocation does not change how much you upload in total — that is what the **Upload** limit is for. It only changes how the same total is split up.

The default is **10 kB/s** per slot. aMule versions before 3.0.0 defaulted to 2 kB/s, a value chosen when dial-up and early ADSL lines were the norm; existing installations keep whatever value is stored in their configuration.

## Configuring it

| Method | Where | Notes |
|---|---|---|
| GUI | [Preferences → Connection → Bandwidth limits](../interfaces/gui/preferences.md#bandwidth-limits), **Slot Allocation** field | Applies immediately, no restart needed. |
| Config file | [`SlotAllocation` key in the `[eMule]` section of `amule.conf`](./config-files/amule-conf.md#connection) | Edit only while aMule (or [`amuled`](../interfaces/amuled.md)) is **not running**, or your change will be overwritten on exit. |
| Remote | [`amulegui`](../interfaces/gui/amulegui.md) (same Preferences dialog) or the [`amuleweb`](../interfaces/amuleweb.md) Preferences page | Both talk to the running core over [External Connections](../../developer/ec-protocol.md). [`amulecmd`](../interfaces/amulecmd.md) does not expose this setting. |

Values below 1 kB/s are not accepted — aMule silently raises them to 1.

## How it works internally

### Number of slots

aMule recomputes the maximum number of open slots continuously from the **Upload** limit and the slot allocation:

```
max_slots = round(upload_limit / slot_allocation)
```

The result is clamped to a **minimum of 2** and a **maximum of 250** slots, regardless of any other setting. Two special cases replace the formula:

- **Upload limit below 10 kB/s** — aMule always uses the 2-slot minimum, so the slot allocation has no effect and each slot gets less than you asked for. This is the most common reason the setting appears to be ignored — see [Why is aMule ignoring the bandwidth I set per slot?](../troubleshooting/common-problems.md#why-is-amule-ignoring-the-bandwidth-i-set-per-slot).
- **Upload limit set to 0 (unlimited)** — there is no configured limit to divide, so aMule derives the slot count from the **measured** upload rate instead (`observed_rate / slot_allocation + 2`), with a floor of **20 slots**. The floor matters at startup: with no uploads running yet the measured rate is zero, and without it aMule would open only 2 slots — too few parallel connections for the uplink to ever ramp up. The 250-slot ceiling still applies.

### Opening and rotating slots

Slots are not handed out all at once. Whenever fewer than `max_slots` are open and someone is waiting, aMule opens **at most one new slot per second**, giving it to the waiting client with the highest [queue score](../../p2p-networks/concepts.md#queue). Once all slots are taken, aMule rotates them so the queue keeps moving: a client is dropped — at most one per cycle — after uploading **10 MB** or holding the slot for **1 hour**, whichever comes first, and the freed slot goes to the best waiting client. Clients with a [friend slot](../interfaces/gui/messages.md#establishing-a-friend-slot) are never dropped, and slots serving [Release-priority](../interfaces/gui/priority.md#release-priority) files are protected unless such "VIP" slots already occupy more than half of all slots.

### Bandwidth distribution

Actual bandwidth is distributed by aMule's upload throttler, which cycles through all open slots and lets each send as much as the total upload limit allows, making sure no slot starves. There is **no per-slot rate limiter**: the per-slot speed is simply the total upload bandwidth in use divided by the open slots, further limited by what each remote client can actually receive.

## Recommended values

The default of **10 kB/s** is a sensible choice for most connections. The table shows how many slots it yields, compared with a higher 60 kB/s allocation:

| Upload limit | Slots (allocation = 10 kB/s) | Slots (allocation = 60 kB/s) |
|---|---|---|
| below 10 kB/s | 2 (forced minimum) | 2 (forced minimum) |
| 50 kB/s | 5 | 2 (forced minimum) |
| 100 kB/s | 10 | 2 |
| 625 kB/s (≈ 5 Mbps) | 63 | 10 |
| 2,500 kB/s (≈ 20 Mbps) | 250 (cap reached; ≈ 10 kB/s per slot) | 42 |
| 12,500 kB/s (≈ 100 Mbps) | 250 (cap; each slot gets ≈ 50 kB/s) | 208 |
| 62,500 kB/s (≈ 500 Mbps) | 250 (cap; each slot gets ≈ 250 kB/s) | 250 (cap; each slot gets ≈ 250 kB/s) |
| 125,000 kB/s (≈ 1 Gbps) | 250 (cap; each slot gets ≈ 500 kB/s) | 250 (cap; each slot gets ≈ 500 kB/s) |
| 0 (unlimited) | from the measured rate, at least 20 | from the measured rate, at least 20 |

When tuning it, keep in mind:

- **Higher values → fewer, faster slots.** Each remote client completes [chunks](../../p2p-networks/ed2k/index.md#chunks) sooner (and a completed chunk is immediately shared onward by that client, spreading the file faster), you build more [credits](../../p2p-networks/concepts.md#credits) per client, and your connection carries fewer parallel TCP streams.
- **Lower values → more clients served at once**, each more slowly. Avoid going below **~3 kB/s**: aMule's slot rotation expects a slot to move about 10 MB within an hour (~2.8 kB/s), and values that low fragment your upload into many tiny connections with diluted credits per peer.
- **Fast uplinks**: with the default allocation the **250-slot cap** is reached at about 2,500 kB/s (≈ 20 Mbps) of configured upload. Above that, each slot gets `upload_limit / 250` rather than your target, as the last rows of the table show. Raise the allocation proportionally (`upload_limit / 250` or more) if you want the per-slot target to stay in control.
- **Upload limit below 10 kB/s**: the setting has no effect there (2 slots always). Raising the upload limit itself matters far more — see [Slow Download Speeds](../troubleshooting/slow-speeds.md#upload-limit-too-low) for why.
