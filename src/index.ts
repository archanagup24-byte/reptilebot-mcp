import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export class ReptileBotMCP extends McpAgent {
  server = new McpServer({
    name: "ReptileBot MCP",
    version: "1.0.0",
  });

  async init() {
    this.server.tool(
      "reptilebot_status",
      "Check that the ReptileBot MCP bridge is running.",
      {},
      async () => ({
        content: [
          {
            type: "text",
            text: "ReptileBot MCP bridge is running.",
          },
        ],
      })
    );

    this.server.tool(
      "reptilebot_api_info",
      "Return the configured ReptileBot API endpoint.",
      {},
      async () => ({
        content: [
          {
            type: "text",
            text: "ReptileBot endpoint: https://api.reptilebot.com",
          },
        ],
      })
    );
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    return ReptileBotMCP.serve("/mcp").fetch(request, env, ctx);
  },
};

interface Env {
  REPTILEBOT_API_KEY: string;
      }
