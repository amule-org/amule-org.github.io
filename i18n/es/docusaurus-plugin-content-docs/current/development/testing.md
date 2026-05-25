---
id: testing
title: Testing
---

aMule tiene dos mecanismos complementarios de testing: una **suite de tests unitarios** automatizada que se ejecuta en CI y puede ejecutarse localmente, y una **red de test eD2k virtual** para testing de integración del comportamiento de red sin conectarse a la red eD2k/Kad real.

## Tests Unitarios

### Ejecutar la Suite de Tests

Activa el testing al configurar la compilación:

```sh
cmake -B build \
    -DCMAKE_BUILD_TYPE=Debug \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_TESTING=YES
cmake --build build -j"$(nproc)"
ctest --test-dir build --output-on-failure
```

`--output-on-failure` imprime la salida completa de cualquier test que falle. El flag `--timeout 10` (usado en CI) limita cada test a 10 segundos para detectar cuelgues.

### Estructura de la Suite de Tests

La suite de tests vive en `unittests/` y usa **MuleUnit**, un framework de testing minimalista incluido en el repositorio.

### Macros de Assertion Disponibles

| Macro | Descripción |
|---|---|
| `ASSERT_EQUALS(expected, actual)` | Falla si `expected != actual` |
| `ASSERT_TRUE(condition)` | Falla si `condition` es falso |
| `ASSERT_FALSE(condition)` | Falla si `condition` es verdadero |
| `ASSERT_NULL(ptr)` | Falla si `ptr != NULL` |
| `ASSERT_NOT_NULL(ptr)` | Falla si `ptr == NULL` |
| `FAIL(message)` | Fallo incondicional con mensaje |

## Red de Test eD2k Virtual

Una **red de test** es una red eD2k virtual aislada de internet real. Consiste en uno o más servidores eD2k y un conjunto de clientes aMule que solo pueden comunicarse entre sí, no con peers del mundo real. Es útil para:

- Probar el comportamiento de descarga/subida sin afectar la red real.
- Reproducir bugs relacionados con la red en un entorno controlado.
- Verificar la lógica de firewall y asignación de ID.

## Integración Continua

El pipeline de CI se ejecuta en cada push y pull request mediante GitHub Actions. Ejecuta la matriz completa de compilaciones (Ubuntu, macOS, Windows). Los pull requests que fallen en algún job de CI no serán fusionados.
