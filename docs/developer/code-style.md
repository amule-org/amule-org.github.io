---
id: code-style
title: Coding Style
---

This document defines the coding style that must be followed when contributing changes to the aMule codebase. Adhering to a consistent style makes the code easier to read, review, and maintain. Reading it carefully before submitting a [patch or pull request](../contributing/index.md) is strongly recommended.

## Formatting

### Indentation

**Always use tabs, never spaces.** The visual width of a tab is equivalent to 4 spaces.

Indent inside every new scope: functions, classes, structs, `if`/`else`, loops, and `switch` cases.

```cpp
if (false) {
    ...
} else {
    ...
}

class Foo {
    Foo()
    {
        ...
    }
};
```

### Whitespace

Place whitespace between parentheses and keywords, and between operators and operands:

```cpp
// Correct
if (something == true) {
    ...
}

// Wrong
if(something==true){
    ...
}
```

### Brackets

Opening brackets for **non-inlined functions**, structs, and classes are placed on their own line. For all other constructs (`if`, `while`, `for`, lambda bodies, etc.) the opening bracket goes on the same line as the construct.

Always use brackets even when they are optional (e.g. single-statement `if`/`while` blocks):

```cpp
// Correct
if (condition) {
    doSomething();
}

// Wrong — omitting brackets can introduce bugs later
if (condition)
    doSomething();
```

This rule applies to **new code**. Legacy code contains many bracket-less single statements (e.g. `if (...) return;`); there is no obligation to reformat them just because you touch the surrounding lines.

### Miscellaneous

- When using the ternary operator, add brackets to improve readability.
- Add a space after `//` when writing line comments: `// Comment`, not `//Comment`.

## Documentation Comments

