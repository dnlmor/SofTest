const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const ValidationError = mongoose.Error.ValidationError;
const Item = require('../models/itemModel');

describe('Item Model', () => {
  let sampleItem;

  beforeEach(() => {
    sampleItem = {
      name: 'Test Item',
      description: 'This is a test item',
      price: 100,
      hash: 'testHash'
    };
  });

  it('should throw a validation error if required fields are missing', (done) => {
    const item = new Item({});

    item.validate((err) => {
      expect(err).to.be.instanceOf(ValidationError);
      expect(err.errors).to.have.property('name');
      expect(err.errors).to.have.property('description');
      expect(err.errors).to.have.property('price');
      expect(err.errors).to.have.property('hash');
      done();
    });
  });

  it('should create an item successfully with all required fields', (done) => {
    const item = new Item(sampleItem);

    item.validate((err) => {
      expect(err).to.be.null;
      expect(item).to.have.property('name', 'Test Item');
      expect(item).to.have.property('description', 'This is a test item');
      expect(item).to.have.property('price', 100);
      expect(item).to.have.property('hash', 'testHash');
      done();
    });
  });
});
