---
id: links
title: eD2k Links
---

An **eD2k link** is a URI that refers to a file, server, or server list in the [eD2k network](index.md). aMule can process these links to add downloads to the queue, add servers to the [server list](servers.md#the-server-list), or import full server lists.

## Link Format

All eD2k links share the same basic structure: fields separated by pipe characters (`|`), with `ed2k://` as the protocol prefix.

```
ed2k://|TYPE|FIELDS|/
```

The pipe character (`|`) acts as a field delimiter. Always wrap an eD2k URL in double quotes on the command line to prevent the shell from interpreting `|` and `&` as special characters.

## File Links

A file link adds a file to your [download queue](../concepts.md#download-queue).

### Basic syntax

```
ed2k://|file|NAME|SIZE|MD4-HASH|/
```

| Field | Description |
|---|---|
| `file` | Literal — indicates this is a file link |
| `NAME` | Filename (only informational; identity is determined by hash + size) |
| `SIZE` | File size in bytes |
| `MD4-HASH` | 32-character hex [MD4 hash](../concepts.md#md4-hash-ed2k-hash) of the file |

### Optional fields

Additional fields can be appended after the MD4 hash (before the closing `/`):

| Field | Format | Description |
|---|---|---|
| Part hashes | `p=HASH1:HASH2:...` | MD4 hash of each [chunk](../concepts.md#chunk) in order |
| Root Hash | `h=ROOTHASH` | AICH Root Hash (see [AICH](aich.md)) |
| URL sources | `s=URL` | Direct HTTP/FTP URL for the file. **Not supported by aMule** — like any unrecognized field, it is silently skipped |

Besides the fields above, aMule also accepts a `sources` field (described below). **Any unrecognized field is silently skipped.**

### Sources

Sources (peers that already have the file) are appended **after** the closing slash, in a separate field:

```
ed2k://|file|NAME|SIZE|MD4-HASH|/|sources,SOURCE1,SOURCE2,...|/
```

Each source is a comma-separated entry with the following format:

```
(IP|HOSTNAME):PORT[:CRYPTOPTIONS[:CLIENTHASH]]
```

| Field | Description |
|---|---|
| `IP`/`HOSTNAME` | IP address or hostname of the peer (both are accepted; hostnames are resolved later) |
| `PORT` | TCP port the peer listens on (1–65535) |
| `CRYPTOPTIONS` | Optional. A single byte with the peer's encryption ([protocol obfuscation](../../manual/configuration/config-files/amule-conf.md#obfuscation-section)) options |
| `CLIENTHASH` | Optional. The peer's MD4 [user hash](../concepts.md#userhash). Present **only** when bit `0x80` of `CRYPTOPTIONS` is set, signalling a source ready for encrypted connections |

If bit `0x80` of `CRYPTOPTIONS` is set but no client hash follows, aMule rejects the link as invalid.

### Examples

```
# Minimal file link
ed2k://|file|example.zip|2407949|CC8C3B104AD58678F69858F1F9B736E9|/

# With part hashes
ed2k://|file|example.zip|2407949|CC8C3B104AD58678F69858F1F9B736E9|p=HASH1:HASH2:HASH3|/

# With AICH Root Hash
ed2k://|file|example.zip|2407949|CC8C3B104AD58678F69858F1F9B736E9|h=AICHHASH|/

# With pre-seeded sources (plain IP, and an encryption-capable source with its client hash)
ed2k://|file|example.zip|2407949|CC8C3B104AD58678F69858F1F9B736E9|/|sources,192.0.2.1:4662,198.51.100.5:4662:131:0123456789ABCDEF0123456789ABCDEF|/
```

### Why the filename is irrelevant to identity

On the eD2k network, a file is identified **solely by its MD4 hash and its size**. Two files with the same name but different content have different hashes and are treated as completely different files. Two files with different names but identical content and size will be treated as the same file.

## Server Links

A server link adds a single server to your server list.

```
ed2k://|server|IP|PORT|/
```

| Field | Description |
|---|---|
| `server` | Literal — indicates this is a server link |
| `IP` | IP address of the server |
| `PORT` | Port where the server accepts eD2k connections |

### Example

```
ed2k://|server|195.245.244.243|4661|/
```

## Serverlist Links

A serverlist link imports a complete server list from a remote URL.

```
ed2k://|serverlist|ADDRESS|/
```

| Field | Description |
|---|---|
| `serverlist` | Literal — indicates this is a server list link |
| `ADDRESS` | Full URL to the server list file (including filename) |

If you already have a server list, the remote servers are merged into it. If you have no existing server list, the imported list replaces it. For guidance on keeping a trustworthy list, see [Maintaining a safe server list](servers.md#maintaining-a-safe-server-list).

## Magnet Links

A **magnet link** is a generic URI (`magnet:?…`) that identifies a file by one or more hashes instead of by its location. It is shared by several P2P networks; a magnet link can be used on the eD2k network only if it carries the file's eD2k identity — its MD4 hash and its size, the same two fields that identify a [file link](#file-links).

```
magnet:?PARAM=VALUE&PARAM=VALUE&...
```

Parameters are `name=value` pairs separated by `&`. The ones relevant to eD2k are:

| Parameter | Meaning |
|---|---|
| `xt=urn:ed2k:HASH` | "Exact topic": the file's MD4 hash (32 hex characters). Also written `xt=urn:ed2khash:HASH`; many clients include both forms |
| `xl=SIZE` | "Exact length": the file size in bytes |
| `dn=NAME` | "Display name": the suggested file name, percent-encoded |
| `xt=urn:aich:HASH` | The file's [AICH](aich.md) root hash (Base32) |

`xt` may appear more than once, so the same magnet link can also carry hashes for other networks (for example `xt=urn:btih:…` for BitTorrent); a client uses the ones it understands. A magnet link without the MD4 hash and the size does not identify an eD2k file. An eD2k-compatible magnet link and the equivalent [`ed2k://|file|` link](#file-links):

```
magnet:?dn=ubuntu-26.04-desktop-amd64.iso&xt=urn:ed2k:26dfb3060428acece9ec8864de7126ae&xt=urn:ed2khash:26dfb3060428acece9ec8864de7126ae&xl=6518974464
ed2k://|file|ubuntu-26.04-desktop-amd64.iso|6518974464|26DFB3060428ACECE9EC8864DE7126AE|/
```

## Using Links in aMule

How aMule accepts these links — clicking them in a browser, pasting them into the GUI, the `ed2k` command-line tool, `amulecmd`, and registering aMule as the handler for `ed2k://` and `magnet:` links — is described in the User Manual under [eD2k and Magnet Links](../../manual/configuration/ed2k-magnet-links.md).
