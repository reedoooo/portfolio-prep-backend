const express = require('express');
const router = express.Router();
const OpenAIController = require('../../controllers/OpenAiController');

router.post('/', OpenAIController.saveResponse);
router.get('/', OpenAIController.getSavedResponses);

router.use((req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || authorizationHeader !== `Bearer ${process.env.OPENAI_API_KEY}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
});

router.post('/completions', OpenAIController.getCompletions);

module.exports = router;
