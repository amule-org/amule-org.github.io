---
id: firewall
title: Cortafuegos y configuración del router
---

Por defecto, los cortafuegos y routers bloquean las conexiones entrantes. Para obtener un [High ID](get-high-id.md) y el mejor rendimiento de transferencia posible con aMule, los siguientes tres puertos deben ser accesibles desde internet:

| Puerto | Protocolo | Valor por defecto | Propósito |
|---|---|---|---|
| Puerto TCP estándar del cliente | TCP | 4662 | Necesario para High ID en eD2k |
| Puerto UDP extendido del cliente | UDP | 4672 | Necesario para Kademlia; recomendado para eD2k |
| Puerto UDP para peticiones extendidas al servidor | UDP | TCP+3 (4665) | Recomendado para estadísticas de servidores eD2k |

Los números de puerto son configurables en **Preferencias → Conexión**. Consulta también [Obtener High ID](get-high-id.md).

:::note UPnP
Desde aMule 2.2.x, aMule soporta [UPnP](upnp.md) para configurar automáticamente los puertos del router — si tu router soporta UPnP, puede que no necesites reenvío manual de puertos.
:::

---

## iptables (Linux — genérico)

Este es el cortafuegos por defecto en la mayoría de distribuciones Linux.

### Reglas básicas

Sustituye `4662` y `4672` por tus números de puerto reales si los cambiaste. El puerto de peticiones extendidas al servidor es siempre TCP + 3 (4665 por defecto).

```sh
/sbin/iptables -t filter -A INPUT -m state --state NEW -m tcp -p tcp --dport 4662 -j ACCEPT
/sbin/iptables -t filter -A INPUT -m state --state NEW -m udp -p udp --dport 4665 -j ACCEPT
/sbin/iptables -t filter -A INPUT -m state --state NEW -m udp -p udp --dport 4672 -j ACCEPT
```

### Conjunto de reglas completo (desde cero)

Si la política de la cadena INPUT es DROP y estás construyendo reglas desde cero, también necesitas permitir el tráfico establecido y relacionado:

```sh
# Permitir puertos de aMule
iptables -A INPUT -p tcp --dport 4662 -j ACCEPT
iptables -A INPUT -p udp --dport 4665 -j ACCEPT
iptables -A INPUT -p udp --dport 4672 -j ACCEPT

# Permitir tráfico establecido/relacionado
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Permitir todo el tráfico saliente (o añade reglas específicas)
iptables -P OUTPUT ACCEPT
```

Si la política OUTPUT es DROP, permite también los puertos UDP salientes:

```sh
iptables -A OUTPUT -p udp --sport 4665 -j ACCEPT
iptables -A OUTPUT -p udp --sport 4672 -j ACCEPT
```

---

## iptables — gateway NAT (detrás de un router Linux)

Si aMule se ejecuta en una máquina detrás de un gateway NAT Linux, añade estas reglas al script de configuración de iptables del gateway:

```sh
EXTIF=eth0          # Interfaz externa (hacia internet)
INTIF=eth1          # Interfaz interna (LAN)
EMULEPORT=4662
EMULEUDP=4672
EMULEUDP2=$(expr $EMULEPORT + 3)   # 4665
EMULEHOST=10.0.0.2  # IP LAN del equipo que ejecuta aMule

# Reenviar conexiones entrantes al host aMule
iptables -t nat -A PREROUTING -i $EXTIF -p tcp --destination-port $EMULEPORT \
    -j DNAT --to-destination $EMULEHOST:$EMULEPORT
iptables -t nat -A PREROUTING -i $EXTIF -p udp --destination-port $EMULEUDP \
    -j DNAT --to-destination $EMULEHOST:$EMULEUDP
iptables -t nat -A PREROUTING -i $EXTIF -p udp --destination-port $EMULEUDP2 \
    -j DNAT --to-destination $EMULEHOST:$EMULEUDP2

# Permitir el reenvío para tráfico establecido/relacionado
iptables -A FORWARD -i $EXTIF -o $INTIF -d $EMULEHOST \
    -m state --state ESTABLISHED,RELATED -j ACCEPT

# Permitir nuevas conexiones aMule para ser reenviadas
iptables -A FORWARD -i $EXTIF -o $INTIF -p tcp --dport $EMULEPORT -d $EMULEHOST -j ACCEPT
iptables -A FORWARD -i $EXTIF -o $INTIF -p udp --dport $EMULEUDP  -d $EMULEHOST -j ACCEPT
iptables -A FORWARD -i $EXTIF -o $INTIF -p udp --dport $EMULEUDP2 -d $EMULEHOST -j ACCEPT
```

---

## Fedora / Red Hat

Con el cortafuegos por defecto de Fedora Core y una instalación RPM estándar de aMule, ejecuta los siguientes comandos **como root**:

```sh
# Insertar las reglas
/sbin/iptables -I RH-Firewall-1-INPUT -p tcp --dport 4662 -j ACCEPT
/sbin/iptables -I RH-Firewall-1-INPUT -p udp --dport 4665 -j ACCEPT
/sbin/iptables -I RH-Firewall-1-INPUT -p udp --dport 4672 -j ACCEPT

# Guardar las reglas para que persistan tras un reinicio
/sbin/service iptables save
```

---

## SuSE / OpenSUSE

Estas instrucciones han sido probadas en SuSE Linux 8.2 y OpenSUSE 10.1.

### Equipo cliente (cortafuegos en el propio host de aMule)

Abre `/etc/sysconfig/SuSEfirewall2` y localiza `FW_SERVICES_EXT_TCP` y `FW_SERVICES_EXT_UDP`. Añade los puertos de aMule a ambos:

```sh
FW_SERVICES_EXT_TCP="4662"
FW_SERVICES_EXT_UDP="4665 4672"
```

