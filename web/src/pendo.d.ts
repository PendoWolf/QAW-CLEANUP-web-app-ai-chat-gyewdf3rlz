// The Pendo agent is loaded by the install snippet, so it may be missing at runtime.
interface Window {
  pendo?: {
    trackAgent: (
      eventType: "prompt" | "agent_response" | "user_reaction",
      metadata: {
        agentId: string;
        conversationId: string;
        messageId: string;
        content: string;
        modelUsed?: string;
        suggestedPrompt?: boolean;
        toolsUsed?: string[];
        fileUploaded?: boolean;
      },
    ) => void;
  };
}
