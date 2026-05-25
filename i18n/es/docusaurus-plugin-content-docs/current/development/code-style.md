---
id: code-style
title: Estilo de Código
---

Este documento define el estilo de código que debe seguirse al contribuir cambios al código fuente de aMule. Seguir un estilo consistente hace que el código sea más fácil de leer, revisar y mantener. Se recomienda encarecidamente leerlo antes de enviar un parche o pull request.

## Formato

### Sangría

**Usa siempre tabuladores, nunca espacios.** El ancho visual de un tabulador equivale a 4 espacios.

Aplica sangría dentro de cada nuevo ámbito: funciones, clases, structs, bloques `if`/`else`, bucles y cases de `switch`.

### Espacios en Blanco

Coloca espacios entre paréntesis y palabras clave, y entre operadores y operandos.

### Llaves

Las llaves de apertura para **funciones, structs y clases no en línea** se colocan en su propia línea. Para el resto de construcciones (`if`, `while`, `for`, lambdas, etc.) la llave de apertura va en la misma línea.

Usa siempre llaves aunque sean opcionales (por ejemplo, bloques de una sola sentencia `if`/`while`).

## Comentarios de Documentación {#documentation-comments}

**Documenta siempre las nuevas funciones y clases.** aMule usa [Doxygen](https://www.doxygen.nl/) para la generación automática de documentación de la API.

Usa el siguiente formato (compatible con Doxygen):

```cpp
/**
 * Descripción breve en una línea.
 *
 * @param paramName  Descripción del parámetro.
 * @return Descripción del valor de retorno (omitir si es void).
 */
ReturnType FunctionName(Type paramName);
```

La documentación va en los **archivos de cabecera**. Los archivos de implementación (`.cpp`) usan comentarios C++ estándar.

## Convenciones de Nomenclatura

Usa siempre nombres descriptivos.

- **Funciones**: `AllWordsAreUppercase` (UpperCamelCase)
- **Variables**: `firstWordLowercaseRestUpperCase` (lowerCamelCase)
- **Clases**: prefijo `C`, por ejemplo `CUpDownClient`
- **Constantes**: `ALLUPPERCASE`
- **Nombres de archivo**: para archivos que definen una única clase, usa el nombre de clase sin el prefijo `C`

Prefijos de variables:

| Prefijo | Ámbito |
|---|---|
| `g_` | Variables globales |
| `s_` | Variables estáticas |
| `m_` | Variables miembro |

## Contenedores

No uses arrays crudos salvo que sea absolutamente necesario. Usa **contenedores STL** (`std::vector`, `std::list`, `std::map`, etc.).

## Gestión de Memoria

Eliminar un puntero `NULL` es una operación válida en C++. No añadas guardas `if (ptr != NULL)` antes de llamadas a `delete`.

## Prácticas Prohibidas

Las siguientes prácticas están **estrictamente prohibidas**:

- Nunca uses `unicode2char`, `char2unicode`, `unicode2UTF8`, `UTF82unicode` ni funciones similares.
- Nunca uses `wxString::c_str()` o `wxString::GetData()` salvo que la cadena sea ASCII puro.
- Nunca uses `wxFile` o `wxFFile`; usa `CFile`.
- Nunca uses `wxFindFirstFile`/`wxFindNextFile`; usa `CDirIterator`.
- Nunca uses `CList` o `CTypedPtrList`; usa contenedores STL.
- Nunca uses trígrafos ANSI C.
