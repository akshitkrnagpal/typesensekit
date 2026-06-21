# @typesensekit/cli

## 1.1.2

### Patch Changes

- b81defe: Document scoped API key guidance, production MCP operations, and compatibility notes.
- 0ea7132: Add document batch retrieval, facet exploration, and search suggestion helper operations.

## 1.1.1

### Patch Changes

- f089920: Document the `documents.search` input shape with the required top-level `params` wrapper.
- 8882528: Add first-class global synonym set operations and guidance from collection synonym 404s.
- b8845bf: Add operation-level `--schema` and `--examples` helpers for discovering command input shapes.
- 09537c7: Fix `presets.create` to send the Typesense preset body as `{ value: ... }`.
- 7405426: Show concise network failure messages by default and add redacted CLI debug error details.
- df4ea1a: Redact API keys and auth headers from CLI and MCP error output.
- 3a316c7: Allow `api.call` to accept uppercase HTTP methods.

## 1.1.0

### Minor Changes

- Add safe collection schema update support, recursive output redaction, schema error hints, and collection field lifecycle commands.

## 1.0.0

### Major Changes

- Initial Release
