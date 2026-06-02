---
id: firewall
title: Firewall
---

By default, firewalls and routers block incoming connections. To achieve a [High ID](../../p2p-networks/ed2k/high-id.md) and the best possible transfer performance with aMule, three ports must be reachable from the internet: the standard client **TCP** port (default `4662`), the extended client **UDP** port (default `4672`) and the extended server requests **UDP** port (default `4665`, always TCP+3). The port numbers are configurable in **Preferences → Connection**.

For what each port does and the minimum requirements per network, see [Network Connectivity → Ports used by aMule](./network-connectivity.md#ports-used-by-amule). This page covers the firewall side: opening the ports in a personal firewall, forwarding them on a Linux or BSD machine acting as a NAT gateway, and the extra rules UPnP needs. To forward the ports on a **consumer router**, see [Network Connectivity → Step 3](./network-connectivity.md#step-3--forward-the-ports-on-your-router-nat).

:::note UPnP
aMule supports [UPnP](./upnp.md) to configure router ports automatically. If your router supports UPnP (most consumer routers do), enabling it is the easiest option and you may not need any manual port forwarding at all.
:::

:::note Kademlia and NAT remapping
If you have a High ID but Kademlia still shows "firewalled", your router may be remapping the source UDP port on outgoing UDP 4672 packets. See [Network Connectivity → NAT remapping of UDP 4672](./network-connectivity.md#nat-remapping-of-udp-4672) for the explanation and workaround.
:::

## Opening the ports in your firewall (Linux)

If aMule runs on a machine with a personal firewall, you must allow incoming traffic on the three ports above. Most modern distributions ship a firewall front-end (**firewalld** or **ufw**) on top of **nftables** — use the one your distribution provides.

In all examples below, substitute your actual port numbers if you changed the defaults. The extended server requests port is always TCP + 3 (4665 by default).

### firewalld (Fedora, RHEL, openSUSE, …)

```sh
sudo firewall-cmd --permanent --add-port=4662/tcp
sudo firewall-cmd --permanent --add-port=4665/udp
sudo firewall-cmd --permanent --add-port=4672/udp
sudo firewall-cmd --reload
```

### ufw (Debian, Ubuntu, …)

```sh
sudo ufw allow 4662/tcp
sudo ufw allow 4665/udp
sudo ufw allow 4672/udp
```

### nftables (generic)

If you manage nftables directly, add the rules to your input chain:

```sh
sudo nft add rule inet filter input tcp dport 4662 accept
sudo nft add rule inet filter input udp dport { 4665, 4672 } accept
```

To make the rules persist across reboots, add them to `/etc/nftables.conf` (or your distribution's nftables configuration) and enable the `nftables` service.

### iptables (legacy)

On systems still using the legacy `iptables` command (today usually a front-end for `nf_tables`), allow new connections on the three ports:

```sh
sudo iptables -A INPUT -m state --state NEW -p tcp --dport 4662 -j ACCEPT
sudo iptables -A INPUT -m state --state NEW -p udp --dport 4665 -j ACCEPT
sudo iptables -A INPUT -m state --state NEW -p udp --dport 4672 -j ACCEPT
```

These rules are not persistent on their own — save them with your distribution's mechanism (e.g. `iptables-save`) so they survive a reboot.

## aMule behind a Linux NAT gateway

If aMule runs on a machine behind a Linux router/gateway that performs NAT, the gateway must forward (DNAT) the three ports to the LAN machine running aMule.

Adjust the interface names and addresses to your setup, then add the rules to the gateway's firewall configuration. Example with nftables:

```sh
# Variables — edit to match your network
#   EXTIF   = internet-facing interface (e.g. eth0)
#   AMULEIP = LAN IP of the machine running aMule (e.g. 10.0.0.2)

# Destination NAT: forward incoming aMule ports to the LAN host
sudo nft add rule inet nat prerouting iif "eth0" tcp dport 4662 dnat ip to 10.0.0.2
sudo nft add rule inet nat prerouting iif "eth0" udp dport { 4665, 4672 } dnat ip to 10.0.0.2

# Allow the forwarded traffic
sudo nft add rule inet filter forward ip daddr 10.0.0.2 tcp dport 4662 accept
sudo nft add rule inet filter forward ip daddr 10.0.0.2 udp dport { 4665, 4672 } accept
```

Make sure IP forwarding is enabled on the gateway (`net.ipv4.ip_forward = 1` in `/etc/sysctl.conf` or a drop-in file).

After applying the rules, verify that the ports are open by [testing your port status](./network-connectivity.md#testing-your-port-status).

## OpenBSD — pf

OpenBSD uses the `pf` packet filter. To forward the ports to a LAN machine running aMule, add these rules to `/etc/pf.conf` (replace `192.168.1.10` with the aMule host's LAN IP):

```
# aMule — port forwarding
rdr pass on egress proto tcp to port 4662 -> 192.168.1.10
rdr pass on egress proto udp to port 4672 -> 192.168.1.10
rdr pass on egress proto udp to port 4665 -> 192.168.1.10
```

The keyword `egress` automatically selects the internet-facing interface (whichever interface holds the default route).

Also allow the aMule host to reach the internet:

```
nat on egress from 192.168.1.10 to any -> (egress)
```

**Kademlia — prevent port remapping:** Add this rule at the **beginning** of the NAT section (pf applies NAT rules in first-match order):

```
no nat on egress proto udp from 192.168.1.10 port 4672 to any
```

Apply the configuration without rebooting:

```sh
pfctl -f /etc/pf.conf
```

Enable pf automatically at boot:

```sh
echo PF=yes >> /etc/rc.conf.local
```

## UPnP through the firewall {#kademlia-and-upnp}

If you use UPnP on aMule and the machine running aMule also has a personal firewall (e.g. firewalld, ufw or iptables), also open:

- Incoming **TCP** connections on the UPnP control port (default TCP 50000, configurable in aMule).
- Incoming **UDP** connections from your router's port 1900 (the SSDP advertisement port).

Example with firewalld (adjust to your firewall front-end):

```sh
sudo firewall-cmd --permanent --add-port=50000/tcp
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.0.1" port port="1900" protocol="udp" accept'
sudo firewall-cmd --reload
```

Replace `192.168.0.1` with your router's LAN IP. See [UPnP](./upnp.md) for instructions on enabling UPnP in aMule.

## Related Pages

- [Network Connectivity](./network-connectivity.md) — start here: ports, High ID / open status, and how to test your connectivity
- [UPnP](./upnp.md) — automatic port forwarding (no manual router setup)
- [High ID and Low ID](../../p2p-networks/ed2k/high-id.md) — the eD2k ID system explained
- [Kademlia Network](../../p2p-networks/kademlia.md) — the serverless network and its open / firewalled status
