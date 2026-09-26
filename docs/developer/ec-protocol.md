---
id: ec-protocol
title: EC Protocol
---

The **External Connections (EC) protocol** is the binary TCP protocol that aMule's remote tools use to control a running core. [`amulegui`](../manual/interfaces/gui/amulegui.md), [`amuleapi`](../manual/interfaces/amuleapi/index.md), [`amulecmd`](../manual/interfaces/amulecmd.md) and [`amuleweb`](../manual/interfaces/amuleweb.md) are all EC clients of [`amuled`](../manual/interfaces/amuled.md) (or of the monolithic [`amule`](../manual/interfaces/gui/amule.md)). The core listens on TCP port **4712** by default; whether it listens at all, on which address, and with which password is set in [Preferences → Remote Controls](../manual/interfaces/gui/preferences.md#remote-controls) or the [`[ExternalConnect]`](../manual/configuration/config-files/amule-conf.md#externalconnect-section) section of `amule.conf`.

:::tip Use the REST API for applications and scripts
If you are writing an application, a script, a bot or a web front-end, use the **[`amuleapi` REST API](../manual/interfaces/amuleapi/index.md)** instead of speaking EC directly. It exposes the same functionality as plain JSON over HTTP with a versioned `/api/v1` contract, a Server-Sent Events stream for live updates and token-based authentication, and it works with any HTTP client (`curl`, Python `requests`, JavaScript `fetch`, …). `amuleapi` handles the EC connection, encryption and incremental updates for you. Implement EC directly only when you need a native, low-level client.
:::

