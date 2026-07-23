import type { AgentResult } from "@inngest/agent-kit";
import { Sandbox } from "@e2b/code-interpreter";

export interface CodeAgentState {
  sandboxId: string;
  summary: string;
  files: Record<string, string>;
}

type AgentOutputMessage = AgentResult["output"][number];
type AssistantTextMessage = Extract<
  AgentOutputMessage,
  { type: "text"; role: "assistant" }
>;

function textFromMessage(message: AgentOutputMessage): string | undefined {
  if (message.type !== "text") {
    return undefined;
  }

  if (Array.isArray(message.content)) {
    return message.content
      .map((part) => (typeof part === "string" ? part : (part.text ?? "")))
      .join("");
  }

  return message.content;
}

function isAssistantTextMessage(
  message: AgentOutputMessage,
): message is AssistantTextMessage {
  return message.role === "assistant";
}

export function agentOutputText(
  output: AgentResult["output"],
  fallback: string,
): string {
  return lastAssistantTextMessageContent({ output } as AgentResult) ?? fallback;
}

export function captureTaskSummary(
  result: AgentResult,
  network?: { state: { data: { summary?: string } } },
) {
  const text = lastAssistantTextMessageContent(result);
  if (text?.includes("<task_summary>") && network) {
    network.state.data.summary = text;
  }
}

export async function connectSandbox(sandboxId: string) {
  return Sandbox.connect(sandboxId);
}

export function lastAssistantTextMessageContent(
  result: Pick<AgentResult, "output">,
): string | undefined {
  const message = result.output.findLast(isAssistantTextMessage);

  if (!message) {
    return undefined;
  }

  return textFromMessage(message);
}
