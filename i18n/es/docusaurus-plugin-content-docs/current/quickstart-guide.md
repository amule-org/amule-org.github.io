---
id: quickstart-guide
title: Guía rápida
---

Esta guía te acompaña durante tu primera experiencia con [aMule](./index.md), desde la configuración de los límites de velocidad hasta la descarga y compartición de tus primeros archivos. No es necesario conocer las redes subyacentes para seguirla, pero sí tener aMule instalado en tu ordenador.

Cada paso enlaza a las páginas de referencia detalladas en el [Manual de usuario](./manual) si deseas profundizar.

:::tip
aMule hace un uso extensivo de los menús contextuales del botón derecho. Si no encuentras una función, intenta hacer clic derecho sobre el elemento.
:::

## 1. Instalar aMule

Si aún no has instalado aMule, consulta la [Guía de instalación](./manual/installation) para obtener instrucciones específicas de la plataforma.

Inicia aMule desde el menú de tu entorno de escritorio o ejecutando [`amule`](./manual/interfaces/gui/amule.md) en una terminal. La primera vez que se inicie, aMule mostrará una notificación indicando que lo estás ejecutando por primera vez.

## 2. Establecer los límites de velocidad

aMule tiene los límites de subida y bajada **desactivados por defecto** (sin limitación de velocidad). En una conexión limitada, aMule puede acaparar todo el ancho de banda disponible, perjudicando a otras aplicaciones que comparten la conexión. Una subida sin límites puede ralentizar incluso tus propias descargas. **Es muy recomendable establecer límites realistas.**

