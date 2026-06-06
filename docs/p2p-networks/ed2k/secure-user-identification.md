---
id: secure-user-identification
title: Secure User Identification
---

**Secure User Identification** (SUI) is a cryptographic mechanism that allows [eD2k](./index.md) clients to authenticate to each other using asymmetric (public-key) encryption. It prevents other clients from impersonating your identity and manipulating your credit account.

SUI is implemented in aMule and eMule. It can be enabled in [**Preferences → Security**](../../manual/interfaces/gui/preferences.md#security). Enabling SUI is strongly recommended.

## Overview

Every aMule client has a permanent [**userhash**](../concepts.md#userhash) — a 128-bit value stored in [`~/.aMule/preferences.dat`](../../manual/configuration/config-files/index.md#preferencesdat). The userhash is the primary identity of a client within the eD2k network and is used by other clients to track accumulated [credits](../concepts.md#credits).

Without SUI, any client could claim to have your userhash, steal your credits with other clients, or manipulate the credit system. SUI prevents this by associating the userhash with a unique cryptographic private key that only you possess.

## Key Generation — First Start

The first time aMule starts, it generates a **384-bit RSA private key** and stores it in:

```
~/.aMule/cryptkey.dat
```

> **Warning:** [`cryptkey.dat`](../../manual/configuration/config-files/index.md#cryptkeydat) should be backed up and kept safe. Losing this file means losing your entire accumulated credit history with all other clients, because they cannot verify your identity without the matching public key.

The corresponding **public key** is derived from the private key and shared with other clients during the identification process. Your public key is also associated with your userhash.

## The Identification Process

When two clients that both support SUI connect for the first time, the following exchange takes place:

### 1. First meeting

Both clients exchange:
- Their **public key** (derived from their private RSA key).
- A **random number** (a nonce chosen for this session).

If either client's public key is unknown, it is stored in [`~/.aMule/clients.met`](../../developer/file-formats/clients-met.md) (only the public key, not the nonce) so it can be used for identification in future sessions.

### 2. Creating the digital signature

Each client **signs**, with its own **private key**, a message built from:
1. The **public key of the remote client**.
2. The **random number** received from the remote client.

The private key is only used to *sign*; it is never part of the signed message. Both clients create and send their own signatures simultaneously.

Identification is re-performed on every connection and is bound to the IP address it was verified with. It is no longer valid when:
- The remote client reconnects from a **different IP address** (until it identifies again).
- The remote client disconnects (a new session requires a fresh identification).

Optionally (signature *v2*), the client's IP address is also included in the signed message to harden the exchange against certain relay/spoofing attacks. See [Digital Signatures — Technical Detail](#digital-signatures--technical-detail).

### 3. Validating the identification

When a client receives the remote client's digital signature, it verifies it using the remote client's **public key** against a message it reconstructs locally from:
1. **Your own public key** (proving the signature was made for you, not someone else).
2. The **random number you sent** (proving it was created for this specific session, preventing replay attacks).

A valid signature proves that the sender possesses the private key matching the public key it declared (clients only ever declare a **public** key, never a private one). If verification passes, the remote client is successfully identified. The process is symmetric — both clients verify each other.

If identification fails, the client is **not credited**: while secure identification is available, no upload/download credits are accumulated for an unidentified peer (its [score](../concepts.md#rate-score-modifier) drops to the minimum). aMule does not [ban](../concepts.md#ban) the peer — it simply does not trust its claimed identity.

## Userhash and Credits

The userhash is the key that other clients use to track your upload/download history with them. Credits earned through uploading are stored in [`~/.aMule/clients.met`](../../developer/file-formats/clients-met.md), keyed by the remote client's userhash (and, when SUI is active, verified by their public key).

Without SUI, nothing stops a malicious client from claiming your userhash and receiving credit for your uploads. With SUI enabled:
- Your identity is cryptographically proven.
- Credits cannot be stolen by impersonation.
- Credit transfers between sessions are reliable.

> **Note:** The first time a peer is securely identified, any credits previously recorded for it (accumulated before its public key was known) are **wiped** as a security precaution — the unverified history is discarded and credit accounting restarts under the now-proven identity.

## Digital Signatures — Technical Detail

aMule signs with **RSASSA-PKCS#1 v1.5 over SHA-1** (provided by the Crypto++ library). The SHA-1 hash is computed internally by the signature scheme; the input message is the concatenation of the remote public key and the nonce. The private key is used only to sign — it is never included in the signed message.

The signer builds and signs:

```
message   = remote_public_key + random_nonce          (signature v1)
message   = remote_public_key + random_nonce + IP + IP_kind   (signature v2)
signature = RSASSA_PKCS1v15_SHA_sign(local_private_key, message)
```

The remote client verifies the signature with the sender's public key against a message it reconstructs from its own data:

```
RSASSA_PKCS1v15_SHA_verify(sender_public_key, signature, my_public_key + my_nonce [+ IP + IP_kind])
```

This proves that the sender possesses the private key matching their declared public key, and that the signature was created for this specific session (via the nonce).

### Signature v2 — IP binding

The original signature (*v1*) covers only the remote public key and the nonce. A later revision (*v2*) appends the relevant IP address (4 bytes) plus a one-byte *IP kind* flag to the signed message, binding the identification to the peer's network address to harden it against relay/spoofing. The IP kind selects whose address is signed — the local client's, the remote client's, or none — depending on the connection's [High-ID/Low-ID](./high-id.md) situation. v2 is negotiated through the clients' secure-identification capability flags.

## Summary

| Step | Action |
|---|---|
| First start | aMule generates a 384-bit RSA key pair; private key saved to [`cryptkey.dat`](../../manual/configuration/config-files/index.md#cryptkeydat) |
| First meeting | Both clients exchange public keys and random nonces |
| Identification | Each client signs (other's public key + received nonce) with its own private key |
| Validation | Each client verifies the signature with the sender's public key against (own public key + sent nonce) |
| Failure | No credits are accumulated for the unidentified peer (no ban) |

## Enabling SUI

In aMule, go to [**Preferences → Security**](../../manual/interfaces/gui/preferences.md#security) and enable **Use Secure User Identification**.
