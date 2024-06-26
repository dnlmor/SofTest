const chai = require('chai');
const Dish = require('../models/dishModel');
const { expect } = chai;

describe('Dish Model', () => {
  it('should be invalid if name is empty', (done) => {
    const dish = new Dish();

    dish.validate((err) => {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  it('should be invalid if price is empty', (done) => {
    const dish = new Dish({ name: 'Pasta' });

    dish.validate((err) => {
      expect(err.errors.price).to.exist;
      done();
    });
  });

  it('should be invalid if ingredients are empty', (done) => {
    const dish = new Dish({ name: 'Pasta', price: 10.99, ingredients: [] });

    dish.validate((err) => {
      expect(err.errors.ingredients).to.exist;
      done();
    });
  });
});
