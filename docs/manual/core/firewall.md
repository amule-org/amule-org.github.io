---
id: firewall
title: Firewall and Router Configuration
---

By default, firewalls and routers block incoming connections. To achieve a [High ID](./get-high-id.md) and the best possible transfer performance with aMule, the following three ports must be reachable from the internet:

| Port | Protocol | Default | Purpose |
|---|---|---|---|
| Standard client TCP port | TCP | 4662 | Required for High ID on eD2k |
| Extended client UDP port | UDP | 4672 | Required for Kademlia; recommended for eD2k |
| Extended server requests UDP port | UDP | TCP+3 (4665) | Recommended for eD2k server statistics |

The port numbers are configurable in **Preferences → Connection**. See also [Getting a High ID](./get-high-id.md).

:::note UPnP
Since aMule 2.2.x, aMule supports [UPnP](./upnp.md) to configure router ports automatically — if your router supports UPnP, you may not need manual port forwarding.
:::

:::note Kademlia and NAT remapping
If you have a High ID but Kademlia still shows "firewalled", your router may be remapping the source UDP port on outgoing UDP 4672 packets. See [UPnP and Kademlia](#kademlia-and-upnp) below.
:::

## iptables (Linux — generic)

This is the default firewall on most Linux distributions.

### Basic rules

Replace `4662` and `4672` with your actual port numbers if you changed the defaults. The extended server requests port is always TCP + 3 (4665 by default).

```sh
/sbin/iptables -t filter -A INPUT -m state --state NEW -m tcp -p tcp --dport 4662 -j ACCEPT
/sbin/iptables -t filter -A INPUT -m state --state NEW -m udp -p udp --dport 4665 -j ACCEPT
/sbin/iptables -t filter -A INPUT -m state --state NEW -m udp -p udp --dport 4672 -j ACCEPT
```

### Full rule set (building from scratch)

If your INPUT chain policy is DROP and you are building rules from scratch, you also need to allow established and related connections:

```sh
# Allow aMule ports
iptables -A INPUT -p tcp --dport 4662 -j ACCEPT
iptables -A INPUT -p udp --dport 4665 -j ACCEPT
iptables -A INPUT -p udp --dport 4672 -j ACCEPT

# Allow established/related traffic
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allow all outgoing traffic (or add specific rules below)
iptables -P OUTPUT ACCEPT
```

If your OUTPUT policy is DROP, also allow the outgoing UDP ports:

```sh
iptables -A OUTPUT -p udp --sport 4665 -j ACCEPT
iptables -A OUTPUT -p udp --sport 4672 -j ACCEPT
```

Note: there are also ephemeral (random) source ports that must be allowed in OUTPUT rules.

### Mandrake 10.0 note

On Mandrake 10.0 with iptables, use a port range instead of separate rules:

```sh
iptables -A INPUT -p udp --dport 4662:4665 -j ACCEPT
```

where the range is `TCP_port : (TCP_port + 3)`.

## iptables — NAT gateway (behind a Linux router)

If aMule runs on a machine behind a Linux NAT gateway, add these rules to the gateway's iptables configuration script.

Replace variable values as needed:

```sh
EXTIF=eth0          # External (internet-facing) interface
INTIF=eth1          # Internal (LAN-facing) interface
EMULEPORT=4662
EMULEUDP=4672
EMULEUDP2=$(expr $EMULEPORT + 3)   # 4665
EMULEHOST=10.0.0.2  # LAN IP of the machine running aMule

# Forward incoming connections to the aMule host
iptables -t nat -A PREROUTING -i $EXTIF -p tcp --destination-port $EMULEPORT \
    -j DNAT --to-destination $EMULEHOST:$EMULEPORT
iptables -t nat -A PREROUTING -i $EXTIF -p udp --destination-port $EMULEUDP \
    -j DNAT --to-destination $EMULEHOST:$EMULEUDP
iptables -t nat -A PREROUTING -i $EXTIF -p udp --destination-port $EMULEUDP2 \
    -j DNAT --to-destination $EMULEHOST:$EMULEUDP2

# Allow forwarding for established/related traffic
iptables -A FORWARD -i $EXTIF -o $INTIF -d $EMULEHOST \
    -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allow new aMule connections to be forwarded
iptables -A FORWARD -i $EXTIF -o $INTIF -p tcp --dport $EMULEPORT -d $EMULEHOST -j ACCEPT
iptables -A FORWARD -i $EXTIF -o $INTIF -p udp --dport $EMULEUDP  -d $EMULEHOST -j ACCEPT
iptables -A FORWARD -i $EXTIF -o $INTIF -p udp --dport $EMULEUDP2 -d $EMULEHOST -j ACCEPT
```

After applying the rules, verify that the ports are open using the [Test Port](https://www.amule.org/testport.php) page.

## Fedora / Red Hat

If you have a default Fedora Core firewall and a default aMule RPM installation, run the following commands **as root**:

```sh
# Insert the rules
/sbin/iptables -I RH-Firewall-1-INPUT -p tcp --dport 4662 -j ACCEPT
/sbin/iptables -I RH-Firewall-1-INPUT -p udp --dport 4665 -j ACCEPT
/sbin/iptables -I RH-Firewall-1-INPUT -p udp --dport 4672 -j ACCEPT

# Save the rules so they persist after a reboot
/sbin/service iptables save
```

After this, aMule will be able to receive a High ID.

## SuSE / OpenSUSE

These instructions have been tested on SuSE Linux 8.2 and OpenSUSE 10.1.

### Client machine (firewall on the aMule host)

Open `/etc/sysconfig/SuSEfirewall2` and locate `FW_SERVICES_EXT_TCP` and `FW_SERVICES_EXT_UDP`. Add the aMule ports to both:

```sh
FW_SERVICES_EXT_TCP="4662"
FW_SERVICES_EXT_UDP="4665 4672"
```

Keep any ports that are already listed there. Save the file.

### Router/firewall machine (forwarding to a LAN client)

Open `/etc/sysconfig/SuSEfirewall2` and locate `FW_FORWARD_MASQ` (in section 14). Assuming the aMule client's LAN IP is `192.168.0.3`, set it to:

```sh
FW_FORWARD_MASQ="0/0,192.168.0.3,tcp,4662 0/0,192.168.0.3,udp,4662 0/0,192.168.0.3,tcp,4672 0/0,192.168.0.3,udp,4672"
```

The format `0/0,<IP>,<proto>,<port>` means: forward incoming connections through `<port>` using `<proto>` from any address (`0/0`) to `<IP>` on the same port. Also make sure `FW_ROUTE` (section 5) is set to `yes`. Save the file.

### Restarting the SuSEfirewall2

**Recommended — restart the daemon:**

```sh
/etc/init.d/network force-reload && /etc/init.d/SuSEfirewall2_setup force-reload
```

> **Warning:** If you are connected to the router remotely and something goes wrong during the reload, your connection may be lost.

**Alternative — using YaST:**

Start **YaST**, go to **Security and Users → Firewall**, step through all dialogs and finish. YaST will restart the firewall with the new rules.

## OpenBSD — pf

OpenBSD uses the `pf` packet filter. Add these rules to `/etc/pf.conf`:

```
# aMule — port forwarding (replace 192.168.1.10 with the aMule host's LAN IP)
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

## Router port forwarding

The following sections describe how to configure specific consumer routers. In all examples, the default aMule ports are used: TCP 4662, UDP 4672, UDP 4665. Substitute your actual port numbers if you changed the defaults in Preferences.

### Linksys WRT54GSV4

1. Open `http://192.168.1.1` in a browser and log in.
2. Go to **Gaming applications**.
3. Forward three port entries to your computer's LAN IP address:

| Port | Protocol | Start | End |
|---|---|---|---|
| Standard client TCP port | TCP | 4662 | 4662 |
| Extended client UDP port | UDP | 4672 | 4672 |
| Extended server requests UDP port | UDP | 4665 | 4665 |

For each entry: set start and end to the same port, select the correct protocol, enter the last three digits of your LAN IP, check **Enable**.

4. Click **Save settings** and restart aMule.

### Linksys (stock firmware) — Port Range Forwarding

1. Log in to the router.
2. Click **Applications & Gaming → Port Range Forwarding**.
3. Add an entry with these columns:

| Column | Value |
|---|---|
| Application | `aMule` (or any name) |
| Start | 4662 |
| End | 4672 |
| Protocol | `Both` (or separate entries: `TCP` for 4662, `UDP` for 4672) |
| IP Address | Internal LAN IP of the aMule machine |
| Enable | checked |

Use separate entries per port for the cleanest configuration. After adding rules, save settings and [test your ports](https://www.amule.org/testport.php).

### DLink router

**Step 1 — Static DHCP (optional but recommended)**

1. Open the **Home** tab → **DHCP**.
2. In the **Static DHCP** section, add an entry:
   - Name: your computer's name
   - IP: the IP you want assigned
   - MAC Address: your computer's MAC (click the DHCP Client dropdown and **Clone** to fill it in)
3. Click **Apply**.

**Step 2 — Virtual Server (TCP port)**

1. Open **Advanced → Virtual Server**.
2. Click **Enabled**.
3. Enter a name (e.g. `aMule TCP`).
4. Enter your static IP in **Private IP**.
5. Protocol: **TCP**.
6. Private port: `4662`. Public port: `4662`.
7. Schedule: **Always**.
8. Click **Apply**.

**Step 3 — Applications (UDP ports)**

1. Open **Advanced → Applications**.
2. Click **Enabled**.
3. Trigger Port: `4662`, Trigger Type: **TCP**.
4. Public Port range: `4662` to `4672`, Public Type: **UDP**.
5. Click **Apply**.

**Alternate configuration (Virtual Server only, tested on DI-804HV and DI-624):**

Skip the Applications step and add two additional Virtual Server entries:

- `aMuleUDP4665` — UDP, port 4665
- `aMuleUDP4672` — UDP, port 4672

Disable any Applications entries you created previously. You should then have three Virtual Server entries (one TCP + two UDP) and all arrows in aMule should be green.

**Using Firewall rules (tested on DI-624):**

1. Open **Advanced → Firewall**.
2. Click **Enabled**, enter a rule name.
3. Source interface: **WAN**; Source IP Range: `*`.
4. Destination interface: **LAN**; Destination IP: your PC's static IP.
5. Destination protocol: `*`.
6. Destination port range: `4662-4672`.
7. Schedule: as preferred.
8. Click **Apply**. Disable any existing Virtual Server / Applications entries for aMule.
9. Reboot the router (**Tools → Misc**).

### Belkin router

Log in at `http://192.168.2.1`. Create two entries (one TCP, one UDP) via **Firewall → Virtual Servers**:

| Field | TCP entry | UDP entry |
|---|---|---|
| Enabled | ✓ | ✓ |
| Description | `aMule TCP` | `aMule UDP` |
| Inbound port range | 4660 – 4712 | 4660 – 4712 |
| Type | TCP | UDP |
| Private IP | your LAN IP | your LAN IP |
| Private port | 4662 | 4672 |

Click **Apply**. In aMule, disconnect and reconnect. Kademlia should no longer show "firewalled". Verify with the [Test Port](https://www.amule.org/testport.php) page.

:::note
The private IP is dynamically assigned by default and may change. If Low ID reappears after a network reconnect, check whether the IP changed and update the router rule.
:::

### Netgear router

Go to `http://routerlogin.net/start.htm`, then **Advanced → Port Forwarding/Port Triggering → Add Custom Service**.

Add three services:

| Service name | Type | Start port | End port |
|---|---|---|---|
| `aMule1` | TCP | 4662 | 4662 |
| `aMule2` | UDP | 4665 | 4665 |
| `aMule3` | UDP | 4672 | 4672 |

Set the server IP address for each to the LAN IP of the aMule machine.

**DG834G (additional steps):**

1. **Content Filtering → Services** — add the three rules (1×TCP, 2×UDP) based on your aMule Connection preferences.
2. **Content Filtering → Firewall Rules** — add all three as Inbound Services; add both UDP rules as Outbound Services as well.

### TRENDnet TW100

Log in to the router (typically `http://192.168.0.1` or `http://192.168.1.1`, username `admin`, password empty).

**Step 1 — Special Applications**

1. Go to **Internet → Advanced Setup → Special Applications**.
2. Add two entries:

| Name | Trigger (TCP) | Public (UDP) |
|---|---|---|
| `amuleU4665` | TCP 4665–4665 | UDP 4665–4665 |
| `amuleU4672` | TCP 4672–4672 | UDP 4672–4672 |

3. Enable both entries (tick the checkbox on the left).
4. Click **Save**, then **Close**, then **Save** again on the Advanced Internet page.

**Step 2 — Virtual Servers**

1. Go to **Virtual Servers**.
2. Add a new server named `aMuleTCP`:
   - IP Address: select your PC from the dropdown
   - Protocol: TCP
   - Port: 4662 (both fields)
3. Click **Add as new server**.

If aMule keeps getting a Low ID because DHCP assigns a different IP address, either:
- Log back into the router and reselect your PC in the Virtual Server entry, or
- Assign a static IP address to the aMule machine (requires knowing your ISP's DNS servers).

:::tip TRENDnet router stability
If the TRENDnet router crashes or stops forwarding traffic after running aMule, reduce **Preferences → Connection → Connection Limits** to 100 (or 50) and **Preferences → Core Tweaks → Max new connections / 5 secs** to 10 (or 5). Restart aMule to apply the changes.
:::

## My router is not listed here?

Check [portforward.com](http://www.portforward.com/) for step-by-step port forwarding instructions for hundreds of router models.

## UPnP through the firewall {#kademlia-and-upnp}

If you use UPnP on aMule and your computer has a personal firewall (e.g. iptables), also open:

- Incoming **TCP** connections on the UPnP port (default TCP 50000, configurable in aMule).
- Incoming **UDP** connections from your router's port 1900 (the SSDP advertisement port).

Example iptables rules (replace `192.168.0.1` with your router's LAN IP):

```sh
/sbin/iptables -t filter -A INPUT -m state --state NEW -m tcp -p tcp --dport 50000 -j ACCEPT
/sbin/iptables -t filter -A INPUT -p udp -s 192.168.0.1 --sport 1900 -j ACCEPT
```

See [UPnP](./upnp.md) for instructions on enabling UPnP in aMule.
