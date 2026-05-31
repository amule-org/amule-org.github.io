---
id: amulegui
title: amulegui — Remote GUI
---

`amulegui` is a standalone graphical client that connects to a running `amuled` instance over the network using the External Connections (EC) protocol. It provides the same interface as the monolithic `amule` client, but without running the core locally.

## Overview

`amulegui` was introduced in aMule 2.0.0-rc7 and ships with the official tarball. It is the preferred option when you want a full graphical interface to a headless `amuled` running on a remote machine or on the same machine in a different session.

If your connection to the `amuled` host is slow or unreliable, consider using [`amulecmd`](../amulecmd.md) (CLI) or [`amuleweb`](../amuleweb.md) (browser) instead, as those interfaces transfer less data per interaction.

### Known Limitations

- No support for file comments (as of 2.1.0).
- Occasional crashes when used remotely (reported in 2.0.3 and 2.1.0).
- Feature parity with the local `amule` GUI is the design goal but may lag behind in practice.

## Compilation

To build `amulegui` together with `amuled`:

```sh
git clone https://github.com/amule-org/amule.git
cd amule

cmake -B build \
    -DBUILD_REMOTEGUI=YES \
    -DBUILD_DAEMON=YES

cmake --build build -j"$(nproc)"
sudo cmake --install build
```

For dependency installation and all available CMake options see [Compilation](../../../developer/compilation/index.md).

## Connecting to amuled

Before `amulegui` can connect, `amuled` must have External Connections enabled and a password configured.

### Configuring amuled for EC

1. In [`~/.aMule/amule.conf`](../../configuration/files/amule-conf.md), set:

   ```ini
   [ExternalConnect]
   AcceptExternalConnections=1
   ECPassword=<md5hash>
   ECPort=4712
   ```

2. Generate the MD5 hash of your chosen password:

   ```bash
   echo -n yourpassword | md5sum | cut -d ' ' -f 1
   ```

   Paste the result (without trailing whitespace) as the value of `ECPassword`.

3. To allow connections only from the local machine:

   ```ini
   ECAddress=127.0.0.1
   ```

### Connecting from amulegui

When `amulegui` starts, it presents a connection dialog. Enter:

- **Host/IP** — hostname or IP address of the machine running `amuled` (use `127.0.0.1` for the local machine).
- **Port** — EC port (default: `4712`).
- **Password** — the plaintext password (not the MD5 hash); `amulegui` hashes it internally before sending.

Once connected, the full aMule interface becomes available, with the same panels as the local `amule` client (Networks, Searches, Transfers, Shared Files, Messages, Statistics, Preferences).
