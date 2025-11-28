import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let aiClient: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API_KEY is not set. The chat feature will not function correctly.");
      // Fallback for dev/demo purposes if env is missing to prevent crash, 
      // though functionality will fail on the actual call.
      return new GoogleGenAI({ apiKey: "dummy_key" }); 
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const sendMessageToGemini = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string
): Promise<string> => {
  try {
    const client = getClient();
    
    // Fetch database.txt content
    let dbContent = '';
    try {
      const response = await fetch('/database.txt');
      if (response.ok) {
        dbContent = await response.text();
      }
    } catch (e) {
      console.error("Could not fetch database.txt:", e);
    }

    const fullSystemInstruction = `${dbContent}\n\n${SYSTEM_INSTRUCTION}`;

    const chat = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: fullSystemInstruction,
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const response: GenerateContentResponse = await chat.sendMessage({
      message: newMessage
    });

    return response.text || "I apologize, but I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "I'm currently experiencing high traffic or a configuration issue. Please try again later, or contact Jinuk directly via email.";
  }
};
