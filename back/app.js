const express = require('express');
const cors = require('cors');
const app = express();
const itemRoutes = require('./routes/itemRoutes');

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON requests

// Routes
app.use('/api/items', itemRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
