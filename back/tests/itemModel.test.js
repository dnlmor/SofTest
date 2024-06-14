const chai = require('chai');
const Item = require('../models/itemModel');
const connectDB = require('../config/database');

chai.should();

describe('Item Model', () => {
  before(async () => {
    await connectDB();
  });

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

  it('should not save an item without name field', (done) => {
    const item = new Item({ description: 'Test Description', price: 100 });
    item.save((err) => {
      err.should.exist;
      done();
    });
  });
});
