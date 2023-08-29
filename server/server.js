const express = require('express');
// const cors = require('cors');
const app = express();
const PORT = 5000;

// app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/MyJournalate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const journalRoutes = require('./routes/journalRoutes');
app.use('/api/journals', journalRoutes);
