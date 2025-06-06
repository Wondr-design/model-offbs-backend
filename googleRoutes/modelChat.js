import { ai } from "../clients/googleClients.js";

// Shared chat session and history
let chat = null;
let history = [];

const initChat = (initialPrompt) => {
  history.push({
    role: "user",
    parts: [{ text: initialPrompt }],
  });

  chat = ai.chats.create({
    model: "gemma-3-12b-it",
    history,
  });
};

export const main = async (prompt) => {
  if (!ai) throw new Error("Missing Google authentication");

  try {
    // Initialize chat only once
    if (!chat) {
      initChat(prompt);
    } else {
      history.push({
        role: "user",
        parts: [{ text: prompt }],
      });
    }

    const response = await chat.sendMessage({ message: prompt });

    const modelReply = response.candidates[0].content.parts.map(
      (part) => part.text
    );

    // Update history with model's reply
    history.push({
      role: "model",
      parts: response.candidates[0].content.parts,
    });

    return modelReply;
  } catch (error) {
    console.error(`Error: ${error}`);
    throw new Error("Failed to fetch data");
  } finally {
    console.log("Done");
  }
};
