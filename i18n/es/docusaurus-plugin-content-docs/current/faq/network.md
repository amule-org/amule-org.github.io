---
id: network
title: FAQ de Red y Conectividad
---

# FAQ de Red y Conectividad

Preguntas frecuentes sobre las redes eD2k y Kademlia, puertos, calidad de conexión, overhead de protocolo y configuración del navegador para enlaces `ed2k://`.

---

## eD2k y Kademlia

Para una descripción completa de ambas redes y su arquitectura, consulta:

- [Red eD2k](../ed2k/ed2k-network.md) — arquitectura, ID alta / ID baja, puertos, limitaciones, créditos y puntuación
- [Red Kademlia](../ed2k/kademlia.md) — DHT sin servidores, inicialización, estado con firewall
- [Conceptos y Glosario](../ed2k/concepts.md) — definiciones de todos los términos técnicos (chunk, hash, créditos, slots, cola…)

### ¿Por qué los mismos archivos aparecen como archivos diferentes en los resultados de búsqueda, aunque tengan el mismo nombre?

Porque la identidad del archivo está determinada por el **hash y el tamaño, no por el nombre**. Dos archivos con nombres idénticos pero contenido diferente tienen hashes distintos y aparecen como archivos separados. Dos archivos con nombres diferentes pero contenido y tamaño idénticos se tratan como el mismo archivo. Consulta [Enlaces eD2k — Por qué el nombre del archivo es irrelevante](../ed2k/ed2k-links.md).

---

## Puertos

Para una descripción completa de todos los puertos utilizados por aMule, consulta [Red eD2k — Puertos](../ed2k/ed2k-network.md).

aMule funciona aunque no haya ningún puerto abierto, pero recibirás una ID baja. Para un funcionamiento óptimo (ID alta), abre los siguientes puertos para conexiones **entrantes**:

| Puerto | Protocolo | Propósito |
|---|---|---|
| `4662` | TCP | Transferencias cliente a cliente (necesario para ID alta). Configurable en Preferencias → Conexión. |
| `4665` | UDP | Búsquedas globales en servidores y consultas de fuentes. Siempre `TCP_PORT + 3`. |
| `4672` | UDP | Protocolo extendido de eMule, valoración de cola, Kademlia. |

### ¿Por qué Kademlia sigue mostrando "con firewall"?

Consulta [Red Kademlia — Resolver el estado con firewall](../ed2k/kademlia.md).

---

## Búsqueda y fuentes

### En la ventana de búsqueda, ¿qué filtro corresponde a qué tipo de archivo?

Los filtros se basan en las **extensiones del nombre de archivo**, no en el contenido real del archivo:

| Filtro | Extensiones |
|---|---|
| Archivo | `.ace` `.arj` `.rar` `.tar.bz2` `.tar.gz` `.zip` `.Z` |
| Audio | `.aac` `.ape` `.au` `.mp2` `.mp3` `.mp4` `.mpc` `.ogg` `.wav` `.wma` |
| Imagen de CD | `.bin` `.ccd` `.cue` `.img` `.iso` `.nrg` `.sub` |
| Imagen | `.bmp` `.gif` `.jpeg` `.jpg` `.png` `.tif` |
| Programa | `.com` `.exe` |
| Vídeo | `.avi` `.divx` `.mov` `.mpeg` `.mpg` `.ogg` `.ram` `.rm` `.vivo` `.vob` |

Nota: un archivo llamado `Birthday.zip` aparecerá en Archivo, no en Vídeo, independientemente del contenido real.

### ¿Qué es una fuente?

Una **fuente** es un cliente que comparte un chunk de un archivo que tienes en tu cola de descarga y que aún no has completado. Cuantas más fuentes haya, más oportunidades de descarga existen.

Cuando tienes una ID baja:
- **Fuentes**: todos los clientes que comparten un chunk o archivo que aún necesitas.
- **Fuentes disponibles**: solo los clientes con ID alta a los que puedes conectarte realmente.

---

## Créditos, valoraciones y puntuaciones

Para una explicación completa del sistema de prioridad de la cola de subida, consulta [Red eD2k — Créditos y Puntuación](../ed2k/ed2k-network.md) y [Conceptos y Glosario](../ed2k/concepts.md).

---

## Velocidad de red y overhead de protocolo

### Velocidad de red: lo que debes saber antes de hacer preguntas

Esta sección explica los factores técnicos que hay detrás de la velocidad de red mientras aMule está en ejecución. Para consejos de solución de problemas más sencillos, consulta [aMule va lento](/docs/troubleshooting/slow-speeds).