:::warning
EC evolves quickly: opcodes, tag names and tag contents change between releases, often within a single release cycle. This page is only an overview. The authoritative, up-to-date specification is maintained in the aMule source repository (see [Reference](#reference)). The core accepts only clients that announce exactly its own protocol version (`EC_CURRENT_PROTOCOL_VERSION`, `0x0204` in aMule 3.1.0) and refuses any other, so an EC client must announce that version. `0x0204` has not changed since aMule 2.3.x: new features are negotiated as capabilities instead of bumping the version. A release core also refuses clients built from a development snapshot.
:::

## Overview

EC has two layers:

1. **Transmission layer** — every packet starts with an 8-byte header: a 4-byte flags word and a 4-byte body length, both big-endian. The flags say how the body is encoded: zlib-compressed, integers packed as UTF-8, sealed by [transport encryption](#transport-encryption), or using the extended tag count for very large replies.
2. **Application layer** — the body is a tree: a one-byte **opcode** saying what the packet is (a request, a reply, a notification), followed by nested, typed **tags** (integers, strings, hashes, IP addresses, or custom binary data), each of which may carry sub-tags. The protocol can be thought of as a binary XML.

A session is a request/response loop: the client sends a request packet and the core answers with a reply packet. Large lists (downloads, shared files, clients, servers) can be fetched **incrementally**, so after the first full reply the core only sends what changed.

The same tag-encoding idea (a type, a name and a type-dependent value) underlies aMule's on-disk binary files; see [File Formats](file-formats/index.md).

## Authentication

Every session starts with a challenge-response login:

1. The client sends an authentication request with its name and version, the EC protocol version, and the optional **capabilities** it supports (zlib, UTF-8 numbers, notifications, large tag counts, partial incremental updates, encryption, …).
2. The core replies with a random **salt**.
3. The client answers with a hash of the password combined with the salt, so the password itself never travels over the network.
4. The core replies with success (including its own version and the capabilities that change reply formats or add opcodes, echoed back) or failure.

Encoding capabilities such as zlib or UTF-8 numbers are simply used by the core once the client announces them; the others are active only if the core echoes them. This keeps old and new clients and cores interoperable.

Failed logins are throttled per client IP: after `AuthFailureThreshold` failures (default 10) within a sliding `AuthFailureWindowSeconds` window (default 60 s), that IP is locked out for `AuthLockoutSeconds` (default 300 s). These keys are config-only and read when the core starts; see [`[ExternalConnect]`](../manual/configuration/config-files/amule-conf.md#externalconnect-section).

## Transport Encryption

:::note
This functionality is available from aMule 3.1.0 onwards.
:::

Everything after the login can be encrypted with authenticated encryption. Encryption is negotiated during the authentication exchange:

- **Key exchange** — both sides send random nonces and an ephemeral **X25519** public key; the session keys are derived with **HKDF-SHA256** from the X25519 shared secret only, never from the password. The ephemeral private keys are discarded immediately, which gives **forward secrecy**: a password learned later cannot decrypt a recorded session. Each direction has its own key.
- **Ciphers** — **AES-128-GCM** (mandatory) and **ChaCha20-Poly1305** (optional). Each side lists the ciphers it supports in its own preference order, putting AES first when it has hardware AES support and ChaCha20-Poly1305 first otherwise; the core picks the first one it also supports.
- **Key confirmation** — both sides prove knowledge of the password over the handshake transcript, which defeats a man-in-the-middle relaying between two separate key exchanges. The offered cipher list and the chosen cipher are bound into the keys, so tampering with the negotiation makes the session fail instead of silently downgrading.
- **On the wire** — the 8-byte header stays in clear; the body is compressed first (if zlib is on) and then sealed, adding 16 bytes per packet. The core's login-success reply is the first sealed packet. A missing or invalid confirmation, or a packet that fails authentication, drops the connection — there is no fallback to clear text.

Whether to encrypt is the **client's** choice, and every aMule client offers encryption by default: it can be turned off with `--disable-ec-encryption` on `amulecmd`, `amuleweb` and `amuleapi`, the `Encryption` key of [`remote.conf`](../manual/configuration/config-files/remote-conf.md#ec-section), the connection dialog of `amulegui`, or `[EC] Encryption` in [`amuleapi.conf`](../manual/configuration/config-files/amuleapi-conf.md#ec-section). The core can **require** encryption with the `RequireEncryption` key (**Require encrypted connections** in [Preferences → Remote Controls](../manual/interfaces/gui/preferences.md#remote-controls)), in which case clients that do not negotiate a cipher are refused at login.

## Implementing an EC Client

A native EC client opens a TCP connection to the core, performs the [authentication](#authentication) exchange (with or without [encryption](#transport-encryption)), and then runs a request/response loop. Advertise only the capabilities you implement — a client that advertises none gets the simplest encoding — and rely on an echoed capability only if the core returned it in its login reply. Do not send opcodes the core may not know: an older core logs an error, trips a debug assertion and answers with a failure reply. Always read integers with a width-agnostic reader: the core encodes each integer with the narrowest type that fits its value.

The canonical implementation lives in the aMule source tree:

- `src/libs/ec/cpp/` — C++ EC library used by the core and by every aMule EC client (tag encoding in `ECTag.cpp`, transmission layer in `ECSocket.cpp`, encryption in `ECCrypt.cpp`).
- `src/libs/ec/abstracts/ECCodes.abstract` — every opcode, tag name and value (the generated `ECCodes.h` is built from it).
- `src/ExternalConn.cpp` — the server side in the core.

## Reference

The full, authoritative specification lives in the aMule source repository (do not treat this page as the contract):

- [`docs/EC_Protocol.md`](https://github.com/amule-org/amule/blob/master/docs/EC_Protocol.md) — the protocol specification: transmission and application layers, data types, transport encryption, annotated wire examples and notable tag types.
- [`src/libs/ec/abstracts/ECCodes.abstract`](https://github.com/amule-org/amule/blob/master/src/libs/ec/abstracts/ECCodes.abstract) — opcode and tag definitions.
- [`src/ExternalConn.cpp`](https://github.com/amule-org/amule/blob/master/src/ExternalConn.cpp) — how the core builds each reply.

For scripting and application development, see the [`amuleapi` REST API](../manual/interfaces/amuleapi/index.md) and its [`docs/api/REFERENCE.md`](https://github.com/amule-org/amule/blob/master/docs/api/REFERENCE.md).
