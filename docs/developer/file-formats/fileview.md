---
id: fileview
title: fileview
---

`fileview` is a small **command-line diagnostic tool** that dumps the decoded contents of aMule's binary data files to standard output. It is the practical companion to the format references on these pages: where the other File Formats pages document the byte layout of each file, `fileview` is what you run to actually decode and inspect a real file against that layout.

It is **read-only** — it never modifies the files it reads — which makes it safe to point at a live [`~/.aMule/`](../../manual/configuration/config-files/index.md) directory while debugging.


## Building

`fileview` is **experimental and not built by default**. Enable it explicitly with the `BUILD_FILEVIEW` CMake option (or implicitly via `BUILD_EVERYTHING`):

```sh
cmake -B build -DBUILD_FILEVIEW=ON
cmake --build build -j"$(nproc)"
```

The resulting `fileview` binary is placed in `build/` and installed to `bin/` on `cmake --install`. See the [Compilation](../compilation/index.md) guides for the full build setup.

## Usage

```sh
fileview [options] <input file>...
```

It decides how to decode each file from its **base name** (e.g. `server.met`, `nodes.dat`), so the path may point anywhere — typically inside `~/.aMule/`. One or more files can be passed at once; each is decoded in turn.

```sh
# Decode a single file
fileview ~/.aMule/server.met

# Decode several files in one run
fileview ~/.aMule/nodes.dat ~/.aMule/clients.met
```

### Options

| Option | Description |
|---|---|
| `-h`, `--help` | Show usage and exit. |
| `-v`, `--version` | Show the program version and exit. |
| `-s`, `--strings <mode>` | How to decode string fields. `display` (default), `safe`, `utf8`, or `none`. |

The `--strings` mode controls how text fields (file names, nicknames, server descriptions, …) are rendered: `display` decodes them for human reading, `safe` escapes non-printable characters, `utf8` forces UTF-8 interpretation, and `none` leaves the raw bytes untouched.

## Supported files

`fileview` recognizes the following files. Each links to its on-disk format reference:

| File | Contents |
|---|---|
| [`server.met`](./server-met.md) | eD2k server list |
| [`nodes.dat`](./nodes-dat.md) | Kademlia bootstrap contacts |
| [`clients.met`](./clients-met.md) | Credit ledger for known clients |
| [`emfriends.met`](./emfriends-met.md) | Friends list |
| [`*.part.met`](./part-met.md) | Metadata of an in-progress download |
| [`preferences.dat`](./index.md#preferencesdat) | Config version and userhash |
| [`preferencesKad.dat`](./index.md#preferenceskaddat) | Client IP and Kademlia ClientID |
| [`known.met`](./index.md#knownmet) | Cached metadata of shared files |
| [`canceled.met`](./index.md#canceledmet) | Hashes of cancelled downloads |
| [`statistics.dat`](./index.md#statisticsdat) | Lifetime upload/download totals |
| [`key_index.dat`, `src_index.dat`, `load_index.dat`](./index.md#key_indexdat-and-load_indexdat) | Kademlia index data published by this node |

Passing any other file prints an error — `fileview` does not attempt to guess the format of unknown files.
