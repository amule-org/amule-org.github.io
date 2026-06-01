---
id: testing
title: Testing
---

aMule has two complementary testing mechanisms: an automated **unit test suite** that runs in CI and can be run locally, and a **virtual eD2k test network** for integration testing of network behaviour without connecting to the real [eD2k](../p2p-networks/ed2k/index.md) / [Kademlia](../p2p-networks/kademlia.md) network.

## Unit Tests

### Running the Test Suite

Enable testing when [configuring the build](./compilation/index.md), then build and run:

```sh
cmake -B build \
    -DCMAKE_BUILD_TYPE=Debug \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_TESTING=YES
cmake --build build -j"$(nproc)"
ctest --test-dir build --output-on-failure
```

Only `-DBUILD_TESTING=YES` is strictly required to build and run the test suite; the other flags above simply match the configuration used in CI.

`--output-on-failure` prints the full output of any test that fails. The `--timeout 10` flag (used in CI) limits each test to 10 seconds to catch hangs.

To run a specific test by name:

```sh
ctest --test-dir build -R TestName
```

To run tests in verbose mode:

```sh
ctest --test-dir build -V
```

### Test Suite Structure

The test suite lives in `unittests/` and uses **MuleUnit**, a minimalistic testing framework included in the repository:

```
unittests/
├── muleunit/               # MuleUnit framework
│   ├── test.h              # Main include: TEST(), ASSERT_EQUALS(), etc.
│   ├── testcase.h          # DECLARE() / END_DECLARE() macros
│   ├── testregistry.h      # Test registration
│   └── main.cpp            # Test runner entry point
└── tests/                  # Individual test files
    ├── CTagTest.cpp         # EC tag serialisation
    ├── CUInt128Test.cpp     # 128-bit integer operations (Kademlia)
    ├── FileDataIOTest.cpp   # Binary file I/O
    ├── FormatTest.cpp       # wxString formatting
    ├── NetworkFunctionsTest.cpp  # IP/network utility functions
    ├── PathTest.cpp         # File path manipulation
    ├── PhpArrayTest.cpp     # PHP array parsing (amuleweb template engine)
    ├── RangeMapTest.cpp     # RangeMap (used for partial-file tracking)
    ├── StringFunctionsTest.cpp   # String utility functions
    └── TextFileTest.cpp     # Text file reading and line-ending handling
```

### Writing a New Test

New tests should follow the project [code style](./code-style.md).

#### Simple Test Case (No Fixture)

```cpp
#include <muleunit/test.h>

DECLARE_SIMPLE(MyTest);

TEST(MyTest, BasicAddition)
{
    ASSERT_EQUALS(4, 2 + 2);
}
```

#### Test Case With Fixture

Use `DECLARE` / `END_DECLARE` to define a class with `setUp` and `tearDown` methods. `setUp` runs before each test; `tearDown` runs after:

```cpp
#include <muleunit/test.h>

DECLARE(StackTest);
    Stack<int>* m_stack;

    void setUp() {
        m_stack = new Stack<int>();
    }

    void tearDown() {
        delete m_stack;
    }
END_DECLARE();

TEST(StackTest, PushAndPop)
{
    m_stack->push(10);
    ASSERT_EQUALS(10, m_stack->pop());
}

TEST(StackTest, EmptyStackIsEmpty)
{
    ASSERT_EQUALS(true, m_stack->isEmpty());
}
```

#### Adding to CMakeLists

Add your test file to `unittests/tests/CMakeLists.txt`. Each test is a standalone
executable, so the `add_executable` must also list the production source files from
`src/` that the test exercises (and any include directories they need):

```cmake
add_executable (MyTest
	MyTest.cpp
	${CMAKE_SOURCE_DIR}/src/MyClass.cpp
	${CMAKE_SOURCE_DIR}/src/libs/common/Format.cpp
	${CMAKE_SOURCE_DIR}/src/libs/common/strerror_r.c
)

add_test (NAME MyTest
	COMMAND MyTest
)

target_include_directories (MyTest
	PRIVATE ${CMAKE_SOURCE_DIR}/src
)

target_link_libraries (MyTest
	muleunit
)
```

Look at the existing entries in `unittests/tests/CMakeLists.txt` for the exact set of
sources and include directories each kind of test needs.

### Available Assertion Macros

