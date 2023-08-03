const axios = require('axios');
const SavedResponses = require('../models/SavedResponsesSchema');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.saveResponse = async (req, res) => {
  const { savedResponses } = req.body;
  try {
    const newSavedResponses = new SavedResponses({ responses: savedResponses });
    await newSavedResponses.save();
    res.status(200).json({ message: 'Response saved successfully', newSavedResponses });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while saving the response' });
  }
};

exports.getSavedResponses = async (req, res) => {
  try {
    const savedResponses = await SavedResponses.find({});
    res.status(200).json(savedResponses);
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while fetching the responses' });
  }
};

exports.getCompletions = async (req, res) => {
  const { model, messages, temperature } = req.body;
  try {
    const prompt = messages.map((message) => `${message.role}: ${message.content}`).join('\n');

    const response = await openai.createCompletion({
      model: model || 'text-davinci-002',
      prompt: prompt,
      maxTokens: 60,
      temperature: temperature || 0.5,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
