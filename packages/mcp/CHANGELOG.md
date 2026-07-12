# @typesensekit/mcp

## 1.1.3

### Patch Changes

- 6b1e5a3: Remove unsupported collection-scoped preset inputs and always use Typesense's global preset routes.
- a935f46: Fix stopword operations to use Typesense's global `/stopwords` API routes.
- dbb63a1: Update the locked production dependency graph to patched Axios, form-data, Hono, and qs releases.

## 1.1.2

### Patch Changes

- b81defe: Document scoped API key guidance, production MCP operations, and compatibility notes.
- 914695b: Add a stateless Streamable HTTP MCP entrypoint plus Docker and end-to-end assistant search documentation.
- 1175037: Expose MCP resources for operation discovery, read-only tool discovery, collection schemas, and document lookup.
- 0ea7132: Add document batch retrieval, facet exploration, and search suggestion helper operations.
- be5d62d: Default MCP tools to read-only mode with an explicit opt out for write/admin operations.

## 1.1.1

### Patch Changes

- 8882528: Add first-class global synonym set operations and guidance from collection synonym 404s.
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
