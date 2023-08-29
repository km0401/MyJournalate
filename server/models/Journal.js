// models/Journal.js
const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: Date,
  day: String,
  userId: String,
});

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;
