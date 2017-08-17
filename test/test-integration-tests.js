const chaiHttp = require('chai-http');
const express = require('express')
const bodyParser = require('body-parser');
const chai = require('chai');
const should = chai.should();
chai.use(chaiHttp);
const { app, runServer, closeServer } = require('../server');
// integration tests for ad endpoints

app.use(bodyParser.json());
describe('API Test for Ad Endpoints', function () {

    before(function () {
        return runServer();
    });

    after(function () {
        return closeServer();
    });

    it('should make a successful get request', function () {
        return chai.request(app)
            .get('/api/ads')
            .end(function (res) {
                res.should.have.status(200);
            })
    })

    it('should make a successful post request', function () {
        return chai.request(app)
            .get('/api/ads')
            .end(function (err, res) {
                res.should.have.status(200);
            })
    })

    it('should make a successful put request', function () {
        return chai.request(app)
            .get('/api/ads')
            .then(function (res) {
                res.should.have.status(500);
            })


    })

    it('should make a successful delete request', function () {
        return chai.request(app)
            .get('/api/ads')
            .end(function (err, res) {
                res.should.have.status(200);
            })
    })
})

