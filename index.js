import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { generateContent } from "./googleRoutes/textGenerateRoute.js";
import { main } from "./googleRoutes/modelChat.js";
import { generateStructuredOutputText } from "./googleRoutes/textStructuredOutput.js";
import { mainStructuredOutput } from "./googleRoutes/mainStructuredOutput.js";

const app = express();
app.use(bodyParser.json());

app.use(
  cors({
    origin: [
      "https://model.offbs.com",
      "http://localhost:5173",
      "http://localhost:5175",
    ],
  })
);

const PORT = process.env.PORT || 3000; // match Dockerfile
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Routes

// Text generation
app.post("/googleai/content", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await generateContent(prompt);
    res.send(response);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Model chat

app.post("/googleai/chat", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await main(prompt);
    res.send(response);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Text Structured output generation

app.post("/googleai/textstructured", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await generateStructuredOutputText(prompt);
    res.send(response);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Main Structured output generation

app.post("/googleai/mainstructured", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await mainStructuredOutput(prompt);
    res.send(response);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).send("Internal Server Error");
  }
});
