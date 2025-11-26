// /lib/vapiWhiteboardEngine.ts
import Vapi from "@vapi-ai/web";

class VapiWhiteboardEngine {
  private vapi: any = null;
  private token: string;
  private assistantId: string | null = null;
  private toolHandler: ((tool: any) => void) | null = null;
  private statusHandler: ((s: any) => void) | null = null;

  constructor() {
    this.token =
      process.env.NEXT_PUBLIC_VAPI_WHITEBOARD_TOKEN ||
      process.env.NEXT_PUBLIC_VAPI_WEBTOKEN ||
      "";

    if (!this.token) {
      console.warn("⚠ No Vapi token found");
    }
  }

  setAssistantId(id: string) {
    this.assistantId = id;
  }

  setOnToolCall(fn: any) {
    this.toolHandler = fn;
  }

  setOnStatusChange(fn: any) {
    this.statusHandler = fn;
  }

  startAssistant = async () => {
    if (!this.assistantId) {
      console.error("❌ No assistantId set for whiteboard engine");
      this.statusHandler?.("error");
      return;
    }

    try {
      if (!this.vapi) this.vapi = new Vapi(this.token);
    } catch (err) {
      console.error("❌ Failed to construct Vapi:", err);
      this.statusHandler?.("error");
      return;
    }

    const config = {
      assistantId: this.assistantId, // ONLY this (no model block!)
      input: { text: true, audio: false },
      output: { text: true, audio: false, tools: true },
      clientMessages: ["tool-calls"]
    };

    console.log("WHITEBOARD START CONFIG:", config);

    try {
      const start = this.vapi.start(config);
      if (start?.then) await start;
      this.statusHandler?.("active");
    } catch (err) {
      console.error("❌ start() failed:", err);
      this.statusHandler?.("error");
      return;
    }

    // listen for tool calls
    this.vapi.on("message", (msg: any) => {
      if (msg?.type === "tool-calls" && msg.toolCallList) {
        msg.toolCallList.forEach((t: any) => {
          try {
            const name = t.function?.name;
            const args = JSON.parse(t.function?.arguments || "{}");
            this.toolHandler?.({ name, args });
          } catch (err) {
            console.error("❌ Tool call parse error", err);
          }
        });
      }
    });
  };

  stopAssistant = () => {
    try {
      this.vapi?.stop();
    } catch {}
    this.statusHandler?.("idle");
  };
}

export const vapiWhiteboardEngine = new VapiWhiteboardEngine();
export default vapiWhiteboardEngine;
