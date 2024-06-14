const chai = require('chai');
const ItemService = require('../services/itemService');
const Item = require('../models/itemModel');
const connectDB = require('../config/database');

chai.should();

describe('Item Service', () => {
  before(async () => {
    await connectDB();
  });

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

  it('should get all items', async () => {
    const items = await ItemService.getAllItems();
    items.should.be.a('array');
    items.length.should.be.eql(0);
  });

  it('should get an item by id', async () => {
    const item = new Item({ name: 'Test Item', description: 'Test Description', price: 100 });
    await item.save();
    const foundItem = await ItemService.getItemById(item._id);
    foundItem.should.have.property('name').eql('Test Item');
  });

  it('should update an item by id', async () => {
    const item = new Item({ name: 'Test Item', description: 'Test Description', price: 100 });
    await item.save();
    const updatedItem = await ItemService.updateItem(item._id, { name: 'Updated Item' });
    updatedItem.should.have.property('name').eql('Updated Item');
  });

  it('should delete an item by id', async () => {
    const item = new Item({ name: 'Test Item', description: 'Test Description', price: 100 });
    await item.save();
    const result = await ItemService.deleteItem(item._id);
    result.should.have.property('deletedCount').eql(1);
  });
});
