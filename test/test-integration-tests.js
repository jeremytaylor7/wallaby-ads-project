const chaiHttp = require('chai-http');
const { Post } = require('../models/postmodel');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const chai = require('chai');

const should = chai.should();
chai.use(chaiHttp);
const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL } = require('../config');

// integration tests for ad endpoints
function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}
app.use(bodyParser.json());
describe('API Test for Ad Endpoints', () => {
  before(() => runServer(TEST_DATABASE_URL));

  afterEach(() => tearDownDb());

  after(() => closeServer());

  it('should make a successful get request', () => Post
    .create(testObj)
    .then((post) => {
      chai.request(app)
        .get('/api/ads')
        .then((res) => {
          console.log(res.body.length);
          res.should.have.status(200);
          res.body.should.have.length.of.at.least(1);
        });
    }));

  const testObj = {
    title: 'The best online course!!',
    link: 'bestcourse.com!',
    description: 'this is the best course EVER!!',
    adCode: 5555,
  };
  it('should make a successful post request', () => chai.request(app)
    .post('/api/ads')
    .send(testObj)
    .then((res) => {
      console.log(res.body);
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.include.keys(
        'title', 'link', 'description', 'adCode'
      )
      res.body.title.should.not.be.null;
      res.body.link.should.not.be.null;
      res.body.description.should.not.be.null;
      res.body.adCode.should.not.be.null;
    }));
  const updateObj = {
    title: 'Bitcoin Exchange!',
    link: 'supercourse.com',
  };

  it('should make a successful put request', () => Post
    .create(testObj)
    .then((post) => {
      console.log(post._id);
      return chai.request(app)
        .put(`/api/ads/${post._id}`)
        .send(updateObj);
    })
    .then((res) => {
      res.body.should.not.be.null;
      res.should.have.status(200);
    }));

  it('should make a successful delete request', () => Post
    .create(testObj)
    .then((post) => chai.request(app)
      .delete(`/api/ads/${post._id}`))
    .then((res) => {
      res.should.have.status(200);
    })
    .then((post) => {
      should.not.exist(post);
    })
    .catch((err) => {
      console.log(err);
    }));
});
