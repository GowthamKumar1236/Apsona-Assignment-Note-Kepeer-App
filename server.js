const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname)); // Serve static files like index.html, styles.css, scripts.js

// Sample route to test the server
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