| Macro | Description |
|---|---|
| `ASSERT_EQUALS(expected, actual)` | Fails if `expected != actual` |
| `ASSERT_EQUALS_M(expected, actual, message)` | As above, with an explicit failure message |
| `ASSERT_TRUE(condition)` | Fails if `condition` is false |
| `ASSERT_TRUE_M(condition, message)` | As above, with an explicit failure message |
| `ASSERT_FALSE(condition)` | Fails if `condition` is true |
| `ASSERT_RAISES(type, call)` | Fails unless `call` throws an exception of `type` |
| `ASSERT_RAISES_M(type, call, message)` | As above, with an explicit failure message |
| `FAIL()` | Unconditional failure |
| `FAIL_M(message)` | Unconditional failure with a message |

See `unittests/muleunit/test.h` for the full list.

### Example Test Output

Each test file builds a separate executable, and `ctest` runs them one by one. When run
directly, a MuleUnit executable prints the test collection it contains and each test it
runs:

```
Running test-collection "CUInt128Test" with 12 test-cases:
	Test "AdditionTest"
	Test "SubtractionTest"
	...
```

When an assertion fails, MuleUnit prints `Failure running:` followed by a context
backtrace pointing at the failing line, and the executable exits with a non-zero status:

```
Running test-collection "CUInt128Test" with 12 test-cases:
	Test "AdditionTest"
	Test "SubtractionTest"
		Failure running:
		Expected '0x00' but got '0x01'  (CUInt128Test.cpp:47)
```

`ctest` reports the per-executable pass/fail summary. With `--output-on-failure`, the full
output above is shown only for executables that fail:

```
100% tests passed, 0 tests failed out of 10
```

## Virtual eD2k Test Network

A **testing field** is a virtual eD2k network isolated from the real internet. It consists of one or more [eD2k servers](../p2p-networks/ed2k/servers.md) and a set of aMule clients that can only communicate with each other, not with real-world peers. This is useful for:

- Testing download/upload behaviour without affecting the live network.
- Reproducing network-related bugs in a controlled environment.
- Verifying [firewall](../manual/configuration/firewall.md) and [High ID / Low ID](../p2p-networks/high-id-low-id.md) assignment logic.

### Setting Up a Test Server

Run a local eD2k server. Any compliant eD2k server software can be used. Consult the server software's documentation for setup instructions. If the server allows it, restrict it to accept only clients in your test IP range.

### Configuring Test Clients with IPFilter

aMule uses **IPFilter** to block connections to specific IP ranges, read from the [`ipfilter.dat` and `ipfilter_static.dat`](../manual/configuration/config-files/index.md#ip-filter-files) files. In a test network, use IPFilter in reverse: block the entire internet and allow only your local IP range.

Create an `ipfilter.dat` file that allows only the `192.168.0.x` subnet:

```
000.000.000.000 - 192.168.000.000 , 000 , all internet
192.168.001.000 - 255.255.255.255 , 000 , all internet
```

This allows connections only to IPs in the range `192.168.0.1–192.168.0.255`.

Place this file in `~/.aMule/ipfilter.dat` on each test client.

Enable IPFilter in aMule:

1. Open aMule.
2. Go to **Preferences → [Security → IP Filtering](../manual/interfaces/gui/preferences.md#ip-filtering)**.
3. Enable **IP Filtering**.

:::note
If aMule refuses to connect to your local server, try disabling **["Always filter LAN IPs"](../manual/interfaces/gui/preferences.md#ip-filtering)** in **Preferences → Security → IP Filtering**. This option blocks private IP ranges (RFC 1918) used in local test networks.
:::

### Connection Sequence

1. Start the local eD2k server.
2. Configure and start all test clients with IPFilter active.
3. Add the local server to each client's server list and connect.
4. The clients can now communicate only with each other and the local server.

## Continuous Integration

The CI pipeline runs on every push and pull request via GitHub Actions (`.github/workflows/ccpp.yml`). It runs the full build matrix:

- Ubuntu (Debug + Release)
- macOS (Debug + Release)
- Windows MSYS2 MINGW64 (Debug + Release)

Each job:
1. Installs the platform-specific dependencies.
2. Configures CMake with all optional components enabled (`-DBUILD_ALC=YES -DBUILD_ALCC=YES -DBUILD_AMULECMD=YES -DBUILD_CAS=YES -DBUILD_DAEMON=YES -DBUILD_WXCAS=YES -DBUILD_ED2K=YES -DBUILD_MONOLITHIC=YES -DBUILD_REMOTEGUI=YES -DBUILD_TESTING=YES -DBUILD_WEBSERVER=YES -DENABLE_NLS=YES -DENABLE_UPNP=YES`).
3. Builds everything.
4. Runs `ctest --test-dir build --output-on-failure --timeout 10`.

Pull requests that fail any CI job will not be merged.
