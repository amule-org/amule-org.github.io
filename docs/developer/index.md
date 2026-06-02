---
id: index
title: Development
---

This section documents aMule's architecture, development workflow, and technical internals. It is aimed at contributors who want to understand how aMule works before modifying it, and at developers building applications that interface with aMule.

## Component Overview

aMule is distributed as several binaries that share the same on-disk state in `~/.aMule/`:

| Binary | Description |
|---|---|
| [`amule`](../manual/interfaces/gui/amule.md) | All-in-one GUI client. The download engine and the UI run in the same process. |
| [`amuled`](../manual/interfaces/amuled.md) | Headless daemon. Same engine as `amule`, without any UI. Intended for always-on servers, NAS, and VPS deployments. |
| [`amulegui`](../manual/interfaces/gui/amulegui.md) | Remote GUI that connects to a running `amuled` via the [EC protocol](ec-protocol.md). |
| [`amuleweb`](../manual/interfaces/amuleweb.md) | Small HTTP server that exposes a running `amuled` to a web browser. |
| [`amulecmd`](../manual/interfaces/amulecmd.md) | Interactive CLI that connects to a running `amuled` via EC. |
| [`ed2k`](../manual/utilities/ed2k.md) | Tiny helper that hands `ed2k://` URLs from a browser to a running aMule instance. |
| [`alc`](../manual/utilities/alc-alcc.md) / [`alcc`](../manual/utilities/alc-alcc.md) | GUI and console link creators — generate eD2k links from local files. |
| [`cas`](../manual/utilities/wxcas-cas.md) / [`wxcas`](../manual/utilities/wxcas-cas.md) | C and wxWidgets statistics tools — read the `amulesig.dat` online signature file. |
| [`fileview`](file-formats/fileview.md) | Diagnostic tool that dumps the contents of aMule's eD2k and Kad data files. |

`amuled`, `amulegui`, `amuleweb`, and `amulecmd` communicate over the **External Connections (EC) protocol**, a custom binary protocol over a TCP connection. See [EC Protocol](ec-protocol.md) for the full specification.

## Source Tree Layout

```
amule/
├── src/                    # Main application source
│   ├── amule.cpp           # Monolithic app entry point
│   ├── amuled.cpp          # Daemon entry point
│   ├── amule-gui.cpp       # GUI-specific code
│   ├── amule-remote-gui.cpp # Remote GUI (amulegui)
│   ├── ExternalConn.cpp    # EC protocol server-side implementation
│   ├── ED2KLinkParser.cpp  # ed2k URL helper (source of the ed2k binary)
│   ├── ClientList.*        # Connected client management
│   ├── DownloadQueue.*     # Download queue management
│   ├── UploadQueue.*       # Upload slot management
│   ├── MuleCollection.*    # .emulecollection file parser/writer
│   ├── CFile.*             # Low-level file I/O wrapper
│   ├── kademlia/           # Kademlia DHT implementation
│   │   ├── routing/        # Routing zone and contact management
│   │   └── utils/          # UInt128, KadUDPKey, KadClientSearcher
│   ├── utils/              # Standalone utilities (alc, alcc, cas, wxcas, fileview)
│   ├── webserver/          # amuleweb HTTP server
│   └── libs/
│       ├── common/         # Shared helpers: Path, Format, MD5Sum, StringFunctions, etc.
│       └── ec/             # EC protocol client library (used by amulegui, amulecmd)
├── unittests/              # MuleUnit-based test suite
├── cmake/                  # CMake find-modules and build options
├── docs/
│   ├── INSTALL.md          # Build instructions (authoritative)
│   ├── EC_Protocol.md      # EC protocol specification
│   ├── translations.md     # Translation workflow
│   └── man/                # Man pages + po4a translation infrastructure
├── po/                     # UI translation .po files
└── packaging/              # Platform packaging scripts (Linux, macOS, Windows)
```

## Architecture

### Download Engine

The download engine is shared between `amule` (monolithic) and `amuled` (daemon). It manages:

- **Download queue** (`DownloadQueue.*`): queued and active downloads, source aggregation, priority management.
- **Upload queue** (`UploadQueue.*`): upload slot allocation, per-client scoring, bandwidth throttling.
- **Client list** (`ClientList.*`): all known clients, deduplication, banning.
- **[Kademlia DHT](../p2p-networks/kademlia.md)** (`src/kademlia/`): peer discovery, file search, source finding without a central server.
- **[eD2k server connection](../p2p-networks/ed2k/servers.md)**: TCP connection to one active eD2k server for indexing and source finding.

### GUI Layer

