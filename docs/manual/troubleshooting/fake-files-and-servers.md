---
id: fake-files-and-servers
title: Fake Files and Servers
---

# Fake Files and Servers

The eD2k network provides little built-in protection against fake content and malicious servers. This page explains how to detect fake files, identify fake servers, and maintain a safe server list.

## Fake Files

### What is a fake file?

A **fake file** is one that is intentionally mislabeled to appear as something it is not. The actual content may be:
- An unrelated file (e.g., a video file that is actually a virus executable)
- A corrupt file that cannot be used
- An empty or near-empty file
- Malware disguised as popular content (music, movies, software)

The eD2k network does not authenticate content, so any client can share any file under any name and hash. Once a file hash is associated with malicious content, it propagates through the network as sources share it with each other.

:::note
Do not confuse **fake** with **corrupt**. A corrupt file has the correct content but some bytes were damaged during transfer. aMule's AICH integrity checking handles corruption automatically. A fake file has completely wrong content that happens to match the expected hash — which is extremely rare due to the mathematical properties of MD4, but fake files more commonly work by being re-shared under a different name than their actual hash, or by being newly created fakes with their own hash.
:::

### How do I detect fake files?

aMule provides two built-in mechanisms:

#### 1. User comments

Other clients that have downloaded the same file can leave comments and ratings visible to everyone. Right-click a download and select **Show File Details** to view comments. If multiple users have marked a file as fake or described wrong content, treat it as suspicious.

#### 2. File details inspection

Right-click on a download and select **Show File Details**. Check whether any source has set an alternative filename that suggests different content from what you expect. If the file name does not match the content described by independent sources, it may be a fake.

#### 3. FakeCheck services

Right-click on a download and select **FakeCheck** to query an online database of known fake hashes. The following services have been used for this purpose:

- [http://stats.razorback2.com/ed2khistory](http://stats.razorback2.com/ed2khistory) — check the file's release history, verify if the release date is plausible and if file names are consistent across sources.

:::caution
Some FakeCheck services from the original wiki era (e.g., `donkeyfakes.gambri.net`, which closed in October 2005, and `jugle.net`) are no longer operational. Verify that any service you use is still active.
:::

### Practical tips for avoiding fake files

- **Cross-check comments** before downloading. Files with a high source count but many "FAKE" comments should be avoided.
- **Check file size**: a 700 MB movie file that appears as 2 MB is obviously wrong.
- **Check extension consistency**: a file named `movie.avi` that has an `application/exe` magic number in the first bytes (visible in a hex editor on the first downloaded chunk) is suspicious.
- **Prefer files with many complete sources**: the number in brackets in the search results (clients known to have the complete file) correlates with legitimacy, though it is not conclusive.
- **Use AICH**: the AICH (Advanced Intelligent Corruption Handling) system verifies sub-chunk integrity using a hash tree. While AICH does not detect a fake (a file that is internally consistent but not what you wanted), it does prevent accidentally accepting corrupted chunks from a fake source that has mixed legitimate and corrupted data.

## Fake Servers

### What are fake servers?

Fake servers are malicious eD2k servers that serve one or more of these purposes:

1. **Manipulating search results** to spread viruses or DRM-infected Windows Media files. Users searching for any keyword receive results pointing to malicious files. The files typically have names like:
   - `Secured Downloading of [keyword] with New Secured eMule0.47c.zip`
   - `[keyword] Web hottest videos personal player.exe`

2. **Collecting user information**: some fake servers log the IP addresses and file hashes of all clients that connect to them, building intelligence about what users are downloading without providing any useful service (no search results, no sources).

3. **Mimicking known good servers**: fake servers often copy the names, descriptions, and connection statistics of well-known legitimate servers to appear trustworthy.

### How do I identify a fake server?

- **Unusual search results**: if searches consistently return many small files with high source counts and suspicious "catch phrase" names, you are likely connected to a fake server.
- **Verify against known good lists**: check the server's IP against the verified lists referenced in the [server.met](../../developer/file-formats/server-met.md) page.
- **Check server statistics**: cross-reference the server's claimed statistics against independent sources.

### How do I protect myself from fake servers?

#### Remove unknown servers

Delete all servers from your server list that are not on a verified list. In the Servers window, select unknown servers and remove them.

#### Disable automatic server list updates from servers and clients

In **aMule versions prior to 2.2.0**, aMule automatically adds servers received from other servers and clients to the server list by default. This is how fake servers propagate. Disable this in:

- **Preferences → Servers** → uncheck "Update server list when connecting to a server"
- **Preferences → Servers** → uncheck "Update server list when connecting to a client"

#### Use a curated server list

Maintain a server list from a trusted source and update it manually. See the [server.met](../../developer/file-formats/server-met.md) page for current sources.

Use the **Addresses.dat** file (`~/.aMule/addresses.dat`) to configure URLs from which aMule automatically downloads updated server lists. Add only trusted URLs.

#### Use Kademlia instead of eD2k servers

The most robust solution is to **disable eD2k entirely** and use only **Kademlia**. Since Kademlia is serverless and decentralized, there are no fake servers to connect to.

Disable eD2k in **Preferences → Connection** → uncheck "Connect to eD2k network".

:::note
Disabling eD2k and using only Kademlia should not result in fewer sources or lower download speeds under normal conditions. Searches and source finding will take somewhat longer because Kademlia queries propagate through the distributed network rather than going to a central server, but the results are equivalent for most files.
:::

## Testing Your Ports

### Why test your ports?

Having a **Low ID** is one of the most common problems on the eD2k network. Low ID almost always means that your TCP port 4662 (or your configured TCP port) is not reachable from the internet — either because your firewall is blocking it or your router is not forwarding it.

Low ID consequences:
- You cannot connect to other Low ID clients.
- Some servers refuse Low ID clients.
- Your download speed is lower because fewer clients can initiate connections to you.
- Transfer of data between you and other clients is routed through the server, adding server load.

### How do I test my ports?

Use one of these online port checking tools to verify that your TCP port is reachable from the internet:

- [https://portcheck.ing/](https://portcheck.ing/)
- [https://portchecker.co/](https://portchecker.co/)

Enter your TCP port number (default 4662) and run the check. If the port is reported as open, you will receive a High ID from the server.

### What to do if the port test fails

1. **Check your firewall**: ensure that TCP 4662 (or your configured port) is open for **incoming** connections in your local firewall (both hardware and software firewalls, if applicable).

2. **Check your router**: add a port forwarding rule to forward TCP 4662 (or your configured port) to the internal IP address of the machine running aMule. Consult your router's manual for instructions.

3. **UPnP**: if your router supports UPnP, enable it in **Preferences → Connection → Use UPnP** to let aMule configure the port forwarding automatically.

4. **Try a different port**: if your ISP blocks port 4662, configure a different TCP port in **Preferences → Connection → Standard client TCP port** and forward that port instead. Also update UDP ports:
   - UDP `TCP_PORT + 3` (replaces 4665)
   - UDP `4672` (keep this fixed)

5. **Re-run the port test** after each change.

For a complete guide on obtaining a High ID, see [High ID and Low ID](../../p2p-networks/high-id-low-id.md).
