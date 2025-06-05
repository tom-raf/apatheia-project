const express = require('express');
const cors = require('cors');
const connectDB = require('./models/db');
const { User, Quote, JournalEntry } = require('./models/associateModels');
const authRoutes = require('./routes/authRoutes');
const quoteRoutes = require('./routes/quotesRoute');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/quote', quoteRoutes);


app.listen(3000, async () => {
  try {
    await connectDB();
    await User.sync();
    await Quote.sync();
    await JournalEntry.sync();
    console.log('Server running Λ');
  } catch (error) {
    console.error('Failed to connect to DB:', error);
    process.exit(1);
  }
});