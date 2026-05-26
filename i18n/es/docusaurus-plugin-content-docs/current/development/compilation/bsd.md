---
id: bsd
title: Compilar en BSD
---

Esta página proporciona instrucciones específicas para BSD sobre la instalación de las dependencias de compilación y la compilación de aMule desde el código fuente. La página general de [Compilación](index.md) documenta el flujo de trabajo completo de CMake y todas las opciones de compilación.

FreeBSD y OpenBSD son las plataformas BSD más usadas con aMule. NetBSD y DragonFlyBSD siguen patrones similares con sus respectivos gestores de paquetes. Las instrucciones siguientes usan FreeBSD como referencia principal, con notas para OpenBSD y NetBSD donde los nombres de paquetes o los procedimientos difieren.

## Instalación de binarios

La forma más rápida de obtener aMule en BSD es instalar el paquete binario precompilado desde los repositorios oficiales.

### FreeBSD

```sh
pkg install amule
```

Alternativamente, compila e instala desde la Colección de Ports:

```sh
cd /usr/ports/net-p2p/amule
make install clean
```

El proceso de compilación de Ports se integra con el framework `OPTIONS`. Ejecuta `make config` antes de `make install clean` para seleccionar qué componentes compilar (daemon, servidor web, cliente de línea de comandos, etc.) y qué funcionalidades opcionales activar.

### OpenBSD

```sh
pkg_add amule
```

### NetBSD

```sh
pkgin install amule
```

O desde pkgsrc:

```sh
cd /usr/pkgsrc/net/amule
make install clean
```

---

## Compilar desde el código fuente

### FreeBSD

#### Instalar Dependencias

```sh
pkg install \
    boost-libs \
    cmake \
    cryptopp \
    gd \
    gettext-runtime \
    gettext-tools \
    git \
    libmaxminddb \
    libupnp \
    readline \
    wx32-gtk3
```

`gettext-runtime` proporciona `libintl`, que aMule enlaza directamente. `gettext-tools` proporciona `msgfmt` y `msgmerge`, necesarios cuando `ENABLE_NLS=YES` para compilar los catálogos de traducción `.po` durante el proceso de compilación.

#### Clonar y Compilar

```sh
git clone https://github.com/amule-org/amule.git
cd amule

cmake -B build \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES \
    -DBUILD_REMOTEGUI=YES \
    -DBUILD_WEBSERVER=YES \
    -DBUILD_AMULECMD=YES \
    -DBUILD_ED2K=YES \
    -DENABLE_NLS=YES \
    -DENABLE_UPNP=YES \
    -DENABLE_IP2COUNTRY=YES

cmake --build build -j"$(sysctl -n hw.ncpu)"
sudo cmake --install build
```

---

### OpenBSD

#### Instalar Dependencias

```sh
pkg_add \
    boost \
    cmake \
    cryptopp \
    gd \
    gettext \
    git \
    libmaxminddb \
    readline \
    wxWidgets
```

:::note UPnP en OpenBSD
`libupnp` puede no estar disponible en el conjunto de paquetes de OpenBSD. Si no se necesita soporte UPnP, pasa `-DENABLE_UPNP=NO`. Como alternativa, pasa `-DDOWNLOAD_AND_BUILD_DEPS=YES` para que CMake descargue y compile `libupnp` desde el código fuente automáticamente.
:::

#### Clonar y Compilar

```sh
git clone https://github.com/amule-org/amule.git
cd amule

cmake -B build \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES \
    -DBUILD_AMULECMD=YES \
    -DBUILD_ED2K=YES \
    -DENABLE_NLS=YES \
    -DENABLE_UPNP=NO \
    -DENABLE_IP2COUNTRY=YES

cmake --build build -j"$(sysctl -n hw.ncpu)"
sudo cmake --install build
```

---

### NetBSD

#### Instalar Dependencias (pkgin)

```sh
pkgin install \
    boost-libs \
    cmake \
    cryptopp \
    gd \
    gettext-tools \
    git \
    libmaxminddb \
    libupnp \
    readline \
    wx32-gtk3
```

#### Clonar y Compilar

```sh
git clone https://github.com/amule-org/amule.git
cd amule

cmake -B build \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES \
    -DBUILD_AMULECMD=YES \
    -DBUILD_ED2K=YES \
    -DENABLE_NLS=YES \
    -DENABLE_UPNP=YES \
    -DENABLE_IP2COUNTRY=YES

cmake --build build -j"$(sysctl -n hw.ncpu)"
sudo cmake --install build
```

---

## Notas específicas de BSD

### Compilaciones paralelas: `sysctl` en lugar de `nproc`

`nproc` es específico de Linux y no está disponible en sistemas BSD. Usa `sysctl -n hw.ncpu` para obtener el número de CPUs lógicas y pasarlo al flag `-j`:

```sh
cmake --build build -j"$(sysctl -n hw.ncpu)"
```

### NLS y `libintl` en BSD

