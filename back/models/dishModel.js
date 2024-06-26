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
    validate: [arrayLimit, '{PATH} cannot be empty']
  },
  stock: {
    type: Number,
    default: 0,
  },
});

function arrayLimit(val) {
  return val.length > 0;
}

module.exports = mongoose.model('Dish', dishSchema);