The GUI is built with **wxWidgets** (minimum version 3.2.0). It is completely separated from the engine: all engine state is accessed through a thin application layer (the `CamuleAppCommon` class). The same application layer is used by both the monolithic client and the daemon, enabling the remote GUI to display identical information.

### Remote Control (EC Protocol)

`amuled` listens on a configurable TCP port (default: 4712) for External Connections. Clients authenticate with a salted MD5 challenge-response (the server sends a random salt, the client replies with `MD5(MD5(password) + MD5(salt))`), then exchange structured binary packets to query state and issue commands. The protocol is documented in [EC Protocol](ec-protocol.md).

### File Transfer

- Files in progress are stored as [`<NNN>.part` + `<NNN>.part.met`](file-formats/part-met.md) — sequentially numbered (e.g. `001.part`) — in the Temp directory (see [Download Folders](../manual/configuration/download-folders.md)).
- Completed files are moved to the Incoming directory.
- File integrity is verified using [**AICH**](../p2p-networks/ed2k/aich.md) (Advanced Intelligent Corruption Handling) — a Merkle-tree-like hash structure that allows per-chunk verification and selective re-download of corrupted parts.

### Kademlia

aMule includes a full implementation of the **[Kademlia DHT](../p2p-networks/kademlia.md)** used by the [eD2k network](../p2p-networks/ed2k/index.md). The implementation is in `src/kademlia/`. Key types:

- `CUInt128` — 128-bit unsigned integer used as node/file identifiers.
- `CRoutingZone` — the routing table, organized as a binary tree of zones; each zone is either an internal node (with two sub-zones) or a leaf node holding a *bin* of contacts.
- `CContact` — a single Kad peer (IP, port, type, last-seen time).

## Code Documentation

The aMule source code is documented with **Doxygen** comments. To generate the HTML reference:

```sh
# Install doxygen (Debian/Ubuntu)
sudo apt install doxygen

# Generate documentation
cd /path/to/amule
doxygen docs/Doxyfile
# Output goes to docs/html/ (set by OUTPUT_DIRECTORY + HTML_OUTPUT in the Doxyfile)
```

The generated HTML lets you browse all classes, methods, and their relationships interactively.

Documentation comments follow the Doxygen syntax described in the [Coding Style](./code-style.md#documentation-comments) guide. Documentation goes in header files; implementation files use plain C++ comments for inline explanations.

## Development Workflow

### Setting Up

Install the platform-specific build dependencies first — see the [Compilation](compilation/index.md) guides for [Windows](compilation/windows.md), [macOS](compilation/macos.md), [Linux](compilation/linux.md), and [BSD](compilation/bsd.md).

```sh
git clone https://github.com/amule-org/amule.git
cd amule

# Install platform-specific dependencies — see the Compilation guides
# Then configure and build in Debug mode
cmake -B build -DCMAKE_BUILD_TYPE=Debug \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES \
    -DBUILD_AMULECMD=YES \
    -DBUILD_TESTING=YES
cmake --build build -j"$(nproc)"
```

### Running from the Build Directory

All built binaries are placed in `build/` and can be run directly without installing:

```sh
./build/amule
./build/amuled --full-daemon
```

This is convenient during development — no need to `sudo cmake --install` for every change.

### Installing Locally (No sudo)

```sh
cmake --install build --prefix=$HOME/.local
```

Binaries go to `~/.local/bin/`, shared data to `~/.local/share/amule/`. Uninstall by removing files listed in `build/install_manifest.txt`:

```sh
xargs rm -f < build/install_manifest.txt
```

### Running the Tests

```sh
ctest --test-dir build --output-on-failure
```

See [Testing](testing.md) for details on the test suite and how to add new tests.

### Debugging Crashes

See [Debugging](debugging.md) for instructions on:

- Building with debug symbols
- Generating GDB backtraces
- Using valgrind to find memory errors

## Further Reading

- [Compilation](compilation/index.md) — build system, dependencies, and platform-specific notes
- [Debugging](debugging.md) — GDB backtraces and valgrind usage
- [Testing](testing.md) — unit tests and virtual test network
- [Translations](./translations.md) — gettext workflow and po4a for man pages
- [Documentation](./documentation.md) — documentation website structure, writing guidelines, and PR workflow
- [Coding Style](./code-style.md) — formatting, naming, and forbidden patterns
- [File Formats](file-formats/index.md) — on-disk layout of aMule's binary `.met` and `.dat` files
- [`fileview`](file-formats/fileview.md) — console tool that dumps the decoded contents of those binary files
- [EC Protocol](ec-protocol.md) — binary protocol used by remote control clients
