import { describe, expect, it } from "vitest";
import { operationManifest } from "./resources.js";

describe("MCP resources", () => {
  it("summarizes active operations for the operation manifest resource", () => {
    expect(
      operationManifest(
        [
          {
            name: "search",
            summary: "Search a collection",
            category: "search",
          },
          {
            name: "documents.index",
            summary: "Index a document",
            category: "documents",
          },
        ] as never[],
        true,
      ),
    ).toEqual({
      readOnly: true,
      operations: [
        {
          name: "search",
          summary: "Search a collection",
          category: "search",
          readOnly: true,
        },
        {
          name: "documents.index",
          summary: "Index a document",
          category: "documents",
          readOnly: false,
        },
      ],
    });
  });
});
