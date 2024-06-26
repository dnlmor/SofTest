const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model('Dish', dishSchema);
