---
id: links
title: eD2k Links
---

An **eD2k link** is a URI that refers to a file, server, or server list in the eD2k network. aMule can process these links to add downloads to the queue, add servers to the server list, or import full server lists.

## Link Format

All eD2k links share the same basic structure: fields separated by pipe characters (`|`), with `ed2k://` as the protocol prefix.

```
ed2k://|TYPE|FIELDS|/
```

The pipe character (`|`) acts as a field delimiter. Always wrap an eD2k URL in double quotes on the command line to prevent the shell from interpreting `|` and `&` as special characters.

## File Links

A file link adds a file to your download queue.

### Basic syntax

```
ed2k://|file|NAME|SIZE|MD4-HASH|/
```

| Field | Description |
|---|---|
| `file` | Literal — indicates this is a file link |
| `NAME` | Filename (only informational; identity is determined by hash + size) |
| `SIZE` | File size in bytes |
| `MD4-HASH` | 32-character hex MD4 hash of the file |

### Optional fields

Additional fields can be appended after the MD4 hash (before the closing `/`):

| Field | Format | Description |
|---|---|---|
| Part hashes | `p=HASH1:HASH2:...` | MD4 hash of each chunk in order |
| Root Hash | `h=ROOTHASH` | AICH Root Hash (see [AICH](aich.md)) |
| URL sources | `s=URL` | Direct HTTP/FTP URL for the file (aMule silently ignores this) |

Sources are appended **after** the closing slash, in a separate field:

```
ed2k://|file|NAME|SIZE|MD4-HASH|/|sources,IP:PORT,IP:PORT,...|/
```

A hostname may be used instead of a raw IP address for sources.

### Examples

```
# Minimal file link
ed2k://|file|example.zip|2407949|CC8C3B104AD58678F69858F1F9B736E9|/

# With part hashes
ed2k://|file|example.zip|2407949|CC8C3B104AD58678F69858F1F9B736E9|p=HASH1:HASH2:HASH3|/

# With AICH Root Hash
ed2k://|file|example.zip|2407949|CC8C3B104AD58678F69858F1F9B736E9|h=AICHHASH|/

# With pre-seeded sources
ed2k://|file|example.zip|2407949|CC8C3B104AD58678F69858F1F9B736E9|/|sources,192.0.2.1:4662,198.51.100.5:4662|/
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

If you already have a server list, the remote servers are merged into it. If you have no existing server list, the imported list replaces it.

## The `ed2k` Command

aMule installs a small utility called **`ed2k`** that allows you to add downloads from the command line or from a web browser. It communicates with aMule by writing to the **ED2KLinks file** (`~/.aMule/ED2KLinks`) — **not** through the External Connections interface. For full details on the command and the ED2KLinks file format, see [ed2k — ED2K Link Handler](../../manual/utilities/ed2k.md).

### Usage

```bash
ed2k "ed2k://|file|NAME|SIZE|HASH|/"
```

The double quotes are required so the shell does not interpret the pipe characters (`|`) and ampersands (`&`) as special commands.

### Finding the `ed2k` binary

| Installation method | Typical path |
|---|---|
| Self-compiled aMule | `/usr/local/bin/ed2k` |
| Package-installed (most distros) | `/usr/bin/ed2k` |
| SuSE packages | `/usr/local/bin/ed2k` |
| Windows | `C:\Program Files\aMule\ed2k.exe` |

To find it on your system:
```bash
which ed2k
```

On Debian/Ubuntu you must install the **`amule-utils`** package (and also **`amule-ed2k`** on Debian) to get the `ed2k` utility.

## Browser Configuration

For instructions on configuring Firefox, Opera, Konqueror, Windows, macOS, and remote handling via `amulecmd`, see [ed2k — ED2K Link Handler](../../manual/utilities/ed2k.md).
