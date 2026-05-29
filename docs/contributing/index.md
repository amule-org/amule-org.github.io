---
id: index
title: Contributing
---

aMule is a community-driven project. Contributions of any kind are welcome: code patches, bug reports, translations, documentation improvements, and testing.

## Ways to Contribute

### Code

Submit a pull request on [GitHub](https://github.com/amule-org/amule):

1. Fork the repository and create a feature branch.
2. Follow the [coding style guide](../developer/code-style.md).
3. Keep changes focused — one logical change per pull request.
4. Ensure the project builds without warnings on at least one supported platform (see [Compilation](../developer/compilation/index.md)).
5. Write a clear description explaining what the change does and why.

All pull requests are built and tested automatically by the CI pipeline on Ubuntu, macOS, and Windows (MSYS2). A PR that breaks any of these builds will not be merged.

### Bug Reports

Open an issue on the [GitHub issue tracker](https://github.com/amule-org/amule/issues).

When filing a bug report, always include:

- aMule version (`amule --version`)
- Operating system and version
- Steps to reproduce the issue
- Any relevant log output from `~/.aMule/logfile`
- A GDB backtrace if the issue involves a crash

For detailed instructions on generating a useful backtrace, see the [Bug Reports](bug-reports.md) page.

### Translations

aMule uses GNU gettext for internationalization. Translations are `.po` files in `po/` and man page translations in `docs/man/po/`.

See the full [Translations](translations.md) guide for:

- Updating an existing translation
- Adding a new language
- Translating man pages with po4a
- Format specifiers and escape codes reference

### Documentation

Improve or expand this documentation website. See the [Documentation](documentation.md) guide for the repository structure, writing guidelines, and the PR workflow.

### Testing

- Test release candidates and report regressions on the issue tracker.
- Run the unit test suite: `cmake -DBUILD_TESTING=YES -B build && cmake --build build && ctest --test-dir build`.
- Help maintain the test coverage by adding unit tests for new code.

## Code Review

All contributions go through code review before being merged. Reviewers check for:

- Correctness: does the change do what it claims?
- Code style: does it follow the [coding style guide](../developer/code-style.md)?
- Test coverage: does it include tests where appropriate?
- Compatibility: does it build on all supported platforms?
- Documentation: are new features or options documented?

Feedback from reviewers should be addressed in follow-up commits on the same branch.

## Communication

- **GitHub Issues**: bug reports, feature requests, and specific technical questions.
- **GitHub Discussions**: general questions, usage help, and longer discussions.
- **Pull Requests**: code, documentation, and translation contributions.
