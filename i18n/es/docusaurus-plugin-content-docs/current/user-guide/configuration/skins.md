---
id: skins
title: Skins
---

Un **skin** es un archivo o conjunto de archivos que cambia la apariencia visual de una aplicación, permitiendo a los usuarios personalizar los iconos e imágenes que se muestran en la interfaz.

aMule admite dos sistemas de skinning independientes:

1. **Skins de bitmaps de aMule** — reemplazan los iconos de la barra de herramientas y de los clientes específicos de aMule con imágenes personalizadas (basados en archivos zip).
2. **Skins de temas GTK** — cambian fuentes, colores, formas y comportamiento de los widgets para todas las aplicaciones GTK del sistema (solo Linux/BSD).

---

## Skins de bitmaps de aMule

### Qué se puede personalizar

Los skins de bitmaps de aMule reemplazan los iconos de la barra de herramientas y de la lista de clientes. Las imágenes de la barra de herramientas son de **32×32 px** y las imágenes de clientes son de **16×16 px**. Cualquier imagen que no esté presente en el skin usa el valor predeterminado de aMule.

### Activar un skin

1. Abre **Preferencias → Interfaz**.
2. En el desplegable **Skin a usar**, selecciona el skin que quieras aplicar.
3. Haz clic en **Aceptar** o **Aplicar**. El skin se aplica de inmediato.

Para desactivar los skins, selecciona **- default -** en el desplegable.

El desplegable se rellena automáticamente con los skins encontrados en los directorios de skins de usuario y del sistema, con el prefijo `User:` o `System:` respectivamente.

### Rutas de los archivos skin

Los skins se buscan en dos ubicaciones: un directorio por usuario y un directorio global del sistema.

