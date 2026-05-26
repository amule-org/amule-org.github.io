---
id: slow-speeds
title: Velocidades de descarga lentas
---

# Velocidades de descarga lentas

Esta página aborda dos problemas relacionados: que aMule descargue demasiado despacio y que aMule consuma tanto ancho de banda que todas las demás aplicaciones de tu ordenador se vuelvan lentas.

---

## aMule va lento

Las velocidades de descarga lentas en aMule se dividen en dos categorías: **tu propia configuración** y **factores inherentes a la red**.

---

### Problemas de configuración {#configuration-issues}

Repasa esta lista de verificación antes de concluir que el problema es de la red.

#### Límite de subida demasiado bajo

El protocolo eD2k impone una relación estricta entre la velocidad de subida y la de descarga para evitar el aprovechamiento gratuito:

| Límite de subida | Límite máximo de descarga |
|---|---|
| 0–3,99 KBps | Subida × 3 KBps |
| 4–9,99 KBps | Subida × 4 KBps |
| **≥ 10 KBps** | **Sin restricción** |

Establece tu límite de subida en al menos **10 KBps** para descargas sin restricciones. Ve a **Preferencias → Conexión → Límites de ancho de banda → Subida**.

#### Límite de subida demasiado alto

Paradójicamente, establecer el límite de subida **demasiado cerca del máximo real de tu línea** también causa descargas lentas. Un enlace de subida saturado retrasa los paquetes ACK de TCP salientes para tus descargas, lo que hace que el emisor remoto ralentice su tasa de transmisión (el cuello de botella ACK; consulta el [FAQ de Red](/docs/faq/network#ack-bottleneck) para una explicación detallada).

Como regla general: **nunca uses más del 75–80% de tu capacidad de subida** para aMule. Deja margen para los ACKs y el tráfico restante.

#### Máx. Conexiones demasiado bajo

**Preferencias → Conexión → Máx. Conexiones**: si está demasiado bajo, aMule no puede establecer suficientes conexiones para encontrar fuentes de manera eficiente. Auméntalo.

#### Máx. Conexiones demasiado alto

Si Máx. Conexiones está muy alto, el overhead de conexiones de aMule consume un ancho de banda significativo, congestionando tu línea y reduciendo el rendimiento efectivo. Redúcelo hasta encontrar un equilibrio.

#### Máx. Nuevas Conexiones por 5 segundos demasiado bajo

**Preferencias → Opciones avanzadas → Máx. Nuevas Conexiones**: si está demasiado bajo, aMule tarda mucho en adquirir fuentes para una nueva descarga. Auméntalo.

#### Máx. Nuevas Conexiones por 5 segundos demasiado alto

Cada nueva conexión TCP produce overhead (paquetes SYN, SYN-ACK, ACK más cabeceras IP). Un valor alto puede congestionar tu línea con el overhead de establecimiento de conexiones. Redúcelo si tu línea o tu router muestran señales de congestión.

#### Low ID

Tener una Low ID limita significativamente la velocidad de descarga porque:
- Dos clientes con Low ID no pueden conectarse directamente entre sí.
- Algunos servidores rechazan a los clientes con Low ID.

Asegúrate de que el puerto TCP 4662 (o tu puerto TCP configurado) está abierto en tu firewall y redirigido en tu router. Ver [Red eD2k → ID alta e ID baja](/docs/ed2k/ed2k-network).

#### ISP bloqueando o limitando los puertos eD2k

Algunos ISPs bloquean o limitan el tráfico en el puerto TCP estándar eD2k 4662:

- Prueba cambiando el puerto TCP en **Preferencias → Conexión → Puerto TCP estándar del cliente** a un valor no estándar.
- Activa la **ofuscación de tráfico** para conexiones salientes en **Preferencias → Conexión → Usar ofuscación para conexiones salientes**.
- En casos extremos, activa **Aceptar solo conexiones ofuscadas** si tu ISP bloquea completamente el tráfico eD2k sin ofuscación.

#### Firewall bloqueando los puertos de aMule

Verifica que los puertos TCP 4662, UDP 4665 y UDP 4672 están abiertos en tu firewall local (no solo en el router). Ver [Red eD2k → Puertos](/docs/ed2k/ed2k-network).

---

### ADSL: enlace de subida o bajada congestionado

Muchos proveedores ADSL configuran su red con grandes búferes de paquetes, lo que provoca un problema conocido: **un enlace de subida congestionado puede reducir severamente la velocidad de bajada**, aunque sean canales físicamente separados. Este efecto se explica en la documentación de WonderShaper.

**Regla clave para ADSL**: nunca uses más del **90–95%** de la capacidad de subida ni de bajada (teniendo en cuenta el overhead del protocolo, ya que un enlace de 576 Kib/s no puede transferir realmente esa cantidad de datos de usuario).

**Límites recomendados para líneas ADSL comunes:**

| Línea (bajada / subida) | Máx. descarga aMule | Máx. subida aMule |
|---|---|---|
| 576 Kbps / 288 Kbps (72/36 KB/s) | ~52 KB/s | ~26 KB/s |

Si aMule es el único usuario significativo de tu ancho de banda, establece sus límites ligeramente por debajo de esos valores (por ejemplo, 42 KB/s de bajada, 21 KB/s de subida).

**Herramientas de traffic shaping para Linux:**
- [WonderShaper](https://github.com/magnific0/wondershaper) — un script de traffic shaping listo para usar con ADSL.
- **sabishape** — otro traffic shaper para escenarios similares.

**Número de slots de subida**: con un límite de subida de 21 KB/s, tener más de 5–7 conexiones de subida es contraproducente. Cada conexión recibe demasiado poco ancho de banda para ser útil. Establece el ancho de banda por slot en al menos 3 KB/s.

---

### Causas relacionadas con la red

No toda la lentitud se debe a una configuración incorrecta. Las siguientes son características inherentes de la red eD2k.

#### La red eD2k está optimizada para la disponibilidad, no para la velocidad

eD2k es una de las redes P2P más grandes del mundo, con millones de archivos no disponibles en ninguna otra red. Su objetivo de diseño principal es la **disponibilidad del archivo a lo largo de los años**, no la velocidad de descarga. Otras redes (BitTorrent, etc.) son más rápidas para contenido popular y reciente, pero tienen muchos menos archivos.

#### Sin créditos = comienzos lentos

Los créditos se acumulan con el tiempo a medida que subes a otros clientes. Una **instalación completamente nueva** sin créditos (o una en la que se ha eliminado `~/.aMule`) tendrá velocidades de descarga lentas durante días o semanas hasta que los créditos se acumulen. Cuanto más subas, más rápido se acumulan los créditos y mayor es tu prioridad en las colas de subida de otros clientes.

#### Colas largas

eMule y sus derivados (incluido aMule) usan colas de subida de hasta **5.000 clientes** por defecto. Esto evita que los clientes se cuelen en la cola volviendo a pedir un slot repetidamente, un exploit común en los primeros días de eDonkey. Como cliente nuevo sin créditos, es posible que tengas que esperar días o incluso **semanas** antes de llegar al principio de la cola de un archivo con muy pocas fuentes.

#### Archivos raros y antiguos

Los archivos con una o dos fuentes pueden tardar semanas o meses en completarse, independientemente de la configuración. Un archivo solo se descarga tan rápido como las fuentes lo suben, y las fuentes pueden desconectarse en cualquier momento.

#### Compartir demasiados archivos completos populares

Si tus carpetas compartidas contienen muchos archivos completos populares, aMule tiende a usar la mayor parte de tu ancho de banda de subida en esos archivos en lugar de en los que estás descargando actualmente. Esto significa que acumulas menos créditos en los clientes que tienen archivos que realmente necesitas.

**Recomendación:**
- Reduce la prioridad de subida de los archivos completos demasiado populares (clic derecho → Prioridad → Muy baja).
- Aumenta la prioridad de subida de los archivos que estás descargando (clic derecho → Prioridad → Alta o Release).
- Si los ratios de compartición de archivos completos superan con creces 1,0 y quieres optimizar para tus descargas actuales, considera eliminar temporalmente los archivos completos más populares de tus carpetas compartidas. **No** elimines archivos raros: mantener archivos raros compartidos beneficia a la red.

#### Qué determina realmente la velocidad de descarga

El factor más importante es el **ancho de banda de subida**. Sin una buena velocidad de subida, ningún cambio de configuración mejorará significativamente la velocidad de descarga a largo plazo. Los créditos son el mecanismo — y los créditos requieren subir.

---

## aMule ralentiza todo lo demás {#amule-makes-everything-else-slow}

Cuando aMule está en ejecución y todas las demás aplicaciones que usan internet se vuelven lentas o inutilizables, el problema es casi siempre una configuración incorrecta de aMule. Repasa los siguientes ajustes.

### Límite de subida demasiado alto

**Preferencias → Conexión → Límites de ancho de banda → Subida**

Si este valor supera aproximadamente el **75% de tu ancho de banda de subida real**, las velocidades de descarga de todas las aplicaciones, incluida la propia aMule, se verán afectadas. Casi todo el tráfico de internet usa TCP, que requiere que el receptor envíe paquetes ACK de vuelta al emisor. Si tu enlace de subida está saturado por las subidas de aMule, esos paquetes ACK no pueden salir a tiempo, lo que hace que los emisores TCP de todas las aplicaciones reduzcan su velocidad.

**Ejemplo**: si tu enlace de subida es de 500 Kbps (62,5 KB/s), no establezcas el límite de subida de aMule por encima de ~47 KB/s.

### Máx. Fuentes por archivo demasiado alto

**Preferencias → Conexión → Máx. Fuentes por Archivo → Límite Estricto**

Cada fuente requiere intentos de conexión periódicos. Si estás descargando F archivos simultáneamente con un Límite Estricto de X fuentes cada uno, aMule puede mantener hasta `X × F` conexiones. Reduce el Límite Estricto si observas una actividad de conexión excesiva.

### Máx. Conexiones demasiado alto

**Preferencias → Conexión → Límites de Conexión → Máx. Conexiones**

Cada conexión abierta consume ancho de banda (como mínimo, tráfico de keepalive y ACK). Los valores altos hacen que el overhead de conexiones consuma una fracción visible de tu ancho de banda y pueden saturar los routers con los límites de la tabla de estado NAT.

### Máx. Nuevas Conexiones por 5 segundos demasiado alto

**Preferencias → Opciones avanzadas → Máx. Nuevas Conexiones / 5 seg**

Algunos routers (especialmente los dispositivos SOHO baratos) no pueden gestionar un gran número de nuevas conexiones abriéndose en poco tiempo. Pueden ralentizarse, bloquearse o reiniciarse. Reduce este valor si tu router muestra síntomas bajo carga P2P.

### Registro detallado con wxWidgets antiguo (< 2.5.4)

**Preferencias → Opciones avanzadas → Registro detallado**

En versiones de wxWidgets anteriores a 2.5.4, activar el registro detallado hacía que la ventana del registro del servidor se llenara rápidamente, provocando un uso elevado de la CPU. Desactiva el registro detallado si usas una versión antigua de wxWidgets.

### Archivos con prioridad automática que causan excesivo I/O de disco

Si el **I/O de disco** (no la red) es el cuello de botella — el LED de actividad del disco siempre encendido, la respuesta de las aplicaciones se resiente — comprueba si los archivos con **prioridad automática** están provocando recálculos frecuentes de prioridad. Establece su prioridad explícitamente (Alta, Normal, Baja) en lugar de dejarlos en automático.

---

### Encontrar los valores correctos para tu conexión

La configuración óptima depende de:
- Tu tipo de conexión (RDSI, DSL, Cable, T1, etc.)
- La velocidad real contratada con tu ISP
- El ancho de banda necesario para otras aplicaciones en el mismo equipo o red
- El número de archivos que se descargan simultáneamente
- La velocidad del procesador (en equipos antiguos)

Dado que estos factores son muy personales, no existe una fórmula universal. Usa este enfoque iterativo:

1. **Empieza de forma conservadora**: establece el límite de subida al 50% de tu enlace de subida real, Máx. Conexiones a 200 y Máx. Nuevas Conexiones a 20.
2. **Prueba**: usa internet normalmente mientras aMule está en ejecución. Comprueba si las demás aplicaciones son usables.
3. **Si las demás aplicaciones van bien**: aumenta gradualmente Máx. Conexiones y/o Nuevas Conexiones para mejorar la velocidad de descarga.
4. **Si las demás aplicaciones sufren**: reduce los valores que más congestión causen (generalmente el límite de subida primero, luego Máx. Conexiones).
5. Repite hasta encontrar valores que ofrezcan buenas velocidades de descarga sin degradar el tráfico restante.
