---
id: ipfilter
title: IP Filter
---

The IP Filter blocks all traffic to and from a configurable list of IP addresses and IP ranges. Blocked IPs cannot upload to you or download from you.

The filter is read from two files in `~/.aMule/`:

| File | Description |
|---|---|
| `ipfilter.dat` | Main filter list. Downloaded from external sources or maintained manually. |
| `ipfilter_static.dat` | Static filter list. Always applied regardless of the dynamic list. Entries here cannot be overridden. |

For the file formats, see [aMule Files](./files/index.md).

aMule's `ipfilter.dat` is 100% compatible with eMule's.

## Enabling and configuring the IP Filter

The IP Filter is controlled in **Preferences → Security → IP-Filtering**:

| Setting | Description |
|---|---|
| **Enable IP-Filtering** | Enable or disable the IP filter. |
| **Filtering Level** | Set the filter access level (0–255). Entries in `ipfilter.dat` with an access level below this value are blocked. Common values: `0` = block only the most dangerous IPs; `127` = balanced; `255` = paranoid (blocks a large number of IPs). |
| **Always filter LAN IPs** | Always block IPs claiming to be in a local LAN range. |
| **Auto-update ipfilter at startup** | Download an updated `ipfilter.dat` from the URL in the **URL** box every time aMule starts. |
| **URL** | URL of the `ipfilter.dat` file to download automatically. |
| **Update now** | Download the filter from the URL immediately. |
| **Reload List** | Reload `ipfilter.dat` from disk and re-check all active connections. |

In aMule versions up to 2.0.0-rc8 the IP-Filtering options are located under **Preferences → Server** instead of **Preferences → Security**.

## Using a system-wide ipfilter.dat

By default aMule loads `~/.aMule/ipfilter.dat`. If you enable **Use system-wide ipfilter.dat if available** (in **Preferences → Security**), aMule will also look for `/usr/share/amule/ipfilter.dat` if loading the local file fails. This allows the system-wide file to be maintained by a package manager or cron job, so aMule does not have to re-download a large file at every startup.

This option is disabled by default in the 2.2.2 stable build.

## IP Filter sources

The only currently maintained source is the eMule Security project list. aMule downloads and decompresses it automatically:

```
https://upd.emule-security.org/ipfilter.zip
```

Insert this URL in **Preferences → Security → IP filtering → URL**. For file format details and configuration reference, see [aMule Files → ipfilter.dat](./files/index.md#ipfilterdat).

## Hard-coded IP filter

Regardless of the `ipfilter.dat` contents, aMule always filters the following IP ranges defined by [RFC 3330](https://www.rfc-editor.org/rfc/rfc3330). These represent reserved, private, or special-use addresses that should never appear as eD2k peers:

```
0.0.0.0/8         "This" Network                        [RFC1700, page 4]
10.0.0.0/8        Private-Use Networks                  [RFC1918]
14.0.0.0/8        Public-Data Networks                  [RFC1700, page 181]
24.0.0.0/8        Cable Television Networks
39.0.0.0/8        Reserved but subject to allocation    [RFC1797]
127.0.0.0/8       Loopback                              [RFC1700, page 5]
128.0.0.0/16      Reserved but subject to allocation
169.254.0.0/16    Link Local
172.16.0.0/12     Private-Use Networks                  [RFC1918]
191.255.0.0/16    Reserved but subject to allocation
192.0.0.0/24      Reserved but subject to allocation
192.0.2.0/24      Test-Net
192.88.99.0/24    6to4 Relay Anycast                    [RFC3068]
192.168.0.0/16    Private-Use Networks                  [RFC1918]
198.18.0.0/15     Network Interconnect Device
                  Benchmark Testing                     [RFC2544]
223.255.255.0/24  Reserved but subject to allocation
224.0.0.0/4       Multicast                             [RFC3171]
240.0.0.0/4       Reserved for Future Use               [RFC1700, page 4]
```

To stop filtering these ranges, uncheck **Preferences → Security → IP-filtering → Always filter bad IPs**. In aMule versions up to 2.0.0-rc8 this option is under **Preferences → Server → Always filter bad IPs**.
