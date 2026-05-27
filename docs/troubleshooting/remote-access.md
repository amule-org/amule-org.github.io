---
id: remote-access
title: Remote Access Troubleshooting
---

# Remote Access Troubleshooting

Problems connecting to aMule remotely via `amulecmd` or `amuleweb`.

## `amulecmd`

### I cannot connect to amuled — it doesn't seem to be listening. What's wrong?

You have probably not enabled **External Connections** in `~/.aMule/amule.conf`. Open aMule (or `amulegui`) and go to **Preferences → Remote Controls**, enable External Connections, and set a password.

You can also generate the `ECPassword` hash manually:

```bash
echo -n 'yourpassword' | md5sum | cut -d ' ' -f 1
```

Paste the resulting MD5 hash as the value of `ECPassword` in `~/.aMule/amule.conf`.

## `amuleweb`

### Why is `amuleweb` failing to connect?

Verify that the `amuleweb` binary and the `amuled`/`amule` binary come from **the same release**. `amuleweb` and aMule binaries from different releases are not compatible — `amuleweb` from 2.0.0-rc3 will not work with aMule 2.0.0-rc4 or any other version.

### Why do I always get "No password specified, login will not be allowed." in aMule 2.2?

This is a common misconfiguration when upgrading from 2.1.x:

1. Configure the web interface password in the **monolithic `amule` or `amulegui`** UI (Preferences → Remote Controls), not manually in config files.
2. Do **not** run `amuleweb --write-config` unless you know exactly what you are doing.
3. After saving preferences, check `~/.aMule/remote.conf` and verify that `Password` and `AdminPassword` contain **MD5-hashed** values (32-character hex strings), not plaintext passwords.

### Why does the web interface keep going back to the login page?

Try **deleting the cookies** for the `amuleweb` domain in your browser. Stale or corrupted session cookies from a previous `amuleweb` session cause this loop.
