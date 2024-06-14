const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Item = require('../models/itemModel');
const connectDB = require('../config/database');

chai.should();
chai.use(chaiHttp);

describe('Items API Routes', () => {
  before(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    await Item.deleteMany({});
  });

  describe('GET /items', () => {
    it('should get all items', (done) => {
      chai.request(app)
        .get('/items')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('POST /items', () => {
    it('should create a new item', (done) => {
      const newItem = { name: 'Test Item', description: 'Test Description', price: 100 };
      chai.request(app)
        .post('/items')
        .send(newItem)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eql('Test Item');
          done();
        });
    });
  });

  describe('GET /items/:id', () => {
    it('should get an item by the given id', (done) => {
      const item = new Item({ name: 'Test Item', description: 'Test Description', price: 100 });
      item.save((err, savedItem) => {
        chai.request(app)
          .get(`/items/${savedItem.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql('Test Item');
            res.body.should.have.property('_id').eql(savedItem.id);
            done();
          });
      });
    });
  });

  describe('PUT /items/:id', () => {
    it('should update an item by the given id', (done) => {
      const item = new Item({ name: 'Test Item', description: 'Test Description', price: 100 });
      item.save((err, savedItem) => {
        chai.request(app)
          .put(`/items/${savedItem.id}`)
          .send({ name: 'Updated Item' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql('Updated Item');
            done();
          });
      });
    });
  });

  describe('DELETE /items/:id', () => {
    it('should delete an item by the given id', (done) => {
      const item = new Item({ name: 'Test Item', description: 'Test Description', price: 100 });
      item.save((err, savedItem) => {
        chai.request(app)
          .delete(`/items/${savedItem.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });
});
