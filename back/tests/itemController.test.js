const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Item = require('../models/itemModel');

chai.should();
chai.use(chaiHttp);

describe('Items API', () => {
  beforeEach(async () => {
    await Item.deleteMany({});
  });

  describe('GET /api/items', () => {
    it('should get all items', (done) => {
      chai.request(app)
        .get('/api/items')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  // Add more tests for other CRUD operations
});
