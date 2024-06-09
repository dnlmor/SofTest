const chai = require('chai');
const ItemService = require('../services/itemService');
const Item = require('../models/itemModel');

chai.should();

describe('Item Service', () => {
  beforeEach(async () => {
    await Item.deleteMany({});
  });

  it('should create a new item', async () => {
    const itemData = { name: 'Test Item', description: 'Test Description', price: 100 };
    const item = await ItemService.createItem(itemData);
    item.should.have.property('name').eql('Test Item');
    item.should.have.property('description').eql('Test Description');
    item.should.have.property('price').eql(100);
  });

  // Add more tests for other service operations
});
