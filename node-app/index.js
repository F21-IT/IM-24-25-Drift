const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express();
const port = 3000;
app.use(cors())

// Store messages in memory (use a database in a real application)
let messages = [];

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'web-page')));

// Endpoint to send a message
app.post('/send-message', (req, res) => {
  const { til, fra, message } = req.body;

  if (!til || !message) {
    return res.status(400).json({ error: 'Sender and message are required.' });
  }

  // Add the message to the message list
  messages = { til, fra, message };

  console.log(`[${til}]: ${message}`);
  res.json({ success: true });
});

// Endpoint to get all messages
app.get('/get-messages', (req, res) => {
  res.json(messages);
});

// Serve HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'web-page', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});