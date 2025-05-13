import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { generateContent } from "./googleRoutes/textGenerateRoute.js";
import { main } from "./googleRoutes/modelChat.js";

const app = express();
app.use(bodyParser.json());

app.use(cors());

app.listen(9090, () => {
  console.log("Server started on port 9090");
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
