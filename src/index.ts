import { createMcpHandler } from "agents/mcp/server";
import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

function createServer() {
  const server = new McpServer({
    name: "ReptileBot MCP",
    version: "1.0.0",
  });

  server.registerTool(
    "reptilebot_status",
    {
      description: "Check that the ReptileBot MCP bridge is running.",
      inputSchema: {},
    },
    async () => ({
      content: [
        {
          type: "text",
          text: "ReptileBot MCP bridge is running.",
        },
      ],
    })
  );

  return server;
}

export default {
  fetch(request: Request, env: unknown, ctx: ExecutionContext) {
    return createMcpHandler(createServer)(request, env, ctx);
  },
};
