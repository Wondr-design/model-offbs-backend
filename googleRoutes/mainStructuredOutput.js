import { ai } from "../clients/googleClients.js";
import { Type } from "@google/genai";

export const mainStructuredOutput = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemma-3-12b-it",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              eventName: {
                type: Type.STRING,
                description: "Name of the event",
                nullable: false,
              },
              eventDate: {
                type: Type.STRING,
                description: "Date of the event",
                nullable: false,
              },
              eventParticipants: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                  description: "Participants of the event",
                  nullable: false,
                },
                nullable: false,
              },
            },
            required: ["eventName", "eventDate", "eventParticipants"],
          },
        },
      },
    });

    // console.debug(response.text);
    const result = response.text;
    console.log(result);
    const jsonObj = JSON.parse(result);
    console.log(jsonObj);
    return jsonObj;
  } catch (e) {
    console.log(e);
  }
};