### ¿Cuál es la velocidad real de mi red?

La velocidad de red se mide en **bits por segundo (bps)**. Para convertir: `bytes/s = bps / 8`. Un proveedor que ofrece "ADSL 256/128" significa 256.000/128.000 bps, que son **32.000/16.000 bytes por segundo**.

Las redes usan prefijos **decimales**, no binarios:

| Prefijo | En informática (binario) | En redes (decimal) | Error |
|---|---|---|---|
| k (kilo) | 2¹⁰ = 1.024 | 10³ = 1.000 | ~2% |
| M (mega) | 2²⁰ = 1.048.576 | 10⁶ = 1.000.000 | ~5% |
| G (giga) | 2³⁰ = 1.073.741.824 | 10⁹ = 1.000.000.000 | ~7% |
| T (tera) | 2⁴⁰ = 1.099.511.627.776 | 10¹² = 1.000.000.000.000 | ~9% |

Tu ISP cita velocidades en unidades decimales. Esto por sí solo supone una diferencia de ~5% entre la velocidad anunciada y la que reportan las aplicaciones.

### Overhead de protocolo

Cada dato de control que aMule envía — solicitudes de fuentes, consultas de búsqueda, negociaciones de cola — es **overhead**: datos transmitidos que no forman parte directamente de tus descargas. El overhead reportado por aMule solo cuenta los datos enviados a la pila de red del SO; el SO añade cabeceras TCP/IP por encima.

Para IPv4 TCP/IP: cada paquete lleva un mínimo de 20 bytes de cabecera IPv4 + 20 bytes de cabecera TCP. El establecimiento de una conexión TCP (SYN / SYN+ACK / ACK) requiere al menos 3 paquetes por conexión. aMule abre aproximadamente 100 nuevas conexiones TCP cada 5 segundos (configurable en Preferencias → Opciones avanzadas → Máx. Nuevas Conexiones).

### Cuello de botella ACK {#ack-bottleneck}

TCP requiere que el receptor envíe paquetes **ACK** de vuelta al emisor por cada segmento recibido. Si aMule satura tu enlace de subida, los ACKs salientes para tus **descargas** pueden retrasarse o perderse, lo que hace que el emisor remoto reduzca su velocidad de transmisión y reduce directamente tu velocidad de descarga.

**Nunca uses más del 80% de tu capacidad de subida para aMule.** Establece límites de tasa realistas en **Preferencias → Conexión → Límites de Ancho de Banda**.

Para ADSL: nunca ejecutes el enlace de subida o bajada al 100%. Un buen objetivo es 90–95%, teniendo en cuenta todo el overhead. Consulta [aMule va lento](/docs/troubleshooting/slow-speeds) para valores específicos.

### Routers / dispositivos SOHO bajo carga P2P

Los routers SOHO baratos pueden tener dificultades con el gran número de conexiones TCP simultáneas y flujos UDP generados por el tráfico P2P. Las tablas de estado NAT pueden llenarse, causando conexiones caídas o inestabilidad del router.

**Recomendaciones:**
- Elige un router diseñado para cargas de trabajo P2P/NAT intensivo (los routers con VPN, descargador integrado o almacenamiento USB suelen tener CPUs más potentes y más RAM).
- Configura siempre el reenvío de puertos para los puertos 4662 (TCP), 4665 (UDP), 4672 (UDP), o activa UPnP.
- Prefiere conexiones ISP que asignen IP via DHCP sobre Ethernet plano en lugar de PPPoE/PPTP.

### Múltiples conexiones a internet

**Redundancia de enlace:** aMule debe reiniciarse cuando cambian los enlaces para que se asocie a la nueva dirección IP y reciba un nuevo ID eD2k, a menos que el cambio sea gestionado de forma transparente por el router NAT.

**Balanceo de carga:** aMule se asocia a todas las interfaces (`0.0.0.0`) pero solo puede anunciar una IP como su ID eD2k. Ejecutar aMule en dos enlaces ISP activos simultáneamente es poco fiable; la única solución fiable es fijar el tráfico de aMule a una interfaz.

---

## Configuración del navegador para enlaces ed2k://

Consulta [Enlaces eD2k — Configuración del navegador](../ed2k/ed2k-links.md) para instrucciones sobre cómo configurar Firefox, Opera, Konqueror y otros navegadores para gestionar las URIs `ed2k://`.
