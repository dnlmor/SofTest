const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/database');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const port = config.port;

app.use(express.json());

// Database connection
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to ${config.db}`))
  .catch(err => console.error(`Could not connect to ${config.db}`, err));

app.use('/api', itemRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
