const express = require('express');
const cors = require('cors');
const {connectDB} = require('./models/db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/quote', require('./routes/quotesRoute'));


app.listen(3000, async () => {
  try {
    await connectDB();
    console.log('Server running Λ');
  } catch (error) {
    console.error('Failed to connect to DB:', error);
    process.exit(1);
  }
});