En sistemas BSD, `libintl` **no** forma parte de la librería C base — a diferencia de GNU/Linux (glibc), donde `gettext` está integrado en `libc`. aMule enlaza `libintl` directamente desde `Parser.cpp` y el código del servidor web. Cuando `ENABLE_NLS=YES`, CMake localiza `libintl` a través de `find_package(Intl)`. Si `libintl` no está instalado, la compilación falla:

```
CMake Error: ENABLE_NLS=YES but the libintl headers/library were not found.
Install GNU gettext's runtime (*BSD: gettext-runtime) …
```

**FreeBSD** divide el paquete en:
- `gettext-runtime` — la librería runtime `libintl` (necesaria para el enlazado)
- `gettext-tools` — las herramientas de compilación `msgfmt` y `msgmerge` (necesarias para compilar los ficheros `.mo`)

Instala ambos cuando compiles con NLS:

```sh
pkg install gettext-runtime gettext-tools
```

**OpenBSD** y **NetBSD** los incluyen juntos en el paquete `gettext`.

Si no se necesitan mensajes traducidos, desactiva NLS completamente:

```sh
cmake -B build -DENABLE_NLS=NO ...
```

### `glib-2.0` no es necesario en BSD

Las cabeceras de desarrollo de `glib-2.0` son exclusivas de Linux en aMule. En Linux, se llama a `g_set_prgname()` para vincular el `wl_app_id` de Wayland con la entrada `.desktop`. Esta ruta de código se compila condicionalmente solo en Linux (`CMAKE_SYSTEM_NAME STREQUAL "Linux"`). No se necesita ningún paquete de glib en ningún sistema BSD.

### Cabeceras y librerías en `/usr/local`

Los sistemas BSD instalan las cabeceras y librerías de terceros en `/usr/local/include` y `/usr/local/lib`. Estas rutas están en los paths de búsqueda por defecto del compilador y el enlazador. CMake y `pkg-config` encuentran automáticamente los paquetes instalados mediante `pkg`, `pkg_add` o pkgsrc. No se necesitan variables de entorno adicionales como `CPPFLAGS` o `LDFLAGS`.

---

## Post-instalación

Tras un `cmake --install build` correcto, aMule crea su directorio de configuración la primera vez que se ejecuta:

```
~/.aMule/
```

- Como root: `/root/.aMule/`
- Como usuario normal: `/home/<usuario>/.aMule/` (o `/usr/home/<usuario>/.aMule/` en FreeBSD)

Para generar el fichero `remote.conf` inicial, necesario para `amuleweb`, `amulecmd` y `amulegui`:

```sh
amuleweb --write-config
```

---

## Problemas comunes

### Símbolo `_libintl_dgettext` no definido

Este error del enlazador se produce cuando `ENABLE_NLS=YES` pero `libintl` no está instalado:

```
undefined reference to `_libintl_dgettext'
```

Instala el runtime de gettext y elimina el directorio de compilación antes de reconfigurar (los resultados de pkg-config se almacenan en caché):

```sh
pkg install gettext-runtime   # FreeBSD
rm -rf build
cmake -B build -DENABLE_NLS=YES ...
```

### CMake no encuentra `msgfmt` ni `msgmerge`

```
CMake Error: ENABLE_NLS=YES but msgfmt and/or msgmerge were not found.
```

Estas herramientas están en `gettext-tools` (FreeBSD) o `gettext` (OpenBSD/NetBSD). Instálalas y vuelve a ejecutar cmake:

```sh
pkg install gettext-tools   # FreeBSD
```

### Versión de wxWidgets demasiado antigua

aMule requiere wxWidgets ≥ 3.2.0:

```
CMake Error: wxWidgets 3.2.0 or newer is required
```

Comprueba la versión instalada:

```sh
pkg info wx32-gtk3   # FreeBSD
```

Si hay instalada una versión más antigua, actualiza el paquete:

```sh
pkg upgrade wx32-gtk3   # FreeBSD
```

### CMake no encuentra `wx-config`

Si wxWidgets está instalado pero cmake no lo localiza, pasa la ruta del ejecutable explícitamente:

```sh
cmake -B build \
    -DwxWidgets_CONFIG_EXECUTABLE=/usr/local/bin/wx-config \
    ...
```

En FreeBSD con `wx32-gtk3`, el script de configuración puede llamarse `wxgtk32u-3.2-config`:

```sh
cmake -B build \
    -DwxWidgets_CONFIG_EXECUTABLE=/usr/local/bin/wxgtk32u-3.2-config \
    ...
```

### `libupnp` no encontrado

```
CMake Error: ENABLE_UPNP=YES but libupnp was not found.
```

Desactiva UPnP o deja que CMake lo compile desde el código fuente:

```sh
# Desactivar UPnP
cmake -B build -DENABLE_UPNP=NO ...

# O compilar libupnp desde el código fuente automáticamente
cmake -B build -DDOWNLOAD_AND_BUILD_DEPS=YES ...
```

### Versión de Crypto++ demasiado antigua

CMake requiere Crypto++ ≥ 5.6. Comprueba la versión:

```sh
pkg info cryptopp   # FreeBSD
```

Si el paquete es demasiado antiguo, compila Crypto++ desde el código fuente: [https://github.com/weidai11/cryptopp](https://github.com/weidai11/cryptopp)
