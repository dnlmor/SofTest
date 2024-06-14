const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const request = require('supertest');
const express = require('express');
const itemController = require('../controllers/itemController');
const itemRoutes = require('../routes/itemRoutes');

const app = express();
app.use(express.json());
app.use('/api', itemRoutes);

describe('Item Routes', () => {
  let sampleItem;
  let createItemStub, getItemsStub, updateItemStub, deleteItemStub;

  beforeEach(() => {
    sampleItem = {
      name: 'Test Item',
      description: 'This is a test item',
      price: 100,
      hash: 'testHash'
    };

    createItemStub = sinon.stub(itemController, 'createItem').callsFake(async (req, res) => {
      res.status(201).json(sampleItem);
    });
    getItemsStub = sinon.stub(itemController, 'getItems').callsFake(async (req, res) => {
      res.status(200).json([sampleItem]);
    });
    updateItemStub = sinon.stub(itemController, 'updateItem').callsFake(async (req, res) => {
      res.status(200).json(sampleItem);
    });
    deleteItemStub = sinon.stub(itemController, 'deleteItem').callsFake(async (req, res) => {
      res.status(204).send();
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('POST /api/items should create a new item', async () => {
    const res = await request(app).post('/api/items').send(sampleItem);

    expect(createItemStub).to.have.been.calledOnce;
    expect(res.status).to.equal(201);
  });

  it('GET /api/items should return all items', async () => {
    const res = await request(app).get('/api/items');

    expect(getItemsStub).to.have.been.calledOnce;
    expect(res.status).to.equal(200);
  });

  it('PUT /api/items/:id should update an item', async () => {
    const res = await request(app).put('/api/items/testId').send({ name: 'Updated Item' });

    expect(updateItemStub).to.have.been.calledOnce;
    expect(res.status).to.equal(200);
  });

  it('DELETE /api/items/:id should delete an item', async () => {
    const res = await request(app).delete('/api/items/testId');

    expect(deleteItemStub).to.have.been.calledOnce;
    expect(res.status).to.equal(204);
  });
});
