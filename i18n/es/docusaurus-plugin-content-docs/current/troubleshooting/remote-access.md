---
id: remote-access
title: Solución de problemas de acceso remoto
---

# Solución de problemas de acceso remoto

Problemas de conexión a aMule de forma remota mediante `amulecmd` o `amuleweb`.

---

## `amulecmd`

### No me puedo conectar a amuled: no parece estar escuchando. ¿Qué ocurre? {#i-cannot-connect-to-amuled--it-doesnt-seem-to-be-listening-whats-wrong}

Probablemente no has habilitado las **Conexiones Externas** en `~/.aMule/amule.conf`. Abre aMule (o `amulegui`) y ve a **Preferencias → Controles Remotos**, habilita las Conexiones Externas y establece una contraseña.

También puedes generar el hash `ECPassword` manualmente:

```bash
echo -n 'tucontraseña' | md5sum | cut -d ' ' -f 1
```

Pega el hash MD5 resultante como valor de `ECPassword` en `~/.aMule/amule.conf`.

---

## `amuleweb`

### ¿Por qué `amuleweb` no consigue conectarse?

Verifica que el binario `amuleweb` y el binario `amuled`/`amule` proceden de **la misma release**. Los binarios de diferentes releases no son compatibles — `amuleweb` de 2.0.0-rc3 no funcionará con aMule 2.0.0-rc4 ni con ninguna otra versión.

### ¿Por qué siempre obtengo "No password specified, login will not be allowed." en aMule 2.2?

Es una mala configuración frecuente al actualizar desde 2.1.x:

1. Configura la contraseña de la interfaz web en la UI del **`amule` monolítico o `amulegui`** (Preferencias → Controles Remotos), no editando los archivos de configuración manualmente.
2. **No** ejecutes `amuleweb --write-config` a menos que sepas exactamente lo que estás haciendo.
3. Tras guardar las preferencias, comprueba `~/.aMule/remote.conf` y verifica que las claves `Password` y `AdminPassword` contienen valores con **hash MD5** (cadenas hexadecimales de 32 caracteres), no contraseñas en texto plano.

### ¿Por qué la interfaz web sigue volviendo a la página de inicio de sesión?

Prueba a **eliminar las cookies** del dominio `amuleweb` en tu navegador. Las cookies de sesión caducadas o corruptas de una sesión anterior de `amuleweb` provocan este bucle.
