---
id: index
title: Development
---

This section documents aMule's architecture, development workflow, and technical internals. It is aimed at contributors who want to understand how aMule works before modifying it, and at developers building applications that interface with aMule.

## Component Overview

aMule is distributed as several binaries that share the same on-disk state in `~/.aMule/`:

| Binary | Description |
|---|---|
| `amule` | All-in-one GUI client. The download engine and the UI run in the same process. |
| `amuled` | Headless daemon. Same engine as `amule`, without any UI. Intended for always-on servers, NAS, and VPS deployments. |
| `amulegui` | Remote GUI that connects to a running `amuled` via the [EC protocol](ec-protocol.md). |
| `amuleweb` | Small HTTP server that exposes a running `amuled` to a web browser. |
| `amulecmd` | Interactive CLI that connects to a running `amuled` via EC. |
| `ed2k` | Tiny helper that hands `ed2k://` URLs from a browser to a running aMule instance. |
| `alc` / `alcc` | GUI and console link creators — generate eD2k links from local files. |
| `cas` / `wxcas` | C and wxWidgets statistics tools — read the `amulesig.dat` online signature file. |

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
│   ├── ClientList.*        # Connected client management
│   ├── DownloadQueue.*     # Download queue management
│   ├── UploadQueue.*       # Upload slot management
│   ├── kademlia/           # Kademlia DHT implementation
│   │   ├── routing/        # Routing zone and contact management
│   │   └── utils/          # UInt128, KadSearchTerm, etc.
│   ├── utils/              # Standalone utilities (alc, alcc, cas, wxcas, ed2k)
│   ├── webserver/          # amuleweb HTTP server
│   └── lib/
│       ├── common/         # Shared library: MuleCollection, CFile, etc.
│       ├── ec/             # EC protocol client library (used by amulegui, amulecmd)
│       └── ...
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
- **Kademlia DHT** (`src/kademlia/`): peer discovery, file search, source finding without a central server.
- **eD2k server connection**: TCP connection to one active eD2k server for indexing and source finding.

### GUI Layer

The GUI is built with **wxWidgets** (minimum version 3.2.0). It is completely separated from the engine: all engine state is accessed through a thin application layer (`amuleAppCommon`). The same application layer is used by both the monolithic client and the daemon, enabling the remote GUI to display identical information.

### Remote Control (EC Protocol)

`amuled` listens on a configurable TCP port (default: 4712) for External Connections. Clients authenticate with an MD5-hashed password, then exchange structured binary packets to query state and issue commands. The protocol is documented in [EC Protocol](ec-protocol.md).

### File Transfer

- Files in progress are stored as `<hash>.part` + `<hash>.part.met` in the Temp directory (see [Download Folders](../manual/configuration/download-folders.md)).
- Completed files are moved to the Incoming directory.
- File integrity is verified using **AICH** (Advanced Intelligent Corruption Handling) — a Merkle-tree-like hash structure that allows per-chunk verification and selective re-download of corrupted parts.

### Kademlia

aMule includes a full implementation of the **Kademlia DHT** used by the eD2k network. The implementation is in `src/kademlia/`. Key types:

- `CUInt128` — 128-bit unsigned integer used as node/file identifiers.
- `CRoutingZone` — the routing table; partitioned into 128 zones organized as a binary tree.
- `CContact` — a single Kad peer (IP, port, type, last-seen time).

## Code Documentation

The aMule source code is documented with **Doxygen** comments. To generate the HTML reference:

```sh
# Install doxygen (Debian/Ubuntu)
sudo apt install doxygen

# Generate documentation
cd /path/to/amule
doxygen docs/Doxyfile
# Output goes to build/docs/html/ (or the OUTPUT_DIRECTORY in Doxyfile)
```

The generated HTML lets you browse all classes, methods, and their relationships interactively.

Documentation comments follow the Doxygen syntax described in the [Coding Style](./code-style.md#documentation-comments) guide. Documentation goes in header files; implementation files use plain C++ comments for inline explanations.

## Development Workflow

### Setting Up

```sh
git clone https://github.com/amule-org/amule.git
cd amule

# Install platform-specific dependencies — see Compilation guides
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

See [Debugging with GDB and Valgrind](debugging.md) for instructions on:

- Building with debug symbols
- Generating GDB backtraces
- Using valgrind to find memory errors

## Further Reading

- [EC Protocol](ec-protocol.md) — binary protocol used by remote control clients
- [Compilation](compilation/index.md) — build system, dependencies, and platform-specific notes
- [Debugging](debugging.md) — GDB backtraces and valgrind usage
- [Testing](testing.md) — unit tests and virtual test network
- [Coding Style](./code-style.md) — formatting, naming, and forbidden patterns
- [Translations](../contributing/translations.md) — gettext workflow and po4a for man pages
