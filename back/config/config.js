require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  dbUri: process.env.DB_URI,
};

module.exports = config;
