---
id: index
title: Compilación
---

aMule usa **CMake** (versión mínima 3.10) como sistema de compilación. Esta página cubre el flujo completo de compilación, instalación y desinstalación. Los comandos de instalación de dependencias específicos de cada plataforma están en las subpáginas de [Windows](windows.md), [macOS](macos.md), [Linux](linux.md) y [BSD](bsd.md).

## Dependencias

### Requeridas

| Paquete | Versión mínima | Notas |
|---|---|---|
| CMake | 3.10 | Sistema de compilación |
| zlib | 1.2.3 | Compresión |
| wxWidgets | 3.2.0 | Kit de herramientas GUI (rama 3.2 o superior) |
| Crypto++ | 5.6 | Funciones criptográficas |
| Boost | 1.70 | Solo cabeceras; únicamente se usa `asio` |

### Opcionales

| Paquete | Qué habilita |
|---|---|
| `libgd` ≥ 2.0.0 | Imágenes de estadísticas en `cas` |
| `libupnp` ≥ 1.6.6 | Redirección de puertos UPnP |
| `libmaxminddb` ≥ 1.0 | Banderas de país y mapeo IP→país |
| `gettext` ≥ 0.11.5 | Soporte de idioma nativo (NLS) |
| `readline` | Edición de línea en `amulecmd` |

## Inicio Rápido

```sh
git clone https://github.com/amule-org/amule.git
cd amule

# Instalar dependencias específicas de la plataforma primero (ver subpáginas)

cmake -B build \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES

cmake --build build -j"$(nproc)"

sudo cmake --install build
```

## Opciones de Compilación

Todas las opciones se pasan como `-DOPTION=YES` o `-DOPTION=NO` al comando inicial `cmake -B build`.

| Opción | Por defecto | Compila |
|---|---|---|
| `BUILD_MONOLITHIC` | YES | `amule` — cliente GUI todo en uno |
| `BUILD_DAEMON` | NO | `amuled` — daemon sin interfaz |
| `BUILD_REMOTEGUI` | NO | `amulegui` — GUI de control remoto |
| `BUILD_WEBSERVER` | NO | `amuleweb` — interfaz web HTTP |
| `BUILD_AMULECMD` | NO | `amulecmd` — cliente CLI para el daemon |
| `BUILD_TESTING` | YES | Suite de tests unitarios |
| `ENABLE_NLS` | YES | Soporte de idioma nativo (gettext) |

## Instalar

```sh
sudo cmake --install build
```

### Instalación para Desarrolladores (Sin sudo)

```sh
cmake --install build --prefix=$HOME/.local
```

## Desinstalar

```sh
sudo xargs rm -f < build/install_manifest.txt
```

## Ejecutar Sin Instalar

```sh
./build/amule
./build/amuled
./build/amulecmd
```
