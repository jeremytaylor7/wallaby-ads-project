const chaiHttp = require('chai-http');
const express = require('express')
const chai = require('chai');
const should = chai.should();
const app = express();
chai.use(chaiHttp);

describe('Get Request', function () {
    it('should make a successful request to /', function () {
        chai.request(app)
            .get('/')
            .end(function (err, res) {
                res.should.have.status(200);
            })
    })
})