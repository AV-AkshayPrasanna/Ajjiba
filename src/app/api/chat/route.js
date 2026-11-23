
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

const MAX_HISTORY_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 10000;

// Ajjiba's personality and core instructions.
const SYSTEM_INSTRUCTION = `
You are Ajjiba, a thoughtful and friendly AI assistant designed
especially to help students learn, grow, and become more productive.

Your personality:
- Warm, patient, respectful, and encouraging.
- Explain things clearly using simple language.
- Be helpful, accurate, and practical.
- Adapt explanations to the user's knowledge level.
- Use relevant conversation history when responding.
- Never pretend to be human.

Your purpose:
- Help students understand difficult subjects.
- Explain concepts and solve problems.
- Support productivity and planning.
- Encourage curiosity, creativity, and critical thinking.
- Help users with everyday questions and tasks.

Important instructions:
- Give accurate and honest answers.
- Never invent information.
- If you do not know something, say so.
- Use the live date and time context provided below
  when answering questions about dates and time.
- Treat that context as the current reference, not as a
  permanent date.
- Remember that the user's timezone may differ from UTC.
- Keep responses well-structured and avoid unnecessary verbosity.
`;

// Generate reliable current date and time information.
function getDateTimeContext(timeZone) {
  const now = new Date();

  const date = new Intl.DateTimeFormat("en-IN", {
    timeZone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(now);

  const time = new Intl.DateTimeFormat("en-IN", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(now);

  return `
CURRENT DATE AND TIME CONTEXT:
Date: ${date}
Time: ${time}
Timezone: ${timeZone}

Use this information when the user asks about today's date,
the current day, time, tomorrow, yesterday, or date calculations.
`;
}

export async function POST(request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();

    // Validate the requested timezone.
    let timeZone = "Asia/Kolkata";

    if (typeof body?.timeZone === "string") {
      try {
        new Intl.DateTimeFormat("en-US", {
          timeZone: body.timeZone,
        });

        timeZone = body.timeZone;
      } catch {
        return NextResponse.json(
          { error: "Please provide a valid timezone." },
          { status: 400 }
        );
      }
    }

    const messages = body?.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Please provide conversation messages." },
        { status: 400 }
      );
    }

    if (messages.length > 100) {
      return NextResponse.json(
        { error: "Conversation is too long. Please start a new chat." },
        { status: 400 }
      );
    }

    // Validate individual messages.
    const validMessages = messages.filter(
      (message) =>
        ["user", "assistant"].includes(message?.role) &&
        typeof message?.content === "string" &&
        message.content.trim().length > 0 &&
        message.content.length <= MAX_MESSAGE_LENGTH
    );

    if (
      validMessages.length === 0 ||
      validMessages[validMessages.length - 1].role !== "user"
    ) {
      return NextResponse.json(
        { error: "A valid user message is required." },
        { status: 400 }
      );
    }

    // Keep the most recent conversation messages.
    let recentMessages = validMessages.slice(-MAX_HISTORY_MESSAGES);

    // Gemini conversations must begin with a user message.
    if (recentMessages[0].role === "assistant") {
      recentMessages = recentMessages.slice(1);
    }

    if (recentMessages.length === 0) {
      return NextResponse.json(
        { error: "A valid conversation is required." },
        { status: 400 }
      );
    }

    const conversationHistory = recentMessages.map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [
        {
          text: message.content.trim(),
        },
      ],
    }));

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model,
      contents: conversationHistory,
      config: {
        systemInstruction:
          SYSTEM_INSTRUCTION + getDateTimeContext(timeZone),
        temperature: 0.7,
      },
    });

    const reply = response.text?.trim();

    if (!reply) {
      return NextResponse.json(
        {
          error: "Ajjiba could not generate a response. Please try again.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      reply,
      timeZone,
    });
  } catch (error) {
    console.error("Ajjiba API error:", error);

    return NextResponse.json(
      {
        error:
          "Something went wrong while contacting Ajjiba. Please try again.",
      },
      { status: 500 }
    );
  }
}
