---
id: secure-user-identification
title: Secure User Identification
---

**Secure User Identification** (SUI) is a cryptographic mechanism that allows eD2k clients to authenticate to each other using asymmetric (public-key) encryption. It prevents other clients from impersonating your identity and manipulating your credit account.

SUI is implemented in aMule and eMule. It can be enabled in **Preferences → Connection** (since aMule 2.x; in aMule 2.0.3 it was under **Preferences → Security**). Enabling SUI is strongly recommended.

## Overview

Every aMule client has a permanent **userhash** — a 128-bit value stored in [`~/.aMule/preferences.dat`](../user-guide/amule-files/index.md#preferencesdat). The userhash is the primary identity of a client within the eD2k network and is used by other clients to track accumulated [credits](concepts/index.md).

Without SUI, any client could claim to have your userhash, steal your credits with other clients, or manipulate the credit system. SUI prevents this by associating the userhash with a unique cryptographic private key that only you possess.

## Key Generation — First Start

The first time aMule starts, it generates a **384-bit RSA private key** and stores it in:

```
~/.aMule/cryptkey.dat
```

> **Warning:** [`cryptkey.dat`](../user-guide/amule-files/index.md#cryptkeydat) should be backed up and kept safe. Losing this file means losing your entire accumulated credit history with all other clients, because they cannot verify your identity without the matching public key.

The corresponding **public key** is derived from the private key and shared with other clients during the identification process. Your public key is also associated with your userhash.

## The Identification Process

When two clients that both support SUI connect for the first time, the following exchange takes place:

### 1. First meeting

Both clients exchange:
- Their **public key** (derived from their private RSA key).
- A **random number** (a nonce chosen for this session).

If either client's public key is unknown, it is stored in [`~/.aMule/clients.met`](../user-guide/amule-files/clients-met.md) (only the public key, not the nonce) so it can be used for identification in future sessions.

### 2. Creating the digital signature

Each client creates a **digital signature** from:
1. Its own **private key**.
2. The **public key of the remote client**.
3. The **random number** received from the remote client.

Both clients create and send their own signatures simultaneously.

A digital signature expires when:
- The local client changes its IP address.
- The remote client disconnects.

### 3. Validating the identification

When a client receives the remote client's digital signature, it verifies it by checking:
1. That the signature was created using **your public key** (not someone else's).
2. That it incorporates the **random number you sent** (proving it was created for this specific session, preventing replay attacks).
3. That the signature is consistent with the remote client's **declared private key**.

If both checks pass, the remote client is successfully identified. The process is symmetric — both clients verify each other.

If identification fails, the detecting client **bans** the other client.

## Userhash and Credits

The userhash is the key that other clients use to track your upload/download history with them. Credits earned through uploading are stored in [`~/.aMule/clients.met`](../user-guide/amule-files/clients-met.md), keyed by the remote client's userhash (and, when SUI is active, verified by their public key).

Without SUI, nothing stops a malicious client from claiming your userhash and receiving credit for your uploads. With SUI enabled:
- Your identity is cryptographically proven.
- Credits cannot be stolen by impersonation.
- Credit transfers between sessions are reliable.

## Digital Signatures — Technical Detail

A digital signature in the eD2k context is created from:

```
signature = RSA_sign(private_key, hash(remote_public_key + local_private_key + random_nonce))
```

The remote client verifies:

```
RSA_verify(sender_public_key, signature) == hash(my_public_key + sender_private_key + my_nonce)
```

This proves that the sender possesses the private key matching their declared public key and that the signature was created for this specific session (via the nonce).

## Summary

| Step | Action |
|---|---|
| First start | aMule generates a 384-bit RSA key pair; private key saved to [`cryptkey.dat`](../user-guide/amule-files/index.md#cryptkeydat) |
| First meeting | Both clients exchange public keys and random nonces |
| Identification | Each client signs (private key + other's public key + received nonce) |
| Validation | Each client verifies the signature against the known public key and sent nonce |
| Failure | Detecting client bans the failing client |

## Enabling SUI

In aMule, go to **Preferences → Connection** and enable **Secure User Identification**.

In older versions (aMule 2.0.3), this setting was found under **Preferences → Security**.
