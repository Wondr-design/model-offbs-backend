import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { generateContent } from "./googleRoutes/textGenerateRoute.js";
import { main } from "./googleRoutes/modelChat.js";

const app = express();
app.use(bodyParser.json());

app.use(cors({ origin: ["https://model.offbs.com", "http://localhost:5173"] }));

app.listen(process.env.PORT || 9090, () => {
  console.log(`Server is running on port ${process.env.PORT || 9090}`);
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
