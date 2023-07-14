const express = require("express");
const router = express.Router();
const axios = require("axios");
const SavedResponses = require("../../models/SavedResponsesSchema");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // use environment variable here
});

const openai = new OpenAIApi(configuration);

router.post("/", async (req, res) => {
  const { savedResponses } = req.body;

  try {
    const newSavedResponses = new SavedResponses({ responses: savedResponses });
    await newSavedResponses.save();

    res
      .status(200)
      .json({ message: "Response saved successfully", newSavedResponses });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error occurred while saving the response" });
  }
});

router.get("/", async (req, res) => {
  try {
    const savedResponses = await SavedResponses.find({});

    res.status(200).json(savedResponses);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error occurred while fetching the responses" });
  }
});

router.use((req, res, next) => {
  console.log(req.path, req.method);
  const authorizationHeader = req.headers.authorization;
  if (
    !authorizationHeader ||
    authorizationHeader !== `Bearer ${process.env.OPENAI_API_KEY}`
  ) {
    // Use a separate API key for your own API
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
});

router.post("/completions", async (req, res) => {
  const { model, messages, temperature } = req.body;

  try {
    console.log(model);
    console.log(messages);

    const prompt = messages
      .map((message) => `${message.role}: ${message.content}`)
      .join("\n");

    const response = await openai.createCompletion({
      model: model || "text-davinci-002",
      prompt: prompt,
      maxTokens: 60,
      temperature: temperature || 0.5,
    });
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

// router.post("/completions", async (req, res) => {
//   const { model, prompt, max_tokens, temperature } = req.body;

//   try {
//     const response = await axios.post(
//       "https://api.openai.com/v1/engines/davinci-codex/completions",
//       {
//         model: model || "text-davinci-002",
//         prompt: prompt,
//         max_tokens: max_tokens || 60,
//         temperature: temperature || 0.5,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//         },
//       }
//     );

//     res.json(response.data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// router.post("/completions", async (req, res) => {
//   const { model, messages, temperature } = req.body;

//   try {
//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model,
//         messages,
//         temperature,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//         },
//       }
//     );

//     res.json(response.data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// router.post("/api/chat/completions", async (req, res) => {
//   const { model, messages, temperature } = req.body;

//   try {
//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model,
//         messages,
//         temperature,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//         },
//       }
//     );

//     res.json(response.data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
