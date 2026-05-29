---
id: statistics
title: Statistics
---

The Statistics window shows detailed data about the current aMule session: speed graphs, transfer totals, connection metrics, client population, and server statistics.

![Statistics window overview](/img/docs/usage/window_stats1.jpg)

The window is divided into two main areas:

- **Graphs** (top portion) — visual speed and connection history for the last few minutes.
- **Statistics tree** (bottom right) — a hierarchical breakdown of all numeric statistics.

## Graphs

The three graphs each update in real time.

:::tip
Make sure you understand how to read the graphs: the X axis represents time (newest data on the right), and the Y axis is the measured value. The "average" lines smooth out short-term spikes.
:::

### Download Speed

The top-left graph shows download speed over recent minutes:

![Download speed graph](/img/docs/usage/window_stats2.jpg)

| Line colour | Meaning |
|---|---|
| Light green | Current download speed |
| Medium green | Average download speed over the last *X* minutes (configured in **Preferences → Statistics → Time for average graph**) |
| Dark green | Average download speed over the full graph window |

### Upload Speed

The top-right graph shows upload speed:

![Upload speed graph](/img/docs/usage/window_stats3.jpg)

| Line colour | Meaning |
|---|---|
| Light red | Current upload speed |
| Medium green | Average upload speed over the last *X* minutes |
| Dark green | Average upload speed over the full graph window |

### Connections

The bottom-left graph shows the number of active connections:

![Connections graph](/img/docs/usage/window_stats4.jpg)

| Line colour | Meaning |
|---|---|
| Pink | Connections actively downloading (clients uploading to you) |
| Yellow | Connections actively uploading (you uploading to clients) |
| Blue | All active connections combined |

Next to the **Active connections** label, a ratio such as `1:3` indicates the fraction of the allowed connection limit currently in use. A value of `1:3` means one-third of the maximum connections allowed (configured in **Preferences → Connection → Max Connections**) are in use:

![Connection ratio indicator](/img/docs/usage/window_stats5.jpg)

## Statistics Tree

The bottom-right panel contains a hierarchical tree of detailed statistics:

![Statistics tree](/img/docs/usage/window_stats6.jpg)

Items whose value is not yet known may be hidden until a valid value is available.

### Statistics

| Item | Description |
|---|---|
| **Uptime** | How long aMule has been running |

### Transfer

| Item | Description |
|---|---|
| **Session UL:DL Ratio (Total)** | Bytes uploaded (first number) per byte downloaded (second number). Shows "Not available" if no data has been transferred |

#### Uploads

| Item | Description |
|---|---|
| **Uploaded Data (Session (Total))** | Data uploaded this session; total ever in brackets |
| *(client list)* | Per-client breakdown of uploaded data |
| **Total Overhead (Packets)** | Bandwidth used by upload control packets |
| **File Request Overhead (Packets)** | Bandwidth used by file-request control packets |
| **Source Exchange Overhead (Packets)** | Bandwidth used by source-exchange control packets |
| **Server Overhead (Packets)** | Bandwidth used by server communication control packets |
| **Kad Overhead (Packets)** | Bandwidth used by Kademlia communication control packets |
| **Active Uploads** | Number of currently active upload connections |
| **Waiting Uploads** | Number of clients currently in your upload queue |
| **Total successful upload sessions** | Times in this session you successfully uploaded a complete chunk to a client |
| **Total failed upload sessions** | Times in this session an upload failed to deliver a complete chunk |
| **Average upload time** | Average time needed to complete a successful upload |

#### Downloads

| Item | Description |
|---|---|
| **Downloaded Data (Session (Total))** | Data downloaded this session; total ever in brackets |
| *(client list)* | Per-client breakdown of downloaded data |
| **Total Overhead (Packets)** | Bandwidth used by download control packets |
| **File Request Overhead (Packets)** | Bandwidth used by download file-request control packets |
| **Source Exchange Overhead (Packets)** | Bandwidth used by download source-exchange control packets |
| **Server Overhead (Packets)** | Bandwidth used by download server communication control packets |
| **Kad Overhead (Packets)** | Bandwidth used by Kademlia communication control packets |
| **Found Sources** | Total sources found |
| **Source Exchange** | Sources found through source exchange |
| **Kad** | Sources found through the Kademlia network |
| **Passive** | Sources found passively |
| **Remote Server** | Sources found through a server other than the one you are connected to |
| **Local Server** | Sources found through the server you are connected to |
| **Unknown** | Sources found through unclassified methods |
| **Active Downloads (chunks)** | Number of clients currently uploading to you |

### Connection

| Item | Description |
|---|---|
| **Average Downloadrate (Session)** | Average download speed this session |
| **Average Uploadrate (Session)** | Average upload speed this session |
| **Max Downloadrate (Session)** | Peak download speed this session |
| **Max Uploadrate (Session)** | Peak upload speed this session |
| **Reconnects** | Number of successful server connections minus one (i.e., number of reconnections) |
| **Time Since First Transfer** | Time elapsed since the first transfer (upload or download) began this session |
| **Connected To Server Since** | Time elapsed since the last successful server connection; 0 if disconnected |
| **Active Connections (estimate)** | Estimated number of currently active connections |
| **Max Connection Limit Reached** | Number of times the connection limit (set in Preferences) was reached, and the date/time it last happened |
| **Average Connections (estimate)** | Estimated average number of simultaneous active connections this session |
| **Peak Connections (estimate)** | Estimated peak number of simultaneous connections this session |

### Clients

| Item | Description |
|---|---|
| **Total** | Total number of known clients |
| *(per-application list)* | Number of clients per application (aMule, eMule, etc.), sorted by popularity. Percentage of total shown in brackets |
| *(per-version list)* | Number of clients per version per application. aMule and Hydranode also show an **Operating System** sub-tree |
| **Unknown** | Clients whose application is unknown |

### Servers

| Item | Description |
|---|---|
| **Working Servers** | Number of servers known to be online |
| **Failed Servers** | Number of servers that could not be reached |
| **Total** | Total known servers |
| **Deleted Servers** | Servers deleted this session |
| **Filtered Servers** | Servers filtered by IPFilter |
| **Users on Working Servers** | Sum of users connected to all known working servers |
| **Files on Working Servers** | Sum of files available through all known working servers |
| **Total Users** | Sum of users connected to all known servers |
| **Total Files** | Sum of files available through all known servers (including non-working ones) |
| **Server Occupation** | Percentage of maximum server capacity currently occupied by connected clients |

### Shared Files

| Item | Description |
|---|---|
| **Number of Shared Files** | Total number of files you are sharing |
| **Total size of Shared Files** | Combined size of all shared files |
| **Average filesize** | Average size of your shared files |

## Quick Reference

![Statistics quick reference](/img/docs/usage/window_stats7.jpg)

| # | Description |
|---|---|
| 1 | Download speed graph |
| 2 | Connections graph |
| 3 | Active connections ratio (used/allowed) |
| 4 | Upload speed graph |
| 5 | Statistics tree |
