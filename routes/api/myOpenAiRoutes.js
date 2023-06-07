const express = require("express");
const { OpenAIApi, Configuration } = require("openai");
const router = express.Router();

// let OPENAI_API_KEY='Nwm0eHV3rTxvm8n7TGkLdJhaYM6hs9lD'

const configuration = new Configuration({
  apiKey: 'Nwm0eHV3rTxvm8n7TGkLdJhaYM6hs9lD',
});

const openai = new OpenAIApi(configuration);

router.use((req, res, next) => {
    console.log(req.path, req.method);
  const apiKey = req.headers.authorization;
  console.log(apiKey)
  console.log(apiKey)
  if (!apiKey || apiKey !== `Bearer ${apiKey}`) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
});

router.post("/v1/chat/completions", async (req, res) => {
    const { model, messages } = req.body;
  
    try {
      const response = await openai.createChatCompletion({
        model: model || "gpt-3.5-turbo",
        messages: messages || [{role: "user", content: "Hello world"}],
      });
  
      res.send(response.data);
    } catch (error) {
      res.status(500).send({ message: "Error in completions", error });
    }
  });
  

router.post("/v1/chat/completions", async (req, res) => {
  const { model, prompt, max_tokens } = req.body;

  try {
    const response = await openai.createCompletion({
      model: model,
      prompt: prompt,
      max_tokens: max_tokens || 100,
    });

    res.send(response.data);
  } catch (error) {
    res.status(500).send({ message: "Error in completions", error });
  }
});

router.post("/v1/edits", async (req, res) => {
  const { model, prompt, max_tokens, temperature, top_p, frequency_penalty, presence_penalty } = req.body;

  try {
    const response = await openai.createCompletion({
      model: model,
      prompt: prompt,
      max_tokens: max_tokens || 100,
      temperature: temperature || 0.3,
      top_p: top_p || 1.0,
      frequency_penalty: frequency_penalty || 0.0,
      presence_penalty: presence_penalty || 0.0
    });

    res.send(response.data);
  } catch (error) {
    res.status(500).send({ message: "Error in edits", error });
  }
});

module.exports = router;
