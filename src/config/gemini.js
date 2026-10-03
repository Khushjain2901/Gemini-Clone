import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function run(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    console.log(response.text);
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Error: ${error.message}`;
  }
}