**Always document new functions and classes.** aMule uses [Doxygen](https://www.doxygen.nl/) for automatic API documentation generation — see [Development → Code Documentation](index.md#code-documentation) for how to generate it locally. Examples of well-documented classes include `MD4Hash.h`, `BarShader.*`, and `ServerListCtrl.*`.

### Functions, classes, and structs

Use the following format (Doxygen-compatible):

```cpp
/**
 * Brief one-line description.
 *
 * @param paramName  Description of the parameter.
 * @param otherParam Description of another parameter.
 * @return Description of the return value (omit if void).
 *
 * Longer explanation when needed. Reference other related functions
 * with @see.
 *
 * @see OtherRelevantFunction
 */
ReturnType FunctionName(Type paramName, Type otherParam);
```

For simple cases where the purpose can be described in one sentence and there are no parameters, a brief comment is sufficient:

```cpp
class CKnownFile {
    //! Returns the number of 9 MB parts that are already hashed.
    uint16 GetPartCount() const { return m_iPartCount; }

    uint16 m_iPartCount;  //! Number of parts the file is split into.
};
```

For methods with parameters or complex logic, use the full form:

```cpp
class CKnownFile {
    /**
     * Updates the frequency of uploading parts with data from the given client.
     *
     * @param client    The client whose uploading parts should be considered.
     * @param increment If true, counts are incremented; otherwise decremented.
     *
     * This function updates the frequency list of file-upparts using the
     * client's upparts-status. It should be called every time a client
     * updates its upparts-status or is added/removed from the file.
     */
    void UpdateUpPartsFrequency(CUpDownClient* client, bool increment);
};
```

### Variables, typedefs, and constants

Use the brief comment form:

```cpp
//! Number of parts the file is split into.
uint16 m_iPartCount;
```

Documentation goes inside **header files**. Implementation files (`.cpp`) use standard C++ comments to explain what happens in specific sections of code.

## Naming Conventions

Always use descriptive names. Short names (`i`, `x`, `it`) are acceptable only for loop counters and iterators where the purpose is obvious.

### Functions

Use `AllWordsAreUppercase` (UpperCamelCase):

```cpp
void ProcessIncomingData();
bool IsConnected() const;
```

### Variables

Use `firstWordLowercaseRestUpperCase` (lowerCamelCase):

```cpp
int sourceCount;
wxString fileName;
```

Apply these prefixes consistently:

| Prefix | Scope |
|---|---|
| `g_` | Global variables |
| `s_` | Static variables |
| `m_` | Member variables |

```cpp
static int s_instanceCount;
int m_sourceCount;
```

Older code additionally carries Hungarian-style **type** prefixes after the scope prefix (`m_n` for integers, `m_b` for booleans, `m_dw` for 32-bit words, `m_by` for bytes, `m_f` for flags, e.g. `m_nUserPort`, `m_bEmuleProtocol`). These are a legacy convention — match them when editing the surrounding code, but new code only needs the scope prefix above.

### Classes

Prefix class names with `C`. Use `AllWordsAreUppercase`:

```cpp
class CUpDownClient { ... };
class CKnownFile { ... };
```

### Constants

Use `ALLUPPERCASE`. Prefer `const` variables over preprocessor `#define` whenever possible — `const` provides proper type safety and avoids name-collision bugs that defines have caused in the past:

```cpp
// Preferred
const int MAX_SOURCES = 512;

// Avoid
#define MAX_SOURCES 512
```

### Filenames

For files defining a single class, use the class name **without** the `C` prefix:

- `CKnownFile` → `KnownFile.h` / `KnownFile.cpp`
- `CMD4Hash` → `MD4Hash.h` / `MD4Hash.cpp`

Some legacy files still use old casing (e.g. `CUpDownClient` lives in `updownclient.h`); follow the convention above for new files.

## Const Correctness

Mark functions and arguments as `const` wherever possible. This enables safer code and allows the compiler to enforce immutability:

```cpp
// Const member function (does not modify the object)
uint32 GetUserID() const { return m_userID; }

// Const reference argument (large type, not modified)
void SetName(const wxString& name);
```

**Always use references for large types** such as `wxString` and `CMD4Hash`. Only use non-const references if the function needs to modify the passed variable.

## Containers

Do **not** use raw arrays unless absolutely necessary. In all other cases:

1. Use **STL containers** (`std::vector`, `std::list`, `std::map`, etc.) — preferred for consistency.
2. Use **wxWidgets containers** only when there is a strong reason (e.g. integration with a specific wx API).

STL containers are generally faster, and the STL algorithms library can be used with them.

## Memory Management

Deleting a `NULL` pointer is a valid, no-op operation in C++. Do not add `if (ptr != NULL)` guards before `delete` calls — they only clutter the code:

```cpp
// Correct — no guard needed
delete m_client;
m_client = NULL;

// Unnecessary clutter
if (m_client != NULL) {
    delete m_client;
    m_client = NULL;
}
```

Prefer `new`/`delete` over `malloc`/`free`. The only legitimate use of `malloc`/`free` is when interfacing with C libraries that require it.

## Helper Functions

Utility functions that could be useful across the application should be placed in `OtherFunctions.h`. Prefer wxWidgets functions over direct system calls — this reduces platform-specific dependencies that may not be available everywhere.

## Code Practices

### Avoid unusual constructs

Do not use assignments inside `if` conditions, `void*` pointers (loss of type safety), or other unusual patterns unless absolutely unavoidable:

```cpp
// Avoid
if ((ptr = GetSomething()) != NULL) { ... }

// Prefer
ptr = GetSomething();
if (ptr != NULL) { ... }
```

### String transliteration

When using a string literal to construct a `wxString`:

- Use `wxT("text")` if the string should **not** be translated.
- Use `_("text")` if the string should be translated (shown to the user).

Failure to use these macros makes aMule fail to compile in Unicode mode.

Debug messages must always be in English and must not be wrapped in `_()`. Messages visible to the user must be wrapped in `_()`. See [Translations → Marking Strings for Translation in C++ Source](translations/index.md#marking-strings-for-translation-in-c-source) for the full rules on translatable strings.

## What Never To Do

The following practices are **strictly forbidden**. Violations will be rejected in code review.

### String conversion functions

Never use `unicode2char`, `char2unicode`, `unicode2UTF8`, `UTF82unicode`, or any related conversion between `wxString` and `char`/`wchar` buffers. These functions exist only for very specific low-level scenarios (network protocol encoding, binary file I/O). If you think you need them, ask first. Read the comments at the top of `StringFunctions.h` for the exact permitted use cases.

Never use `wxString::c_str()` or `wxString::GetData()` unless the string is known to be pure ASCII (e.g. an MD4 hash stored as a string) and the reason is documented with a comment.

### File I/O

Never use `wxFile` or `wxFFile` — use `CFile` (in `CFile.*`) instead. `CFile` contains bug fixes over `wxFile` and correctly handles UTF-8 filenames on all platforms.

Never use `wxFindFirstFile` / `wxFindNextFile` — use `CDirIterator` (found in `libs/common/FileFunctions.*`). Same reason: proper Unicode filename handling.

Never use `wxStat` or `wxDirExists` — use the `CPath` class (in `libs/common/Path.*`), which provides `CPath::FileExists()` and `CPath::DirExists()` (both an instance form and a `static` overload taking a `wxString`), plus related helpers such as `CPath::GetFileSize()` and `CPath::GetModificationTime()`. Same reason.

### Date/time formatting

Avoid `wxDateTime::Now().FormatTime()` and `wxDateTime::Now().FormatDate()` — these assert and break under various locales (Chinese and other Asian languages). Use `wxDateTime::Now().FormatISOTime()` and `wxDateTime::Now().FormatISODate()` instead. Users will see ISO-formatted date/time strings; that is the accepted trade-off until wxWidgets fixes the locale issue.

### Legacy list classes

Never use `CList` or `CTypedPtrList`. These are MFC-compatible hand-rolled linked lists that are known to be buggy. Use STL containers. If you encounter `CList`/`CTypedPtrList` in existing code, replace them.

### Trigraphs

Never use ANSI C trigraphs (`??=`, `??(`, `??)`, etc.). They cause subtle, hard-to-find bugs. If you do not know what trigraphs are, consider yourself lucky — keep it that way.

## Static Analysis & Tooling

The repository ships a baseline [clang-tidy](https://clang.llvm.org/extra/clang-tidy/) configuration to catch real bugs, but **does not enforce formatting automatically** — the formatting and naming rules above are followed by hand.

- **`.clang-tidy` (repository root)** enables a curated set of high-signal checks (`clang-analyzer-core.*`, `clang-analyzer-deadcode.*`, `clang-analyzer-unix.*`, selected `bugprone-*`, and a couple of low-priority `performance-*` checks). Noisy groups that fire constantly on long-standing idioms are deliberately suppressed (`cppcoreguidelines-*`, `bugprone-reserved-identifier`, `performance-enum-size`, …). It sets `WarningsAsErrors: ''` (warnings never break the build) and `FormatStyle: none`. The file's header comment explains exactly what is suppressed and why — read it before adding or re-enabling checks.
- **Per-directory `.clang-tidy` files** disable analysis on vendored and generated code: `src/extern/.clang-tidy` (the vendored wxWidgets copy) and `src/webserver/src/.clang-tidy` (the mostly-generated PHP interpreter). A few flex/bison-generated files (`Scanner.cpp`, `Parser.cpp`, `IPFilterScanner.cpp`) live alongside hand-written source and emit the usual generated-code warnings — ignore those when triaging output.
- **No `.clang-format` or `.editorconfig`** exists. Indentation (tabs), bracket placement, and the rest of the formatting rules are not auto-applied; apply them manually.
- **CI does not run clang-tidy.** The C/C++ workflow (`.github/workflows/ccpp.yml`) only compiles the project across Linux, macOS, and Windows in Debug and Release. Run clang-tidy against your [local build](compilation/index.md) if you want its feedback before submitting a patch.

