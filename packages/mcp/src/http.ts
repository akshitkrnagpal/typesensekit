import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
} from "node:http";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createTypesenseMcpServer } from "./server.js";

const DEFAULT_PORT = 3000;
const DEFAULT_PATH = "/mcp";

function readPort(): number {
  const value = process.env.TYPESENSEKIT_MCP_PORT ?? process.env.PORT;
  if (!value) return DEFAULT_PORT;

  const port = Number(value);
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error(`Invalid MCP HTTP port: ${value}`);
  }
  return port;
}

function readPath(): string {
  const path = process.env.TYPESENSEKIT_MCP_PATH ?? DEFAULT_PATH;
  return path.startsWith("/") ? path : `/${path}`;
}

function sendJson(
  res: ServerResponse,
  statusCode: number,
  body: Record<string, unknown>,
) {
  res.writeHead(statusCode, { "content-type": "application/json" });
  res.end(JSON.stringify(body));
}

function readBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("error", reject);
    req.on("end", () => {
      if (!body) {
        resolve(undefined);
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
}

function jsonRpcError(message: string) {
  return {
    jsonrpc: "2.0",
    error: { code: -32603, message },
    id: null,
  };
}

async function handleMcpRequest(req: IncomingMessage, res: ServerResponse) {
  const server = createTypesenseMcpServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  try {
    const body = await readBody(req);
    await server.connect(transport);
    await transport.handleRequest(req, res, body);
  } finally {
    res.on("close", () => {
      void transport.close();
      void server.close();
    });
  }
}

const port = readPort();
const path = readPath();

const httpServer = createServer(async (req, res) => {
  const url = new URL(
    req.url ?? "/",
    `http://${req.headers.host ?? "localhost"}`,
  );

  if (url.pathname === "/healthz") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (url.pathname !== path) {
    sendJson(res, 404, jsonRpcError("Not found"));
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, jsonRpcError("Method not allowed"));
    return;
  }

  try {
    await handleMcpRequest(req, res);
  } catch (error) {
    console.error("MCP HTTP request failed", error);
    if (!res.headersSent) {
      sendJson(res, 500, jsonRpcError("Internal server error"));
    }
  }
});

httpServer.listen(port, () => {
  console.error(
    `TypesenseKit MCP HTTP server listening on ${path} port ${port}`,
  );
});

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    httpServer.close(() => process.exit(0));
  });
}
