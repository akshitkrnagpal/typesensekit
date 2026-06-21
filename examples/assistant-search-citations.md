# Assistant Search With Citations

This example shows the intended assistant flow: connect an MCP client, run a
search, then cite Typesense document fields in the final answer.

## 1. Start TypesenseKit

```sh
TYPESENSE_URL=https://your-cluster.typesense.net \
TYPESENSE_API_KEY=your-scoped-api-key \
npx -y @typesensekit/mcp
```

## 2. Configure The MCP Client

```json
{
  "mcpServers": {
    "typesensekit": {
      "command": "npx",
      "args": ["-y", "@typesensekit/mcp"],
      "env": {
        "TYPESENSE_URL": "https://your-cluster.typesense.net",
        "TYPESENSE_API_KEY": "your-scoped-api-key",
        "TYPESENSEKIT_READ_ONLY": "true"
      }
    }
  }
}
```

## 3. Ask The Assistant

Prompt:

```text
Search the products collection for "lounge chair". Use documents.search with
query_by set to "title,description" and cite each recommendation with its
document id and URL.
```

Tool call:

```json
{
  "collection": "products",
  "params": {
    "q": "lounge chair",
    "query_by": "title,description",
    "include_fields": "id,title,url,description",
    "per_page": 3
  }
}
```

Answer shape:

```text
Recommended matches:

1. Eames-style lounge chair - cited from document prod_123, https://example.com/products/prod_123
2. Walnut reading chair - cited from document prod_456, https://example.com/products/prod_456
3. Low leather lounge chair - cited from document prod_789, https://example.com/products/prod_789
```

For stricter citations, require the assistant to quote only fields returned by
Typesense and include each document `id` or canonical `url`.
