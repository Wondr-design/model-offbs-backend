import { ai } from "../clients/googleClients.js";

export const generateContent = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
