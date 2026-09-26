---
id: testing
title: Testing
---

aMule has three complementary testing mechanisms: an automated **unit test suite** that runs in CI and can be run locally, an **[`amuleapi` integration test suite](#amuleapi-integration-tests)** that exercises the REST API against a running core, and a **virtual eD2k test network** for integration testing of network behaviour without connecting to the real [eD2k](../p2p-networks/ed2k/index.md) / [Kademlia](../p2p-networks/kademlia.md) network.

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
├── tests/                  # Unit tests, one <Name>Test.cpp per suite
│   └── CMakeLists.txt      # Registers every suite with CTest
└── curl-tests/             # HTTP tests against a running daemon
    ├── amuleapi/           # amuleapi REST/SSE suite (see below)
    └── amuleweb-smoke/     # Smoke test for the legacy amuleweb
```

`unittests/tests/` holds some 75 suites. They cover, among others:

- **Core data and file I/O** — tags (`CTagTest`), 128-bit Kad IDs (`CUInt128Test`), binary file I/O (`FileDataIOTest`), `RangeMap`, paths, string formatting, text files, `.emulecollection` and magnet URIs.
- **Credits and peers** — `clients.met` credits (`ClientCreditsTest`), secure identification (`SecIdentTest`), bans, client version strings, peer capabilities and reserved protocol frames.
- **EC protocol** — encryption (`ECCryptTest`), socket flags, client capabilities and incremental-update diffs.
- **`amuleapi`** — config, authentication, JWT, credentials, rate limiting, the SSE event bus and diff engine, JSON writer, ETags, static file serving and range requests.
- **Networking** — network functions, proxies, the IPv6-capable address type, peer addressing and the uTP dial policy/stream/transport.
- **Kademlia** — AICH hash lists, entry tag lists and the node-protection heuristics (`FastKadTest`, `SafeKadTest`).

Three uTP suites (`UtpContextTest`, `UtpLibraryAdapterTest`, `UtpAdmissionTest`) are built only when the [experimental](./compilation/index.md#experimental-options) `ENABLE_UTP` option is on; every other suite always builds.

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

Add your test file to `unittests/tests/CMakeLists.txt`. Each test is a standalone executable, so the `add_executable` must also list the production source files from `src/` that the test exercises (and any include directories they need):

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

Look at the existing entries in `unittests/tests/CMakeLists.txt` for the exact set of sources and include directories each kind of test needs.

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

Each test file builds a separate executable, and `ctest` runs them one by one. When run directly, a MuleUnit executable prints the test collection it contains and each test it runs:

```
Running test-collection "CUInt128Test" with 12 test-cases:
	Test "AdditionTest"
	Test "SubtractionTest"
	...
```

When an assertion fails, MuleUnit prints `Failure running:` followed by a context backtrace pointing at the failing line, and the executable exits with a non-zero status:

```
Running test-collection "CUInt128Test" with 12 test-cases:
	Test "AdditionTest"
	Test "SubtractionTest"
		Failure running:
		Expected '0x00' but got '0x01'  (CUInt128Test.cpp:47)
```

`ctest` reports the per-executable pass/fail summary. With `--output-on-failure`, the full output above is shown only for executables that fail:

```
100% tests passed, 0 tests failed out of <N>
```

## `amuleapi` Integration Tests {#amuleapi-integration-tests}

`unittests/curl-tests/amuleapi/` is an end-to-end suite for [`amuleapi`](../manual/interfaces/amuleapi/index.md): shell scripts that drive the REST API and the SSE stream with `curl` (and `jq`) and check the responses. The scripts are numbered in the order they run, roughly one per endpoint group — version and errors, authentication and lockout, read endpoints, downloads, servers, preferences, networks, shared files, categories, search, ETags, SSE heartbeat/diff/replay/resync, CORS, the static Web UI, pagination, known clients, friends, IP filter, chat, media metadata and HTTP conformance. `00-peer-fixture.sh` searches the live network and queues a real download so source-dependent checks have a peer, and `99-peer-fixture-teardown.sh` removes it (without network access the fixture only prints a notice and those checks are skipped).

The suite is **not** run in CI. It needs:

- A running [`amuled`](../manual/interfaces/amuled.md) (or `amule`) with [External Connections enabled](../manual/interfaces/gui/preferences.md#remote-controls).
- An `amuleapi` binary built from the same tree (`-DBUILD_AMULEAPI=YES`). By default the newest `src/webapi/amuleapi` in the source tree or under a `build*/`, `_build/` or `cmake-build-*/` directory is used; the `PATH` is deliberately not searched.
- `curl` and `jq`. `python3` is optional; without it, some checks in `25-cors.sh` and `40-http-conformance.sh` are skipped.

Run it with `run-all.sh`:

```sh
cd unittests/curl-tests/amuleapi

# Run every script in order
./run-all.sh

# Run a subset
./run-all.sh 12-downloads-add-patch.sh 13-downloads-delete-clear.sh
```

A subset runs only the scripts you name: add `00-peer-fixture.sh` and `99-peer-fixture-teardown.sh` if the scripts you pick need a real peer.

For each script, `run-all.sh` stops the `amuleapi` instance it started for the previous script (only processes running with `--config-dir=/tmp/amuleapi-regtest`), recreates that scratch config directory, sets the test admin/guest passwords, starts a fresh `amuleapi` on port 4713 (log in `/tmp/amuleapi.log`) and then runs the script. A fresh daemon per script is needed because the authentication tests trip the login lockout. It then prints each script's exit status.

:::warning
The suite needs HTTP port 4713 to be free (stop any other `amuleapi` using it first), and it wipes `/tmp/amuleapi-regtest` and `/tmp/amuleapi-static-frontend` on every run.
:::

It reads these environment variables:

| Variable | Default | Description |
|---|---|---|
| `EC_HOST` | `127.0.0.1` | Host of the aMule core |
| `EC_PORT` | `4712` | EC port of the aMule core |
| `EC_PASSWORD` | `amule` | EC password of the aMule core |
| `AMULEAPI_BIN` | newest build output | Path to the `amuleapi` binary under test |
| `AMULEAPI_ROOT` | the repository root | Source tree to test, for unusual layouts |
| `AMULE_SHARED_DIR` | *(unset)* | A directory the core shares, for the shared-files checks |

`unittests/curl-tests/amuleweb-smoke/phase0.sh` is a small smoke test for the legacy [`amuleweb`](../manual/interfaces/amuleweb.md).

## Virtual eD2k Test Network

A **testing field** is a virtual eD2k network isolated from the real internet. It consists of one or more [eD2k servers](../p2p-networks/ed2k/servers.md) and a set of aMule clients that can only communicate with each other, not with real-world peers. This is useful for:

- Testing download/upload behaviour without affecting the live network.
- Reproducing network-related bugs in a controlled environment.
- Verifying [firewall](../manual/configuration/firewall.md) and [High ID / Low ID](../p2p-networks/ed2k/high-id.md) assignment logic.

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

- Windows MSYS2 CLANG64 (Debug + Release; the Debug job also sets `-DENABLE_UTP=YES`)
- macOS (Debug + Release)
- Ubuntu (Debug + Release)
- Ubuntu Experimental (Debug + Release) — the same build with `-DENABLE_ALL_EXPERIMENTAL=YES` (see [Experimental Options](./compilation/index.md#experimental-options))

Each job:
1. Installs the platform-specific dependencies.
2. Configures CMake with all optional components enabled (`-DBUILD_ALC=YES -DBUILD_ALCC=YES -DBUILD_AMULECMD=YES -DBUILD_AMULEAPI=YES -DBUILD_CAS=YES -DBUILD_DAEMON=YES -DBUILD_WXCAS=YES -DBUILD_ED2K=YES -DBUILD_MONOLITHIC=YES -DBUILD_REMOTEGUI=YES -DBUILD_TESTING=YES -DBUILD_WEBSERVER=YES -DENABLE_NLS=YES -DENABLE_UPNP=YES`, plus `-DENABLE_IP2COUNTRY=YES`).
3. Builds everything.
4. Runs `ctest --test-dir build --output-on-failure --timeout 10`.

A separate i18n workflow validates the translation catalogs on every push and pull request: every `.po` file must compile, and the application and man page templates must be in sync with the source and the English man page masters. See [Translations](./translations/index.md) for the scripts that keep them in sync.

Pull requests that fail any CI job will not be merged.
