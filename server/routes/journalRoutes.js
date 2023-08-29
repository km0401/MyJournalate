
const express = require('express');
const router = express.Router();
const Journal = require('../models/Journal');

router.post('/', async (req, res) => {
  try {
    const { title, content, date, day, userId } = req.body;

    const journal = new Journal({
      title,
      content,
      date,
      day,
      userId,
    });
    const savedJournal = await journal.save();
    res.status(201).json(savedJournal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const journals = await Journal.find({ userId });
    res.status(200).json(journals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
