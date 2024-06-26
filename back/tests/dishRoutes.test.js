const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Dish = require('../models/dishModel');
const { expect } = chai;

chai.use(chaiHttp);

describe('Dish Routes', () => {
  let dishId;

  before(async () => {
    await Dish.deleteMany({});
    const dish = new Dish({ name: 'Burger', price: 5.99, ingredients: ['Beef patty', 'Bun', 'Lettuce', 'Tomato'] });
    const savedDish = await dish.save();
    dishId = savedDish._id;
  });

  it('POST /api/dishes - should create a new dish', (done) => {
    chai.request(app)
      .post('/api/dishes')
      .send({ name: 'Pasta', price: 10.99, ingredients: ['Pasta', 'Sauce'] })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('GET /api/dishes - should get all dishes', (done) => {
    chai.request(app)
      .get('/api/dishes')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('GET /api/dishes/:id - should get a dish by id', (done) => {
    chai.request(app)
      .get(`/api/dishes/${dishId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal('Burger');
        done();
      });
  });

  it('PUT /api/dishes/:id - should update a dish', (done) => {
    chai.request(app)
      .put(`/api/dishes/${dishId}`)
      .send({ price: 9.99 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.price).to.equal(9.99);
        done();
      });
  });

  it('DELETE /api/dishes/:id - should delete a dish', (done) => {
    chai.request(app)
      .delete(`/api/dishes/${dishId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
