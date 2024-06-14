const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');
const mongoose = require('mongoose');
const sandbox = sinon.createSandbox();

let itemController = rewire('../controllers/itemController');

describe('Item Controller', () => {
  let sampleItem;
  let itemStub;

  before(async () => {
    itemController.__set__('getNanoid', async () => 'testHash');
  });

  beforeEach(() => {
    sampleItem = {
      name: 'Test Item',
      description: 'This is a test item',
      price: 100,
      hash: 'testHash'
    };
    
    itemStub = sandbox.stub(mongoose.Model.prototype, 'save').resolves(sampleItem);
    sandbox.stub(mongoose.Model, 'find').resolves([sampleItem]);
    sandbox.stub(mongoose.Model, 'findOne').resolves(sampleItem);
    sandbox.stub(mongoose.Model, 'findByIdAndUpdate').resolves(sampleItem);
    sandbox.stub(mongoose.Model, 'findByIdAndDelete').resolves(sampleItem);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('createItem', () => {
    it('should create a new item', async () => {
      const req = { body: { name: 'Test Item', description: 'This is a test item', price: 100, hash: 'testHash' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      await itemController.createItem(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(sampleItem);
      expect(itemStub).to.have.been.calledOnce;
    });
  });

  describe('getItems', () => {
    it('should return all items', async () => {
      const req = {};
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      await itemController.getItems(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([sampleItem]);
    });
  });

  describe('updateItem', () => {
    it('should update an item', async () => {
      const req = { params: { id: 'testId' }, body: { name: 'Updated Item' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      await itemController.updateItem(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(sampleItem);
    });
  });

  describe('deleteItem', () => {
    it('should delete an item', async () => {
      const req = { params: { id: 'testId' } };
      const res = { status: sinon.stub().returnsThis(), send: sinon.stub() };

      await itemController.deleteItem(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.send).to.have.been.calledOnce;
    });
  });
});
