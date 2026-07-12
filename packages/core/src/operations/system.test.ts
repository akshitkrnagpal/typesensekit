import { describe, expect, it, vi } from "vitest";
import { systemOperations } from "./system.js";

function operation(name: string) {
  const value = systemOperations.find((candidate) => candidate.name === name);
  if (!value) throw new Error(`Missing operation: ${name}`);
  return value;
}

function client() {
  return { apiCall: { get: vi.fn(), post: vi.fn() } };
}

describe("cluster operations", () => {
  it("lists schema changes", async () => {
    const typesense = client();
    await operation("operations.schema_changes").execute(
      typesense as never,
      {},
    );
    expect(typesense.apiCall.get).toHaveBeenCalledWith(
      "/operations/schema_changes",
    );
  });

  it("creates a snapshot with the server path as a query parameter", async () => {
    const typesense = client();
    await operation("operations.snapshot").execute(typesense as never, {
      snapshotPath: "/var/backups/typesense",
    });
    expect(typesense.apiCall.post).toHaveBeenCalledWith(
      "/operations/snapshot",
      undefined,
      { snapshot_path: "/var/backups/typesense" },
    );
  });

  it.each([
    ["operations.vote", "/operations/vote"],
    ["operations.cache.clear", "/operations/cache/clear"],
    ["operations.db.compact", "/operations/db/compact"],
  ])("calls %s with POST", async (name, path) => {
    const typesense = client();
    await operation(name).execute(typesense as never, {});
    expect(typesense.apiCall.post).toHaveBeenCalledWith(path);
  });

  it("configures the slow request threshold", async () => {
    const typesense = client();
    await operation("operations.slow_requests.configure").execute(
      typesense as never,
      { thresholdMs: 2_000 },
    );
    expect(typesense.apiCall.post).toHaveBeenCalledWith("/config", {
      "log-slow-requests-time-ms": 2_000,
    });
  });
});
