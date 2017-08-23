const chaiHttp = require('chai-http');
const express = require('express')
const { Post } = require('../models/postmodel');
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
            .then(function (res) {
                console.log(res.body.length);
                res.should.have.status(200);
                res.body.should.have.length.of.at.least(1);
            })
    })
    const testObj = {
        "title": "The best online course!!",
        "link": "bestcourse.com!",
        "description": "this is the best course EVER!!",
        "adCode": 5555
    }
    it('should make a successful post request', function () {
        return chai.request(app)
            .post('/api/ads')
            .send(testObj)
            .then(function (res) {
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
            })
    })
    const updateObj = {
        "title": "Bitcoin Exchange!",
        "link": "supercourse.com"
    }

    it('should make a successful put request', function () {
        return Post
            .findOne()
            .exec()
            .then(post => {
                console.log(post._id);
                return chai.request(app)
                    .put(`/api/ads/${post._id}`)
                    .send(updateObj)
            })
            .then(res => {
                console.log('CONSOLE LOG COMIN UP!' + res.body.title);
                res.body.should.not.be.null;
                res.should.have.status(200);
            })


    })

    it('should make a successful delete request', function () {
        let postObj;
        Post
            .findOne()
            .exec()
            .then(post => {
                postObj = post;
                return chai.request(app)
                    .delete(`api/ads/:${postId}`);
            })
            .then(res => {
                res.should.have.status(204);
                return Post.findById(postObj.id);
            })
            .then(post => {
                should.not.exist(post);
            })
    })
})