Conserva los puertos que ya estén en esas variables. Guarda el archivo.

### Router/cortafuegos (reenvío a un cliente LAN)

Abre `/etc/sysconfig/SuSEfirewall2` y localiza `FW_FORWARD_MASQ` (en la sección 14). Asumiendo que la IP LAN del cliente aMule es `192.168.0.3`, establécela así:

```sh
FW_FORWARD_MASQ="0/0,192.168.0.3,tcp,4662 0/0,192.168.0.3,udp,4662 0/0,192.168.0.3,tcp,4672 0/0,192.168.0.3,udp,4672"
```

Asegúrate también de que `FW_ROUTE` (sección 5) esté establecido a `yes`. Guarda el archivo.

### Reiniciar SuSEfirewall2

**Recomendado — reiniciar el daemon:**

```sh
/etc/init.d/network force-reload && /etc/init.d/SuSEfirewall2_setup force-reload
```

**Alternativa — usar YaST:**

Inicia **YaST**, ve a **Seguridad y usuarios → Cortafuegos**, recorre todos los diálogos y finaliza.

---

## OpenBSD — pf

OpenBSD usa el filtro de paquetes `pf`. Añade estas reglas a `/etc/pf.conf`:

```
# aMule — reenvío de puertos (sustituye 192.168.1.10 por la IP LAN del host aMule)
rdr pass on egress proto tcp to port 4662 -> 192.168.1.10
rdr pass on egress proto udp to port 4672 -> 192.168.1.10
rdr pass on egress proto udp to port 4665 -> 192.168.1.10
```

Permite también que el host aMule acceda a internet:

```
nat on egress from 192.168.1.10 to any -> (egress)
```

**Kademlia — evitar remapeo de puertos:** Añade esta regla al **inicio** de la sección NAT:

```
no nat on egress proto udp from 192.168.1.10 port 4672 to any
```

Aplica la configuración sin reiniciar:

```sh
pfctl -f /etc/pf.conf
```

Activa pf automáticamente al arranque:

```sh
echo PF=yes >> /etc/rc.conf.local
```

---

## Reenvío de puertos en el router

Las siguientes secciones describen cómo configurar routers de consumo específicos. En todos los ejemplos se usan los puertos por defecto de aMule: TCP 4662, UDP 4672, UDP 4665. Consulta también la página [Cortafuegos](firewall.md) en inglés para instrucciones sobre modelos adicionales.

### Linksys WRT54GSV4

1. Abre `http://192.168.1.1` en un navegador e inicia sesión.
2. Ve a **Gaming applications**.
3. Reenvía tres entradas de puerto a la IP LAN de tu equipo:

| Puerto | Protocolo | Inicio | Fin |
|---|---|---|---|
| Puerto TCP estándar del cliente | TCP | 4662 | 4662 |
| Puerto UDP extendido del cliente | UDP | 4672 | 4672 |
| Puerto UDP para peticiones extendidas | UDP | 4665 | 4665 |

4. Haz clic en **Save settings** y reinicia aMule.

### Linksys (firmware stock) — Port Range Forwarding

1. Inicia sesión en el router.
2. Haz clic en **Applications & Gaming → Port Range Forwarding**.
3. Añade una entrada:

| Columna | Valor |
|---|---|
| Application | `aMule` |
| Start | 4662 |
| End | 4672 |
| Protocol | `Both` (o entradas separadas: `TCP` para 4662, `UDP` para 4672) |
| IP Address | IP LAN del equipo aMule |
| Enable | marcado |

### DLink

1. **Paso 1 — DHCP estático:** En la pestaña **Home → DHCP**, asigna una IP fija a tu equipo (opcional pero recomendado).
2. **Paso 2 — Virtual Server (puerto TCP):** En **Advanced → Virtual Server**, crea una entrada TCP en el puerto 4662.
3. **Paso 3 — Applications (puertos UDP):** En **Advanced → Applications**, configura el rango de puertos UDP 4662–4672.

Configuración alternativa probada en DI-624 usando **Firewall rules** directamente (sin Virtual Server ni Applications).

### Belkin

Inicia sesión en `http://192.168.2.1`. Crea dos entradas en **Firewall → Virtual Servers**: una TCP y una UDP, con el rango 4660–4712 como puerto entrante.

### Netgear

Ve a **Advanced → Port Forwarding/Port Triggering → Add Custom Service** y añade tres servicios: TCP 4662, UDP 4665, UDP 4672.

### TRENDnet TW100

1. En **Internet → Advanced Setup → Special Applications**, añade entradas para los puertos UDP 4665 y 4672.
2. En **Virtual Servers**, añade un servidor TCP para el puerto 4662.

---

## ¿Mi router no está en la lista?

Consulta [portforward.com](http://www.portforward.com/) para instrucciones de reenvío de puertos para cientos de modelos de router.

---

## UPnP a través del cortafuegos {#kademlia-y-upnp}

Si usas UPnP en aMule y tu equipo tiene un cortafuegos personal (por ejemplo iptables), abre también:

- Conexiones **TCP** entrantes en el puerto UPnP (por defecto TCP 50000, configurable en aMule).
- Conexiones **UDP** entrantes desde el puerto 1900 de tu router (anuncios SSDP).

Ejemplo de reglas iptables (sustituye `192.168.0.1` por la IP LAN de tu router):

```sh
/sbin/iptables -t filter -A INPUT -m state --state NEW -m tcp -p tcp --dport 50000 -j ACCEPT
/sbin/iptables -t filter -A INPUT -p udp -s 192.168.0.1 --sport 1900 -j ACCEPT
```

Consulta la página [UPnP](upnp.md) para instrucciones sobre cómo activar UPnP en aMule.
