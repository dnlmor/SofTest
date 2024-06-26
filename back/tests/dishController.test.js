const chai = require('chai');
const sinon = require('sinon');
const rewire = require('rewire');
const Dish = require('../models/dishModel');
const { expect } = chai;

const dishController = rewire('../controllers/dishController');
const sandbox = sinon.createSandbox();

describe('Dish Controller', () => {
  afterEach(() => {
    sandbox.restore();
  });

  describe('createDish', () => {
    it('should create a new dish', async () => {
      const req = {
        body: { name: 'Ramen', price: 12.99, ingredients: ['Noodles', 'Broth'], stock: 50 },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sandbox.stub(Dish.prototype, 'save').resolves(req.body);

      await dishController.createDish(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(req.body)).to.be.true;
    });

    it('should handle errors when creating a dish', async () => {
      const req = {
        body: { name: 'Ramen', price: 12.99, ingredients: ['Noodles', 'Broth'], stock: 50 },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const error = new Error('Error creating dish');

      sandbox.stub(Dish.prototype, 'save').rejects(error);

      await dishController.createDish(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
    });
  });

  describe('getDishes', () => {
    it('should get all dishes', async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const dishes = [
        { name: 'Ramen', price: 12.99, ingredients: ['Noodles', 'Broth'], stock: 50 },
        { name: 'Pho', price: 11.99, ingredients: ['Rice noodles', 'Beef broth'], stock: 30 },
      ];

      sandbox.stub(Dish, 'find').resolves(dishes);

      await dishController.getDishes(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(dishes)).to.be.true;
    });

    it('should handle errors when getting dishes', async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const error = new Error('Error getting dishes');

      sandbox.stub(Dish, 'find').rejects(error);

      await dishController.getDishes(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
    });
  });

  describe('getDishById', () => {
    it('should get a dish by id', async () => {
      const req = { params: { id: '123' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const dish = { name: 'Ramen', price: 12.99, ingredients: ['Noodles', 'Broth'], stock: 50 };

      sandbox.stub(Dish, 'findById').resolves(dish);

      await dishController.getDishById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(dish)).to.be.true;
    });

    it('should handle errors when getting a dish by id', async () => {
      const req = { params: { id: '123' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const error = new Error('Error getting dish by id');

      sandbox.stub(Dish, 'findById').rejects(error);

      await dishController.getDishById(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
    });

    it('should return 404 if dish not found', async () => {
      const req = { params: { id: '123' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sandbox.stub(Dish, 'findById').resolves(null);

      await dishController.getDishById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Dish not found' })).to.be.true;
    });
  });

  describe('updateDish', () => {
    it('should update a dish', async () => {
      const req = { params: { id: '123' }, body: { price: 14.99, stock: 30 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const updatedDish = { name: 'Ramen', price: 14.99, ingredients: ['Noodles', 'Broth'], stock: 30 };

      sandbox.stub(Dish, 'findByIdAndUpdate').resolves(updatedDish);

      await dishController.updateDish(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(updatedDish)).to.be.true;
    });

    it('should handle errors when updating a dish', async () => {
      const req = { params: { id: '123' }, body: { price: 14.99, stock: 30 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const error = new Error('Error updating dish');

      sandbox.stub(Dish, 'findByIdAndUpdate').rejects(error);

      await dishController.updateDish(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
    });

    it('should return 404 if dish to update not found', async () => {
      const req = { params: { id: '123' }, body: { price: 14.99, stock: 30 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sandbox.stub(Dish, 'findByIdAndUpdate').resolves(null);

      await dishController.updateDish(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Dish not found' })).to.be.true;
    });
  });

  describe('deleteDish', () => {
    it('should delete a dish', async () => {
      const req = { params: { id: '123' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sandbox.stub(Dish, 'findByIdAndDelete').resolves({});

      await dishController.deleteDish(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: 'Dish deleted successfully' })).to.be.true;
    });

    it('should handle errors when deleting a dish', async () => {
      const req = { params: { id: '123' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const error = new Error('Error deleting dish');

      sandbox.stub(Dish, 'findByIdAndDelete').rejects(error);

      await dishController.deleteDish(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: error.message })).to.be.true;
    });

    it('should return 404 if dish to delete not found', async () => {
      const req = { params: { id: '123' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sandbox.stub(Dish, 'findByIdAndDelete').resolves(null);

      await dishController.deleteDish(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Dish not found' })).to.be.true;
    });
  });
});
