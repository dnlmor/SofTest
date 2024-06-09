const chai = require('chai');
const Item = require('../models/itemModel');

chai.should();

describe('Item Model', () => {
  it('should create a new item', (done) => {
    const item = new Item({ name: 'Test Item', description: 'Test Description', price: 100 });
    item.save((err, savedItem) => {
      if (err) return done(err);
      savedItem.should.have.property('name').eql('Test Item');
      savedItem.should.have.property('description').eql('Test Description');
      savedItem.should.have.property('price').eql(100);
      done();
    });
  });

  // Add more tests for other model operations
});