| Plataforma | Skins de usuario | Skins del sistema |
|---|---|---|
| Windows | `%APPDATA%\aMule\skins\` | `.\skins\` (directorio de amule.exe) |
| macOS | `~/Library/Application Support/aMule/skins/` | `aMule.app/Contents/SharedSupport/skins/` |
| Linux / Solaris / BSD | `~/.aMule/skins/` | `/usr/share/amule/skins/` (o `/usr/local/share/amule/skins/` para compilaciones locales) |

Los skins del sistema están disponibles para todos los usuarios de la máquina; los skins de usuario solo están disponibles para el usuario actual.

### Instalar un skin

1. Descarga el archivo zip del skin.
2. Cópialo al directorio de skins de usuario de tu plataforma (ver [Rutas de los archivos skin](#rutas-de-los-archivos-skin) arriba).
3. Aparecerá en el desplegable **Skin a usar** la próxima vez que abras Preferencias.

### Formato del archivo skin

Un archivo skin es un **archivo zip** estándar que contiene imágenes PNG. Los nombres de archivo dentro del zip deben coincidir exactamente con los nombres indicados a continuación. Cualquier imagen que falte usa el valor predeterminado de aMule.

#### Imágenes de la barra de herramientas (32×32 px)

| Archivo | Elemento |
|---|---|
| `Toolbar_Connect.png` | Botón Conectar |
| `Toolbar_Disconnect.png` | Botón Desconectar |
| `Toolbar_Connecting.png` | Botón Conectando (en progreso) |
| `Toolbar_Network.png` | Botón Ventana de redes |
| `Toolbar_Transfers.png` | Botón Ventana de transferencias |
| `Toolbar_Search.png` | Botón Ventana de búsquedas |
| `Toolbar_Shared.png` | Botón Ventana de archivos compartidos |
| `Toolbar_Messages.png` | Botón Ventana de mensajes |
| `Toolbar_Stats.png` | Botón Ventana de estadísticas |
| `Toolbar_Prefs.png` | Botón Ventana de preferencias |
| `Toolbar_Import.png` | Botón Ventana de importación |
| `Toolbar_About.png` | Botón Ventana Acerca de |
| `Toolbar_Blink.png` | Indicador de parpadeo/notificación |

#### Imágenes de clientes (16×16 px)

| Archivo | Elemento |
|---|---|
| `Client_A4AFNoNeededPartsQueueFull.png` | Cliente A4AF con cola llena y sin partes necesarias |
| `Client_aMule.png` | Cliente aMule |
| `Client_BadGuy.png` | Cliente malo/baneado |
| `Client_CommentOnly.png` | Cliente solo con comentario |
| `Client_Connecting.png` | Cliente conectando |
| `Client_CreditsGrey.png` | Cliente con créditos (gris) |
| `Client_CreditsYellow.png` | Cliente con créditos (amarillo) |
| `Client_eDonkeyHybrid.png` | Cliente eDonkey Hybrid |
| `Client_eMule.png` | Cliente eMule |
| `Client_Encrypted.png` | Conexión cifrada |
| `Client_ExcellentRatingOnFile.png` | Cliente con valoración excelente del archivo |
| `Client_ExtendedProtocol.png` | Cliente usando protocolo extendido |
| `Client_FairRatingOnFile.png` | Cliente con valoración aceptable del archivo |
| `Client_Friend.png` | Amigo |
| `Client_GoodRatingOnFile.png` | Cliente con valoración buena del archivo |
| `Client_InvalidRatingOnFile.png` | Cliente con valoración inválida del archivo |
| `Client_lphant.png` | Cliente lphant |
| `Client_mlDonkey.png` | Cliente mlDonkey |
| `Client_OnQueue.png` | Cliente en cola |
| `Client_PoorRatingOnFile.png` | Cliente con valoración pobre del archivo |
| `Client_SecIdent.png` | Identificación segura activa |
| `Client_Shareaza.png` | Cliente Shareaza |
| `Client_StatusUnknown.png` | Estado del cliente desconocido |
| `Client_Transfer.png` | Cliente transfiriendo |
| `Client_Unknown.png` | Cliente desconocido |
| `Client_Upload.png` | Cliente subiendo |
| `Client_xMule.png` | Cliente xMule |

### Skins incluidos

aMule incluye varios skins listos para usar. Se instalan en el directorio de skins del sistema y aparecen en el desplegable **Skin a usar** con el prefijo `System:`.

| Skin | Estilo |
|---|---|
| `gnome` | Tema de iconos GNOME |
| `kde4` | Tema de iconos KDE 4 |
| `Mac_Gray` | Iconos grises estilo macOS |
| `papirus` | Tema de iconos Papirus |
| `priscilla` | Skin clásico de aMule |
| `tango` | Tema de iconos Tango |
| `xfce` | Tema de iconos Xfce |

### Skins de la comunidad

Los siguientes skins están disponibles para descargar. Para instalarlos, copia el archivo zip al directorio de skins de usuario de tu plataforma.

| Skin | Versión | Descarga |
|---|---|---|
| Crystal Project | 0.2.3 | [skin-crystal-project-0.2.3.zip](/skins/skin-crystal-project-0.2.3.zip) |

---

## Skins de temas GTK (Linux/BSD)

:::note
La mayoría de usuarios de Windows y macOS no necesitarán esta sección. Se aplica solo a compilaciones de aMule enlazadas contra GTK (que es el caso habitual en Linux/BSD).
:::

### Qué hacen los skins GTK

aMule usa el toolkit GTK. GTK permite que todos los widgets (barras de desplazamiento, botones, fuentes, colores, etc.) se tematizen a nivel de toolkit mediante un tema GTK. Esto cambia la apariencia de **todas las aplicaciones GTK** del sistema, no solo de aMule. Los temas GTK no pueden reemplazar los iconos específicos de aMule — usa los skins de bitmaps de aMule para eso.

### Determinar tu versión de GTK

```sh
amule --version
```

Ejemplo de salida:
```
aMule 2.3.3 using wxGTK3 v3.2.4 (OS: Linux)
```

La cadena de versión `wxGTK` indica qué versión de GTK tiene enlazada tu compilación de aMule:

- `wxGTK3` → **GTK3** (la mayoría de compilaciones modernas)
- `wxGTK2` → **GTK2** (compilaciones antiguas)

### Aplicar un tema GTK

La herramienta para cambiar temas GTK depende de tu entorno de escritorio:

| Escritorio | Herramienta |
|---|---|
| GNOME | **GNOME Tweaks** (`gnome-tweaks`) → Apariencia |
| KDE Plasma | **Configuración del sistema** → Colores y temas → Tema GTK |
| LXDE / LXQT / GTK general | `lxappearance` |
| Línea de comandos (GTK3) | `gsettings set org.gnome.desktop.interface gtk-theme <nombre-del-tema>` |

Los temas GTK deben estar instalados en el sistema antes de que puedan seleccionarse. En Debian/Ubuntu:

```sh
# Instalar lxappearance (funciona con GTK2 y GTK3)
apt-get install lxappearance

# Ver temas GTK3 disponibles
apt-cache search gtk3-engines
apt-get install gnome-themes-extra

# Ver temas GTK2 disponibles
apt-cache search gtk2-engines
apt-get install gtk2-engines
```
