import { callPuterGemini } from "./puterClient";
import { buildChatPrompt } from "./prompts/chat.prompt";

export async function runAIBrain(context) {
  // ✅ Inject authoritative time context HERE
  const now = new Date();

  const prompt = buildChatPrompt({
    ...context,
    now: {
      iso: now.toISOString(),
      local: now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      timezone: "Asia/Kolkata",
    },
  });

  const raw = await callPuterGemini(prompt);

  if (typeof raw !== "string" || !raw.trim().startsWith("{")) {
    throw new Error("Invalid JSON from AI");
  }

  return JSON.parse(raw);
}
