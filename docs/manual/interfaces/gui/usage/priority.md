---
id: priority
title: Priority
---

aMule allows you to set **priority levels** on both downloads and uploads, giving you control over which files receive more attention when bandwidth and queue slots are limited.

## Download Priority

Download priority controls how aggressively aMule seeks sources and processes incoming data for a file relative to other downloads.

| Priority | Description |
|---|---|
| **High** | The file should be downloaded as fast as possible. aMule gives it preference over Normal and Low priority files. |
| **Normal** | The default priority. No preference over other Normal priority files. |
| **Low** | The file is less urgent. It receives fewer resources than Normal and High priority files. |
| **Auto** | aMule automatically adjusts the priority based on the number of available sources. Files with fewer sources receive higher priority, maximising the chance of completing rare files before they become unavailable. |

Set download priority by right-clicking a file in the **Transfers** window and choosing **Priority**.

## Upload Priority

Upload priority controls how willingly aMule serves a given shared file to clients in the upload queue.

| Priority | Description |
|---|---|
| **Release** | The file is uploaded 100% of the time when any client requests it. See [Release Priority](#release-priority) below. |
| **Very High** | It is critically important that clients receive this file quickly. |
| **High** | There is an urgency to upload this file to as many clients as possible. |
| **Normal** | The default priority. No particular urgency. |
| **Low** | No urgency; given lower precedence than Normal priority files. |
| **Very Low** | No urgency at all; the lowest precedence. |
| **Auto** | aMule automatically adjusts the priority based on how many clients are requesting the file. Files requested more often receive higher priority. |

Set upload priority by right-clicking a file in the **Shared Files** window and choosing **Priority**, or from the **Transfers** window upload queue.

## Release Priority

**Release** is a special upload priority designed to distribute files you want to make as widely available as possible — for example, content you are the original seeder for.

### Behaviour

When a file is set to Release priority:

- It is uploaded **100% of the time** whenever a client requests it, regardless of how many other files you are sharing or downloading.
- If Release-priority files do not consume all available upload bandwidth, files with other priorities fill the remaining bandwidth, ensuring your upload capacity is always used efficiently.
- Upload to other (non-Release) files is **not stopped**. Clients downloading non-Release files simply wait for an available slot as normal.

### Comparison to eMule PowerShare

In eMule, the equivalent feature is called **PowerShare**. The key difference is that aMule's Release priority does **not** interrupt or abort ongoing uploads to other clients in order to start a Release upload. The requesting client waits for a slot to become free.

### Practical Use

Release priority is ideal when you want to:
- Seed a file you originally created or obtained exclusively.
- Maximise the availability of a rare file on the network.
- Ensure a file you care about is always being uploaded whenever someone requests it, without disrupting normal sharing behaviour.