Abre [Preferencias](./manual/interfaces/gui/preferences.md) (el icono **Preferencias** en la parte superior de la ventana; en macOS, el icono **Herramientas**), luego haz clic en la pestaña **Conexión** y ajusta los [Límites de ancho de banda](./manual/interfaces/gui/preferences.md#bandwidth-limits):

![Diálogo de límites de ancho de banda](/img/docs/quickstart/preferences_bandwidth_es.png)

Establece la **Subida** y la **Bajada** en aproximadamente el **80% de la velocidad real de tu línea**. Los valores se expresan en **kilobytes por segundo** (kB/s), mientras que la velocidad de tu ISP se suele anunciar en **megabits por segundo** (Mbps); para convertir, multiplica la cifra de Mbps por **125**.

> **Ejemplo**: una conexión de fibra de 600 Mbps / 100 Mbps equivale aproximadamente a 75.000 kB/s de bajada / 12.500 kB/s de subida. Establece los límites en unos **60.000 de bajada / 10.000 de subida** para no superar la capacidad de tu conexión.

:::note
La red eD2k recompensa el intercambio: tu velocidad máxima de descarga está ligada a tu límite de subida. Consulta [Velocidades de descarga lentas](./manual/troubleshooting/slow-speeds.md) para obtener más detalles.
:::

## 3. Conectarse a las redes

aMule puede conectarse a dos redes al mismo tiempo, y ambas están habilitadas por defecto:

- **[eD2k](./p2p-networks/ed2k)** — la clásica red eDonkey basada en servidores.
- **[Kademlia (Kad)](./p2p-networks/kademlia.md)** — una red distribuida sin servidores que funciona sin depender de servidores centrales.

Puedes desactivar cualquiera de las dos en la parte inferior de la pestaña **Conexión** de [Preferencias](./manual/interfaces/gui/preferences.md#connection).

Abre la ventana [Redes](./manual/interfaces/gui/networks.md). Para obtener la lista de servidores eD2k, haz clic en el campo de texto URL de la parte superior (por ejemplo, `https://upd.emule-security.org/server.met`) y pulsa Enter. Una vez descargada la lista, haz clic en el botón grande **Conectar** en la parte superior izquierda para conectarte a ambas redes habilitadas:

![Lista de servidores cargada a través de eD2k](/img/docs/quickstart/networks_upper_ed2k_es.png)

Espera a que aMule informe de una conexión exitosa antes de buscar; la barra de estado en la parte inferior de la ventana muestra tu servidor eD2k y el estado de Kad una vez conectado. Para Kad, el botón **Conectar** es suficiente en la primera ejecución; para el control manual y la actualización de `nodes.dat`, consulta la página [Redes](./manual/interfaces/gui/networks.md).

### ID alto o bajo

Las redes P2P necesitan que los clientes se comuniquen directamente, por lo que un cortafuegos o router que bloquee los puertos de aMule puede causar problemas. Comprueba el [icono del globo](./manual/interfaces/gui/statusbar.md#globe-icon) en la esquina inferior derecha de la ventana:

![Estado de la conexión de red en la barra de estado](/img/docs/quickstart/statusbar_networks_es.png)

- **Flechas verdes** — tienes un **[ID alto](./p2p-networks/ed2k/high-id.md)** y conectividad completa. Continúa normalmente.
- **Flechas amarillas** — tienes un **[ID bajo](./p2p-networks/ed2k/high-id.md)**, lo que reduce mucho el rendimiento. Necesitarás abrir y redirigir los puertos de aMule. Consulta [Conectividad de red](./manual/configuration/network-connectivity.md) para obtener instrucciones paso a paso.

## 4. Buscar y descargar

Una vez conectado, haz clic en el botón **Búsquedas** para abrir la ventana [Búsquedas](./manual/interfaces/gui/searches.md). Introduce un término en el campo **Nombre**, elige un tipo de búsqueda y pulsa Enter:

![Diálogo de búsqueda](/img/docs/search_dialog_es.png)

- **Local** — solo pregunta al servidor al que estás conectado. Es rápido y suele ser suficiente.
- **Global** — pregunta a todos los servidores de tu lista. Es más lento, pero más amplio.
- **Kad** — busca en la red Kademlia.

Haz doble clic en un resultado (o selecciónalo y haz clic en **Descargar**) para añadirlo a la cola:

![Resultados de búsqueda](/img/docs/search_results_es.png)

Los resultados se colorean: **azul** = no descargado (azul más brillante = más fuentes), **rojo** = ya en tu cola, **verde** = ya descargado o compartido, **magenta** = cancelado anteriormente.

La página de Búsquedas también soporta [expresiones booleanas](./manual/interfaces/gui/searches.md#search-logic-boolean-operators) (`AND`, `OR`, `NOT`), [filtros](./manual/interfaces/gui/searches.md#extended-parameters) por tipo y tamaño de archivo, y un [filtro de resultados por expresión regular](./manual/interfaces/gui/searches.md#filtering).

## 5. Gestionar tus descargas

Haz clic en el botón **Descargas** para abrir la ventana [Descargas](./manual/interfaces/gui/downloads.md) y supervisar tus archivos en cola:

![Cola de transferencias](/img/docs/transfers_queue_es.png)

Una forma rápida de interpretar la barra de progreso: el azul oscuro indica que muchas fuentes tienen el archivo, mientras que los **segmentos rojos indican que ninguna fuente conocida tiene esa parte** — esas descargas es poco probable que se completen. Haz doble clic en cualquier archivo para inspeccionar sus fuentes.

La página de Descargas documenta las [columnas](./manual/interfaces/gui/downloads.md), los [iconos](./manual/interfaces/gui/downloads.md) de las fuentes y las [categorías](./manual/interfaces/gui/downloads.md#categories) — grupos con nombre, cada uno con su color y carpeta de destino — en detalle.

### ¿A dónde van tus archivos?

aMule mantiene las descargas en progreso en un directorio **Temporal** y los archivos completados en un directorio **Incoming** (Entrantes). Ambos se pueden cambiar en **Preferencias → Directorios**; consulta [Directorios](./manual/configuration/directories.md) para conocer las rutas por defecto en cada plataforma.

## 6. Compartir archivos

Es **tu** responsabilidad asegurarte de no violar ninguna ley relacionada con el material que compartes. Hay dos formas de compartir archivos:

1. **Coloca archivos en tu directorio Incoming.** Copia archivos allí (consulta [Directorios](./manual/configuration/directories.md#incoming-directory) para conocer la ruta en tu plataforma) y luego pulsa el botón **Recargar** en la página [Archivos compartidos](./manual/interfaces/gui/shared-files.md):

   ![Botón Recargar archivos compartidos](/img/docs/quickstart/shared_files_reload_button_es.png)

2. **Añade directorios compartidos en Preferencias.** Abre [**Preferencias → Directorios**](./manual/interfaces/gui/preferences.md#directories), navega hasta una carpeta y haz doble clic en ella para compartirla (o haz clic derecho para compartirla recursivamente, incluyendo subdirectorios).

## Siguientes pasos

Ahora tienes aMule configurado, conectado, descargando y compartiendo. Para continuar aprendiendo:

- [Referencia de la interfaz gráfica](./manual/interfaces/gui) — cada ventana, botón y preferencia en detalle.
- [Configuración](./manual/configuration) — directorios, cortafuegos, UPnP, proxy y más.
- [Solución de problemas](./manual/troubleshooting) y las [FAQ](./manual/faq.md) — para velocidades lentas, ID bajo y otros problemas comunes.
- [Interfaces remotas](./manual/interfaces) — ejecuta aMule sin cabeza (`amuled`) y contrólalo desde una [interfaz web](./manual/interfaces/amuleweb.md) o la [línea de comandos](./manual/interfaces/amulecmd.md).
- [Redes P2P](./p2p-networks) — conoce cómo funcionan las redes eD2k y Kademlia.
