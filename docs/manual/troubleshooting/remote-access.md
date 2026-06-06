---
id: remote-access
title: Remote Access
---

Problems connecting to aMule remotely via [`amulecmd`](../interfaces/amulecmd.md) or [`amuleweb`](../interfaces/amuleweb.md). For an overview of the remote-control tools, see the [Remote Access FAQ](../faq.md#remote-access).

## `amulecmd`

### I cannot connect to `amuled` — it doesn't seem to be listening. What's wrong?

You have probably not enabled **External Connections**. Open aMule (or [`amulegui`](../interfaces/gui/amulegui.md)), go to [**Preferences → Remote Controls**](../interfaces/gui/preferences.md#remote-controls), check **Accept External Connections**, and set a password. The setting is stored in the [`[ExternalConnect]` section of `~/.aMule/amule.conf`](../configuration/config-files/amule-conf.md#externalconnect-section).

You can also generate the `ECPassword` hash manually:

```bash
echo -n 'yourpassword' | md5sum | cut -d ' ' -f 1
```

Paste the resulting MD5 hash as the value of `ECPassword` in `~/.aMule/amule.conf`. See [`amulecmd` → Configuration](../interfaces/amulecmd.md#configuration) for the full setup.

**Connecting from another machine?** By default aMule listens for EC connections on all interfaces (`ECAddress` empty). If `ECAddress` is set to `127.0.0.1`, only local tools can connect — leave it empty for remote access. Also make sure the EC port (`4712` by default) is reachable: see [Ports used by aMule](../configuration/network-connectivity.md#ports-used-by-amule) and the [Firewall](../configuration/firewall.md) guide.

## `amuleweb`

### Why is `amuleweb` failing to connect?

Verify that the [`amuleweb`](../interfaces/amuleweb.md) binary and the [`amuled`](../interfaces/amuled.md)/[`amule`](../interfaces/gui/amule.md) binary come from **the same release**. `amuleweb` and aMule binaries from different releases negotiate the [EC protocol](../../developer/ec-protocol.md) version on connect, and a mismatch is rejected with *"Invalid protocol version."*

If both binaries match, the failure is usually a wrong EC password, host, or port, or External Connections not being enabled on the aMule side — check the [amulecmd connection answer above](#i-cannot-connect-to-amuled--it-doesnt-seem-to-be-listening-whats-wrong) and follow the [`amuleweb` step-by-step setup](../interfaces/amuleweb.md#step-by-step-setup).

### Why do I always get "No password specified, login will not be allowed."?

This message means the **web interface has no admin password and no guest password set** — it is about the web server login, not the [EC password](../configuration/config-files/amule-conf.md#externalconnect-section) used to reach `amuled`. Without at least one password, `amuleweb` refuses every login.

To fix it, set the web interface admin password:

- When running `amuleweb` standalone, pass `--admin-pass` (or write it to the config first with `--write-config`). See [Password Setup](../interfaces/amuleweb.md#password-setup) and the [Step-by-Step Setup](../interfaces/amuleweb.md#step-by-step-setup).
- When `amuleweb` is launched automatically by the monolithic [`amule`](../interfaces/gui/amule.md), set it in [**Preferences → Remote Controls → Web server parameters**](../interfaces/gui/preferences.md#web-server-parameters).

After saving, check the [`[WebServer]` section of `~/.aMule/remote.conf`](../configuration/config-files/remote-conf.md#webserver-section) and verify that `AdminPassword` (and `GuestPassword`, if you allow guest access) contain a **hashed 32-character hexadecimal string**, not a plaintext password and not an empty value.

### Why does the web interface keep going back to the login page?

Try **deleting the cookies** for the `amuleweb` domain in your browser. `amuleweb` tracks logins with an `amuleweb_session_id` session cookie, and a stale or corrupted cookie from a previous session can cause this loop.

If clearing cookies does not help and the loop happens from the very first login attempt, the cause is usually a missing web interface password rather than the cookie — see [the answer above](#why-do-i-always-get-no-password-specified-login-will-not-be-allowed). Refer to the [`amuleweb`](../interfaces/amuleweb.md) documentation for full setup details.
