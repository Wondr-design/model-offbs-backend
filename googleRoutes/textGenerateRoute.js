import { ai } from "../clients/googleClients.js";

export const generateContent = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemma-3-12b-it",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
