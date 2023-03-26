const express = require('express');
const router = express.Router();
const Basic_Info = require('../models/model');

router.get('', async (request, response) => {
  try {
    const basic_Info = await Basic_Info.findOne();
    response.status(200).json(basic_Info);
  } catch (error) {
    console.error(error);
    response.status(500).json('there was an error getting basic info');
  }
});

module.exports = router;
