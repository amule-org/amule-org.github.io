---
id: fake-files-and-servers
title: Archivos y servidores falsos
---

# Archivos y servidores falsos

La red eD2k ofrece escasa protección integrada contra contenido falso y servidores maliciosos. Esta página explica cómo detectar archivos falsos, identificar servidores falsos y mantener una lista de servidores segura.

---

## Archivos falsos

### ¿Qué es un archivo falso?

Un **archivo falso** es aquel que está etiquetado intencionalmente para parecer algo que no es. El contenido real puede ser:
- Un archivo no relacionado (por ejemplo, un archivo de vídeo que en realidad es un ejecutable con virus)
- Un archivo corrupto que no puede utilizarse
- Un archivo vacío o casi vacío
- Malware disfrazado de contenido popular (música, películas, software)

La red eD2k no autentica el contenido, por lo que cualquier cliente puede compartir cualquier archivo con cualquier nombre y hash. Una vez que un hash de archivo queda asociado a contenido malicioso, se propaga por la red a medida que las fuentes lo comparten entre sí.

:::note
No confundas **falso** con **corrupto**. Un archivo corrupto tiene el contenido correcto pero algunos bytes se dañaron durante la transferencia. El sistema AICH de aMule gestiona la corrupción automáticamente. Un archivo falso tiene un contenido completamente diferente al esperado, lo que es extremadamente raro debido a las propiedades matemáticas del MD4; sin embargo, los archivos falsos suelen funcionar compartiéndose bajo un nombre diferente al de su hash real, o siendo fakes recién creados con su propio hash.
:::

### ¿Cómo detectar archivos falsos?

aMule ofrece dos mecanismos integrados:

#### 1. Comentarios de usuarios

Otros clientes que han descargado el mismo archivo pueden dejar comentarios y valoraciones visibles para todos. Haz clic derecho sobre una descarga y selecciona **Mostrar detalles del archivo** para ver los comentarios. Si varios usuarios han marcado un archivo como falso o han descrito contenido incorrecto, trátalo como sospechoso.

#### 2. Inspección de los detalles del archivo

Haz clic derecho sobre una descarga y selecciona **Mostrar detalles del archivo**. Comprueba si alguna fuente ha asignado un nombre alternativo que sugiera un contenido diferente al esperado. Si el nombre del archivo no coincide con el contenido descrito por fuentes independientes, puede ser un fake.

#### 3. Servicios FakeCheck

Haz clic derecho sobre una descarga y selecciona **FakeCheck** para consultar una base de datos de hashes falsos conocidos. Los siguientes servicios han sido utilizados para este fin:

