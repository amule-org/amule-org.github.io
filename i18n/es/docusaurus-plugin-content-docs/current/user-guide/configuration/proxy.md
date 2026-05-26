---
id: proxy
title: Proxy
---

Un proxy es un nodo intermedio en la red a través del cual otros nodos enrutan sus conexiones para acceder a un destino. En la mayoría de los casos, es un servidor al que los clientes se conectan para acceder a internet: el proxy reenvía las peticiones a internet y devuelve las respuestas al cliente.

Una conexión proxy requiere un protocolo específico compatible tanto con el servidor proxy como con el cliente que se conecta. Los protocolos proxy más habituales son **SOCKS4** y **SOCKS5**. SOCKS5 admite además autenticación mediante usuario y contraseña.

---

## Qué conexiones enruta aMule a través del proxy

Cuando hay un proxy configurado, aMule enruta las siguientes conexiones a través de él:

- Conexiones a servidores eD2k
- Conexiones a otros clientes eD2k (descargas y subidas)
- Conexiones a la red Kademlia (donde el protocolo proxy soporta UDP)

:::note
La opción **Conectar al servidor automáticamente sin proxy** existe en el cuadro de diálogo de Preferencias pero actualmente aMule la ignora.
:::

---

## Configurar el proxy en aMule

Abre **Preferencias → Proxy**.

![Pestaña de preferencias de Proxy](/img/docs/configuration/window_prefs4.jpg)

### General

| Ajuste | Descripción |
|---|---|
| **Activar proxy** | Activar o desactivar el soporte de proxy. Cuando está desactivado, todas las conexiones son directas. |
| **Tipo de proxy** | Protocolo a usar: `SOCKS4`, `SOCKS5` o `HTTP`. |
| **Host del proxy** | Nombre de host o dirección IP del servidor proxy. |
| **Puerto del proxy** | Número de puerto del servidor proxy. |

### Autenticación

Solo disponible para proxies SOCKS5.

| Ajuste | Descripción |
|---|---|
| **Activar autenticación** | Usar usuario y contraseña para iniciar sesión en el proxy. Si está desactivado, se usa inicio de sesión anónimo. |
| **Usuario** | Nombre de usuario para el proxy. |
| **Contraseña** | Contraseña para el proxy. |

---

## Configuración en amule.conf

Al ejecutar `amuled` o editar el archivo de configuración directamente, los ajustes del proxy se almacenan en la sección `[Proxy]` de `amule.conf`:

| Clave | Valor por defecto | Descripción |
|---|---|---|
| `ProxyEnable` | `0` | `1` = activar proxy. |
| `ProxyType` | `0` | `0` = SOCKS5, `1` = SOCKS4, `2` = HTTP. |
| `ProxyName` | _(vacío)_ | Nombre de host o IP del proxy. |
| `ProxyPort` | `1080` | Puerto del proxy. |
| `ProxyEnablePassword` | `0` | `1` = activar autenticación (solo SOCKS5). |
| `ProxyUser` | _(vacío)_ | Usuario del proxy. |
| `ProxyPassword` | _(vacío)_ | Contraseña del proxy. |
