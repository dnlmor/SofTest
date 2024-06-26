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
    const dish = new Dish({ name: 'Ramen' });

    dish.validate((err) => {
      expect(err.errors.price).to.exist;
      done();
    });
  });

  it('should be invalid if ingredients are empty', (done) => {
    const dish = new Dish({ name: 'Ramen', price: 12.99, ingredients: [], stock: 10 });

    dish.validate((err) => {
      expect(err.errors.ingredients).to.exist;
      done();
    });
  });

  it('should default stock to 0 if not provided', (done) => {
    const dish = new Dish({ name: 'Ramen', price: 12.99, ingredients: ['Noodles', 'Broth'] });

    expect(dish.stock).to.equal(0);
    done();
  });
});