- [http://stats.razorback2.com/ed2khistory](http://stats.razorback2.com/ed2khistory) — consulta el historial del archivo y verifica si la fecha de release es plausible y si los nombres de archivo son coherentes entre las fuentes.

:::caution
Algunos servicios FakeCheck de la época original de la wiki (como `donkeyfakes.gambri.net`, cerrado en octubre de 2005, y `jugle.net`) ya no están operativos. Comprueba que cualquier servicio que uses siga activo.
:::

### Consejos prácticos para evitar archivos falsos

- **Consulta los comentarios** antes de descargar. Los archivos con muchas fuentes pero con muchos comentarios "FAKE" deben evitarse.
- **Verifica el tamaño del archivo**: un archivo de película de 700 MB que aparece como 2 MB es obviamente incorrecto.
- **Comprueba la coherencia de la extensión**: un archivo llamado `movie.avi` que tiene un número mágico `application/exe` en los primeros bytes (visible en un editor hexadecimal sobre el primer chunk descargado) es sospechoso.
- **Prefiere archivos con muchas fuentes completas**: el número entre corchetes en los resultados de búsqueda (clientes que se sabe que tienen el archivo completo) se correlaciona con la legitimidad, aunque no es concluyente.
- **Usa AICH**: el sistema AICH (Advanced Intelligent Corruption Handling) verifica la integridad a nivel de sub-chunk mediante un árbol de hashes. Aunque AICH no detecta un fake (un archivo internamente coherente pero que no es lo que buscabas), sí evita aceptar accidentalmente chunks corruptos de una fuente falsa que mezcle datos legítimos y corruptos.

---

## Servidores falsos {#fake-servers}

### ¿Qué son los servidores falsos?

Los servidores falsos son servidores eD2k maliciosos que sirven uno o más de estos propósitos:

1. **Manipular los resultados de búsqueda** para distribuir virus o archivos Windows Media con DRM. Los usuarios que buscan cualquier palabra clave reciben resultados apuntando a archivos maliciosos. Los archivos suelen tener nombres como:
   - `Secured Downloading of [keyword] with New Secured eMule0.47c.zip`
   - `[keyword] Web hottest videos personal player.exe`

2. **Recopilar información de usuarios**: algunos servidores falsos registran las direcciones IP y los hashes de archivos de todos los clientes que se conectan, acumulando información sobre lo que descargan los usuarios sin ofrecer ningún servicio útil (sin resultados de búsqueda, sin fuentes).

3. **Hacerse pasar por servidores legítimos conocidos**: los servidores falsos copian con frecuencia los nombres, descripciones y estadísticas de conexión de servidores legítimos bien conocidos para parecer fiables.

### ¿Cómo identificar un servidor falso?

- **Resultados de búsqueda inusuales**: si las búsquedas devuelven sistemáticamente muchos archivos pequeños con alto número de fuentes y nombres sospechosos con "frases gancho", es probable que estés conectado a un servidor falso.
- **Verifica en listas de servidores conocidos**: comprueba la IP del servidor en las listas verificadas referenciadas en la página [server.met](../user-guide/amule-files/server-met.md).
- **Comprueba las estadísticas del servidor**: contrasta las estadísticas declaradas por el servidor con fuentes independientes.

### ¿Cómo protegerse de servidores falsos?

#### Eliminar servidores desconocidos

Elimina de tu lista de servidores todos aquellos que no figuren en una lista verificada. En la ventana de Servidores, selecciona los servidores desconocidos y elimínalos.

#### Deshabilitar las actualizaciones automáticas de la lista de servidores desde servidores y clientes

En **versiones de aMule anteriores a 2.2.0**, aMule añade automáticamente los servidores recibidos de otros servidores y clientes a la lista de servidores por defecto. Así es como se propagan los servidores falsos. Desactívalo en:

- **Preferencias → Servidores** → desmarcar "Actualizar lista de servidores al conectarse a un servidor"
- **Preferencias → Servidores** → desmarcar "Actualizar lista de servidores al conectarse a un cliente"

#### Usar una lista de servidores curada

Mantén una lista de servidores de una fuente de confianza y actualízala manualmente. Consulta la página [server.met](../user-guide/amule-files/server-met.md) para ver las fuentes actuales.

Usa el archivo **Addresses.dat** (`~/.aMule/addresses.dat`) para configurar las URLs desde las cuales aMule descarga automáticamente listas de servidores actualizadas. Añade solo URLs de confianza.

#### Usar Kademlia en lugar de servidores eD2k

La solución más robusta es **deshabilitar eD2k por completo** y usar solo **Kademlia**. Al ser Kademlia una red sin servidores y descentralizada, no hay servidores falsos a los que conectarse.

Deshabilita eD2k en **Preferencias → Conexión** → desmarcar "Conectar a la red eD2k".

:::note
Deshabilitar eD2k y usar solo Kademlia no debería resultar en menos fuentes ni en velocidades de descarga más bajas en condiciones normales. Las búsquedas y la localización de fuentes tardarán algo más porque las consultas de Kademlia se propagan por la red distribuida en lugar de ir a un servidor central, pero los resultados son equivalentes para la mayoría de los archivos.
:::

---

## Probar tus puertos {#testing-your-ports}

### ¿Por qué probar tus puertos?

Tener una **Low ID** es uno de los problemas más comunes en la red eD2k. La Low ID significa casi siempre que tu puerto TCP 4662 (o el puerto TCP que hayas configurado) no es accesible desde internet, ya sea porque tu firewall lo está bloqueando o porque tu router no lo está redirigiendo.

Consecuencias de la Low ID:
- No puedes conectarte directamente a otros clientes con Low ID.
- Algunos servidores rechazan a los clientes con Low ID.
- Tu velocidad de descarga es más baja porque menos clientes pueden iniciar conexiones contigo.
- La transferencia de datos entre tú y otros clientes se enruta a través del servidor, aumentando la carga del servidor.

### ¿Cómo probar tus puertos?

Usa una de estas herramientas online para verificar que tu puerto TCP es accesible desde internet:

- [https://portcheck.ing/](https://portcheck.ing/)
- [https://portchecker.co/](https://portchecker.co/)

Introduce tu número de puerto TCP (por defecto 4662) y ejecuta la comprobación. Si el puerto aparece como abierto, recibirás una High ID del servidor.

### Qué hacer si la prueba de puertos falla

1. **Comprueba tu firewall**: asegúrate de que el TCP 4662 (o tu puerto configurado) está abierto para conexiones **entrantes** en tu firewall local (tanto el firewall de hardware como el de software, si corresponde).

2. **Comprueba tu router**: añade una regla de reenvío de puertos para redirigir el TCP 4662 (o tu puerto configurado) a la dirección IP interna del equipo que ejecuta aMule. Consulta el manual de tu router para obtener instrucciones.

3. **UPnP**: si tu router es compatible con UPnP, actívalo en **Preferencias → Conexión → Usar UPnP** para que aMule configure el reenvío de puertos automáticamente.

4. **Prueba con un puerto diferente**: si tu ISP bloquea el puerto 4662, configura un puerto TCP diferente en **Preferencias → Conexión → Puerto TCP estándar del cliente** y reenvía ese puerto en su lugar. Actualiza también los puertos UDP:
   - UDP `TCP_PORT + 3` (reemplaza a 4665)
   - UDP `4672` (mantén este fijo)

5. **Vuelve a ejecutar la prueba de puertos** después de cada cambio.

Para una guía completa sobre cómo obtener una High ID, consulta [Obtener HighID](../user-guide/configuration/index.md).
